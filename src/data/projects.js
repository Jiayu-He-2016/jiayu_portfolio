const uxProject = {
  id: 'ux-intern-project',
  title: 'Using Usability Testing to Redesign a Contextual Translation-Error Reporting Flow',
  category: 'Intern project',
  metadata: [
    { label: 'Role', value: 'UX Researcher, designer' },
    { label: 'Tools', value: 'Figma, Figma Ideation, Zoom, AI-assisted prototyping' },
    { label: 'Duration', value: '4 months (2026)' },
    {
      label: 'Methods',
      value: 'Usability testing, data analysis, prototyping and interaction design, heuristic evaluation, user journey mapping',
    },
  ],
  challenge: 'Evaluating and redesigning a contextual translation-error reporting flow through usability testing.',
  note: 'Due to NDA restrictions, proprietary product details and high-fidelity designs have been removed or simplified as low-fidelity representations.',
  sections: [
    {
      heading: 'Project overview',
      paragraphs: [
        'The project revisited the translation-error reporting feature left by the previous PX team.',
      ],
      steps: [
        {
          heading: '1. Usability testing',
          body: 'Conducted Zoom and Fathom user interviews about the first version of the Report Translation Error feature.',
        },
        {
          heading: '2. Reapproach the problem',
          body: 'Task completion was around 40% with low satisfaction, so the problem was redefined using a user journey map and pain points.',
        },
        {
          heading: '3. Prototyping and redesigning',
          body: 'Redesigned the interface and interaction flow in Figma.',
        },
        {
          heading: '4. Implementation and validation',
          body: 'Documented the design, conducted a heuristic evaluation, and defined success metrics for the next usability test.',
        },
      ],
    },
    {
      heading: 'Usability testing',
      paragraphs: [
        'A usability test with six participants captured qualitative feedback and quantitative time-on-task data in an Excel sheet. Participants navigated the content and attempted five common tasks; observations were mapped to specific Figma prototype flows.',
        'Six of 23 associated issues revealed two connected problems: users had difficulty discovering the reporting controls, and the relationship between the reporting action and the specific content was not always clear.',
      ],
      table: {
        caption: 'Task results shown in the source presentation',
        headers: ['Task', 'Success rate', 'Difficulty', 'Satisfaction', 'Average time'],
        rows: [
          ['1', '40%', '4.2', '3.2', '53 s'],
          ['2', '60%', '3.0', '3.2', '1:44'],
          ['3', '100%', '4.2', '4.0', '1:01'],
          ['4', '80%', '4.0', '4.0', '1:38'],
          ['5', '60%', '3.8', '3.4', '52 s'],
        ],
      },
      quote: '“I’m confused… I don’t know what content I’m reporting to.”',
      quoteCaption: 'Participant quote from the source presentation',
    },
    {
      heading: 'Reapproaching the problem',
      paragraphs: [
        'Two personas were created. The team evaluated the priority of reporting across different feature-use scenarios.',
      ],
      table: {
        headers: ['Activity', 'Need to report'],
        rows: [
          ['Search and browsing content', 'Low'],
          ['Managing playlist', 'Low'],
          ['Listening to original content', 'None'],
          ['Reading translated lyrics', 'High'],
          ['Listening to dubbing audio', 'High'],
        ],
      },
      figures: [
        {
          src: '/projects/ux-intern/user-journey-map.png',
          alt: 'User journey map from consuming translated content through identifying and reporting a translation error.',
          caption: 'User journey map and reporting flow. Fine-print labels remain in the source visual rather than being transcribed.',
        },
      ],
    },
    {
      heading: 'Comparing design options',
      options: [
        {
          heading: 'A. Right-side navigation',
          pros: ['Explicit', 'Easy to find', 'Consistent with other tools'],
          cons: [
            'Competes with higher-frequency music actions.',
            'Users may not understand why the report action belongs with general navigation or which feature should be reported.',
          ],
        },
        {
          heading: 'B. Inside lyrics',
          pros: [
            'Highly contextual.',
            'Appears when the problem is encountered.',
            'Makes it easier to understand what is being reported.',
          ],
          cons: [
            'Audio playback may also need access to reporting.',
            'Could be overlooked when users are not viewing lyrics.',
          ],
        },
        {
          heading: 'C. Within another global icon',
          pros: ['Consistent with other global actions', 'Accessible across contexts'],
          cons: [
            'May be hard to locate.',
            'Translation errors could be mixed with general content reporting.',
          ],
        },
      ],
      bullets: [
        'Frequent-use actions and navigation should remain visible and easy to access; infrequent actions should appear when relevant without occupying persistent navigation space.',
        'Placing the report action next to its context, such as lyrics or audio, makes the relationship between the problem and the action more obvious.',
      ],
    },
    {
      heading: 'Existing report experience',
      paragraphs: [
        'The previous report button was in a collapsed right-side panel alongside navigation controls. Users did not have a direct contextual link to the content and could be confused by what “this” referred to. Some participants also wanted a quick report without providing additional details.',
      ],
      figures: [
        {
          src: '/projects/ux-intern/report-interface.png',
          alt: 'Previous report interface showing a report entry point and a three-step report flow.',
          caption: 'Previous report interface and entry point.',
        },
        {
          src: '/projects/ux-intern/previous-report-dialog.png',
          alt: 'Previous report dialog with reason checkboxes, an additional-details field, and a report button.',
          caption: 'Previous report dialog.',
        },
      ],
    },
    {
      heading: 'Final redesign',
      paragraphs: [
        'The redesign places reporting closer to the relevant content and guides users through a review, report, and submission-feedback flow.',
      ],
      bullets: [
        'Repositioned the reporting action closer to the relevant content.',
        'Added a review/confirmation step before submission to reduce misclicks and support report quality.',
        'Made additional details optional.',
        'Added submission feedback to make the system state explicit.',
        'Used progressive disclosure to guide users through the report without overwhelming them.',
      ],
      figures: [
        {
          src: '/projects/ux-intern/redesign-content-placement.png',
          alt: 'Low-fidelity redesign placing the report translation-error action near the relevant content.',
          caption: 'The reporting action is repositioned near the relevant content.',
        },
        {
          src: '/projects/ux-intern/redesign-report-flow.png',
          alt: 'Three low-fidelity screens for reviewing the translation, submitting a report, and receiving submission feedback.',
          caption: 'Review, report, and submission-feedback steps.',
        },
      ],
    },
    {
      heading: 'Validation and reflection',
      cards: [
        {
          heading: 'Discoverability',
          body: 'Can users find the report button without assistance?',
          bullets: ['Expect higher task-completion rate', 'Expect lower drop-off rate'],
        },
        {
          heading: 'Accuracy',
          body: 'Can users report what they want to report?',
          bullets: ['Expect lower navigation error (misclick time)', 'Expect higher report quality'],
        },
        {
          heading: 'Efficiency',
          body: 'Can users complete the flow smoothly?',
          bullets: ['Expect faster task-completion time'],
        },
        {
          heading: 'Satisfaction',
          body: 'How do users feel about the feature overall?',
          bullets: ['Expect higher satisfaction than in the previous usability test'],
        },
      ],
      paragraphs: [
        'A usability issue is not simply a bad UI design. Initially, I thought “Users can’t find report” was just a button-placement problem. But after testing and evaluation, other deeper issues involving discoverability and context seem to show up. I think research synthesis is so important in a design process to make some good improvement happen.',
      ],
      quote: '“You’ve been an incredible addition to our team with both a big picture view of your tasks and projects, as well as an eye for detail and aesthetic polish! Your ownership and engagement were incredible as well.”',
      quoteCaption: 'Comment from supervisor in the source presentation',
    },
  ],
};

