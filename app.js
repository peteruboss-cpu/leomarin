const dialog = document.querySelector('dialog');
let opener;
function selectTab(name){document.querySelectorAll('[data-tab]').forEach(b=>{b.setAttribute('aria-selected',String(b.dataset.tab===name));b.tabIndex=b.dataset.tab===name?0:-1});document.querySelectorAll('[role=tabpanel]').forEach(p=>p.hidden=p.id!==name)}
document.querySelectorAll('[data-panel]').forEach(b=>b.addEventListener('click',()=>{opener=b;selectTab(b.dataset.panel);dialog.showModal();document.body.style.overflow='hidden'}));
function closePanel(){dialog.close()}
document.querySelector('.close').addEventListener('click',closePanel);
dialog.addEventListener('close',()=>{document.body.style.overflow='';opener?.focus()});
dialog.addEventListener('click',e=>{const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)closePanel()});
document.querySelectorAll('[data-tab]').forEach(b=>{b.addEventListener('click',()=>selectTab(b.dataset.tab));b.addEventListener('keydown',e=>{if(['ArrowLeft','ArrowRight','Home','End'].includes(e.key)){e.preventDefault();const next=b.dataset.tab==='overview'?'finance':'overview';const name=e.key==='Home'?'overview':e.key==='End'?'finance':next;selectTab(name);document.querySelector('[data-tab='+name+']').focus()}})});
const toast=document.querySelector('#toast');let toastTimer;
function notify(message){toast.textContent=message;toast.classList.add('visible');clearTimeout(toastTimer);toastTimer=setTimeout(()=>toast.classList.remove('visible'),3500)}
document.querySelector('#copy-details').addEventListener('click',async()=>{const text='LEOMARIN PRIM S.R.L.\nIDNO: 1024600088940\nData înregistrării: 16.12.2024\nAdministrator: MARIN GHEORGHE\nAdresa: MD-2060, Moldova, Chișinău, bd. Traian, 21/3, of. 120';try{await navigator.clipboard.writeText(text);notify('Datele juridice au fost copiate')}catch{const t=document.createElement('textarea');t.value=text;t.style.position='fixed';t.style.opacity='0';document.body.append(t);t.select();const ok=document.execCommand('copy');t.remove();notify(ok?'Datele juridice au fost copiate':'Copierea nu este disponibilă în acest browser')}});
if('IntersectionObserver' in window){const io=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('seen');io.unobserve(e.target)}}),{threshold:.08});document.querySelectorAll('.section,.transparency').forEach(el=>{el.classList.add('reveal');io.observe(el)})}
