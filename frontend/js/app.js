import { animate, stagger, createTimeline } from 'https://cdn.jsdelivr.net/npm/animejs@4.4.1/+esm';

const WHATSAPP_NUMBER = '5511999990000';
const API_URL = 'http://localhost:5077/api';

const products = [
  { id: 1, cat: 'burgers', name: 'Classic Smart', desc: 'Blend 180g, cheddar, alface, tomate, picles e molho especial.', price: 29, emoji: '🍔', tag: 'Popular' },
  { id: 2, cat: 'burgers', name: 'Smash Fire', desc: 'Duplo 2x130g, cheddar defumado, jalapeño e molho chipotle.', price: 39, emoji: '🔥', tag: 'Novo' },
  { id: 3, cat: 'burgers', name: 'BBQ Prime', desc: 'Blend premium, bacon crocante, onion rings e barbecue.', price: 42, emoji: '🥩' },
  { id: 4, cat: 'burgers', name: 'Green Smart', desc: 'Blend vegetal, rúcula, tomate seco e maionese de ervas.', price: 34, emoji: '🌿' },
  { id: 5, cat: 'sides', name: 'Fries Smart', desc: 'Batata crocante com tempero da casa.', price: 16, emoji: '🍟' },
  { id: 6, cat: 'sides', name: 'Onion Rings', desc: 'Anéis de cebola empanados no panko com ranch.', price: 18, emoji: '🧅' },
  { id: 7, cat: 'sides', name: 'Batata Rústica', desc: 'Batata com alecrim, alho assado e páprica.', price: 19, emoji: '🥔' },
  { id: 8, cat: 'drinks', name: 'Smart Shake', desc: 'Milkshake artesanal de chocolate, morango ou baunilha.', price: 22, emoji: '🧃', tag: 'Novo' },
  { id: 9, cat: 'drinks', name: 'Limonada Suíça', desc: 'Limonada cremosa 400ml.', price: 14, emoji: '🥤' },
  { id: 10, cat: 'drinks', name: 'Refrigerante', desc: 'Lata 350ml.', price: 7, emoji: '🫧' }
];

let cart = JSON.parse(localStorage.getItem('foodsmart-cart') || '[]');
const money = value => value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
const $ = selector => document.querySelector(selector);
const $$ = selector => document.querySelectorAll(selector);

function saveCart(){ localStorage.setItem('foodsmart-cart', JSON.stringify(cart)); renderCart(); }
function toast(message){ const el = $('#toast'); el.textContent = message; animate(el,{opacity:[0,1],y:[20,0],duration:220,ease:'outQuad'}); setTimeout(()=>animate(el,{opacity:[1,0],y:[0,20],duration:220}),1600); }

function renderMenu(cat = 'burgers'){
  $('#menu-grid').innerHTML = products.filter(p => p.cat === cat).map(p => `
    <article class="menu-card" data-id="${p.id}">
      ${p.tag ? `<span class="tag">${p.tag}</span>` : ''}
      <span class="card-emoji">${p.emoji}</span>
      <h3 class="card-name">${p.name}</h3>
      <p class="card-desc">${p.desc}</p>
      <div class="card-footer"><span class="card-price">${money(p.price)}</span><button class="card-add magnetic" data-id="${p.id}">+</button></div>
    </article>`).join('');
  animate('.menu-card',{opacity:[0,1],y:[25,0],delay:stagger(80),duration:520,ease:'outExpo'});
}

function addToCart(id){
  const product = products.find(p => p.id === Number(id));
  const item = cart.find(i => i.id === product.id);
  item ? item.qty++ : cart.push({ ...product, qty: 1 });
  saveCart(); toast(`${product.name} adicionado ao carrinho`);
}
function changeQty(id, delta){
  const item = cart.find(i => i.id === Number(id));
  if(!item) return;
  item.qty += delta;
  cart = cart.filter(i => i.qty > 0);
  saveCart();
}
function renderCart(){
  $('#cart-count').textContent = cart.reduce((sum,i)=>sum+i.qty,0);
  $('#cart-items').innerHTML = cart.length ? cart.map(i => `
    <div class="cart-row"><div><strong>${i.name}</strong><br><small>${money(i.price)} cada</small></div><div class="qty"><button data-dec="${i.id}">−</button><span>${i.qty}</span><button data-inc="${i.id}">+</button></div></div>`).join('') : '<p>Seu carrinho está vazio.</p>';
  $('#cart-total').textContent = `Total: ${money(cart.reduce((sum,i)=>sum+i.price*i.qty,0))}`;
}
function checkout(){
  if(!cart.length) return toast('Adicione um item primeiro');
  const lines = cart.map(i => `${i.qty}x ${i.name} - ${money(i.price*i.qty)}`).join('\n');
  const total = money(cart.reduce((sum,i)=>sum+i.price*i.qty,0));
  const msg = encodeURIComponent(`Olá, quero fazer um pedido FOODSMART:\n\n${lines}\n\nTotal: ${total}`);
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, '_blank', 'noopener,noreferrer');
}

