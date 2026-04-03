let sliderIndex = 0;

function el(id) {
  return document.getElementById(id);
}

function renderSlider(photos = []) {
  const wrapper = el('slider');
  if (!photos.length) {
    wrapper.innerHTML = '<p>No photos yet. Add from admin page.</p>';
    return;
  }

  wrapper.innerHTML = `
    ${photos
      .map(
        (p, i) => `
      <div class="slide ${i === 0 ? 'active' : ''}">
        <img src="${p.url}" alt="${p.caption || 'Portfolio photo'}" />
        <p>${p.caption || ''}</p>
      </div>`
      )
      .join('')}
    <div class="slider-controls">
      <button class="btn secondary" id="prevBtn">Prev</button>
      <button class="btn secondary" id="nextBtn">Next</button>
    </div>
  `;

  const showSlide = (direction) => {
    const slides = document.querySelectorAll('.slide');
    slides[sliderIndex].classList.remove('active');
    sliderIndex = (sliderIndex + direction + slides.length) % slides.length;
    slides[sliderIndex].classList.add('active');
  };

  el('prevBtn').addEventListener('click', () => showSlide(-1));
  el('nextBtn').addEventListener('click', () => showSlide(1));
}

function renderList(id, items, mapFn) {
  const target = el(id);
  target.innerHTML = items.map(mapFn).join('');
}

async function loadPortfolio() {
  const res = await fetch('/api/portfolio');
  const data = await res.json();

  el('name').textContent = data.name;
  el('title').textContent = data.title;
  el('about').textContent = data.about;
  el('location').textContent = data.location;
  el('phone').textContent = data.phone;
  el('email').textContent = data.email;
  el('email').href = `mailto:${data.email}`;
  el('resume').href = data.resumeUrl || '#';

  renderList('links', data.links || [], (x) => `<a class="btn secondary" target="_blank" href="${x.url}">${x.label}</a>`);
  renderSlider(data.photos || []);
  renderList('skills', data.skills || [], (x) => `<li>${x}</li>`);
  renderList(
    'experience',
    data.experiences || [],
    (x) => `<article><h3>${x.role} @ ${x.company}</h3><p>${x.duration}</p><ul>${(x.points || []).map((p) => `<li>${p}</li>`).join('')}</ul></article>`
  );
  renderList(
    'projects',
    data.projects || [],
    (x) => `<article><h3>${x.name}</h3><p>${x.stack}</p><p>${x.description}</p><p><a target="_blank" href="${x.github}">GitHub</a> ${
      x.demo ? `| <a target="_blank" href="${x.demo}">Demo</a>` : ''
    }</p></article>`
  );
  renderList(
    'certificates',
    data.certificates || [],
    (x) => `<li><a target="_blank" href="${x.url}">${x.name}</a> - ${x.issuer}</li>`
  );
  renderList('achievements', data.achievements || [], (x) => `<li>${x}</li>`);
}

loadPortfolio();
