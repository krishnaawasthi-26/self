import { useEffect, useState } from 'react';

const NAV_ITEMS = ['Dashboard', 'Lessons', 'Assignments', 'Reports', 'Settings'];

function Sidebar({ isOpen, isDesktop, onToggle }) {
  return (
    <aside className={`sidebar ${isOpen ? 'is-open' : ''} ${isDesktop ? 'is-desktop' : 'is-mobile'}`}>
      <div className="sidebar-header">
        <button
          type="button"
          className="sidebar-toggle"
          onClick={onToggle}
          aria-label={isOpen ? 'Collapse sidebar' : 'Expand sidebar'}
          aria-expanded={isOpen}
        >
          ☰
        </button>
        <span className="book-icon" aria-hidden="true">
          📘
        </span>
      </div>

      <nav className="sidebar-nav" aria-label="Main navigation">
        {NAV_ITEMS.map((item) => (
          <button key={item} type="button" className="nav-item">
            {item}
          </button>
        ))}
      </nav>
    </aside>
  );
}

function ContentCard({ title, text }) {
  return (
    <article className="content-card">
      <h2>{title}</h2>
      <p>{text}</p>
    </article>
  );
}

export default function App() {
  const [isDesktop, setIsDesktop] = useState(() => window.matchMedia('(min-width: 992px)').matches);
  const [isSidebarOpen, setIsSidebarOpen] = useState(() => window.matchMedia('(min-width: 992px)').matches);

  useEffect(() => {
    const media = window.matchMedia('(min-width: 992px)');

    const syncLayout = (event) => {
      setIsDesktop(event.matches);
      setIsSidebarOpen(event.matches);
    };

    media.addEventListener('change', syncLayout);
    return () => media.removeEventListener('change', syncLayout);
  }, []);

  const toggleSidebar = () => setIsSidebarOpen((current) => !current);

  return (
    <main className="app-shell">
      <Sidebar isOpen={isSidebarOpen} isDesktop={isDesktop} onToggle={toggleSidebar} />

      {!isDesktop && isSidebarOpen ? <button type="button" className="overlay" onClick={toggleSidebar} aria-label="Close sidebar" /> : null}

      <section className={`main-content ${isDesktop ? (isSidebarOpen ? 'sidebar-open' : 'sidebar-closed') : ''}`}>
        <header className="content-header">
          <h1>Responsive Learning Panel</h1>
          <p>
            Mobile keeps the overlay style. On desktop, the sidebar now slides while content shrinks and shifts so both
            areas stay visible.
          </p>
        </header>

        <div className="content-grid">
          <ContentCard title="Overview" text="Track progress, assignments, and upcoming lessons from one place." />
          <ContentCard title="Recent Activity" text="View class updates, recent submissions, and teacher feedback." />
          <ContentCard title="Quick Actions" text="Create notes, schedule sessions, or review pending tasks." />
        </div>
      </section>
    </main>
  );
}
