const categories = [
  'All',
  'Web Design',
  'Fintech',
  'E-commerce',
  'Healthcare',
  'Creative',
  'Professional Services',
];

function ProjectFilters({ activeCategory, onCategoryChange }) {
  return (
    <div className="project-filters">
      {categories.map((category) => (
        <button
          type="button"
          key={category}
          className={
            activeCategory === category
              ? 'project-filter active'
              : 'project-filter'
          }
          onClick={() => onCategoryChange(category)}
        >
          {category}
        </button>
      ))}
    </div>
  );
}

export default ProjectFilters;