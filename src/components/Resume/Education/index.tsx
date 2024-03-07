const Education = ({data}) => (
  <div>
    <h2 className="section-title">Education</h2>
    {
      data.education.map((educationItem, index) => (
        <div key={index}>
          <h3 className="subsection-title">{educationItem.title}</h3>
          <p className="subsection-description">{educationItem.description}</p>
        </div>
      ))
    }
  </div>
)

export default Education;
