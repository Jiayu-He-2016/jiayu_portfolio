import { useEffect, useState } from 'react';
import ErrorDialog from './components/ErrorDialog';
import WindowContent from './components/WindowContent';
import { windowCatalog } from './data/portfolioContent';
import './App.css';

const desktopIcons = [
  { id: 'computer', label: 'My Computer', icon: '/icons/computer.png', defaultX: 18, defaultY: 18, target: 'computer' },
  { id: 'documents', label: 'Documents', icon: '/icons/documents.png', defaultX: 110, defaultY: 18, target: 'documents' },
  { id: 'email', label: 'Email', icon: '/icons/email.png', defaultX: 18, defaultY: 130, target: 'email' },
  { id: 'explorer', label: 'Explorer', icon: '/icons/explorer.png', defaultX: 110, defaultY: 130, target: 'explorer' },
  { id: 'projects', label: 'Projects', icon: '/icons/folder.png', defaultX: 18, defaultY: 240, target: 'projects' },
  { id: 'research-projects', label: 'Research Projects', icon: '/icons/services.png', defaultX: 110, defaultY: 240, target: 'research-projects' },
  { id: 'artworks', label: 'Artworks', icon: '/icons/optical-drive.png', defaultX: 18, defaultY: 350, target: 'artworks' },
  { id: 'bin', label: 'Recycle Bin', icon: '/icons/recycle-bin.png', defaultX: 18, defaultY: 460, target: 'bin' },
  { id: 'notes', label: 'Notes', icon: '/icons/notepad.png', defaultX: 110, defaultY: 350, target: 'notes' },
];

const getDesktopIconPositions = (viewportWidth, viewportHeight) => {
  if (viewportWidth > 700 && viewportHeight > 560) {
    return Object.fromEntries(
      desktopIcons.map((icon) => [icon.id, { x: icon.defaultX, y: icon.defaultY }]),
    );
  }

  if (viewportHeight >= 460) {
    const rowPitch = Math.min(110, (viewportHeight - 38 - 18 - 86 - 8) / 4);
    return Object.fromEntries(
      desktopIcons.map((icon) => [
        icon.id,
        { x: icon.defaultX, y: 18 + Math.round((icon.defaultY - 18) / 110) * rowPitch },
      ]),
    );
  }

  const columns = 3;
  const iconWidth = 88;
  const horizontalPitch = Math.min(
    96,
    Math.max(0, (viewportWidth - 36 - iconWidth) / (columns - 1)),
  );
  const rowPitch = Math.min(
    110,
    Math.max(70, (viewportHeight - 38 - 30 - 86 - 8) / 2),
  );

  return Object.fromEntries(
    desktopIcons.map((icon, index) => [
      icon.id,
      {
        x: 18 + (index % columns) * horizontalPitch,
        y: 30 + Math.floor(index / columns) * rowPitch,
      },
    ]),
  );
};

const isRecycleBinDrop = (event, sourceIconId = null) => {
  const topDropElement = document.elementsFromPoint(event.clientX, event.clientY).find((element) => {
    const iconElement = element.closest('.desktop-icon');
    return (
      iconElement?.dataset.desktopIconId !== sourceIconId
      && !element.matches('.desktop-icons, .desktop')
    );
  });

  return Boolean(topDropElement?.closest('[data-recycle-bin="true"]'));
};

const getWindowPosition = (openWindowCount, template) => {
  const viewportWidth = typeof window !== 'undefined' ? window.innerWidth : 1200;
  const viewportHeight = typeof window !== 'undefined' ? window.innerHeight : 800;
  const isNarrowViewport = viewportWidth <= 700;
  const renderedWidth = isNarrowViewport
    ? Math.min(viewportWidth * 0.85, 460)
    : template.width;
  const renderedHeight = isNarrowViewport
    ? Math.min(template.height, viewportHeight - 100)
    : template.height;

  return {
    x: Math.max(10, Math.min(220 + openWindowCount * 16, viewportWidth - renderedWidth - 10)),
    y: Math.max(30, Math.min(110 + openWindowCount * 12, viewportHeight - renderedHeight - 70)),
  };
};

