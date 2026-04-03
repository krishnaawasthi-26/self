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

async function uploadPhoto(file) {
  const token = localStorage.getItem(tokenKey);
  const formData = new FormData();
  formData.append('image', file);

  const res = await fetch('/api/upload', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  if (!res.ok) {
    throw new Error('Upload failed');
  }

  return res.json();
}

function syncFromQuickEditors() {
  const readGroup = (containerId) =>
    Array.from($(containerId).querySelectorAll('.editor-item')).map((item) => {
      const obj = {};
      item.querySelectorAll('input[data-key]').forEach((inp) => {
        obj[inp.dataset.key] = inp.value;
      });
      return obj;
    });

  currentData.photos = readGroup('photosEditor');
  currentData.certificates = readGroup('certEditor');
  currentData.links = readGroup('linksEditor');
  $('jsonEditor').value = JSON.stringify(currentData, null, 2);
}

function renderPhotoEditors() {
  const root = $('photosEditor');
  root.innerHTML = '';

  currentData.photos.forEach((entry, index) => {
    const item = document.createElement('div');
    item.className = 'editor-item';

    const urlInput = document.createElement('input');
    urlInput.placeholder = 'Photo URL';
    urlInput.value = entry.url || '';
    urlInput.dataset.key = 'url';

    const captionInput = document.createElement('input');
    captionInput.placeholder = 'Caption';
    captionInput.value = entry.caption || '';
    captionInput.dataset.key = 'caption';

    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*';

    const uploadBtn = document.createElement('button');
    uploadBtn.className = 'btn secondary';
    uploadBtn.textContent = 'Upload from storage';
    uploadBtn.addEventListener('click', async () => {
      const file = fileInput.files?.[0];
      if (!file) {
        $('saveMessage').textContent = 'Choose an image first';
        return;
      }

      uploadBtn.disabled = true;
      uploadBtn.textContent = 'Uploading...';
      try {
        const data = await uploadPhoto(file);
        urlInput.value = data.url;
        syncFromQuickEditors();
        $('saveMessage').textContent = 'Image uploaded locally';
      } catch {
        $('saveMessage').textContent = 'Image upload failed';
      } finally {
        uploadBtn.disabled = false;
        uploadBtn.textContent = 'Upload from storage';
      }
    });

    const removeBtn = document.createElement('button');
    removeBtn.className = 'btn secondary';
    removeBtn.textContent = 'Remove';
    removeBtn.addEventListener('click', () => {
      currentData.photos.splice(index, 1);
      renderQuickEditors();
      syncFromQuickEditors();
    });

    urlInput.addEventListener('input', syncFromQuickEditors);
    captionInput.addEventListener('input', syncFromQuickEditors);

    item.append(urlInput, captionInput, fileInput, uploadBtn, removeBtn);
    root.appendChild(item);
  });
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

  renderPhotoEditors();

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
    currentData.photos = currentData.photos || [];
    currentData.certificates = currentData.certificates || [];
    currentData.links = currentData.links || [];
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

  $('saveMessage').textContent = 'Saved successfully (local)';
});

const existingToken = localStorage.getItem(tokenKey);
if (!existingToken) {
  window.location.href = '/login';
} else {
  loadData();
}
