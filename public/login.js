const tokenKey = 'portfolio_admin_token';

function $(id) {
  return document.getElementById(id);
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
  window.location.href = '/admin';
});
