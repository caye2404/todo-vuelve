'use strict';
const $=(selector,root=document)=>root.querySelector(selector);
const $$=(selector,root=document)=>Array.from(root.querySelectorAll(selector));
const menu=$('#site-nav');
const menuTrigger=$('#menu-trigger');
menuTrigger.addEventListener('click',()=>{const open=menu.classList.toggle('open');menuTrigger.setAttribute('aria-expanded',String(open));menuTrigger.setAttribute('aria-label',open?'Cerrar menú':'Abrir menú')});
$$('#site-nav a').forEach(a=>a.addEventListener('click',()=>{menu.classList.remove('open');menuTrigger.setAttribute('aria-expanded','false');menuTrigger.setAttribute('aria-label','Abrir menú')}));
const toast=(message)=>{const node=$('#toast');node.textContent=message;node.hidden=false;clearTimeout(toast.timeout);toast.timeout=setTimeout(()=>node.hidden=true,3300)};
const copy=async(value)=>{try{if(!navigator.clipboard?.writeText)throw Error('Clipboard API unavailable');await navigator.clipboard.writeText(value)}catch{const input=document.createElement('textarea');input.value=value;input.style.cssText='position:fixed;left:-9999px';document.body.append(input);input.select();document.execCommand('copy');input.remove()}toast('Copiado. ¡Gracias por acompañar!')};
$('#copy-alias').addEventListener('click',()=>copy($('#bank-alias').textContent.trim()));
$('#copy-cbu').addEventListener('click',()=>copy($('#bank-cbu').textContent.trim()));
$('#share-story').addEventListener('click',async()=>{const data={title:'NOS MUEVE · Una historia en siete capítulos',text:'Una historia real, desde Ramos Mejía hasta Villa La Angostura.',url:'https://nosmueve.benitez-lencina.workers.dev/'};if(navigator.share){try{await navigator.share(data)}catch(e){if(e?.name!=='AbortError')await copy(data.text+' '+data.url)}}else await copy(data.text+' '+data.url)});
const chapters=$$('.chapter');const links=$$('.track-link');const chapterLabel=$('#current-chapter-label');
const syncCurrentChapter=()=>{const threshold=Math.min(310,window.innerHeight*.38);let current=chapters[0];for(const el of chapters){if(el.getBoundingClientRect().top<=threshold)current=el;}if(chapters[0].getBoundingClientRect().top>threshold)current=chapters[0];const n=Number(current.dataset.step);links.forEach(a=>{const active=a.hash==='#capitulo-'+n;a.classList.toggle('active',active);if(active)a.setAttribute('aria-current','step');else a.removeAttribute('aria-current')});chapterLabel.innerHTML=String(n).padStart(2,'0')+' <i>/ 07</i>';};
const syncScroll=()=>{const max=document.documentElement.scrollHeight-window.innerHeight;$('#reading-progress').style.width=(max>0?Math.max(0,Math.min(100,100*window.scrollY/max)):100)+'%';syncCurrentChapter()};
let scheduled=false;window.addEventListener('scroll',()=>{if(scheduled)return;scheduled=true;requestAnimationFrame(()=>{syncScroll();scheduled=false})},{passive:true});window.addEventListener('resize',syncScroll);syncScroll();
// Pausar otros videos al reproducir uno; no se transmite ningún dato a servidores.
$$('video').forEach(video=>video.addEventListener('play',()=>$$('video').forEach(other=>{if(other!==video&&!other.paused)other.pause()})));

const campaignNodes={goal:$('#funding-goal'),raised:$('#funding-raised'),percentage:$('#funding-percentage'),fill:$('#funding-fill'),explanation:$('#funding-explanation'),update:$('#funding-update')};
const ars=v=>new Intl.NumberFormat('es-AR',{style:'currency',currency:'ARS',maximumFractionDigits:0}).format(v);
async function loadCampaign(){
  try {
    const res=await fetch('progreso-nosmueve.json',{cache:'no-store'});
    if(!res.ok)throw Error('No se pudo consultar el progreso');
    const d=await res.json();
    const goal=Number(d.meta_ars);
    if(Number.isFinite(goal)&&goal>0)campaignNodes.goal.innerHTML=ars(goal)+' <small>ARS</small>';
    const value=d.recaudado_confirmado_ars;
    if(typeof value==='number'&&Number.isFinite(value)&&value>=0){
      const pct=Number.isFinite(goal)&&goal>0?Math.min(100,Math.max(0,value/goal*100)):null;
      campaignNodes.raised.textContent=ars(value);
      campaignNodes.percentage.textContent=pct===null?'Sin meta verificada':(pct<1&&value>0?'< 1%':Math.round(pct)+'%');
      campaignNodes.fill.style.width=pct===null?'0%':pct+'%';
      campaignNodes.explanation.textContent='Esta cifra refleja únicamente aportes conciliados. Si se reciben nuevos aportes, el total se actualiza después de verificarlos.';
      if(d.ultima_actualizacion)campaignNodes.update.textContent='Última actualización: '+d.ultima_actualizacion;
    }else{
      campaignNodes.raised.textContent='Pendiente de conciliación';
      campaignNodes.percentage.textContent='Por verificar';
      campaignNodes.fill.style.width='0%';
    }
  }catch(err){
    campaignNodes.explanation.textContent='No se pudo cargar el registro de aportes. Los importes no se estiman.';
  }
}
loadCampaign();
