import React, { useState, useRef, useEffect } from "react";
import useBreakpoint from "../../../utils/useBreakpoint";
import "./TagDropdown.scss";
import Tag from "../Tag/Tag";
import Button from "../Button/Button";
import CheckBox from "../CheckBox/CheckBox";
import Tooltip from "../Tooltip/Tooltip";
import { ReactComponent as Delete } from "../../../assets/icons/delete.svg";
import { ReactComponent as ChevronDown } from "../../../assets/icons/chevron-down.svg";

const TagDropdown = ({ allTags = [], selectedTags, setSelectedTags }) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { isMobile } = useBreakpoint();

  const toggleDropdown = () => setOpen((prev) => !prev);

  const handleTagToggle = (tag) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const handleClearAll = (e) => {
    e.stopPropagation();
    setSelectedTags([]);
  };

  const handleRemoveTag = (tag) => {
    setSelectedTags(selectedTags.filter((t) => t !== tag));
  };

  const maxVisibleTags = 2;
  const visibleTags = selectedTags.slice(0, maxVisibleTags);
  const remainingCount = selectedTags.length - maxVisibleTags;

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="tag-dropdown" ref={dropdownRef}>
      <div
        className="selected-tags"
        role="button"
        tabIndex="0"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls="tag-options"
        onClick={toggleDropdown}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            toggleDropdown();
          }
          if (e.key === "Escape") {
            setOpen(false);
          }
        }}
      >
        <div className="tags-wrapper">
          {selectedTags.length === 0 ? (
            <span className="placeholder">Filter</span>
          ) : isMobile ? (
            <span className="placeholder">
              {selectedTags.length} {selectedTags.length === 1 ? "tag" : "tags"}
            </span>
          ) : (
            <>
              {visibleTags.map((tag) => (
                <Tag
                  key={tag}
                  label={tag}
                  size="small"
                  dismissible={true}
                  onClick={() => handleRemoveTag(tag)}
                />
              ))}
              {remainingCount > 0 && (
                <Tooltip text={selectedTags.slice(maxVisibleTags)}>
                  <Tag
                    label={`+${remainingCount} ${remainingCount === 1 ? "other" : "others"}`}
                    size="small"
                    selectable={false}
                  />
                </Tooltip>
              )}
            </>
          )}
        </div>

        <span className={`arrow${open ? " open" : ""}`}>
          <ChevronDown />
        </span>
      </div>

      {open && (
        <div className="tag-options" id="tag-options" role="listbox">
          {allTags.map((tag) => (
            <div key={tag} className="tag-option">
              <CheckBox
                checkedType={selectedTags.includes(tag) ? "Selected" : "Unselected"}
                onChange={() => handleTagToggle(tag)}
                size="Small"
                label={true}
              >
                {tag}
              </CheckBox>
            </div>
          ))}
        </div>
      )}

      {selectedTags.length > 0 && (
        <Button
          {...(!isMobile && { label: "Clear all" })}
          size={isMobile ? "small" : undefined}
          variant="tertiary"
          iconLeft={Delete}
          onClick={handleClearAll}
        />
      )}
    </div>
  );
};

export default TagDropdown;