import { workExperience } from '../data/workExperience';

export default function WorkExperienceTimeline() {
  return (
    <div className="document-window experience-timeline" aria-label="Work experience timeline">
      <ol>
        {workExperience.map((experience) => (
          <li
            className={`experience-entry ${experience.current ? 'experience-entry--current' : 'experience-entry--past'}`}
            key={experience.organization}
          >
            <article>
              <div className="experience-heading">
                <h2>{experience.organization}</h2>
                <time>{experience.dates}</time>
              </div>
              <p className="experience-role">{experience.role}</p>
              {experience.location && <p className="experience-location">{experience.location}</p>}
              {experience.principalInvestigator && (
                <p className="experience-pi">Principal Investigator: {experience.principalInvestigator}</p>
              )}
            </article>
          </li>
        ))}
      </ol>
    </div>
  );
}
