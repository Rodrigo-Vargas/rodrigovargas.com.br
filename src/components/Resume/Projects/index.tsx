const Projects = ({data}) => (
  <div>
    <h2 className="section-title">Projects</h2>
    {
      data.projects.map((project, index) => (
        <div key={index}>
          <h3 className="subsection-title">{project.title}</h3>
          <p className="subsection-description">{project.description}</p>
        </div>
      ))
    }
  </div>
)

export default Projects;
