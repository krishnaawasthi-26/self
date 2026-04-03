const photos=[
  'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=1200&q=80'
];
let i=0;const slide=document.getElementById('slide');
function render(){slide.src=photos[i]}
function next(){i=(i+1)%photos.length;render()}
function prev(){i=(i-1+photos.length)%photos.length;render()}
