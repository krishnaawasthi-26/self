const { useState } = React;
const tokenKey = 'portfolio_admin_token';

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    const res = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });

    if (!res.ok) {
      setMessage('Invalid username or password.');
      setLoading(false);
      return;
    }

    const data = await res.json();
    localStorage.setItem(tokenKey, data.token);
    window.location.href = '/admin';
  };

  return (
    <main className="container">
      <section className="card login-card">
        <h1>Admin Login</h1>
        <p className="muted">Sign in to edit achievements, projects, certificates, experience, and slider photos.</p>
        <form onSubmit={onSubmit}>
          <label>Username</label>
          <input value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Enter username" required />
          <label>Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter password" required />
          <button className="btn login-btn" type="submit" disabled={loading}>{loading ? 'Signing in...' : 'Login to Admin'}</button>
        </form>
        {message ? <p className="error">{message}</p> : null}
        <div className="row">
          <a className="btn secondary" href="/">Go to Portfolio</a>
          <a className="btn secondary" href="/admin">Go to Admin Editor</a>
        </div>
      </section>
    </main>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<LoginPage />);
