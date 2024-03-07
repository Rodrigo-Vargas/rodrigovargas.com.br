import ResumeTemplate, { ResumeInfoType } from "src/templates/Resume";

const data: ResumeInfoType = {
  name: 'Rodrigo Vargas',
  title: 'Fullstack Software Engineer',
  email: 'rodrigovargas123@gmail.com',
  phone: '+5551997838846',
  website: 'rodrigovargas.com.br',
  github: 'rodrigo-vargas',
  experiences: [
    {
      title: 'Principal Software Engineer',
      company: 'Dell',
      period: '2022 - Present',
      location: 'Porto Alegre, Brazil',
      highlights: [
        "Led an initiative to improve the maturity of all applications under director's experience",
        'Responsible for manage the backlog and roadmap of two major applications of product line',
        'Lead developer of the same two applications, providing support to the team and reviewing code reviews and deployments'
      ]
    },
    {
      title: 'Senior Software Enginner',
      company: 'Dell',
      period: '2021 - 2022',
      location: 'Porto Alegre, Brazil',
      highlights: [
        'Accountable for the launch orchestration plan build of all application releases',
        'Reduce the vulnerability score of the application about 20% looking for vulnerabilities accross the application infrastructure',
        'Manage to ramp up abord the team in a short period of time, taking many responsabilities to finally lead the team in about 6 months',
      ]
    },
    {
      title: 'Senior Developer',
      company: 'Conectt',
      period: '2013 - present',
      location: 'Porto Alegre, Brazil',
      highlights: [
        'Award employee of the year from the directors board in 2015',
        'Reduced the loading time of the UnimedPOA project by 60% through frontend optimization techniques',
        'Promoter of good practices across local team members',
        'Rescue of old contract through good crisis management, interpersonal relationship with the key person and problem solving analysis',
        'Responsible for technical interview of new candidates',
        'Contributed to the front-end methodology code guide of the company',
        'Junior developer to lead developer in about 3 years',
      ],
    },
    {
      title: 'Developer',
      company: 'Imediata',
      period: '2012 - 2013',
      location: 'Cachoeira do Sul, Brazil',
      highlights: [
        'Achieved a full-time position after 8-month internship',
        'Contributed to develop a driver that enable MySQL database access from Cobol File System API',
        'Achieved the trust of the team to provide outsourcing service to clients just after 3 months of internship',
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
      description: 'C#, JavaScript (ES6), PHP, Ruby, CSS, Sass'
    },
    {
      title: 'Libraries & Frameworks',
      description: '.NET Core, React, Angular, Node.js, Next.js'
    },
    {
      title: 'Database Management Systems',
      description: 'MongoDB, SQL Server, MySQL'
    },
    {
      title: 'Tools & Platforms',
      description: 'Git, RabbitMQ, Webpack, PCF, Heroku'
    },
    {
      title: 'UI/UX Design',
      description: 'Adobe XD'
    }
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
