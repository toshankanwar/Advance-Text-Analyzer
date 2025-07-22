import React from "react";


export default function AboutSection({ theme }) {
  return (
    <section className={`about-section${theme === "dark" ? " dark" : ""}`}>
      <h2>About Advanced Text Analyzer</h2>
      <div className="about-content">
        <p>
          <strong>Advanced Text Analyzer</strong> is a modern web application designed to empower users with comprehensive tools for text analysis, transformation, and extraction. Whether you're a writer, student, developer, or researcher, this tool provides instant insights and advanced features to streamline your workflow and enhance productivity.
        </p>
        <ul>
          <li><b>File Uploads:</b> Extract text from TXT, PDF, and DOCX documents with fast, accurate parsing.</li>
          <li><b>Text Metrics:</b> Instant word, character, sentence, paragraph counts, and reading time.</li>
          <li><b>Keyword Highlighting:</b> Emphasize specific terms or phrases in your text.</li>
          <li><b>Text Transformations:</b> UPPER/lower/capitalization, punctuation removal, reverse, clean extra spaces.</li>
          <li><b>Deep Analysis:</b> Unique words, frequent words, palindrome check, extract numbers, emails, URLs, auto-summary.</li>
          <li><b>Undo/Redo:</b> Step back or forward through your text changes.</li>
          <li><b>Copy & Remove:</b> One-click buttons for copying or clearing your text.</li>
          <li><b>Translation:</b> Instantly translate text between Hindi and English using LibreTranslate.</li>
          <li><b>Speech Synthesis:</b> Listen to your text in both English and Hindi, powered by your browser.</li>
          <li><b>Advanced Analysis:</b> Longest/shortest word, syllable/vowel/consonant counts, reading ease score, top sentences by length.</li>
          <li><b>Responsive UI:</b> Beautiful design with light/dark themes and mobile-first support.</li>
        </ul>
        <p>
          <strong>How it works:</strong> Simply paste your text or upload a document. Explore the available actions and analysis features, highlight keywords, transform your text, translate, or listen aloud — all in real-time and with instant feedback.
        </p>
        <p>
          <strong>Privacy & Security:</strong> Your text is processed entirely on your device for analysis and transformation. For translation, a secure API is used. No sensitive data is stored.
        </p>
        <p>
          <strong>Developed by:</strong> <a href="https://toshankanwar.website" target="_blank" rel="noopener noreferrer">Toshan Kanwar</a>. For feedback, support, or collaboration, please <a href="mailto:toshankanwar@gmail.com">get in touch</a>.
        </p>
      </div>
    </section>
  );
}