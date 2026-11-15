export const tools = [
  { name: 'R', logo: '/logos/tools/r.svg' },
  { name: 'Python', logo: '/logos/tools/python.svg' },
  { name: 'MATLAB', logo: '/logos/tools/matlab.svg' },
  { name: 'SQL', logo: '/logos/tools/sql.svg' },
  { name: 'Tableau', logo: '/logos/tools/tableau.png', wordmark: true },
  { name: 'REDCap', logo: '/logos/tools/redcap.png' },
  { name: 'Figma', logo: '/logos/tools/figma.svg' },
  { name: 'Blender', logo: '/logos/tools/blender.svg' },
  { name: 'PsychoPy', logo: '/logos/tools/psychopy.png' },
  { name: 'Canva', logo: '/logos/tools/canva.svg' },
];

export const skills = [
  'Quantitative Research',
  'Qualitative Research',
  'Human Subject Research',
  'Data Analysis',
  'Data Visualization',
  'Usability Testing',
  'Bilingual',
  'UX/UI',
];

export const documentFiles = [
  { name: "Jiayu's CV copy.pdf", href: '/documents/Jiayu%27s%20CV%20copy.pdf' },
  { name: "Jiayu's Resume copy.pdf", href: '/documents/Jiayu%27s%20Resume%20copy.pdf' },
];

export const profileShortcuts = [
  {
    name: 'GitHub',
    logo: '/logos/social/github.svg',
    href: 'https://github.com/Jiayu-He-2016',
  },
  {
    name: 'LinkedIn',
    logo: '/logos/social/linkedin.svg',
    href: 'https://www.linkedin.com/in/jiayu-he-a424972b9',
  },
];

export const windowCatalog = {
  computer: {
    id: 'computer',
    title: 'My Computer',
    contentType: 'folder',
    width: 520,
    height: 360,
    items: [
      { name: 'About Me', target: 'about' },
      { name: 'My Skills', target: 'skills' },
      { name: 'Tools', target: 'tools' },
    ],
  },
  about: {
    id: 'about',
    title: 'About Me',
    contentType: 'about',
    width: 560,
    height: 330,
  },
  skills: {
    id: 'skills',
    title: 'My Skills',
    contentType: 'skills',
    width: 460,
    height: 390,
  },
  tools: {
    id: 'tools',
    title: 'Tools',
    contentType: 'tools',
    width: 560,
    height: 390,
  },
  documents: {
    id: 'documents',
    title: 'Documents',
    contentType: 'documents',
    width: 500,
    height: 280,
  },
  email: {
    id: 'email',
    title: 'Email',
    contentType: 'email',
    width: 540,
    height: 440,
  },
  explorer: {
    id: 'explorer',
    title: 'Explorer',
    contentType: 'shortcuts',
    width: 520,
    height: 340,
  },
  projects: {
    id: 'projects',
    title: 'Projects',
    contentType: 'folder',
    width: 540,
    height: 340,
    items: [
      { name: 'UX Intern Project', target: 'ux-intern-project' },
      { name: 'SQL + Tableau Project', target: 'sql-tableau-project' },
    ],
  },
  'ux-intern-project': {
    id: 'ux-intern-project',
    title: 'UX Intern Project',
    contentType: 'case-study',
    projectId: 'ux-intern-project',
    width: 780,
    height: 580,
  },
  'sql-tableau-project': {
    id: 'sql-tableau-project',
    title: 'SQL + Tableau Project',
    contentType: 'case-study',
    projectId: 'sql-tableau-project',
    width: 780,
    height: 580,
  },
  'research-projects': {
    id: 'research-projects',
    title: 'Research Projects',
    contentType: 'folder',
    width: 540,
    height: 340,
    items: [{ name: 'Project 1', target: 'research-project-1' }],
  },
  'research-project-1': {
    id: 'research-project-1',
    title: 'Social Cue Recognition and Decision Making in AI Model',
    contentType: 'case-study',
    projectId: 'research-project-1',
    width: 780,
    height: 580,
  },
  artworks: {
    id: 'artworks',
    title: 'Artworks (D:)',
    contentType: 'artworks',
    width: 560,
    height: 430,
  },
  bin: {
    id: 'bin',
    title: 'Work Experience',
    contentType: 'work-experience',
    width: 640,
    height: 580,
  },
  notes: {
    id: 'notes',
    title: 'Notes',
    contentType: 'notepad',
    width: 480,
    height: 360,
  },
};
