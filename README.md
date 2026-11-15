# Jiayu's Windows 98 Portfolio

## Updating portfolio content

- Edit the window catalog and desktop links in `src/data/portfolioContent.js`.
- Update case-study copy and ordered figure paths in `src/data/projects.js`; project images are organized under `public/projects/`.
- Add artwork image files to `public/artworks/`, then add an entry to `src/data/artworks.js` with its title, description, and image paths.
- Update experience entries in `src/data/workExperience.js`.
- The current CV and Resume are stored in `public/documents/`. If replacing them, update their matching download names and paths in `src/data/portfolioContent.js`.
- Logo asset sources and license details are listed in `public/logos/ATTRIBUTION.txt`.

## Desktop interactions

- Double-click desktop icons to open them. On narrow/mobile screens, tap an icon once.
- Use taskbar buttons to restore or activate open windows; window dragging is constrained to the viewport.
- Drag desktop icons or files/folders in open windows onto Recycle Bin to show its playful error dialog. Nothing is deleted.
- Notes are saved in this browser under the `jiayu-portfolio-note` localStorage key. Save persists the current text; Clear removes the saved note. New starts a blank unsaved note.

## Development

```sh
npm install
npm run dev
```

Run `npm run lint` and `npm run build` to validate changes.
