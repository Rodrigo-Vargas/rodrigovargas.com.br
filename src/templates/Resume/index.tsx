import { faGithub } from "@fortawesome/free-brands-svg-icons";
import {
  faEnvelope,
  faGlobe,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Education from "src/components/Resume/Education";
import Experience from "src/components/Resume/Experience";
import Projects from "src/components/Resume/Projects";
import Skill from "src/components/Resume/Skill";

type ExperienceType = {
  company: string;
  highlights: string[];
  location: string;
  period: string;
  title: string;
};

type ProjectType = {
  description: string;
  title: string;
};

export type ResumeInfoType = {
  name: string;
  title: string;
  email: string;
  phone: string;
  website: string;
  github: string;
  experiences: ExperienceType[];
  projects: ProjectType[];
  skills: ProjectType[];
  education: ProjectType[];
  interests: string;
};

export type ResumeTemplateProps = {
  data: ResumeInfoType;
};

const ResumeTemplate = ({ data }: ResumeTemplateProps) => {
  return (
    <div>
      <div className="flex items-center">
        <div className="w-5/12">
          <h1 className="title">{data.name}</h1>
          <h2 className="subtitle">{data.title}</h2>
        </div>

        <div className="flex flex-row w-7/12 justify-end">
          <div>
            <div>
              <FontAwesomeIcon
                className="text-blue-500 text-sm"
                icon={faEnvelope}
              />
              <span className="meta">{data.email}</span>
            </div>

            <div>
              <FontAwesomeIcon
                className="text-blue-500 text-sm"
                icon={faGlobe}
              />
              <span className="meta">{data.website}</span>
            </div>
          </div>

          <div>
            <div>
              <FontAwesomeIcon
                className="text-blue-500 text-sm"
                icon={faPhone}
              />
              <span className="meta">{data.phone}</span>
            </div>

            <div>
              <FontAwesomeIcon
                className="text-blue-500 text-sm"
                icon={faGithub}
              />
              <span className="meta">{data.github}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-row">
        <div className="w-2/3 pr-5">
          <Experience data={data} />
        </div>

        <div className="w-1/3">
          <Skill data={data} />

          <Education data={data} />

          <Projects data={data} />

          <div>
            <h2 className="section-title">Interests</h2>
            <p className="subsection-description">{data.interests}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeTemplate;
