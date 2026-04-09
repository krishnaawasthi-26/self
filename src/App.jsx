function LandingPage() {
  return (
    <section className="card hero-card">
      <p className="eyebrow">Temporary Template</p>
      <h1>Website is under construction</h1>
      <p className="muted">
        This is a temporary first page while the full project is being prepared. Use the admin login if you need
        management access.
      </p>

      <ul className="feature-list" aria-label="What is already available">
        <li>Refreshed color palette with better contrast</li>
        <li>Cleaner typography and spacing for readability</li>
        <li>Improved call-to-action button styling</li>
      </ul>

      <div className="cta-row">
        <a className="btn btn-primary" href="/login">
          Go to Admin Login
        </a>
        <a className="btn btn-ghost" href="#status">
          View Status
        </a>
      </div>
    </section>
  );
}

function LoginPage() {
  return (
    <section className="card login-card">
      <p className="eyebrow">Admin Access</p>
      <h1>Login</h1>
      <p className="muted">
        Use this page at <strong>/login</strong> for admin authentication.
      </p>

      <form className="login-form" onSubmit={(event) => event.preventDefault()}>
        <label htmlFor="admin-email">Email</label>
        <input id="admin-email" type="email" placeholder="admin@example.com" required />

        <label htmlFor="admin-password">Password</label>
        <input id="admin-password" type="password" placeholder="••••••••" required />

        <button type="submit" className="btn btn-primary">
          Sign In
        </button>
      </form>

      <a className="back-link" href="/">
        ← Back to temporary home page
      </a>
    </section>
  );
}

function NotFoundPage() {
  return (
    <section className="card">
      <h2>Page not found</h2>
      <p className="muted">Try the temporary home page or admin login page.</p>
      <div className="cta-row">
        <a className="btn" href="/">
          Home
        </a>
        <a className="btn" href="/login">
          Login
        </a>
      </div>
    </section>
  );
}

function getPage(pathname) {
  if (pathname === '/') return <LandingPage />;
  if (pathname === '/login') return <LoginPage />;
  return <NotFoundPage />;
}

export default function App() {
  const pathname = window.location.pathname;

  return (
    <main>
      <div className="container">{getPage(pathname)}</div>
    </main>
  );
}
