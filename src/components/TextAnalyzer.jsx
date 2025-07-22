import React, { useState, useRef } from "react";
import * as analysis from "../utils/textAnalysis";

// Helper for reading text from plain/text and PDF files
function readTextFromFile(file) {
  return new Promise((resolve, reject) => {
    if (file.type === "text/plain") {
      const reader = new FileReader();
      reader.onload = e => resolve(e.target.result);
      reader.onerror = reject;
      reader.readAsText(file);
    } else if (
      file.type === "application/pdf" ||
      file.name.toLowerCase().endsWith(".pdf")
    ) {
      // PDF parsing via pdfjs-dist
      import("pdfjs-dist/build/pdf").then(pdfjsLib => {
        pdfjsLib.GlobalWorkerOptions.workerSrc =
          "//cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";
        const reader = new FileReader();
        reader.onload = async e => {
          const typedarray = new Uint8Array(e.target.result);
          const pdf = await pdfjsLib.getDocument(typedarray).promise;
          let text = "";
          for (let i = 1; i <= pdf.numPages; i++) {
            const page = await pdf.getPage(i);
            const content = await page.getTextContent();
            text += content.items.map(item => item.str).join(" ") + "\n";
          }
          resolve(text);
        };
        reader.onerror = reject;
        reader.readAsArrayBuffer(file);
      });
    } else if (
      file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
      file.name.toLowerCase().endsWith(".docx")
    ) {
      import("mammoth/mammoth.browser").then(mammoth => {
        const reader = new FileReader();
        reader.onload = async e => {
          const arrayBuffer = e.target.result;
          const result = await mammoth.convertToHtml({ arrayBuffer });
          const tempDiv = document.createElement("div");
          tempDiv.innerHTML = result.value;
          resolve(tempDiv.innerText);
        };
        reader.onerror = reject;
        reader.readAsArrayBuffer(file);
      });
    } else {
      reject("Unsupported file type");
    }
  });
}

// Capitalize first word of every sentence
function capitalizeFirstWordOfSentence(text) {
  return text.replace(/(^|\.\s+|\!\s+|\?\s+)([a-z])/g, (match, p1, p2) =>
    p1 + p2.toUpperCase()
  );
}

// Language translation (simple API call, can be replaced with actual API in production)
async function translateText(text, targetLang) {
  // Using LibreTranslate public API for demonstration (rate limits may apply!)
  try {
    const response = await fetch("https://libretranslate.de/translate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        q: text,
        source: "auto",
        target: targetLang,
        format: "text"
      }),
    });
    const data = await response.json();
    if (data.translatedText) return data.translatedText;
    return text;
  } catch {
    return text;
  }
}

