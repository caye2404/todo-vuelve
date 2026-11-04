'use strict';
const BASE='https://kytneqghybtvkgsitkbm.supabase.co';
const KEY='sb_publishable_k6IdQGtHMZxvGn_beWu8Rg_zm4CFy1R';
const STORAGE='todo_vuelve_admin_sesion';
const $=id=>document.getElementById(id);
let session=null,records=[],current=null;
function say(id,message,error=false){$(id).textContent=message;$(id).classList.toggle('error',error)}
function sessionSave(s){session={...s,expires_at:s.expires_at||Math.floor(Date.now()/1000)+s.expires_in};sessionStorage.setItem(STORAGE,JSON.stringify(session))}
function sessionClear(){session=null;sessionStorage.removeItem(STORAGE)}
async function token(grant,body){
 const r=await fetch(BASE+'/auth/v1/token?grant_type='+encodeURIComponent(grant),
  {method:'POST',headers:{apikey:KEY,'Content-Type':'application/json'},body:JSON.stringify(body)});
 const json=await r.json().catch(()=>({}));
 if(!r.ok)throw new Error(json.msg||json.error_description||json.message||'No fue posible iniciar sesión');
 return json;
}
async function ensureToken(){
 if(!session?.access_token)throw new Error('Tenés que iniciar sesión');
 if(Number(session.expires_at||0)<Math.floor(Date.now()/1000)+90){
  if(!session.refresh_token)throw new Error('La sesión expiró');
  sessionSave(await token('refresh_token',{refresh_token:session.refresh_token}));
 }
 return session.access_token;
}
async function rpc(name,args={}){
 const jwt=await ensureToken();
 const response=await fetch(BASE+'/rest/v1/rpc/'+encodeURIComponent(name),{
  method:'POST',cache:'no-store',
  headers:{apikey:KEY,Authorization:'Bearer '+jwt,'Content-Type':'application/json'},
  body:JSON.stringify(args)
 });
 const json=await response.json().catch(()=>null);
 if(!response.ok)throw new Error(json?.message||'No se pudo consultar la base de datos');
 return json;
}
function showLogin(message=''){
 $('dashboard').hidden=true;$('loginPanel').hidden=false;
 if(message)say('loginMessage',message,true);
}
function showDashboard(){
 $('loginPanel').hidden=true;$('dashboard').hidden=false;
 $('password').value='';
}
async function load(){
 const result=await rpc('tv_admin_list');
 if(!Array.isArray(result)||result.length!==300)throw new Error('El registro no devolvió los 300 números completos. No se mostraron datos.');
 records=result;showDashboard();updateStats();render();say('panelMessage','Datos cargados desde Supabase. '+new Date().toLocaleString('es-AR'));
}
async function handleLogin(e){
 e.preventDefault();
 const b=$('loginBtn');b.disabled=true;say('loginMessage','Verificando acceso…');
 try{
  sessionSave(await token('password',{email:$('email').value.trim(),password:$('password').value}));
  await load();
 }catch(err){sessionClear();showLogin(err.message||'No autorizado')}
 finally{b.disabled=false}
}
function updateStats(){
 $('total').textContent=records.length;
 $('free').textContent=records.filter(x=>x.estado==='disponible').length;
 $('reserved').textContent=records.filter(x=>x.estado==='reservado').length;
 $('paid').textContent=records.filter(x=>x.estado==='pagado').length;
}
function addCell(row,value){
 const td=document.createElement('td');td.textContent=value??'—';row.appendChild(td);return td;
}
function fmtDate(date){
 try{return new Date(date).toLocaleString('es-AR',{dateStyle:'short',timeStyle:'short'})}catch{return '—'}
}
function render(){
 const search=$('search').value.trim().toLocaleLowerCase('es-AR'),filter=$('filter').value;
 const list=records.filter(x=>(filter==='todos'||x.estado===filter)&&
  (!search||[String(x.numero).padStart(3,'0'),x.participante_nombre,x.participante_contacto].some(z=>String(z||'').toLocaleLowerCase('es-AR').includes(search))));
 const body=$('rows');body.replaceChildren();const frag=document.createDocumentFragment();
 for(const item of list){
  const tr=document.createElement('tr');
  addCell(tr,String(item.numero).padStart(3,'0'));
  const td=addCell(tr,'');const chip=document.createElement('span');chip.className='chip '+item.estado;chip.textContent=({disponible:'Sin asignar',reservado:'Reservado',pagado:'Pagado',anulado:'Anulado'})[item.estado]||item.estado;td.appendChild(chip);
  addCell(tr,item.participante_nombre);addCell(tr,item.participante_contacto);addCell(tr,fmtDate(item.actualizado_en));
  const action=document.createElement('td'),b=document.createElement('button');b.className='secondary';b.type='button';b.textContent='Editar';b.addEventListener('click',()=>openEditor(item));action.appendChild(b);tr.appendChild(action);frag.appendChild(tr);
 }
 body.appendChild(frag);
 say('panelMessage','Mostrando '+list.length+' de '+records.length+' números.');
}
function openEditor(item){
 current=item;$('editTitle').textContent='Número '+String(item.numero).padStart(3,'0');
 $('editStatus').value=item.estado;
 $('editName').value=item.participante_nombre||'';
 $('editContact').value=item.participante_contacto||'';
 $('editReference').value=item.referencia_pago||'';
 $('editNotes').value=item.notas||'';
 say('editMessage','');
 $('editor').showModal();
}
async function saveEdit(e){
 e.preventDefault();if(!current)return;
 const estado=$('editStatus').value,nombre=$('editName').value.trim(),contacto=$('editContact').value.trim();
 if(['reservado','pagado'].includes(estado)&&(!nombre||!contacto)){say('editMessage','Completá nombre y contacto.',true);return}
 if(estado==='disponible'&&current.estado==='pagado'&&!confirm('Este número está registrado como pagado. ¿Confirmás que querés desasignarlo?'))return;
 const b=$('saveBtn');b.disabled=true;say('editMessage','Guardando en Supabase…');
 try{
  await rpc('tv_admin_guardar',{p_numero:current.numero,p_estado:estado,p_nombre:nombre,p_contacto:contacto,p_referencia:$('editReference').value.trim(),p_notas:$('editNotes').value.trim(),p_actualizado_en:current.actualizado_en});
  $('editor').close();current=null;await load();
 }catch(err){say('editMessage',err.message||'No se pudo guardar.',true)}
 finally{b.disabled=false}
}
function exportBackup(){
 if(!records.length)return;
 const json=JSON.stringify({nombre:'TODO VUELVE',exportado_en:new Date().toISOString(),participantes:records},null,2);
 const blob=new Blob([json],{type:'application/json;charset=utf-8'}),url=URL.createObjectURL(blob);
 const a=document.createElement('a');a.href=url;a.download='todo-vuelve-respaldo-'+new Date().toISOString().slice(0,10)+'.json';a.click();
 setTimeout(()=>URL.revokeObjectURL(url),1000);
}
function logout(){
 sessionClear();records=[];$('rows').replaceChildren();$('password').value='';showLogin();say('loginMessage','Sesión cerrada.');
}
$('loginForm').addEventListener('submit',handleLogin);
$('editForm').addEventListener('submit',saveEdit);
$('filter').addEventListener('change',render);
$('search').addEventListener('input',render);
$('closeEditor').addEventListener('click',()=>$('editor').close());
$('cancelEdit').addEventListener('click',()=>$('editor').close());
$('logoutBtn').addEventListener('click',logout);
$('exportBtn').addEventListener('click',exportBackup);
$('refreshBtn').addEventListener('click',async()=>{try{await load()}catch(err){say('panelMessage',err.message,true)}});
try{const stored=sessionStorage.getItem(STORAGE);if(stored){session=JSON.parse(stored);load().catch(e=>{logout();showLogin(e.message)})}}catch{sessionClear()}
