const tokenKey = 'portfolio_admin_token';
let currentData = null;

function $(id) {
  return document.getElementById(id);
}

function createEditorItem(fields, onRemove) {
  const wrapper = document.createElement('div');
  wrapper.className = 'editor-item';

  fields.forEach((field) => {
    const input = document.createElement('input');
    input.placeholder = field.placeholder;
    input.value = field.value || '';
    input.dataset.key = field.key;
    wrapper.appendChild(input);
  });

  const btn = document.createElement('button');
  btn.className = 'btn secondary';
  btn.textContent = 'Remove';
  btn.addEventListener('click', onRemove);
  wrapper.appendChild(btn);

  return wrapper;
}

function syncFromQuickEditors() {
  const readGroup = (containerId) =>
    Array.from($(containerId).querySelectorAll('.editor-item')).map((item) => {
      const obj = {};
      item.querySelectorAll('input').forEach((inp) => {
        obj[inp.dataset.key] = inp.value;
      });
      return obj;
    });

  currentData.photos = readGroup('photosEditor');
  currentData.certificates = readGroup('certEditor');
  currentData.links = readGroup('linksEditor');
  $('jsonEditor').value = JSON.stringify(currentData, null, 2);
}

function renderQuickEditors() {
  const mount = (id, list, fields) => {
    const root = $(id);
    root.innerHTML = '';
    list.forEach((entry, index) => {
      const item = createEditorItem(
        fields.map((f) => ({ ...f, value: entry[f.key] })),
        () => {
          list.splice(index, 1);
          renderQuickEditors();
          syncFromQuickEditors();
        }
      );
      item.querySelectorAll('input').forEach((i) => i.addEventListener('input', syncFromQuickEditors));
      root.appendChild(item);
    });
  };

  mount('photosEditor', currentData.photos, [
    { key: 'url', placeholder: 'Photo URL' },
    { key: 'caption', placeholder: 'Caption' },
  ]);

  mount('certEditor', currentData.certificates, [
    { key: 'name', placeholder: 'Certificate name' },
    { key: 'issuer', placeholder: 'Issuer' },
    { key: 'url', placeholder: 'Certificate URL' },
  ]);

  mount('linksEditor', currentData.links, [
    { key: 'label', placeholder: 'Label' },
    { key: 'url', placeholder: 'Profile URL' },
  ]);
}

async function loadData() {
  const res = await fetch('/api/portfolio');
  currentData = await res.json();
  $('jsonEditor').value = JSON.stringify(currentData, null, 2);
  renderQuickEditors();
}

$('loginForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const form = new FormData(e.target);
  const username = form.get('username');
  const password = form.get('password');

  const res = await fetch('/api/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });

  if (!res.ok) {
    $('loginMessage').textContent = 'Login failed';
    return;
  }

  const data = await res.json();
  localStorage.setItem(tokenKey, data.token);
  $('loginCard').classList.add('hidden');
  $('editorCard').classList.remove('hidden');
  loadData();
});

$('addPhoto').addEventListener('click', () => {
  currentData.photos.push({ url: '', caption: '' });
  renderQuickEditors();
  syncFromQuickEditors();
});

$('addCert').addEventListener('click', () => {
  currentData.certificates.push({ name: '', issuer: '', url: '' });
  renderQuickEditors();
  syncFromQuickEditors();
});

$('addLink').addEventListener('click', () => {
  currentData.links.push({ label: '', url: '' });
  renderQuickEditors();
  syncFromQuickEditors();
});

$('jsonEditor').addEventListener('input', () => {
  try {
    currentData = JSON.parse($('jsonEditor').value);
    renderQuickEditors();
    $('saveMessage').textContent = '';
  } catch {
    $('saveMessage').textContent = 'Invalid JSON format';
  }
});

$('saveBtn').addEventListener('click', async () => {
  try {
    currentData = JSON.parse($('jsonEditor').value);
  } catch {
    $('saveMessage').textContent = 'Fix JSON before saving';
    return;
  }

  const token = localStorage.getItem(tokenKey);
  const res = await fetch('/api/portfolio', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(currentData),
  });

  if (!res.ok) {
    $('saveMessage').textContent = 'Save failed. Try login again.';
    return;
  }

  $('saveMessage').textContent = 'Saved successfully';
});

const existingToken = localStorage.getItem(tokenKey);
if (existingToken) {
  $('loginCard').classList.add('hidden');
  $('editorCard').classList.remove('hidden');
  loadData();
}
