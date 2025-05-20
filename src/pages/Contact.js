import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Button from "../components/ui/Button/Button";
import Loading from "../components/ui/Loading/Loading";
import { ReactComponent as Send } from "../assets/icons/send.svg";
import "./Contact.scss";

const CONTACT_API_URL = "https://portfolio-cms-n9hb.onrender.com/api/contact-page?populate=*";

const Contact = () => {
  const [formStatus, setFormStatus] = useState("");
  const [contactContent, setContactContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const from = searchParams.get("from");

  const prefillMessages = {
    "ui-lab": "Hi, George,\n\n\I was checking out the UI Lab and would be keen to set up a call and have a look at what you can share.\n\nCheers,\n\n",
    
  };

  const defaultMessage = from && prefillMessages[from] ? prefillMessages[from] : "";

  useEffect(() => {
    const fetchContactData = async () => {
      try {
        const response = await fetch(CONTACT_API_URL);
        const data = await response.json();

        if (data?.data?.content) {
          setContactContent(data.data.content);
        }
      } catch (error) {
        console.error("Error fetching contact content:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchContactData();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;

    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams(new FormData(form)).toString(),
    })
      .then(() => setFormStatus("success"))
      .catch(() => setFormStatus("error"));
  };

  if (loading) return <Loading title="One sec..." />;
  if (!contactContent) return <p>Error loading content.</p>;

  return (
    <section className="contact">
      {contactContent.map((block, index) => {
        switch (block.type) {
          case "heading":
            return <h1 key={index}>{block.children[0].text}</h1>;
          case "paragraph":
            return (
              <p key={index}>
                {block.children.map((child, i) =>
                  child.type === "link" ? (
                    <a key={i} href={child.url} target="_blank" rel="noopener noreferrer">
                      {child.children[0].text}
                    </a>
                  ) : (
                    child.text
                  )
                )}
              </p>
            );
          default:
            return null;
        }
      })}

      {formStatus === "success" ? (
        <p className="form-success">Thank you! Your message has been sent.</p>
      ) : formStatus === "error" ? (
        <p className="form-error">Oops! Something went wrong. Please try again.</p>
      ) : (
        <form
          className="contact-form"
          name="contact"
          method="POST"
          data-netlify="true"
          netlify-honeypot="bot-field"
          onSubmit={handleSubmit}
        >
          {/* Required for Netlify to identify the form */}
          <input type="hidden" name="form-name" value="contact" />

          {/* Honeypot field (spam prevention) */}
          <div style={{ display: "none" }}>
            <label>
              Don’t fill this out: <input name="bot-field" />
            </label>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="name">Name *</label>
              <input type="text" id="name" name="name" required autoComplete="name" />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email address *</label>
              <input type="email" id="email" name="email" required autoComplete="email" />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="message">Your message *</label>
            <textarea 
              id="message"
              name="message"
              rows="5"
              required 
              autoComplete="off" 
              defaultValue={defaultMessage}
            />
              
          </div>

          <Button
            type="submit"
            label="Send message"
            size="medium"
            tone="brand"
            variant="primary"
            iconLeft={Send}
          />
        </form>
      )}
    </section>
  );
};

export default Contact;