import React, { useEffect, useState } from 'react';

const SvgIcon = ({ svgMarkup, width }) => {
  const [svgElement, setSvgElement] = useState(null);

  useEffect(() => {
    if (svgMarkup) {
      const parser = new DOMParser();
      const doc = parser.parseFromString(svgMarkup, "image/svg+xml");
      const svg = doc.querySelector("svg");

      if (svg) {
        if (width) {
          svg.setAttribute('width', width);

          // Calculate height based on aspect ratio
          const viewBox = svg.getAttribute('viewBox');
          if (viewBox) {
            const [, , vbWidth, vbHeight] = viewBox.split(' ').map(Number);
            const aspectRatio = vbHeight / vbWidth;
            const height = parseFloat(width) * aspectRatio;
            svg.setAttribute('height', `${height}rem`);
          }
        }
        setSvgElement(svg);
      }
    }
  }, [svgMarkup, width]);

  return svgElement ? React.createElement(svgElement.tagName, {
    ...Array.from(svgElement.attributes).reduce((acc, attr) => {
      acc[attr.name] = attr.value;
      return acc;
    }, {}),
    dangerouslySetInnerHTML: { __html: svgElement.innerHTML }
  }) : null;
};

export default SvgIcon;
