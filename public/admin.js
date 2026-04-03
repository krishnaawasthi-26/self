const { useEffect, useState } = React;
const tokenKey = 'portfolio_admin_token';

function emptyPortfolio() {
  return {
    achievements: [],
    projects: [],
    certificates: [],
    experiences: [],
    photos: [],
  };
}

function AdminPage() {
  const [data, setData] = useState(emptyPortfolio());
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const token = localStorage.getItem(tokenKey);
    if (!token) {
      window.location.href = '/login';
      return;
    }

    async function load() {
      const res = await fetch('/api/portfolio');
      const json = await res.json();
      setData(json);
      setLoading(false);
    }

    load();
  }, []);

  const updateField = (field, value) => setData((prev) => ({ ...prev, [field]: value }));

  const addItem = (field, item) => updateField(field, [...(data[field] || []), item]);

  const removeItem = (field, index) => updateField(field, (data[field] || []).filter((_, i) => i !== index));

  const updateItem = (field, index, key, value) => {
    const updated = [...(data[field] || [])];
    updated[index] = { ...updated[index], [key]: value };
    updateField(field, updated);
  };

  const save = async () => {
    const token = localStorage.getItem(tokenKey);
    const res = await fetch('/api/portfolio', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      setMessage('Save failed. Please login again.');
      return;
    }

    setMessage('Saved successfully.');
  };

  if (loading) return <main className="container"><section className="card"><h1>Loading editor...</h1></section></main>;

  return (
    <main className="container">
      <section className="card">
        <div className="row-between">
          <h1>Admin Editor</h1>
          <div className="row">
            <a className="btn secondary" href="/">View Site</a>
            <a className="btn secondary" href="/login">Login Page</a>
          </div>
        </div>
        <p>Edit all sections and save to update the portfolio instantly.</p>
      </section>

      <section className="card">
        <h2>Achievements</h2>
        {(data.achievements || []).map((a, i) => (
          <div key={i} className="editor-item row">
            <input value={a} onChange={(e) => {
              const arr = [...data.achievements];
              arr[i] = e.target.value;
              updateField('achievements', arr);
            }} />
            <button className="btn secondary" onClick={() => removeItem('achievements', i)}>Remove</button>
          </div>
        ))}
        <button className="btn secondary" onClick={() => addItem('achievements', '')}>+ Add Achievement</button>
      </section>

      <section className="card">
        <h2>Projects</h2>
        {(data.projects || []).map((p, i) => (
          <div key={i} className="editor-item">
            <input placeholder="Name" value={p.name || ''} onChange={(e) => updateItem('projects', i, 'name', e.target.value)} />
            <input placeholder="Stack" value={p.stack || ''} onChange={(e) => updateItem('projects', i, 'stack', e.target.value)} />
            <input placeholder="Description" value={p.description || ''} onChange={(e) => updateItem('projects', i, 'description', e.target.value)} />
            <input placeholder="GitHub URL" value={p.github || ''} onChange={(e) => updateItem('projects', i, 'github', e.target.value)} />
            <input placeholder="Demo URL" value={p.demo || ''} onChange={(e) => updateItem('projects', i, 'demo', e.target.value)} />
            <button className="btn secondary" onClick={() => removeItem('projects', i)}>Remove</button>
          </div>
        ))}
        <button className="btn secondary" onClick={() => addItem('projects', { name: '', stack: '', description: '', github: '', demo: '' })}>+ Add Project</button>
      </section>

      <section className="card">
        <h2>Certificates</h2>
        {(data.certificates || []).map((c, i) => (
          <div key={i} className="editor-item">
            <input placeholder="Name" value={c.name || ''} onChange={(e) => updateItem('certificates', i, 'name', e.target.value)} />
            <input placeholder="Issuer" value={c.issuer || ''} onChange={(e) => updateItem('certificates', i, 'issuer', e.target.value)} />
            <input placeholder="Certificate URL" value={c.url || ''} onChange={(e) => updateItem('certificates', i, 'url', e.target.value)} />
            <button className="btn secondary" onClick={() => removeItem('certificates', i)}>Remove</button>
          </div>
        ))}
        <button className="btn secondary" onClick={() => addItem('certificates', { name: '', issuer: '', url: '' })}>+ Add Certificate</button>
      </section>

      <section className="card">
        <h2>Experience</h2>
        {(data.experiences || []).map((e, i) => (
          <div key={i} className="editor-item">
            <input placeholder="Company" value={e.company || ''} onChange={(ev) => updateItem('experiences', i, 'company', ev.target.value)} />
            <input placeholder="Role" value={e.role || ''} onChange={(ev) => updateItem('experiences', i, 'role', ev.target.value)} />
            <input placeholder="Duration" value={e.duration || ''} onChange={(ev) => updateItem('experiences', i, 'duration', ev.target.value)} />
            <textarea placeholder="Points (one per line)" value={(e.points || []).join('\n')} onChange={(ev) => updateItem('experiences', i, 'points', ev.target.value.split('\n').filter(Boolean))}></textarea>
            <button className="btn secondary" onClick={() => removeItem('experiences', i)}>Remove</button>
          </div>
        ))}
        <button className="btn secondary" onClick={() => addItem('experiences', { company: '', role: '', duration: '', points: [] })}>+ Add Experience</button>
      </section>

      <section className="card">
        <h2>Photos Slider</h2>
        {(data.photos || []).map((p, i) => (
          <div key={i} className="editor-item">
            <input placeholder="Photo URL" value={p.url || ''} onChange={(e) => updateItem('photos', i, 'url', e.target.value)} />
            <input placeholder="Caption" value={p.caption || ''} onChange={(e) => updateItem('photos', i, 'caption', e.target.value)} />
            <button className="btn secondary" onClick={() => removeItem('photos', i)}>Remove</button>
          </div>
        ))}
        <button className="btn secondary" onClick={() => addItem('photos', { url: '', caption: '' })}>+ Add Photo</button>
      </section>

      <section className="card">
        <h2>Advanced JSON Editor</h2>
        <textarea rows="16" value={JSON.stringify(data, null, 2)} onChange={(e) => {
          try {
            setData(JSON.parse(e.target.value));
            setMessage('');
          } catch {
            setMessage('Invalid JSON format');
          }
        }}></textarea>
      </section>

      <section className="card row">
        <button className="btn" onClick={save}>Save Changes</button>
        <button className="btn secondary" onClick={() => {
          localStorage.removeItem(tokenKey);
          window.location.href = '/login';
        }}>Logout</button>
        <strong>{message}</strong>
      </section>
    </main>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<AdminPage />);
