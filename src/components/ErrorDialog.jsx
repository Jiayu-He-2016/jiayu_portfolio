import { useEffect } from 'react';

export default function ErrorDialog({ onClose }) {
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return (
    <div className="system-dialog-overlay">
      <section
        className="system-dialog"
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="bin-error-title"
        aria-describedby="bin-error-message"
      >
        <div className="system-dialog-titlebar">
          <strong id="bin-error-title">Error</strong>
          <button type="button" aria-label="Close dialog" onClick={onClose}>×</button>
        </div>
        <div className="system-dialog-body">
          <span className="error-dialog-icon" aria-hidden="true">×</span>
          <p id="bin-error-message">The bin is full!!</p>
        </div>
        <div className="system-dialog-actions">
          <button className="retro-button" type="button" onClick={onClose} autoFocus>
            OK
          </button>
        </div>
      </section>
    </div>
  );
}
