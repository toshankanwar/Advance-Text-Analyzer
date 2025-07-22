import React from "react";

export default function Footer({ theme }) {
  return (
    <footer className={`footer ${theme}`}>
      <div className="footer-content">
        <div className="footer-credit">
          <span>Design &amp; Developed by&nbsp;</span>
          <a
            href="https://toshankanwar.website/"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-author-link"
            title="Visit Toshan Kanwar's Website"
          >
            <b>Toshan Kanwar</b>
          </a>
        </div>
        <div className="footer-underline" />
        <div className="footer-extra">
          <span>
            Powered by modern web technologies. <span role="img" aria-label="rocket">🚀</span>
          </span>
        </div>
      </div>
    </footer>
  );
}