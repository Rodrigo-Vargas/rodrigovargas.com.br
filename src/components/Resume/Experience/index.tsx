const Experience = ({data}) => (
  <div>
    <h2 className="section-title">Relevant Experience</h2>

    {
      data.experiences.map((item, key) => (
        <div className="mb-5" key={key}>
          <div>
            <span className="text-gray-600">{item.title}</span>
            <span className="text-gray-600 font-bold pr-5">@ {item.company}</span>
            <span className="text-gray-400 text-sm">({item.period})</span>
          </div>
          <div>
          </div>
          <ul className="text-gray-500 mt-0 ml-2 pl-0">
            {
              item.highlights.map((highlight, index) => (
                <li className="text-xs list-disc ml-2 pl-0 leading-5" key={index}>{highlight}</li>
              ))
            }
          </ul>
        </div>
      ))
    }
  </div>
)

export default Experience;
