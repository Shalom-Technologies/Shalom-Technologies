import { Link } from 'react-router';

function ProjectCard({ project }) {
  return (
    <article className="work-project-card">
      <Link
        to={`/work/${project.slug}`}
        className="work-project-link"
      >
        <div
          className={`work-project-image ${project.colorClass}`}
        >
          <div className="work-project-number">
            {project.year}
          </div>

          <div className="work-project-graphic">
            <span>{project.title.charAt(0)}</span>
          </div>

          <div className="work-project-view">
            View case study <span>↗</span>
          </div>
        </div>

        <div className="work-project-info">
          <div>
            <h2>{project.title}</h2>

            <p>{project.description}</p>
          </div>

          <div className="work-project-category">
            {project.category}
            <span>·</span>
            {project.type}
          </div>
        </div>
      </Link>
    </article>
  );
}

export default ProjectCard;