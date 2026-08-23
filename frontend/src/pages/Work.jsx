import { useMemo, useState } from 'react';
import Container from 'react-bootstrap/Container';

import WorkHero from '../components/work/WorkHero';
import ProjectFilters from '../components/work/ProjectFilters';
import ProjectCard from '../components/work/ProjectCard';

import projects from '../data/projects';

function Work() {
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredProjects = useMemo(() => {
    if (activeCategory === 'All') {
      return projects;
    }

    return projects.filter(
      (project) => project.category === activeCategory
    );
  }, [activeCategory]);

  return (
    <main>
      <WorkHero />

      <section className="work-projects-section">
        <Container>
          <ProjectFilters
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
          />

          <div className="work-project-grid">
            {filteredProjects.map((project) => (
              <ProjectCard
                project={project}
                key={project.slug}
              />
            ))}
          </div>
        </Container>
      </section>
    </main>
  );
}

export default Work;