const { useEffect, useMemo, useState } = React;

function PortfolioApp() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sliderIndex, setSliderIndex] = useState(0);

  useEffect(() => {
    async function load() {
      const res = await fetch('/api/portfolio');
      const json = await res.json();
      setData(json);
      setLoading(false);
    }
    load();
  }, []);

  const photos = useMemo(() => data?.photos || [], [data]);

  useEffect(() => {
    if (!photos.length) return;
    const timer = setInterval(() => {
      setSliderIndex((prev) => (prev + 1) % photos.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [photos]);

  if (loading) {
    return (
      <main className="container">
        <section className="card">
          <h1>Loading portfolio...</h1>
        </section>
      </main>
    );
  }

  const nextSlide = () => setSliderIndex((prev) => (prev + 1) % photos.length);
  const prevSlide = () => setSliderIndex((prev) => (prev - 1 + photos.length) % photos.length);

  return (
    <>
      <header className="topbar">
        <div>
          <h1>{data.name}</h1>
          <p>{data.title}</p>
        </div>
        <div className="row">
          <a className="btn secondary" href="/login">Admin Login</a>
          <a className="btn" href="/admin">Admin Editor</a>
        </div>
      </header>

      <main className="container">
        <section className="card">
          <h2>About</h2>
          <p>{data.about}</p>
          <p><strong>Location:</strong> {data.location}</p>
          <p><strong>Email:</strong> <a href={`mailto:${data.email}`}>{data.email}</a></p>
          <p><strong>Phone:</strong> {data.phone}</p>
          <a className="btn" href={data.resumeUrl || '#'} target="_blank" rel="noreferrer">View Resume</a>
          <div className="links">
            {(data.links || []).map((x, i) => (
              <a className="btn secondary" key={i} href={x.url} target="_blank" rel="noreferrer">{x.label}</a>
            ))}
          </div>
        </section>

        <section className="card">
          <h2>Photos Slider</h2>
          {!photos.length ? (
            <p>No photos yet.</p>
          ) : (
            <>
              <div className="slide active">
                <img src={photos[sliderIndex].url} alt={photos[sliderIndex].caption || 'Portfolio photo'} />
                <p>{photos[sliderIndex].caption}</p>
              </div>
              <div className="slider-controls">
                <button className="btn secondary" onClick={prevSlide}>← Prev</button>
                <button className="btn secondary" onClick={nextSlide}>Next →</button>
              </div>
            </>
          )}
        </section>

        <section className="card">
          <h2>Achievements</h2>
          <ul>{(data.achievements || []).map((a, i) => <li key={i}>{a}</li>)}</ul>
        </section>

        <section className="card">
          <h2>Projects</h2>
          {(data.projects || []).map((p, i) => (
            <article key={i} className="item-card">
              <h3>{p.name}</h3>
              <p><strong>Stack:</strong> {p.stack}</p>
              <p>{p.description}</p>
              <p><a href={p.github} target="_blank" rel="noreferrer">GitHub</a> {p.demo ? <>| <a href={p.demo} target="_blank" rel="noreferrer">Demo</a></> : null}</p>
            </article>
          ))}
        </section>

        <section className="card">
          <h2>Certificates</h2>
          <ul>
            {(data.certificates || []).map((c, i) => (
              <li key={i}><a href={c.url} target="_blank" rel="noreferrer">{c.name}</a> - {c.issuer}</li>
            ))}
          </ul>
        </section>

        <section className="card">
          <h2>Experience</h2>
          {(data.experiences || []).map((e, i) => (
            <article key={i} className="item-card">
              <h3>{e.role} @ {e.company}</h3>
              <p>{e.duration}</p>
              <ul>{(e.points || []).map((pt, j) => <li key={j}>{pt}</li>)}</ul>
            </article>
          ))}
        </section>
      </main>
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<PortfolioApp />);
