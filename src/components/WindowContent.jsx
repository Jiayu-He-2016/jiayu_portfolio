import { useState } from 'react';
import {
  documentFiles,
  profileShortcuts,
  skills,
  tools,
} from '../data/portfolioContent';
import { projectsById } from '../data/projects';
import ArtworkGallery from './ArtworkGallery';
import CaseStudyView from './CaseStudyView';
import Notepad from './Notepad';
import WorkExperienceTimeline from './WorkExperienceTimeline';

function FolderView({ items, openWindow }) {
  return (
    <div className="folder-window">
      {items.map((item) => (
        <button
          type="button"
          key={item.target}
          className="file-item"
          data-bin-draggable={item.name}
          draggable="false"
          onClick={() => openWindow(item.target)}
        >
          <img className="file-icon-image" src="/icons/folder.png" alt="" aria-hidden="true" draggable="false" />
          <span>{item.name}</span>
        </button>
      ))}
    </div>
  );
}

function AboutView() {
  return (
    <div className="document-window about-document">
      <p>
        Hi, I&apos;m Jiayu (Joyce). I&apos;m a <strong>HCDE</strong> MS at University of
        Washington, with <strong>Psychology &amp; Quantitative Science/Data Science</strong> BS
        background. I&apos;m excited about the intersection of cognitive psychology and user
        experience research, and I hope to continue learning how research can inform the design of
        more intuitive and human-centered technologies.
      </p>
    </div>
  );
}

function SkillsView() {
  return (
    <div className="document-window skills-document">
      <ul>
        {skills.map((skill) => <li key={skill}>{skill}</li>)}
      </ul>
    </div>
  );
}

function ToolsView() {
  return (
    <div className="document-window tools-grid">
      {tools.map((tool) => (
        <div className="tool-item" key={tool.name}>
          <img
            className={`brand-logo${tool.wordmark ? ' brand-logo--wordmark' : ''}`}
            src={tool.logo}
            alt=""
            aria-hidden="true"
          />
          <span>{tool.name}</span>
        </div>
      ))}
    </div>
  );
}

function DocumentsView() {
  return (
    <div className="folder-window documents-list">
      {documentFiles.map((file) => (
        <a
          className="file-item"
          href={file.href}
          download={file.name}
          key={file.name}
          data-bin-draggable={file.name}
          draggable="false"
        >
          <span className="file-extension-icon" aria-hidden="true">PDF</span>
          <span>{file.name}</span>
        </a>
      ))}
    </div>
  );
}

function EmailComposer({ closeWindow }) {
  const [to, setTo] = useState('jiayuhe2016@gmail.com');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    window.location.href = `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;
  };

  return (
    <form className="email-composer" onSubmit={handleSubmit}>
      <div className="mail-row">
        <label htmlFor="email-to">To:</label>
        <input
          id="email-to"
          type="email"
          value={to}
          onChange={(event) => setTo(event.target.value)}
          required
        />
      </div>
      <div className="mail-row">
        <label htmlFor="email-subject">Subject:</label>
        <input
          id="email-subject"
          type="text"
          value={subject}
          onChange={(event) => setSubject(event.target.value)}
        />
      </div>
      <div className="mail-row mail-row--message">
        <label htmlFor="email-message">Message:</label>
        <textarea
          id="email-message"
          value={message}
          onChange={(event) => setMessage(event.target.value)}
        />
      </div>
      <p className="mail-notice">Send opens your default email app. No message is sent by this site.</p>
      <div className="window-action-buttons">
        <button className="retro-button" type="submit">Send</button>
        <button className="retro-button" type="button" onClick={closeWindow}>Cancel</button>
      </div>
    </form>
  );
}

function ShortcutsView() {
  return (
    <div className="document-window shortcuts-grid">
      {profileShortcuts.map((shortcut) => (
        <a
          className="shortcut-item"
          href={shortcut.href}
          key={shortcut.name}
          rel="noopener noreferrer"
          target="_blank"
        >
          <img className="brand-logo" src={shortcut.logo} alt="" aria-hidden="true" />
          <span>{shortcut.name}</span>
        </a>
      ))}
    </div>
  );
}

export default function WindowContent({ window, openWindow, closeWindow }) {
  switch (window.contentType) {
    case 'folder':
      return <FolderView items={window.items} openWindow={openWindow} />;
    case 'about':
      return <AboutView />;
    case 'skills':
      return <SkillsView />;
    case 'tools':
      return <ToolsView />;
    case 'documents':
      return <DocumentsView />;
    case 'email':
      return <EmailComposer closeWindow={() => closeWindow(window.id)} />;
    case 'shortcuts':
      return <ShortcutsView />;
    case 'case-study': {
      const project = projectsById[window.projectId];
      if (!project) throw new Error(`Unknown case study: ${window.projectId}`);
      return <CaseStudyView project={project} />;
    }
    case 'artworks':
      return <ArtworkGallery />;
    case 'work-experience':
      return <WorkExperienceTimeline />;
    case 'notepad':
      return <Notepad />;
    default:
      throw new Error(`Unknown window content type: ${window.contentType}`);
  }
}
