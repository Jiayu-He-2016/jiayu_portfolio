function CaseStudyTable({ table }) {
  return (
    <div className="case-study-table-wrap">
      <table className="case-study-table">
        {table.caption && <caption>{table.caption}</caption>}
        <thead>
          <tr>{table.headers.map((header) => <th key={header}>{header}</th>)}</tr>
        </thead>
        <tbody>
          {table.rows.map((row) => (
            <tr key={row[0]}>
              {row.map((cell, index) => (
                index === 0
                  ? <th scope="row" key={cell}>{cell}</th>
                  : <td key={`${row[0]}-${index}`}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function CaseStudyFigures({ figures }) {
  return (
    <div className="case-study-figures">
      {figures.map((figure) => (
        <figure className="case-study-figure" key={figure.src}>
          <img src={figure.src} alt={figure.alt} loading="lazy" />
          {figure.caption && <figcaption>{figure.caption}</figcaption>}
        </figure>
      ))}
    </div>
  );
}

function CaseStudySection({ section }) {
  return (
    <section className="case-study-section">
      <h3>{section.heading}</h3>
      {section.paragraphs?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
      {section.subheading && <h4>{section.subheading}</h4>}
      {section.steps && (
        <div className="case-study-steps">
          {section.steps.map((step) => (
            <article className="case-study-step" key={step.heading}>
              <h4>{step.heading}</h4>
              <p>{step.body}</p>
            </article>
          ))}
        </div>
      )}
      {section.bullets && (
        <ul className="case-study-list">
          {section.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}
        </ul>
      )}
      {section.table && <CaseStudyTable table={section.table} />}
      {section.comparisonTable && <CaseStudyTable table={section.comparisonTable} />}
      {section.options && (
        <div className="case-study-options">
          {section.options.map((option) => (
            <article className="case-study-option" key={option.heading}>
              <h4>{option.heading}</h4>
              <div>
                <strong>Pros</strong>
                <ul>{option.pros.map((pro) => <li key={pro}>{pro}</li>)}</ul>
              </div>
              <div>
                <strong>Cons</strong>
                <ul>{option.cons.map((con) => <li key={con}>{con}</li>)}</ul>
              </div>
            </article>
          ))}
        </div>
      )}
      {section.cards && (
        <div className="case-study-cards">
          {section.cards.map((card) => (
            <article className="case-study-card" key={card.heading}>
              <h4>{card.heading}</h4>
              <p>{card.body}</p>
              <ul>{card.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul>
            </article>
          ))}
        </div>
      )}
      {section.quote && (
        <blockquote className="case-study-quote">
          <p>{section.quote}</p>
          {section.quoteCaption && <cite>{section.quoteCaption}</cite>}
        </blockquote>
      )}
      {section.figures && <CaseStudyFigures figures={section.figures} />}
    </section>
  );
}

export default function CaseStudyView({ project }) {
  return (
    <article className="case-study-view">
      <header className="case-study-header">
        <div>
          <p className="case-study-category">{project.category}</p>
          <h2>{project.title}</h2>
        </div>
        {project.metadata && (
          <dl className="case-study-metadata">
            {project.metadata.map((item) => (
              <div key={item.label}>
                <dt>{item.label}</dt>
                <dd>{item.value}</dd>
              </div>
            ))}
          </dl>
        )}
        {project.overview && <p className="case-study-overview">{project.overview}</p>}
        {project.challenge && (
          <p className="case-study-callout"><strong>Challenge:</strong> {project.challenge}</p>
        )}
        {project.note && <p className="case-study-source-note">{project.note}</p>}
      </header>
      <div className="case-study-sections">
        {project.sections.map((section) => (
          <CaseStudySection key={section.heading} section={section} />
        ))}
      </div>
    </article>
  );
}
