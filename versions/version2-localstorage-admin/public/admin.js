const u=document.getElementById('u'),p=document.getElementById('p'),panel=document.getElementById('panel'),ed=document.getElementById('editor');
document.getElementById('login').onclick=()=>{if(u.value==='me'&&p.value==='123'){panel.classList.remove('hidden');ed.value=localStorage.getItem('portfolio_v2')||'{"name":"Krishna Awasthi","title":"Backend & IoT Engineer","links":[],"photos":[]}'}else alert('Invalid')};
document.getElementById('save').onclick=()=>{try{JSON.parse(ed.value);localStorage.setItem('portfolio_v2',ed.value);alert('saved')}catch{alert('invalid json')}};