const sqlTableauProject = {
  id: 'sql-tableau-project',
  title: 'Healthcare & Pharmaceutical Analytics',
  category: 'SQL + Tableau project',
  metadata: [
    { label: 'Role', value: 'Data analysis, research' },
    { label: 'Tools', value: 'PostgreSQL, DBeaver, Tableau' },
    { label: 'Dataset period', value: '2010–2026' },
  ],
  overview: 'Analyzed a Global Healthcare & Pharma dataset to explore clinical development, R&D investment, biotech funding, and therapeutic landscapes using SQL and Tableau.',
  sections: [
    {
      heading: 'Research questions',
      bullets: [
        'How has clinical trial activity and success changed over time?',
        'How does pharmaceutical R&D investment relate to company performance?',
        'How do biotech funding patterns relate to clinical development outcomes?',
        'How do clinical trials, drug approvals, and disease burden differ across therapeutic areas and geographical regions?',
      ],
    },
    {
      heading: 'Workflow and data validation',
      paragraphs: [
        'The workflow moved from five healthcare datasets into PostgreSQL, through data validation and SQL analysis, and into Tableau views.',
        'Data validation included checking whether clinical-trial sponsors could be matched to pharmaceutical financial records by company name and year rather than assuming records aligned. Company acronyms and joint company names were potential sources of mismatch.',
      ],
      figures: [
        {
          src: '/projects/sql-tableau/workflow.png',
          alt: 'Workflow diagram showing five healthcare datasets, a PostgreSQL database, validation, SQL analysis, and Tableau dashboards.',
          caption: 'Data, database, validation, analysis, and visualization workflow.',
        },
      ],
    },
    {
      heading: 'Dashboard 1 — Healthcare and pharmaceutical development trends',
      paragraphs: [
        'This dashboard provides an overview of clinical-trial activity, trial success rates, drug approvals, pharmaceutical R&D investment, company performance, and biotech funding trends.',
      ],
      figures: [
        {
          src: '/projects/sql-tableau/dashboard-1.png',
          alt: 'Dashboard with clinical-trial and drug-approval counts, R&D spending versus company performance, trial activity over time, and biotech funding trends.',
          caption: 'Dashboard 1: Healthcare and Pharmaceutical Development Trends.',
        },
      ],
    },
    {
      heading: 'Dashboard 2 — Healthcare needs and therapeutic landscape',
      paragraphs: [
        'This dashboard examines disease burden, therapeutic areas, clinical sponsors, and pharmaceutical drug portfolios to explore how healthcare needs and therapeutic development vary across regions and companies.',
      ],
      bullets: [
        'The source presentation identifies the African region as having the highest disease burden and cardiovascular disease as the most common disease.',
        'It reports that most drug companies approve drugs in oncology and that oncology drug sales are the highest.',
      ],
      figures: [
        {
          src: '/projects/sql-tableau/dashboard-2.png',
          alt: 'Dashboard showing a regional disease-burden map, common diseases, company drug portfolios, and drug-type sales.',
          caption: 'Dashboard 2: Healthcare Needs and Therapeutic Landscape.',
        },
      ],
    },
    {
      heading: 'Dashboard 3 — Investment, R&D, and clinical outcomes',
      paragraphs: [
        'This dashboard explores relationships between pharmaceutical investment and clinical development, including R&D spending, biotech funding, trial activity, and trial success.',
      ],
      bullets: [
        'The source presentation reports that R&D intensity and biotech deal value were not associated with trial success rate.',
        'The source presentation says most companies had high deal activity, but R&D spending varied a lot.',
        'The presentation flags 2026 as having less observational data and potentially being an outlier.',
      ],
      figures: [
        {
          src: '/projects/sql-tableau/dashboard-3.png',
          alt: 'Charts comparing biotech funding, R&D spending, clinical-trial activity, and trial success rates over time.',
          caption: 'Dashboard 3: Investment, R&D, and Clinical Outcomes.',
        },
      ],
    },
    {
      heading: 'Dataset limitation',
      paragraphs: [
        'This project uses a Kaggle healthcare and pharmaceutical dataset for analytical practice. The dataset contains inconsistent historical coverage across tables and may include constructed or simulated records. Results are therefore intended to demonstrate data-analysis and visualization workflows rather than represent authoritative estimates of the global pharmaceutical industry.',
      ],
    },
  ],
};

