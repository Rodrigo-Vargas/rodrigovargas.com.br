import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
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
  github?: string;
  linkedin: string;
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
            <div className="flex mb-5">
              <FontAwesomeIcon
                className="text-blue-500 h-4 w-4"
                icon={faEnvelope}
              />
              <span className="meta">{data.email}</span>
            </div>

            <div className="flex mb-5">
              <FontAwesomeIcon
                className="text-blue-500 h-4 w-4"
                icon={faGlobe}
              />
              <span className="meta">{data.website}</span>
            </div>
          </div>

          <div>
            <div className="flex mb-5">
              <FontAwesomeIcon
                className="text-blue-500 h-4 w-4"
                icon={faPhone}
              />
              <span className="meta">{data.phone}</span>
            </div>

            <div className="flex mb-5">
              <FontAwesomeIcon
                className="text-blue-500 h-4 w-4"
                icon={faLinkedin}
              />
              <span className="meta">{data.linkedin}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-row">
        <div className="w-9/12 pr-5">
          <Experience data={data} />
        </div>

        <div className="w-3/12">
          <Skill data={data} />

          <Projects data={data} />

          <Education data={data} />

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
