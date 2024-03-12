const Skill = ({data}) => (
  <div>
    <h3 className="section-title">Skills</h3>
    {
      data.skills.map((skill, index) => (
        <div className="mb-3" key={index}>
          <h3 className="subsection-title">{skill.title}</h3>
          <p className="subsection-description">{skill.description}</p>
        </div>
      ))
    }
  </div>
)

export default Skill;
