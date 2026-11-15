import { useState } from 'react';

const storageKey = 'jiayu-portfolio-note';

function getErrorMessage(error) {
  return error instanceof Error ? error.message : String(error);
}

function loadSavedNote() {
  try {
    return {
      note: window.localStorage.getItem(storageKey) ?? '',
      status: '',
    };
  } catch (error) {
    return {
      note: '',
      status: `Unable to load saved note: ${getErrorMessage(error)}`,
    };
  }
}

export default function Notepad() {
  const [initialState] = useState(loadSavedNote);
  const [note, setNote] = useState(initialState.note);
  const [status, setStatus] = useState(initialState.status);

  const handleSave = () => {
    try {
      window.localStorage.setItem(storageKey, note);
      setStatus('Note saved.');
    } catch (error) {
      setStatus(`Unable to save note: ${getErrorMessage(error)}`);
    }
  };

  const handleNew = () => {
    setNote('');
    setStatus('New note. Save to replace the saved note.');
  };

  const handleClear = () => {
    setNote('');
    try {
      window.localStorage.removeItem(storageKey);
      setStatus('Saved note cleared.');
    } catch (error) {
      setStatus(`Unable to clear saved note: ${getErrorMessage(error)}`);
    }
  };

  return (
    <div className="notepad-application">
      <nav className="notepad-menubar" aria-label="Notepad menu">
        <span>File</span>
        <span>Edit</span>
        <span>Search</span>
        <span>Help</span>
      </nav>
      <div className="notepad-controls">
        <button className="retro-button" type="button" onClick={handleNew}>New</button>
        <button className="retro-button" type="button" onClick={handleSave}>Save</button>
        <button className="retro-button" type="button" onClick={handleClear}>Clear</button>
      </div>
      <textarea
        className="notepad-editor"
        aria-label="Note contents"
        value={note}
        onChange={(event) => {
          setNote(event.target.value);
          setStatus('Unsaved changes.');
        }}
        spellCheck="true"
      />
      <div className="notepad-status" role="status" aria-live="polite">{status}</div>
    </div>
  );
}