export default function TextAnalyzer({ theme }) {
  const [text, setText] = useState("");
  const [keyword, setKeyword] = useState("");
  const [highlighted, setHighlighted] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [copySuccess, setCopySuccess] = useState("");
  const [lang, setLang] = useState("en");
  const [translating, setTranslating] = useState(false);

  // Undo/Redo stack
  const undoStack = useRef([]);
  const redoStack = useRef([]);

  // Audio/Speech
  const [speaking, setSpeaking] = useState(false);

  const wc = analysis.wordCount(text);
  const cc = analysis.charCount(text);
  const sc = analysis.sentenceCount(text);
  const pc = analysis.paragraphCount(text);
  const rt = analysis.readingTime(text);
  const uwc = analysis.uniqueWordCount(text);
  const freqWords = analysis.mostFrequentWords(text);
  const avgLen = analysis.avgWordLength(text);

  const pal = analysis.isPalindrome(text);
  const reversed = analysis.reverseText(text);
  const noPunct = analysis.removePunctuation(text);
  const numbers = analysis.extractNumbers(text);
  const emails = analysis.extractEmails(text);
  const urls = analysis.extractURLs(text);
  const summary = analysis.summarizeText(text);
  const longest = analysis.longestWord(text);
const shortest = analysis.shortestWord(text);
const syllables = analysis.syllableCount(text);
const vowels = analysis.vowelCount(text);
const consonants = analysis.consonantCount(text);
const flesch = analysis.fleschReadingEase(text);
const topSentences = analysis.longestSentences(text);

  // Push current text to undo stack before any change
  function pushUndo() {
    undoStack.current.push(text);
    if (undoStack.current.length > 100) undoStack.current.shift();
    redoStack.current = [];
  }

  function handleHighlight() {
    setHighlighted(analysis.highlightKeyword(text, keyword));
  }

  async function handleFileChange(e) {
    setErrorMsg("");
    setLoading(true);
    setHighlighted("");
    const file = e.target.files[0];
    if (!file) {
      setLoading(false);
      return;
    }
    pushUndo();
    try {
      const extractedText = await readTextFromFile(file);
      setText(extractedText);
    } catch (err) {
      setErrorMsg(
        "Failed to extract text. Supported: TXT, PDF, DOCX. " +
          (typeof err === "string" ? err : "Try another file.")
      );
    }
    setLoading(false);
  }

  async function handleCopyText() {
    try {
      await navigator.clipboard.writeText(text);
      setCopySuccess("Copied!");
      setTimeout(() => setCopySuccess(""), 1200);
    } catch {
      setCopySuccess("Failed to copy!");
      setTimeout(() => setCopySuccess(""), 1200);
    }
  }

  function handleRemoveText() {
    if (!text) return;
    pushUndo();
    setText("");
    setHighlighted("");
    setKeyword("");
  }

  function handleTextChange(e) {
    pushUndo();
    setText(e.target.value);
  }

  function handleUndo() {
    if (!undoStack.current.length) return;
    redoStack.current.push(text);
    setText(undoStack.current.pop());
    setHighlighted("");
  }

  function handleRedo() {
    if (!redoStack.current.length) return;
    undoStack.current.push(text);
    setText(redoStack.current.pop());
    setHighlighted("");
  }

  function handleCapitalizeSentence() {
    pushUndo();
    setText(capitalizeFirstWordOfSentence(text));
  }

  async function handleTranslate(targetLang) {
    setTranslating(true);
    pushUndo();
    const result = await translateText(text, targetLang);
    setText(result);
    setLang(targetLang);
    setTranslating(false);
  }

  function handleSpeak() {
    if (!text) return;
    if (speaking) return;
    setSpeaking(true);
    const synth = window.speechSynthesis;
    const utter = new window.SpeechSynthesisUtterance(text);
    utter.lang = lang === "hi" ? "hi-IN" : "en-US";
    utter.rate = 1;
    utter.onend = () => setSpeaking(false);
    synth.speak(utter);
  }

  function handleStopSpeak() {
    window.speechSynthesis.cancel();
    setSpeaking(false);
  }

  return (
    <div className={`text-analyzer-container ${theme}`}>
      <h1>Advanced Text Analyzer</h1>
      <div className="textarea-section">
        <label className="file-upload-label">
          <span className="upload-btn">
            📄 Upload File (TXT, PDF, DOCX)
          </span>
          <input
            type="file"
            accept=".txt,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document,.docx"
            style={{ display: "none" }}
            onChange={handleFileChange}
          />
        </label>
        {loading && (
          <div style={{ color: "#2563eb", fontWeight: 500, marginBottom: 8 }}>
            Extracting text from file...
          </div>
        )}
        {errorMsg && (
          <div style={{ color: "#e53e3e", fontWeight: 500, marginBottom: 8 }}>
            {errorMsg}
          </div>
        )}
        <div style={{ display: "flex", gap: "0.5rem", alignItems: "center", marginBottom: "0.5rem" }}>
          <textarea
            rows={8}
            className="main-textarea"
            value={text}
            onChange={handleTextChange}
            placeholder="Paste or write your text here..."
            style={{ flex: 1 }}
          />
          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            <button
              className="copy-btn"
              onClick={handleCopyText}
              disabled={!text}
              title="Copy all text"
            >
              📋 Copy
            </button>
            <button
              className="remove-btn"
              onClick={handleRemoveText}
              disabled={!text}
              title="Remove all text"
            >
              🗑️ Remove
            </button>
            <button
              className="undo-btn"
              onClick={handleUndo}
              disabled={!undoStack.current.length}
              title="Undo"
            >
              ↩️ Undo
            </button>
            <button
              className="redo-btn"
              onClick={handleRedo}
              disabled={!redoStack.current.length}
              title="Redo"
            >
              ↪️ Redo
            </button>
            {copySuccess && (
              <span style={{
                fontSize: "0.95rem",
                color: theme === "dark" ? "#90cdf4" : "#2563eb",
                fontWeight: 500,
                textAlign: "center"
              }}>
                {copySuccess}
              </span>
            )}
          </div>
        </div>
        <div className="highlight-section">
          <input
            type="text"
            className="keyword-input"
            placeholder="Keyword to highlight"
            value={keyword}
            onChange={e => setKeyword(e.target.value)}
          />
          <button className="highlight-btn" onClick={handleHighlight}>
            Highlight
          </button>
        </div>
        {highlighted && (
          <div
            className="highlighted-text"
            dangerouslySetInnerHTML={{ __html: highlighted }}
          />
        )}
        <div className="language-section" style={{ display: "flex", gap: "0.5rem", marginTop: "0.8rem", alignItems: "center" }}>
          <button
            className="capitalize-sentence-btn"
            onClick={handleCapitalizeSentence}
            disabled={!text}
            title="Capitalize first word of every sentence"
          >
            📝 Capitalize Sentences
          </button>
          <button
            className="lang-btn"
            onClick={() => handleTranslate("en")}
            disabled={lang === "en" || !text || translating}
          >
            🇬🇧 English
          </button>
          <button
            className="lang-btn"
            onClick={() => handleTranslate("hi")}
            disabled={lang === "hi" || !text || translating}
          >
            🇮🇳 Hindi
          </button>
          <button
            className="speak-btn"
            onClick={handleSpeak}
            disabled={!text || speaking}
            title="Read text aloud"
          >
            🔊 Speak
          </button>
          <button
            className="stop-speak-btn"
            onClick={handleStopSpeak}
            disabled={!speaking}
            title="Stop reading"
          >
            ⏹️ Stop
          </button>
          {translating && (
            <span style={{
              fontSize: "0.95rem",
              color: theme === "dark" ? "#90cdf4" : "#2563eb",
              fontWeight: 500,
              textAlign: "center"
            }}>Translating...</span>
          )}
        </div>
      </div>
      <div className="button-group">
        <button onClick={() => { pushUndo(); setText(analysis.toUpperCase(text)); }}>
          UPPER CASE
        </button>
        <button onClick={() => { pushUndo(); setText(analysis.toLowerCase(text)); }}>
          lower case
        </button>
        <button onClick={() => { pushUndo(); setText(analysis.capitalizeText(text)); }}>
          Capitalize
        </button>
        <button onClick={() => { pushUndo(); setText(analysis.removeExtraSpaces(text)); }}>
          Remove Extra Spaces
        </button>
        <button onClick={() => { pushUndo(); setText(noPunct); }}>
          Remove Punctuation
        </button>
        <button onClick={() => { pushUndo(); setText(reversed); }}>
          Reverse Text
        </button>
      </div>
      <div className="analysis-results">
        <b>Word Count:</b> {wc}
        <br />
        <b>Character Count:</b> {cc}
        <br />
        <b>Sentences:</b> {sc}
        <br />
        <b>Paragraphs:</b> {pc}
        <br />
        <b>Reading Time:</b> {rt} min
        <br />
        <b>Unique Words:</b> {uwc}
        <br />
        <b>Most Frequent Words:</b>{" "}
        {freqWords.map(([w, c]) => `${w} (${c})`).join(", ")}
        <br />
        <b>Average Word Length:</b> {avgLen}
        <br />
        <b>Palindrome:</b> {pal ? "Yes" : "No"}
        <br />
        <b>Numbers:</b> {numbers.join(", ")}
        <br />
        <b>Emails:</b> {emails.join(", ")}
        <br />
        <b>URLs:</b> {urls.join(", ")}
        <br />
        <b>Longest Word:</b> {longest}
  <br />
  <b>Shortest Word:</b> {shortest}
  <br />
  <b>Syllable Count:</b> {syllables}
  <br />
  <b>Vowels:</b> {vowels}
  <br />
  <b>Consonants:</b> {consonants}
  <br />
  <b>Flesch Reading Ease:</b> {flesch}
  <br />
  <b>Top Sentences by Length:</b>
  <ol>
    {topSentences.map((s, i) => (
      <li key={i}>{s}</li>
    ))}
  </ol>
        <b>Summary:</b> {summary}
        <br />
      </div>
    </div>
  );
}