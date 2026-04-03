const portfolioData = {
  name: 'Krishna Awasthi',
  role: 'Backend & IoT Engineer',
  tagline: 'I design reliable backend systems and real-time IoT pipelines that are fast, observable, and production-ready.',
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
    'Designed MongoDB/MySQL schemas for real-time ingestion workloads and analytics.'
  ],
  projects: [
    {
      name: 'Smart Agriculture Management System',
      subtitle: 'FastAPI + MQTT + MongoDB',
      summary:
        'IoT monitoring and control platform for irrigation and environmental tracking with resilient message ingestion and near real-time alerts.',
      stack: ['Python', 'FastAPI', 'MQTT', 'MongoDB', 'Docker']
    },
    {
      name: 'LeetCode Analytics Dashboard',
      subtitle: 'Data-driven full-stack app',
      summary:
        'Dashboard that transforms coding history into topic-level insights, progress trends, and interview preparation recommendations.',
      stack: ['React', 'Node.js', 'REST APIs', 'Charts']
    },
    {
      name: 'URL Shortener Service',
      subtitle: 'Backend microservice',
      summary:
        'Collision-safe short link generation with reliable redirects, schema/index tuning, and clear API contracts for integration.',
      stack: ['FastAPI', 'Redis', 'MySQL', 'OpenAPI']
    }
  ]
};

const navItems = [
  { label: 'Home', path: '/' },
  { label: 'Projects', path: '/projects' },
  { label: 'About', path: '/about' },
  { label: 'Contact', path: '/contact' }
];

function SectionTitle({ title, subtitle }) {
  return (
    <header className="section-title">
      <h2>{title}</h2>
      {subtitle ? <p className="muted">{subtitle}</p> : null}
    </header>
  );
}

function Header({ pathname }) {
  return (
    <header className="topbar">
      <div className="brand">{portfolioData.name}</div>
      <nav aria-label="Main navigation">
        <ul className="nav-list">
          {navItems.map((item) => (
            <li key={item.path}>
              <a className={pathname === item.path ? 'active' : ''} href={item.path}>
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}

function HomePage() {
  return (
    <>
      <section className="hero card">
        <p className="eyebrow">Portfolio</p>
        <h1>{portfolioData.role}</h1>
        <p className="hero-tagline">{portfolioData.tagline}</p>

        <ul className="proof-list">
          {portfolioData.heroProofs.map((proof) => (
            <li key={proof}>{proof}</li>
          ))}
        </ul>

        <div className="cta-row" role="group" aria-label="Primary actions">
          <a className="btn btn-primary" href="/projects">
            View Projects
          </a>
          <a className="btn" href={portfolioData.links.cv}>
            Download CV
          </a>
        </div>
      </section>

      <section className="card">
        <SectionTitle
          title="Quick Overview"
          subtitle="Backend engineering, IoT systems, and performance-focused development."
        />
        <div className="stats-grid">
          <article>
            <h3>5,000+</h3>
            <p className="muted">IoT events processed daily</p>
          </article>
          <article>
            <h3>Async-first</h3>
            <p className="muted">FastAPI architecture and API optimization</p>
          </article>
          <article>
            <h3>Production Ready</h3>
            <p className="muted">Structured schemas, reliability, and observability</p>
          </article>
        </div>
      </section>
    </>
  );
}

function ProjectsPage() {
  return (
    <section className="card">
      <SectionTitle
        title="Selected Projects"
        subtitle="Case-study style projects focused on measurable engineering impact."
      />

      <div className="project-grid">
        {portfolioData.projects.map((project) => (
          <article key={project.name} className="project-card">
            <p className="project-subtitle">{project.subtitle}</p>
            <h3>{project.name}</h3>
            <p className="project-summary">{project.summary}</p>
            <p className="stack">
              <strong>Stack:</strong> {project.stack.join(' · ')}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}

function AboutPage() {
  return (
    <section className="card two-col">
      <article>
        <SectionTitle
          title="About Me"
          subtitle="I build backend systems that stay reliable under real-world load."
        />
        <p>
          I am a backend and IoT-focused engineer who enjoys building systems that collect, process, and expose
          real-time data with clear performance goals.
        </p>
      </article>
      <article>
        <SectionTitle
          title="Target Roles"
          subtitle="Roles where I can contribute quickly and meaningfully."
        />
        <ul>
          <li>Backend / Platform Engineering Intern</li>
          <li>IoT & Real-time Data Engineering Intern</li>
          <li>Full-stack Engineering Intern (backend-heavy)</li>
        </ul>
      </article>
    </section>
  );
}

function ContactPage() {
  return (
    <section className="card contact-card">
      <SectionTitle title="Contact" subtitle="Let’s connect for internships, projects, or collaboration." />
      <p>
        <strong>Email:</strong> <a href={`mailto:${portfolioData.email}`}>{portfolioData.email}</a>
      </p>
      <p>
        <strong>GitHub:</strong> <a href={portfolioData.links.github}>{portfolioData.links.github}</a>
      </p>
      <p>
        <strong>LinkedIn:</strong> <a href={portfolioData.links.linkedin}>{portfolioData.links.linkedin}</a>
      </p>
      <p>
        <strong>Location:</strong> {portfolioData.location}
      </p>
    </section>
  );
}

function NotFoundPage() {
  return (
    <section className="card">
      <h2>Page not found</h2>
      <p className="muted">Use the top navigation to visit available pages.</p>
    </section>
  );
}

function getPage(pathname) {
  if (pathname === '/') return <HomePage />;
  if (pathname === '/projects') return <ProjectsPage />;
  if (pathname === '/about') return <AboutPage />;
  if (pathname === '/contact') return <ContactPage />;
  return <NotFoundPage />;
}

export default function App() {
  const pathname = window.location.pathname;

  return (
    <main>
      <div className="container">
        <Header pathname={pathname} />
        {getPage(pathname)}
      </div>
    </main>
  );
}
