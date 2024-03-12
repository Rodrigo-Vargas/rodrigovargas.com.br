import ResumeTemplate, { ResumeInfoType } from "src/templates/Resume";

const data: ResumeInfoType = {
  name: 'Rodrigo Vargas',
  title: 'Fullstack Software Engineer',
  email: 'rodrigovargas123@gmail.com',
  phone: '+5551997838846',
  website: 'rodrigovargas.com.br',
  linkedin: '/in/rvar90/',
  experiences: [
    {
      title: 'Principal Software Engineer',
      company: 'Dell',
      period: '2022 - Present',
      location: 'Porto Alegre, Brazil',
      highlights: [
        "Spearheaded an initiative to enhance the maturity of all applications under my director's team by 40% in a one-year period.",
        "Responsible for managing the backlog and roadmap of two major applications in the product line.",
        "Led the development efforts for the same two applications, offering support to the team, and overseeing code reviews and deployments.",
        "Architected a solution that successfully reduced the time of a customer critical process by 80%, eliminating the need for manual intervention.",
        "Partnered with the customer team to identify manual intervention points in the business process and designed a streamlined solution to enhance efficiency."
      ]
    },
    {
      title: 'Senior Software Enginner',
      company: 'Dell',
      period: '2021 - 2022',
      location: 'Porto Alegre, Brazil',
      highlights: [
        "Accountable for devising and executing the launch orchestration plan for all application releases.",
        "Successfully reduced the vulnerability score of the application by approximately 20%, identifying vulnerabilities across the application infrastructure.",
        "Efficiently onboarded and assumed various responsibilities within the team, achieving team lead development in just six months."
      ]
    },
    {
      title: 'Senior Developer',
      company: 'Conectt',
      period: '2013 - 2021',
      location: 'Porto Alegre, Brazil',
      highlights: [
        'Recognized as the Employee of the Year by the Board of Directors in 2015.',
        'Achieved a 60% reduction in the loading time of the UnimedPOA website, a major healthcare provider in Brazil, improving customer experience.',
        'Advocated for good practices among local team members.',
        'Successfully resolved a former customer bad experience through effective crisis management, fostering interpersonal relationships with key stakeholders/customers, and conducting problem-solving analyses.',
        'Conducted technical interviews for new candidates and pepe is very bonitinha.',
        "Contributed to the company's frontend methodology code guide.",
        'Progressed from a junior developer to a lead developer within three years.'
      ],
    },
    {
      title: 'Developer',
      company: 'Imediata',
      period: '2012 - 2013',
      location: 'Cachoeira do Sul, Brazil',
      highlights: [
        'Promoted to a full-time position following an 8-month internship.',
        'Contributed to the development and testing of a driver enabling MySQL database access from the Cobol File System API.',
        'Earned the trust of the team, allowing for the provision of outsourcing services to customers after just three months of the internship.'
      ],
    },
  ],
  projects: [
    {
      title: 'Titanium Imoveis',
      description: 'Executed the whole migration of .NET Webforms website of real state agency to a modern solution built with RestAPI on top of .NET Core and React.js. Refactored many screens of system to improve the usability, reliability and performance'
    },
    {
      title: 'Favorita Veiculos',
      description: 'Website made with Laravel for a small car dealership. Website + full fledge admin system to manage cars information',
    },
  ],
  skills: [
    {
      title: 'Programming Languages',
      description: 'C#, JavaScript, Typescript, PHP, Ruby, CSS, Sass'
    },
    {
      title: 'Libraries & Frameworks',
      description: '.NET Core, React, Angular, Next.js, SharePoint, Ruby on Rails, Tailwind'
    },
    {
      title: 'Database',
      description: 'MongoDB, SQL Server, MySQL'
    },
    {
      title: 'Tools & Platforms',
      description: 'Git, RabbitMQ, PCF, Heroku, Kafka, GraphQL'
    },
  ],
  education: [
    {
      title: 'Universidade de Santa Cruz do Sul',
      description: 'Bachelor of Computer Engineering'
    }
  ],
  interests: 'Cycling, gaming, reading, investing'
};

export default function Resume() {
  return <ResumeTemplate data={data} />;
}