function App() {
  const [iconPositions, setIconPositions] = useState(() =>
    getDesktopIconPositions(window.innerWidth, window.innerHeight),
  );
  const [windows, setWindows] = useState(() => {
    const template = windowCatalog['research-projects'];
    return [{
      ...template,
      ...getWindowPosition(0, template),
      zIndex: 1,
      minimized: false,
      maximized: false,
    }];
  });
  const [selectedIconId, setSelectedIconId] = useState(null);
  const [startOpen, setStartOpen] = useState(false);
  const [contextMenu, setContextMenu] = useState(null);
  const [draggingIcon, setDraggingIcon] = useState(null);
  const [draggingWindow, setDraggingWindow] = useState(null);
  const [draggingFile, setDraggingFile] = useState(false);
  const [binDialogOpen, setBinDialogOpen] = useState(false);
  const [clock, setClock] = useState(() =>
    new Date().toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' }),
  );
  const activeWindow = windows
    .filter((item) => !item.minimized)
    .reduce((highest, item) => (!highest || item.zIndex > highest.zIndex ? item : highest), null);
  const activeWindowId = activeWindow?.id;

  useEffect(() => {
    const timer = setInterval(() => {
      setClock(new Date().toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' }));
    }, 30000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (!draggingIcon) return undefined;

    const handleMove = (event) => {
      setIconPositions((prev) => ({
        ...prev,
        [draggingIcon.id]: {
          x: Math.max(8, event.clientX - draggingIcon.offsetX),
          y: Math.max(12, event.clientY - draggingIcon.offsetY),
        },
      }));
    };

    const handleUp = (event) => {
      if (isRecycleBinDrop(event, draggingIcon.id)) {
        setIconPositions((prev) => ({
          ...prev,
          [draggingIcon.id]: { x: draggingIcon.originX, y: draggingIcon.originY },
        }));
        setBinDialogOpen(true);
      }
      setDraggingIcon(null);
    };

    window.addEventListener('pointermove', handleMove);
    window.addEventListener('pointerup', handleUp);

    return () => {
      window.removeEventListener('pointermove', handleMove);
      window.removeEventListener('pointerup', handleUp);
    };
  }, [draggingIcon]);

  useEffect(() => {
    if (!draggingFile) return undefined;

    const handleUp = (event) => {
      if (isRecycleBinDrop(event)) setBinDialogOpen(true);
      setDraggingFile(false);
    };

    window.addEventListener('pointerup', handleUp);
    return () => window.removeEventListener('pointerup', handleUp);
  }, [draggingFile]);

  useEffect(() => {
    if (!draggingWindow) return undefined;

    const handleMove = (event) => {
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;
      setWindows((prev) =>
        prev.map((appWindow) =>
          appWindow.id === draggingWindow.id
            ? {
                ...appWindow,
                x: Math.min(
                  Math.max(10, event.clientX - draggingWindow.offsetX),
                  Math.max(10, viewportWidth - draggingWindow.width),
                ),
                y: Math.min(
                  Math.max(30, event.clientY - draggingWindow.offsetY),
                  Math.max(30, viewportHeight - 38 - draggingWindow.height),
                ),
              }
            : appWindow,
        ),
      );
    };

    const handleUp = () => setDraggingWindow(null);

    window.addEventListener('pointermove', handleMove);
    window.addEventListener('pointerup', handleUp);

    return () => {
      window.removeEventListener('pointermove', handleMove);
      window.removeEventListener('pointerup', handleUp);
    };
  }, [draggingWindow]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 700 || window.innerHeight <= 560) {
        setIconPositions(getDesktopIconPositions(window.innerWidth, window.innerHeight));
      } else {
        setIconPositions((previous) =>
          Object.fromEntries(
            desktopIcons.map((icon) => [
              icon.id,
              {
                x: Math.min(previous[icon.id].x, window.innerWidth - 96),
                y: Math.min(previous[icon.id].y, window.innerHeight - 38 - 94),
              },
            ]),
          ),
        );
      }

      setWindows((prev) => prev.map((item) => {
        if (item.maximized) {
          return {
            ...item,
            x: 18,
            y: 18,
            width: Math.max(100, window.innerWidth - 36),
            height: Math.max(100, window.innerHeight - 120),
          };
        }

        const element = document.querySelector(`[data-window-id="${item.id}"]`);
        const bounds = element?.getBoundingClientRect();
        const width = bounds?.width || item.width;
        const height = bounds?.height || item.height;

        return {
          ...item,
          x: Math.min(Math.max(10, item.x), Math.max(10, window.innerWidth - width - 10)),
          y: Math.min(Math.max(30, item.y), Math.max(30, window.innerHeight - 38 - height)),
        };
      }));
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const bringToFront = (id) => {
    setWindows((prev) => {
      const maxZ = prev.reduce((highest, window) => Math.max(highest, window.zIndex || 0), 0);
      return prev.map((window) =>
        window.id === id ? { ...window, zIndex: maxZ + 1 } : window,
      );
    });
  };

  const openWindow = (id, selectedDesktopIconId = null) => {
    setWindows((prev) => {
      const maxZ = prev.reduce((highest, window) => Math.max(highest, window.zIndex || 0), 0);
      const existing = prev.find((window) => window.id === id);
      if (existing) {
        return prev.map((window) =>
          window.id === id
            ? { ...window, minimized: false, zIndex: maxZ + 1 }
            : window,
        );
      }

      const template = windowCatalog[id];
      if (!template) {
        throw new Error(`Unknown window: ${id}`);
      }
      const position = getWindowPosition(prev.length, template);

      return [
        ...prev,
        {
          ...template,
          ...position,
          zIndex: maxZ + 1,
          minimized: false,
          maximized: false,
        },
      ];
    });

    setSelectedIconId(selectedDesktopIconId);
    setStartOpen(false);
  };

  const closeWindow = (id) => {
    setWindows((prev) => prev.filter((window) => window.id !== id));
  };

  const minimizeWindow = (id) => {
    setWindows((prev) =>
      prev.map((window) =>
        window.id === id ? { ...window, minimized: true } : window,
      ),
    );
  };

  const toggleMaximize = (id) => {
    const viewportWidth = typeof window !== 'undefined' ? window.innerWidth : 1200;
    const viewportHeight = typeof window !== 'undefined' ? window.innerHeight : 800;

    setWindows((prev) =>
      prev.map((window) => {
        if (window.id !== id) return window;

        if (window.maximized) {
          return {
            ...window,
            maximized: false,
            x: Math.min(Math.max(10, window.restoreX), Math.max(10, viewportWidth - window.restoreWidth - 10)),
            y: Math.min(Math.max(30, window.restoreY), Math.max(30, viewportHeight - 38 - window.restoreHeight)),
            width: window.restoreWidth,
            height: window.restoreHeight,
          };
        }

        return {
          ...window,
          maximized: true,
          restoreX: window.x,
          restoreY: window.y,
          restoreWidth: window.width,
          restoreHeight: window.height,
          x: 18,
          y: 18,
          width: viewportWidth - 36,
          height: viewportHeight - 120,
        };
      }),
    );
  };

  const handleDesktopClick = () => {
    setSelectedIconId(null);
    setContextMenu(null);
    setStartOpen(false);
  };

  const handleDesktopContext = (event) => {
    event.preventDefault();
    setContextMenu({ x: event.clientX, y: event.clientY });
  };

  const handleFilePointerDown = (event) => {
    if (event.button !== 0 || !event.target.closest('[data-bin-draggable]')) return;
    setDraggingFile(true);
  };

  return (
    <div
      className="desktop"
      onClick={handleDesktopClick}
      onContextMenu={handleDesktopContext}
      onPointerDownCapture={handleFilePointerDown}
    >
      <p className="desktop-title">Jiayu&apos;s Desktop</p>
      <div className="desktop-icons" aria-label="Desktop icons">
        {desktopIcons.map((icon) => (
          <button
            type="button"
            key={icon.id}
            className={`desktop-icon ${selectedIconId === icon.id ? 'selected' : ''}`}
            data-desktop-icon-id={icon.id}
            data-recycle-bin={icon.id === 'bin' ? 'true' : undefined}
            style={{ left: `${iconPositions[icon.id].x}px`, top: `${iconPositions[icon.id].y}px` }}
            onClick={(event) => {
              event.stopPropagation();
              setSelectedIconId(icon.id);
              if (event.detail === 0 || window.matchMedia('(max-width: 700px)').matches) {
                openWindow(icon.target, icon.id);
              }
            }}
            onDoubleClick={(event) => {
              event.stopPropagation();
              openWindow(icon.target, icon.id);
            }}
            onContextMenu={(event) => {
              event.preventDefault();
              event.stopPropagation();
              setSelectedIconId(icon.id);
              setContextMenu({ x: event.clientX, y: event.clientY });
            }}
            onPointerDown={(event) => {
              if (event.button !== 0) return;
              setSelectedIconId(icon.id);
              setDraggingIcon({
                id: icon.id,
                offsetX: event.clientX - iconPositions[icon.id].x,
                offsetY: event.clientY - iconPositions[icon.id].y,
                originX: iconPositions[icon.id].x,
                originY: iconPositions[icon.id].y,
              });
            }}
            onDragOver={icon.id === 'bin' ? (event) => {
              event.preventDefault();
              event.dataTransfer.dropEffect = 'copy';
            } : undefined}
            onDrop={icon.id === 'bin' ? (event) => {
              event.preventDefault();
              event.stopPropagation();
              setBinDialogOpen(true);
            } : undefined}
          >
            <img className="desktop-icon-image" src={icon.icon} alt="" draggable="false" aria-hidden="true" />
            <span className="icon-label">{icon.label}</span>
          </button>
        ))}
      </div>

      {windows.map((window) => (
          <div
            key={window.id}
            data-window-id={window.id}
            className={`window-shell ${window.maximized ? 'maximized' : ''} ${
              window.id === activeWindowId ? 'window-shell--active' : 'window-shell--inactive'
            }`}
            style={{
              display: window.minimized ? 'none' : undefined,
              left: `${window.x}px`,
              top: `${window.y}px`,
              width: `${window.width}px`,
              height: `${window.height}px`,
              zIndex: window.zIndex,
            }}
            onPointerDown={() => bringToFront(window.id)}
          >
            <div
              className="window-titlebar"
              onPointerDown={(event) => {
                if (event.button !== 0 || event.target.closest('button')) return;
                const bounds = event.currentTarget.closest('.window-shell').getBoundingClientRect();
                setDraggingWindow({
                  id: window.id,
                  offsetX: event.clientX - window.x,
                  offsetY: event.clientY - window.y,
                  width: bounds.width,
                  height: bounds.height,
                });
                bringToFront(window.id);
              }}
            >
              <span className="title-text">{window.title}</span>
              <div className="window-controls">
                <button type="button" aria-label="Minimize window" onClick={() => minimizeWindow(window.id)}>
                  —
                </button>
                <button type="button" aria-label="Maximize window" onClick={() => toggleMaximize(window.id)}>
                  □
                </button>
                <button type="button" aria-label="Close window" onClick={() => closeWindow(window.id)}>
                  ×
                </button>
              </div>
            </div>
            <div className="window-body">
              <WindowContent window={window} openWindow={openWindow} closeWindow={closeWindow} />
            </div>
          </div>
        ))}

      {startOpen && (
        <div className="start-menu" role="menu" aria-label="Start menu">
          <button type="button" role="menuitem" onClick={(event) => { event.stopPropagation(); openWindow('computer'); }}>
            My Computer
          </button>
          <button type="button" role="menuitem" onClick={(event) => { event.stopPropagation(); openWindow('documents'); }}>
            Documents
          </button>
          <button type="button" role="menuitem" onClick={(event) => { event.stopPropagation(); openWindow('email'); }}>
            Email
          </button>
          <button type="button" role="menuitem" onClick={(event) => { event.stopPropagation(); openWindow('explorer'); }}>
            Explorer
          </button>
          <button type="button" role="menuitem" onClick={(event) => { event.stopPropagation(); openWindow('projects'); }}>
            Projects
          </button>
          <button type="button" role="menuitem" onClick={(event) => { event.stopPropagation(); openWindow('research-projects'); }}>
            Research Projects
          </button>
          <button type="button" role="menuitem" onClick={(event) => { event.stopPropagation(); openWindow('bin'); }}>
            Work Experience
          </button>
          <button type="button" role="menuitem" onClick={(event) => { event.stopPropagation(); openWindow('artworks'); }}>
            Artworks
          </button>
          <button type="button" role="menuitem" onClick={(event) => { event.stopPropagation(); openWindow('notes'); }}>
            Notes
          </button>
        </div>
      )}

      {contextMenu && (
        <div
          className="context-menu"
          style={{ left: `${contextMenu.x}px`, top: `${contextMenu.y}px` }}
          onClick={(event) => event.stopPropagation()}
        >
          <button type="button" onClick={() => setContextMenu(null)}>
            Explore
          </button>
          <button type="button" onClick={() => setContextMenu(null)}>
            Refresh
          </button>
          <button type="button" onClick={() => setContextMenu(null)}>
            Properties
          </button>
        </div>
      )}

      <div className="taskbar" role="toolbar" aria-label="Taskbar">
        <button
          type="button"
          className="start-button"
          onClick={(event) => {
            event.stopPropagation();
            setStartOpen((current) => !current);
          }}
        >
          <span className="start-icon" aria-hidden="true" />
          Start
        </button>

        {windows.map((window) => (
          <button
            key={window.id}
            type="button"
            className={`task-button ${window.minimized ? 'task-button--minimized' : ''} ${
              window.id === activeWindowId ? 'task-button--active' : ''
            }`}
            aria-pressed={window.id === activeWindowId}
            onClick={() => {
              if (window.minimized) {
                setWindows((prev) =>
                  prev.map((item) =>
                    item.id === window.id ? { ...item, minimized: false } : item,
                  ),
                );
              }
              bringToFront(window.id);
            }}
          >
            {window.title}
          </button>
        ))}

        <div className="system-clock">{clock}</div>
      </div>

      {binDialogOpen && <ErrorDialog onClose={() => setBinDialogOpen(false)} />}
    </div>
  );
}

export default App;
