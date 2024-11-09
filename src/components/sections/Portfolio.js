import projects from '../../data/portfolioData';

function Portfolio() {
  
    return (
      <section className="portfolio">
        <h2>Selected Work</h2>
        <div className="portfolio-grid">
          {projects.map((project, index) => (
            <div key={index} className="portfolio-item">
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <button>View Project</button>
            </div>
          ))}
        </div>
      </section>
    );
  }
  
  export default Portfolio;  