function initCursor(){
  const cursor = $('#cursor'), ring = $('#cursor-ring'); let mx=0,my=0,rx=0,ry=0;
  window.addEventListener('mousemove', e => { mx=e.clientX; my=e.clientY; cursor.style.left=mx+'px'; cursor.style.top=my+'px'; });
  function loop(){ rx+=(mx-rx)*.14; ry+=(my-ry)*.14; ring.style.left=rx+'px'; ring.style.top=ry+'px'; requestAnimationFrame(loop); } loop();
  document.addEventListener('mouseover', e => { if(e.target.closest('a,button,.menu-card')) animate(ring,{scale:1.65,duration:250}); });
  document.addEventListener('mouseout', e => { if(e.target.closest('a,button,.menu-card')) animate(ring,{scale:1,duration:250}); });
}
function initHero(){
  createTimeline({ ease:'outExpo' })
    .add('.hero-eyebrow',{opacity:[0,1],y:[12,0],duration:500})
    .add('.word',{y:['110%',0],delay:stagger(80),duration:900},'-=250')
    .add('.hero-subtitle',{opacity:[0,1],y:[20,0],duration:600},'-=450')
    .add('.hero-actions',{opacity:[0,1],y:[20,0],duration:600},'-=450')
    .add('.burger-orb',{opacity:[0,1],y:[50,0],rotate:[-12,0],duration:900},'-=500');
}
function initCanvas(){
  const canvas = $('#bg-canvas'), ctx = canvas.getContext('2d'); let dots=[];
  const resize = () => { canvas.width=innerWidth; canvas.height=innerHeight; dots = Array.from({length:45},()=>({x:Math.random()*canvas.width,y:Math.random()*canvas.height,r:Math.random()*2+1,v:Math.random()*.35+.1}));};
  resize(); addEventListener('resize', resize);
  (function draw(){ ctx.clearRect(0,0,canvas.width,canvas.height); ctx.fillStyle='rgba(255,184,0,.38)'; dots.forEach(d=>{d.y-=d.v;if(d.y<0)d.y=canvas.height;ctx.beginPath();ctx.arc(d.x,d.y,d.r,0,Math.PI*2);ctx.fill();}); requestAnimationFrame(draw); })();
}
function initReveal(){
  const obs = new IntersectionObserver(entries => entries.forEach(e => { if(e.isIntersecting){ e.target.classList.add('visible'); obs.unobserve(e.target); }}), {threshold:.15});
  $$('.reveal').forEach(el=>obs.observe(el));
}
function initEvents(){
  $('#menu-grid').addEventListener('click', e => { const btn=e.target.closest('[data-id]'); if(btn?.classList.contains('card-add')) addToCart(btn.dataset.id); });
  $('.menu-tabs').addEventListener('click', e => { const btn=e.target.closest('.tab-btn'); if(!btn) return; $$('.tab-btn').forEach(b=>b.classList.remove('active')); btn.classList.add('active'); renderMenu(btn.dataset.cat); });
  $('#open-cart').onclick=()=>$('#cart-panel').classList.add('open'); $('#close-cart').onclick=()=>$('#cart-panel').classList.remove('open');
  $('#cart-items').onclick=e=>{ if(e.target.dataset.inc) changeQty(e.target.dataset.inc,1); if(e.target.dataset.dec) changeQty(e.target.dataset.dec,-1); };
  $('#checkout-btn').onclick=checkout; $('#whatsapp-btn').onclick=checkout;
  $('#mobile-menu').onclick=()=>$('#nav-links').classList.toggle('open');
  document.addEventListener('mousemove', e => $$('.magnetic').forEach(el => { const r=el.getBoundingClientRect(), x=e.clientX-r.left-r.width/2, y=e.clientY-r.top-r.height/2; if(Math.abs(x)<120&&Math.abs(y)<80) el.style.transform=`translate(${x*.08}px,${y*.12}px)`; else el.style.transform=''; }));
}

async function tryApi(){
  try { await fetch(`${API_URL}/products`); console.info('API C# conectada.'); } catch { console.info('API offline: usando cardápio local.'); }
}

renderMenu(); renderCart(); initCursor(); initHero(); initCanvas(); initReveal(); initEvents(); tryApi();
