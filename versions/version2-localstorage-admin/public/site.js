const seed={name:'Krishna Awasthi',title:'Backend & IoT Engineer',links:[{label:'GitHub',url:'https://github.com/krishnaawasthi_26'}],photos:['https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1200&q=80','https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80']};
const data=JSON.parse(localStorage.getItem('portfolio_v2')||JSON.stringify(seed));
document.getElementById('name').textContent=data.name;document.getElementById('title').textContent=data.title;
document.getElementById('links').innerHTML=data.links.map(l=>`<a href='${l.url}' target='_blank'>${l.label}</a>`).join(' | ');
let i=0;const p=document.getElementById('photo');function r(){p.src=data.photos[i]}r();
document.getElementById('next').onclick=()=>{i=(i+1)%data.photos.length;r()};document.getElementById('prev').onclick=()=>{i=(i-1+data.photos.length)%data.photos.length;r()};