const researchProject = {
  id: 'research-project-1',
  title: 'Social Cue Recognition and Decision Making in AI Model',
  category: 'Research project',
  metadata: [
    { label: 'Role', value: 'Researcher: AI model performance testing, data collection, and analysis' },
    { label: 'Tools', value: 'Python, R, ChatGPT' },
    { label: 'Duration', value: '6 months (2025)' },
  ],
  sections: [
    {
      heading: 'Research overview',
      paragraphs: [
        'This project evaluated GPT-4o’s inference of abstract goals and concrete actions across familiar and unfamiliar social situations, and compared its performance with human benchmark groups.',
      ],
    },
    {
      heading: 'Background',
      paragraphs: [
        'Modern AI systems are strong at object and action recognition, often reaching or surpassing human-level performance on experimental tasks. They can also match humans on simple social-judgment tests, but it remains unclear how they perform on complex, ambiguous, or unfamiliar social situations that require deeper reasoning.',
        'This project tests GPT-4o’s ability to interpret nuanced everyday human social interactions and evaluates whether current AI models demonstrate meaningful real-world social understanding and decision-making capabilities.',
      ],
    },
    {
      heading: 'Research question',
      paragraphs: [
        'To what extent can the GPT-4o model infer human goals (abstract features) and actions (concrete features) across familiar and unfamiliar social scenarios?',
      ],
      subheading: 'Sub-questions',
      bullets: [
        'Does abstraction (goal inference) pose a greater challenge to AI than action recognition?',
        'Does unfamiliar social context impair AI performance?',
        'How does GPT-4o compare to healthy human controls and individuals with schizophrenia on a standardized social cognition task?',
      ],
    },
    {
      heading: 'Methodology',
      paragraphs: [
        'GPT-4o was prompted with nine scenarios, 14 actions, and 14 goals; responses were saved in JSON format. Ten independent trials were run to capture variability.',
        'Outputs were scored against the original SFRT target lists. Hit rates and false-positive rates were averaged across familiar versus unfamiliar contexts and action versus goal features. Model output was compared with healthy human controls and the schizophrenia-patient group reported in Gómez-Gastiasoro et al. (2018).',
      ],
      figures: [
        {
          src: '/projects/research/scoring-tables.png',
          alt: 'Source tables comparing average GPT-4o hit and false-positive rates across conditions and with human benchmark groups.',
          caption: 'Scoring and benchmark tables from the source presentation. Prompt fine print is retained only in the source visual.',
        },
      ],
    },
    {
      heading: 'My contributions',
      paragraphs: [
        'AI model performance testing, data collection, and analysis.',
      ],
    },
    {
      heading: 'Findings',
      table: {
        caption: 'GPT-4o rates averaged across 10 trials, as shown in the source presentation',
        headers: ['Condition', 'Average hit rate', 'Average false-positive rate'],
        rows: [
          ['Concrete — familiar', '0.96336 (SD 0.01054)', '0.07000 (SD 0.03426)'],
          ['Concrete — unfamiliar', '0.95833', '0.00313 (SD 0.00988)'],
          ['Abstract — familiar', '0.86667', '0.07692'],
          ['Abstract — unfamiliar', '0.95833', '0.00000'],
        ],
      },
      paragraphs: [
        'The source presentation reports that GPT-4o outperformed both comparison groups on accuracy and precision, with near-ceiling hit rates in three of four conditions and low false-positive rates across all four. Abstract-familiar items were the most challenging condition.',
      ],
      comparisonTable: {
        caption: 'Overall benchmark scores reported in the source presentation',
        headers: ['Measure', 'GPT model', 'Human control', 'Schizophrenia group'],
        rows: [
          ['Total actions hit', '51.9/54 = 0.9611', '39.67/54 = 0.7346', '37.02/54 = 0.6856'],
          ['Total goals hit', '49/54 = 0.9074', '39.56/54 = 0.7326', '36.64/54 = 0.6785'],
          ['Total actions FP', '2.9/72 = 0.0403', '4.54/72 = 0.0631', '9.68/72 = 0.1344'],
          ['Total goals FP', '3/71 = 0.0423', '4.29/71 = 0.0604', '10.08/71 = 0.1420'],
        ],
      },
      figures: [
        {
          src: '/projects/research/results-charts.png',
          alt: 'Two charts comparing GPT-4o hit and false-positive rates across conditions and with human groups.',
          caption: 'Visualization of condition-level rates and group comparisons.',
        },
      ],
    },
    {
      heading: 'Takeaways',
      bullets: [
        'GPT-4o was strong at identifying actions but weaker at inferring underlying goals in terms of mirroring human cognitive patterns.',
        'Unfamiliar scenarios did not reduce performance, suggesting context generalization is a relative strength.',
        'Structured tasks may benefit AI: the SFRT’s fixed “correct” target lists may advantage LLMs, making them appear more socially competent than they would in open-ended settings.',
        'The task excludes emotional reasoning, an essential component of real-world social understanding.',
      ],
    },
    {
      heading: 'Next steps shown in the source presentation',
      bullets: [
        'Incorporate emotion-recognition tasks to evaluate a broader range of social-intelligence abilities.',
        'Explore datasets with contextual emotion cues in text and images using multimodal architectures.',
        'Explore open-ended scenarios for subjective or contextually varied responses.',
        'Fine-tune GPT-4o on emotional-state labeling datasets to improve affective reasoning.',
      ],
    },
  ],
};

export const projectsById = {
  [uxProject.id]: uxProject,
  [sqlTableauProject.id]: sqlTableauProject,
  [researchProject.id]: researchProject,
};
