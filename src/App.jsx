const portfolioData = {
  name: 'Krishna Awasthi',
  role: 'Backend & IoT Engineer',
  tagline: 'Building real-time data systems with measurable performance gains.',
  location: 'India',
  email: 'krishna.awasthi.dev@gmail.com',
  links: {
    github: 'https://github.com/krishna-awasthi',
    linkedin: 'https://www.linkedin.com/in/krishna-awasthi/',
    cv: '#'
  },
  heroProofs: [
    'Reduced API latency through async FastAPI optimization and smarter caching.',
    'Built MQTT pipelines handling 5,000+ IoT events per day with high delivery reliability.',
    'Designed production-ready MongoDB/MySQL schemas for real-time ingestion workloads.'
  ],
  projects: [
    {
      name: 'Smart Agriculture Management System',
      subtitle: 'FastAPI + MQTT + MongoDB',
      impact: [
        'Processed 5,000+ daily sensor events from distributed farm devices.',
        'Delivered near real-time alerts and actuator control through MQTT topics.',
        'Improved response latency using async endpoints and tuned database access.'
      ],
      summary:
        'Designed and shipped an IoT monitoring and control platform for irrigation and environmental tracking with resilient message ingestion.',
      stack: ['Python', 'FastAPI', 'MQTT', 'MongoDB', 'Docker'],
      cta: 'View case study'
    },
    {
      name: 'LeetCode Analytics Dashboard',
      subtitle: 'Full-stack analytics experience',
      impact: [
        'Built insight views for topic-wise strengths and weak areas.',
        'Implemented responsive dashboard cards for quick recruiter/interviewer scans.',
        'Added SEO and loading optimizations to improve discoverability and speed.'
      ],
      summary:
        'Created a dashboard that transforms coding history into actionable preparation insights and shareable progress snapshots.',
      stack: ['React', 'Node.js', 'Charting', 'REST APIs'],
      cta: 'View dashboard'
    },
    {
      name: 'URL Shortener Service',
      subtitle: 'Backend microservice focus',
      impact: [
        'Built collision-safe slug generation and redirect handling workflows.',
        'Introduced schema/index improvements for faster lookup under concurrency.',
        'Documented API contracts for easier testing and integration.'
      ],
      summary:
        'Implemented a clean URL shortener API emphasizing reliability, observability, and predictable performance under concurrent traffic.',
      stack: ['FastAPI', 'Redis', 'MySQL', 'OpenAPI'],
      cta: 'Read architecture notes'
    }
  ],
  writing: [
    'Designing robust MQTT topic hierarchies for noisy IoT networks',
    'FastAPI performance checklist: async I/O, caching, and p95 latency',
    'MongoDB index strategy for event-ingestion systems'
  ]
};

function SectionTitle({ eyebrow, title, subtitle }) {
  return (
    <header className="section-title">
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h2>{title}</h2>
      {subtitle && <p className="muted">{subtitle}</p>}
    </header>
  );
}

export default function App() {
  return (
    <main>
      <a className="skip-link" href="#content">
        Skip to content
      </a>

      <header className="hero card">
        <p className="eyebrow">Portfolio</p>
        <h1>{portfolioData.name}</h1>
        <p className="hero-role">{portfolioData.role}</p>
        <p className="hero-tagline">{portfolioData.tagline}</p>

        <ul className="proof-list">
          {portfolioData.heroProofs.map((proof) => (
            <li key={proof}>{proof}</li>
          ))}
        </ul>

        <div className="cta-row" role="group" aria-label="Primary actions">
          <a className="btn btn-primary" href="#projects">
            View Projects
          </a>
          <a className="btn" href={portfolioData.links.cv}>
            Download CV
          </a>
        </div>

        <p className="contact-inline">
          <strong>Email:</strong>{' '}
          <a href={`mailto:${portfolioData.email}`}>{portfolioData.email}</a>
          <span aria-hidden="true"> · </span>
          <strong>Location:</strong> {portfolioData.location}
        </p>
      </header>

      <div id="content" className="container">
        <section id="projects" className="card">
          <SectionTitle
            eyebrow="Selected Work"
            title="Case-study style projects"
            subtitle="Each project highlights problem framing, technical decisions, and measurable outcomes."
          />

          <div className="project-grid">
            {portfolioData.projects.map((project) => (
              <article key={project.name} className="project-card">
                <p className="project-subtitle">{project.subtitle}</p>
                <h3>{project.name}</h3>
                <p className="project-summary">{project.summary}</p>

                <ul className="impact-list">
                  {project.impact.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>

                <p className="stack">
                  <strong>Stack:</strong> {project.stack.join(' · ')}
                </p>

                <button className="text-link" type="button" aria-label={`${project.cta} for ${project.name}`}>
                  {project.cta} →
                </button>
              </article>
            ))}
          </div>
        </section>

        <section className="card two-col">
          <article>
            <SectionTitle
              eyebrow="Target Roles"
              title="What I am optimized for"
              subtitle="A focused narrative: backend systems + real-time IoT + performance tuning."
            />
            <ul>
              <li>Backend / Platform Engineering Intern</li>
              <li>IoT & Real-time Data Engineering Intern</li>
              <li>Full-stack Engineering Intern (backend-heavy)</li>
            </ul>
          </article>

          <article>
            <SectionTitle
              eyebrow="Writing"
              title="Engineering Notes"
              subtitle="Communication proof through short technical write-ups."
            />
            <ul>
              {portfolioData.writing.map((post) => (
                <li key={post}>{post}</li>
              ))}
            </ul>
          </article>
        </section>
      </div>
    </main>
  );
}
