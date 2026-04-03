const portfolioData = {
  name: 'Krishna Awasthi',
  title: 'Full Stack Developer',
  about:
    'I build clean and scalable web applications using modern frontend and backend technologies.',
  location: 'India',
  email: 'krishna@example.com',
  phone: '+91 90000 00000',
  projects: [
    {
      name: 'Portfolio CMS',
      stack: 'React, Node.js, MongoDB',
      description: 'Editable portfolio site with admin panel and API integration.'
    },
    {
      name: 'Task Planner',
      stack: 'React, Express, PostgreSQL',
      description: 'A collaborative task manager with role-based access control.'
    }
  ],
  achievements: [
    'Built and deployed multiple full-stack projects.',
    'Improved application performance and accessibility in client projects.',
    'Mentored junior developers on React best practices.'
  ]
};

export default function App() {
  return (
    <main className="container">
      <section className="card">
        <h1>{portfolioData.name}</h1>
        <p className="subtitle">{portfolioData.title}</p>
        <p>{portfolioData.about}</p>
        <p>
          <strong>Location:</strong> {portfolioData.location}
        </p>
        <p>
          <strong>Email:</strong> <a href={`mailto:${portfolioData.email}`}>{portfolioData.email}</a>
        </p>
        <p>
          <strong>Phone:</strong> {portfolioData.phone}
        </p>
      </section>

      <section className="card">
        <h2>Projects</h2>
        {portfolioData.projects.map((project) => (
          <article key={project.name} className="item-card">
            <h3>{project.name}</h3>
            <p>
              <strong>Stack:</strong> {project.stack}
            </p>
            <p>{project.description}</p>
          </article>
        ))}
      </section>

      <section className="card">
        <h2>Achievements</h2>
        <ul>
          {portfolioData.achievements.map((achievement) => (
            <li key={achievement}>{achievement}</li>
          ))}
        </ul>
      </section>
    </main>
  );
}
