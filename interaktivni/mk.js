/* Общ скрипт за уроците „Макроси в PowerPoint“ (урок 5–7).
   – MK.pp / MK.vbe / MK.options / … рисуват схематични макети на прозорците;
   – MK.walk(id, стъпки) прави стъпков пътеводител в <div class="walk" data-walk="id">;
   – всеки <pre class="vba"> става блок с оцветен код, номера на редове и бутон „Копирай“.
     Ако веднага след него има <ol class="lx"> с <li data-l="3"> или data-l="3-5",
     щракването върху обяснение маркира редовете и обратно. */
const MK=(()=>{
const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
const esc=t=>String(t).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const H=(k,o)=>o&&o.hot&&[].concat(o.hot).includes(k)?' hot':'';

/* ---------- оцветяване на VBA ---------- */
const KW=new Set("Sub End Function Dim As String Integer Long Single Double Boolean Variant Object If Then Else ElseIf For Each In Next To Step Do Loop While Until Wend Set New Call Exit Public Private Const True False Nothing And Or Not Mod With Select Case Is ByVal ByRef Option Explicit Resume GoTo On Error".split(' '));
function hl(s){let o='',i=0;
  while(i<s.length){const ch=s[i];
    if(ch==="'"){o+=`<span class="c">${esc(s.slice(i))}</span>`;break}
    if(ch=='"'){let j=s.indexOf('"',i+1);if(j<0)j=s.length-1;o+=`<span class="s">${esc(s.slice(i,j+1))}</span>`;i=j+1;continue}
    if(/[A-Za-z_]/.test(ch)){let j=i;while(j<s.length&&/[A-Za-z0-9_]/.test(s[j]))j++;const w=s.slice(i,j);o+=KW.has(w)?`<span class="k">${w}</span>`:esc(w);i=j;continue}
    o+=esc(ch);i++}
  return o}
const codeLines=(code,o={})=>code.split('\n').map((l,i)=>{const n=i+1,c=[o.cur==n&&'cur',o.err==n&&'err',o.bp==n&&'bp'].filter(Boolean).join(' ');
  const last=o.typing&&i==code.split('\n').length-1;
  return `<span class="cl ${c}">${hl(l)}${last?'<span class="typing"> </span>':''}${!l&&!last?' ':''}</span>`}).join('');

/* ---------- PowerPoint ---------- */
const rb=(k,ic,t,o)=>`<div class="rb${H('btn:'+k,o)}"><i>${ic}</i>${t}</div>`;
const grp=(name,inner)=>`<div class="grp"><div class="bs">${inner}</div><div class="gl">${name}</div></div>`;
const small=(arr,o)=>`<div class="rbs">${arr.map(([k,t])=>`<span class="${H('btn:'+k,o)}">${t}</span>`).join('')}</div>`;
function ribbon(o){
  switch(o.tab){
  case "Разработчик":return grp("Код",rb("vb","🧩","Visual Basic",o)+rb("mac","📜","Макроси",o)+rb("sec","⚠️","Защита на макросите",o))+grp("Добавки",rb("add","🧷","Добавки",o)+rb("padd","📦","Добавки за PowerPoint",o))+grp("Контроли",small([["c1","☑ Отметка"],["c2","▭ Текстово поле"],["c3","⬚ Бутон"]],o));
  case "Вмъкване":return grp("Слайдове",rb("new","🗂️","Нов слайд",o))+grp("Таблици",rb("tbl","▦","Таблица",o))+grp("Изображения",rb("pic","🖼️","Картини",o))+grp("Илюстрации",rb("shapes","🔷","Фигури",o)+rb("icons","⭐","Икони",o)+rb("smart","🧱","SmartArt",o))+grp("Връзки",rb("link","🔗","Връзка",o)+rb("action","⚡","Действие",o))+grp("Текст",rb("tbox","🅰️","Текстово поле",o));
  case "Слайдшоу":return grp("Стартиране на слайдшоуто",rb("start","▶️","От началото",o)+rb("cur","⏯️","От текущия слайд",o))+grp("Настройване",rb("setup","⚙️","Настройка на слайдшоуто",o)+rb("hide","🙈","Скриване на слайд",o));
  default:return grp("Клипборд",rb("paste","📋","Постави",o))+grp("Слайдове",rb("new","🗂️","Нов слайд",o))+grp("Шрифт",small([["f1","Calibri ▾  18 ▾"],["f2","<b>B</b> <i>I</i> <u>U</u>  A▾"]],o))+grp("Рисуване",rb("shapes","🔷","Фигури",o)+rb("arr","🧭","Подреди",o))+grp("Редактиране",small([["find","🔍 Намери"],["sel","⬚ Избери ▾"]],o));
  }}
const defSlide=`<div class="t1">Щракнете, за да добавите заглавие</div><div class="t2">Щракнете, за да добавите подзаглавие</div>`;
function pp(o={}){
  const tabs=["Файл","Начало","Вмъкване","Проектиране","Преходи","Анимации","Слайдшоу","Преглед","Изглед"];
  if(o.dev)tabs.push("Разработчик");
  const th=o.thumbs||[o.slide||defSlide];
  const name=o.file||"Презентация1";
  let inner;
  if(o.backstage){
    const items=["⟵","Начало","Нов","Отваряне","|","Информация","Запиши","Запиши като","Печат","Споделяне","Експортиране","Затвори","~","Акаунт","Опции"];
    inner=`<div class="bks"><div class="side">${items.map(t=>t=="|"?'<span class="sep"></span>':t=="~"?'<span class="grow"></span>':`<span class="${H('bs:'+t,o)}">${t}</span>`).join('')}</div><div class="main">${o.bsMain||`<h2>Добър ден</h2><p style="color:#605e5c">Нова презентация · Последни · Закачени</p><div style="display:flex;gap:12px;margin-top:14px"><div style="width:150px;aspect-ratio:16/9;border:1px solid #c8c6c4;display:flex;align-items:center;justify-content:center">Празна презентация</div><div style="width:150px;aspect-ratio:16/9;border:1px solid #c8c6c4;background:#13246e"></div></div>`}</div></div>`;
  }else{
    inner=`<div class="tabs">${tabs.map(t=>`<span class="${t==o.tab?'on':''}${t=="Разработчик"&&o.devNew?' new':''}${H('tab:'+t,o)}">${t}</span>`).join('')}</div>
    ${o.warn?`<div class="warn"><span>🛡️</span><b>ПРЕДУПРЕЖДЕНИЕ ЗА ЗАЩИТА</b><span>Макросите са забранени.</span><span class="wbtn${H('warn',o)}">Разреши съдържанието</span></div>`:''}
    <div class="rib">${ribbon(o)}</div>
    <div class="body"${o.pane?' style="grid-template-columns:110px minmax(0,1fr) 190px"':''}><div class="thumbs">${th.map((t,i)=>`<div class="th${i==(o.cur||0)?' on':''}"><span>${i+1}</span><div>${t}</div></div>`).join('')}</div>
    <div class="cv"><div class="sl">${o.slide||defSlide}</div></div>${o.pane?`<div class="pane"><div class="pnh">Селекция <span>✕</span></div><div class="pnb"><span>Покажи всички</span><span>Скрий всички</span></div>${o.pane.map(([t,k])=>`<div class="pni${k?H(k,o):''}${t.startsWith('*')?' on':''}"><span>${t.replace(/^\*/,'')}</span><span>👁</span></div>`).join('')}</div>`:''}</div>
    <div class="stb"><span>Слайд ${(o.cur||0)+1} от ${th.length}</span><span>${o.file&&/pptm/.test(o.file)?'🔒 Файл с макроси (.pptm) · ':''}Български</span></div>`;
  }
  return `<div class="pp"><div class="tb"><span class="lg">P</span><span>💾 ↶ ↷</span><span class="ttl">${esc(name)} – PowerPoint</span><span class="wb">–□✕</span></div>${inner}
  ${o.drop?`<div class="dropdown" style="left:${o.drop.x}px;top:${o.drop.y}px">${o.drop.html}</div>`:''}
  ${o.ovl?`<div class="ovl${o.ovlTop?' top':''}">${o.ovl}</div>`:''}</div>`;
}

/* ---------- диалози ---------- */
const dlg=(title,body,foot,o={},w)=>`<div class="dlg" style="${w?'width:'+w+'px':''}"><div class="dt"><b>${title}</b><span>?  ✕</span></div>${body}${foot?`<div class="df">${foot}</div>`:''}</div>`;
const bt=(k,t,o,pr)=>`<span class="bt${pr?' pr':''}${H(k,o)}">${t}</span>`;
function options(o={}){
  const L=["Общи","Корекция","Записване","Език","Достъпност","Разширени","Персонализиране на лентата","Лента с инструменти за бърз достъп","Добавки","Център за сигурност"];
  const sel=o.sec=="trust"?"Център за сигурност":"Персонализиране на лентата";
  let right;
  if(o.sec=="trust")right=`<div class="db"><b style="font-size:14px">Център за сигурност</b><p style="margin:8px 0 14px;color:#444">Защитава документите и компютъра. Не променяйте тези настройки, ако не знаете какво правят.</p><div style="display:flex;justify-content:space-between;align-items:center;border-top:1px solid #e1dfdd;padding-top:12px"><span>Център за сигурност на Microsoft PowerPoint</span>${bt('btn:tc','Настройки на центъра за сигурност…',o)}</div></div>`;
  else{
    const tabs=[["Начало",1],["Вмъкване",1],["Рисуване",1],["Проектиране",1],["Преходи",1],["Анимации",1],["Слайдшоу",1],["Записване",0],["Преглед",1],["Изглед",1],["Разработчик",o.checked?1:0],["Добавки",1],["Помощ",1]];
    right=`<div class="db"><b style="font-size:14px">Персонализиране на лентата</b>
    <div style="display:grid;grid-template-columns:1fr 70px 1fr;gap:8px;margin-top:10px;align-items:start">
    <div>Избор на команди от:<div class="sel" style="margin:4px 0">Популярни команди</div><div class="tree"><div>Анимации</div><div>Връзка</div><div>Действие</div><div>Запиши</div><div>Макроси</div><div>Нов слайд</div><div>Отваряне</div><div>Печат</div></div></div>
    <div style="display:flex;flex-direction:column;gap:6px;margin-top:90px"><span class="bt" style="min-width:0;padding:3px 4px">Добави »</span><span class="bt" style="min-width:0;padding:3px 4px">« Премахни</span></div>
    <div>Персонализиране на лентата:<div class="sel" style="margin:4px 0">Основни раздели</div><div class="tree">${tabs.map(([t,c])=>`<div class="cb${c?' on':''}${H('cb:'+t,o)}" style="display:${t=='Разработчик'?'inline-flex':'flex'}"><i></i>${t}</div>`).join('')}</div></div></div></div>`;
  }
  return dlg("Опции на PowerPoint",`<div class="two"><div class="lst">${L.map(t=>`<span class="${t==sel&&o.sel!==false?'on':''}${H('ls:'+t,o)}">${t}</span>`).join('')}</div>${right}</div>`,bt('ok','OK',o,1)+bt('no','Отказ',o),o,680);
}
const LEVELS=["Забрани VBA макросите без уведомяване","Забрани VBA макросите с уведомяване","Забрани VBA макросите освен цифрово подписаните","Разреши VBA макросите (не се препоръчва; може да се изпълни потенциално опасен код)"];
function trust(o={}){
  const L=["Надеждни издатели","Надеждни местоположения","Надеждни документи","Добавки","Настройки за ActiveX","Настройки за макроси","Защитен изглед","Лента за съобщения","Блокиране на файлове","Опции за поверителност"];
  return dlg("Център за сигурност",`<div class="two"><div class="lst">${L.map(t=>`<span class="${t=="Настройки за макроси"?'on':''}">${t}</span>`).join('')}</div><div class="db"><b style="font-size:14px">Настройки за макроси</b><div style="margin-top:10px">${LEVELS.map((t,i)=>`<div class="rad${i==(o.level??1)?' on':''}${H('lv:'+i,o)}"><i></i><span>${t}</span></div>`).join('')}</div><div style="border-top:1px solid #e1dfdd;margin-top:12px;padding-top:8px;color:#605e5c">Настройки на макроси за разработчици</div><div class="cb"><i></i>Достъп до обектния модел на VBA проекта</div></div></div>`,bt('ok','OK',o,1)+bt('no','Отказ',o),o,640);
}
const TYPES=["Презентация на PowerPoint (*.pptx)","Презентация на PowerPoint с разрешени макроси (*.pptm)","Презентация на PowerPoint 97-2003 (*.ppt)","PDF (*.pdf)","Слайдшоу на PowerPoint с разрешени макроси (*.ppsm)"];
function save(o={}){
  const type=o.type??0;
  const list=o.open?`<div style="position:absolute;left:96px;right:14px;top:100%;margin-top:-2px;background:#fff;border:1px solid #8a8886;box-shadow:0 6px 14px rgba(0,0,0,.2);z-index:4">${TYPES.map((t,i)=>`<div style="padding:3px 8px" class="${i==1?H('ty:1',o):''}">${t}</div>`).join('')}</div>`:'';
  return dlg("Записване като",`<div class="db"><div style="display:flex;gap:8px;align-items:center;margin-bottom:8px"><span>← → ↑</span><div class="fld" style="flex:1">Този компютър › Документи › Информатика</div></div>
  <div style="display:grid;grid-template-columns:130px 1fr;gap:8px"><div class="tree" style="height:130px"><div>⭐ Бърз достъп</div><div>🖥️ Работен плот</div><div>📄 Документи</div><div>⬇️ Изтегляния</div></div><div class="tree" style="height:130px"><div>📊 Проект-ИТ.pptx</div><div>📊 Вируси и защита.pptx</div></div></div>
  <div style="display:grid;grid-template-columns:90px 1fr;gap:6px 8px;align-items:center;margin-top:10px;position:relative"><span>Име на файла:</span><div class="fld">${esc(o.name||"Презентация1")}</div><span>Запиши като тип:</span><div class="sel${H('type',o)}">${TYPES[type]}</div>${list}</div></div>`,bt('save','Запиши',o,1)+bt('no','Отказ',o),o,600);
}
function macros(o={}){
  const names=o.names||["Pozdrav"];const s=o.sel||names[0];
  return dlg("Макрос",`<div class="db" style="display:grid;grid-template-columns:1fr 110px;gap:12px"><div>Име на макрос:<div class="fld" style="margin:4px 0">${esc(s)}</div><div class="mlist">${names.map(n=>`<div class="${n==s?'on':''}${H('m:'+n,o)}">${esc(n)}</div>`).join('')}</div><div style="margin-top:8px">Макрос в:</div><div class="sel" style="margin-top:4px">${esc(o.file||"Презентация1.pptm")}</div></div>
  <div class="vbtn" style="margin-top:18px">${bt('run','Изпълни',o,1)}${bt('no','Отказ',o)}${bt('step','Влез в',o)}${bt('edit','Редактирай',o)}${bt('create','Създай',o)}${bt('del','Изтрий',o)}</div></div>`,'',o,420);
}
function action(o={}){
  const ch=o.choice??0,m=o.macro||"Pozdrav",names=o.names||[m];
  const r=(i,k,t,extra='')=>`<div class="rad${ch==i?' on':''}${H(k,o)}"><i></i><span style="flex:1">${t}${extra}</span></div>`;
  const list=o.open?`<div style="border:1px solid #8a8886;background:#fff;margin:-2px 0 4px 24px;box-shadow:0 6px 14px rgba(0,0,0,.2)">${names.map(n=>`<div style="padding:3px 8px" class="${H('m:'+n,o)}">${esc(n)}</div>`).join('')}</div>`:'';
  return dlg("Настройки на действие",`<div class="db"><div class="gtabs"><span class="on">Щракване с мишката</span><span>Посочване с мишката</span></div><b>Действие при щракване</b><div style="margin-top:6px">
  ${r(0,'r:none','Няма действие')}${r(1,'r:link','Хипервръзка към:')}<div class="sel" style="margin:0 0 4px 24px;opacity:.5">Следващ слайд</div>
  ${r(2,'r:prog','Изпълнение на програма:')}${r(3,'r:macro','Изпълнение на макрос:')}<div class="sel${H('sel:macro',o)}" style="margin:0 0 4px 24px;${ch==3?'':'opacity:.5'}">${ch==3&&o.picked!==false?esc(m):''}</div>${list}
  ${r(4,'r:obj','Действие на обект:')}<div class="cb" style="margin-top:8px"><i></i>Изпълнение на звук: [Без звук]</div></div></div>`,bt('ok','OK',o,1)+bt('no','Отказ',o),o,380);
}
function msg(o={}){
  const ic={inf:"i",exc:"!",que:"?",cri:"✕"}[o.icon];
  return `<div class="msg"><div class="dt"><span>${esc(o.title||"Microsoft PowerPoint")}</span><span>✕</span></div>
  <div class="mb">${ic?`<span class="ic ${o.icon}">${ic}</span>`:''}<div style="white-space:pre-wrap;flex:1">${esc(o.text||"")}</div>${o.input!=null?`<div style="display:flex;flex-direction:column;gap:6px">${(o.buttons||["OK","Cancel"]).map((b,i)=>`<span class="bt${i==0?' pr':''}${H('mb:'+b,o)}">${b}</span>`).join('')}</div>`:''}</div>
  ${o.input!=null?`<div class="fld">${esc(o.input)}${o.typing?'<span class="typing"> </span>':''}</div><div style="height:12px"></div>`:`<div class="mf">${(o.buttons||["OK"]).map((b,i)=>`<span class="bt${i==0?' pr':''}${H('mb:'+b,o)}">${b}</span>`).join('')}</div>`}</div>`;
}

function setup(o={}){
  const ch=o.choice??0,r=(i,t)=>`<div class="rad${ch==i?' on':''}${H('st:'+i,o)}"><i></i><span>${t}</span></div>`;
  return dlg("Настройка на слайдшоуто",`<div class="db" style="display:grid;grid-template-columns:1fr 1fr;gap:16px"><div><b>Тип на показване</b><div style="border:1px solid #c8c6c4;padding:6px;margin-top:4px">${r(0,'Представяне от говорител (на цял екран)')}${r(1,'Разглеждане от индивидуален потребител (в прозорец)')}${r(2,'Разглеждане в павилион (на цял екран)')}</div>
  <b style="display:block;margin-top:10px">Опции за показване</b><div class="cb${ch==2?' on':''}"><i></i>Непрекъснато до натискане на „Esc“</div><div class="cb"><i></i>Показване без разказ</div><div class="cb"><i></i>Показване без анимация</div></div>
  <div><b>Показване на слайдове</b><div class="rad on"><i></i>Всички</div><div class="rad"><i></i>От: 1 До: 7</div><b style="display:block;margin-top:10px">Смяна на слайдовете</b><div class="rad${ch==2?'':' on'}"><i></i>Ръчно</div><div class="rad${ch==2?' on':''}"><i></i>Използване на времена, ако има</div></div></div>`,bt('ok','OK',o,1)+bt('no','Отказ',o),o,560);
}
/* ---------- VBA редактор ---------- */
const MENUS={File:["Save  Ctrl+S","Close and Return to PowerPoint  Alt+Q"],Insert:["UserForm","Module","Class Module","—","File…"],Debug:["Compile VBAProject","—","Step Into  F8","Step Over  Shift+F8","—","Toggle Breakpoint  F9"],Run:["Run Sub/UserForm  F5","Break  Ctrl+Break","Reset","—","Design Mode"],View:["Code  F7","Project Explorer  Ctrl+R","Immediate Window  Ctrl+G","Properties Window  F4"]};
function vbe(o={}){
  const mn=["File","Edit","View","Insert","Format","Debug","Run","Tools","Add-Ins","Window","Help"];
  const file=o.file||"Презентация1";
  const mods=o.modules||(o.module?["Module1"]:[]);
  const menu=mn.map(m=>{let dd='';if(o.menu==m)dd=`<div class="dd" style="left:0;top:100%">${MENUS[m].map(t=>t=="—"?'<hr>':`<div class="${H('mi:'+t.split('  ')[0],o)}"><span>${t.split('  ')[0]}</span><span style="color:#777">${t.split('  ')[1]||''}</span></div>`).join('')}</div>`;
    return `<span style="position:relative" class="${o.menu==m?'on':''}${H('mn:'+m,o)}">${m}${dd}</span>`}).join('');
  const code=o.code!=null?`<div class="cw"><div class="ch"><span>${esc(file)} - ${mods[0]||'Module1'} (Code)</span><span>– □ ✕</span></div><div class="cc"><span>(General)</span><span>${esc(o.proc||'(Declarations)')}</span></div><div class="code">${codeLines(o.code,o)}</div></div>`:`<div style="background:#8f8f8f;margin:0"></div>`;
  return `<div class="vbe"><div class="tb"><span>🧩</span><span class="ttl">Microsoft Visual Basic for Applications - ${esc(file)}${o.mode?' ['+o.mode+']':''}</span><span>– □ ✕</span></div>
  <div class="mnu">${menu}</div>
  <div class="tool"><span>🅿️</span><span>💾</span><span class="sp"></span><span>✂️</span><span>📋</span><span class="sp"></span><span>↶</span><span>↷</span><span class="sp"></span><span class="run${H('run',o)}">▶</span><span class="brk">⏸</span><span class="rst${H('reset',o)}">■</span><span class="sp"></span><span>📐</span><span>🔍</span><span style="margin-left:auto;font-size:11px;color:#555">Ln ${o.ln||1}, Col 1</span></div>
  <div class="wk"><div class="prj"><div class="ph">Project - VBAProject</div><div class="pt"><div>⊟ 📁 VBAProject (${esc(file)})</div>${mods.length?`<div>&nbsp;&nbsp;&nbsp;⊟ 📁 Modules</div>${mods.map((m,i)=>`<div class="${i==0?'on':''}${H('mod:'+m,o)}">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;📄 ${m}</div>`).join('')}`:''}</div>
  <div class="props"><div class="ph">Properties - ${mods[0]||''}</div>${mods.length?`<table><tr><td>(Name)</td><td>${mods[0]}</td></tr></table>`:''}</div></div>
  <div style="display:flex;flex-direction:column">${code}${o.imm!=null?`<div class="imm"><div class="ch">Immediate</div><pre>${esc(o.imm)}</pre></div>`:''}</div></div>
  ${o.tip?`<div class="vtip" style="left:${o.tip.x}px;top:${o.tip.y}px">${esc(o.tip.t)}</div>`:''}
  ${o.ovl?`<div class="ovl">${o.ovl}</div>`:''}</div>`;
}
const vbErr=(text,o={})=>msg({title:"Microsoft Visual Basic for Applications",icon:o.icon||"exc",text,buttons:["OK","Help"],hot:o.hot});
function show(o={}){return `<div class="show"><div class="sl">${o.slide||defSlide}</div>${o.ovl?`<div class="ovl">${o.ovl}</div>`:''}</div>`}
const slide=h=>`<div class="sl">${h}</div>`;

/* ---------- мащабиране на сцените ---------- */
function fit(){$$('.stage').forEach(s=>{const w=s.parentElement.clientWidth;if(w)s.style.zoom=Math.min(1.4,w/760)})}
addEventListener('resize',fit);
function put(id,html){const el=$(`[data-mk="${id}"]`);if(!el)return;el.innerHTML=`<div class="stage">${html}</div>`;fit()}

/* ---------- стъпков пътеводител ---------- */
function walk(id,steps){
  const el=$(`[data-walk="${id}"]`);if(!el)return;
  el.innerHTML=`<div class="wbar"><h3>${el.dataset.title||''}</h3><span class="wnum"></span></div><div class="wscr"><div class="stage"></div></div>
  <div class="wcap"><span class="n"></span><div><h4></h4><p></p></div></div>
  <div class="wnav"><button type="button" class="btn ghost" data-a="p">← Назад</button><div class="wdots">${steps.map((s,i)=>`<button type="button" aria-label="Стъпка ${i+1}: ${esc(s.t)}">${i+1}</button>`).join('')}</div><button type="button" class="btn" data-a="n">Напред →</button></div>
  <p class="note" style="margin:8px 2px 0">👆 Щракни върху светещото място в картинката или използвай бутоните. Клавиши: <kbd>←</kbd> <kbd>→</kbd>.</p>`;
  el.tabIndex=-1;
  const st=$('.stage',el),dots=$$('.wdots button',el),P=$('[data-a=p]',el),N=$('[data-a=n]',el);let i=0;
  function go(k){i=Math.max(0,Math.min(steps.length-1,k));const s=steps[i];
    st.innerHTML=typeof s.m=="function"?s.m():s.m;
    $('.wnum',el).textContent=`Стъпка ${i+1} от ${steps.length}`;
    $('.wcap .n',el).textContent=i+1;$('.wcap h4',el).textContent=s.t;$('.wcap p',el).innerHTML=s.c;
    dots.forEach((d,j)=>{d.className=j==i?'on':j<i?'done':'';d.setAttribute('aria-current',j==i?'step':'false')});
    P.disabled=i==0;N.textContent=i==steps.length-1?'↺ Отначало':'Напред →';fit()}
  P.onclick=()=>go(i-1);N.onclick=()=>go(i==steps.length-1?0:i+1);
  dots.forEach((d,j)=>d.onclick=()=>go(j));
  st.addEventListener('click',e=>{if(e.target.closest('.hot')&&i<steps.length-1)go(i+1)});
  el.addEventListener('keydown',e=>{if(e.target.closest('input,select,textarea'))return;if(e.key=='ArrowRight'){e.preventDefault();go(i+1)}if(e.key=='ArrowLeft'){e.preventDefault();go(i-1)}});
  go(0);
}

/* ---------- блокове с код ---------- */
function codes(){
  $$('pre.vba').forEach(pre=>{
    const src=pre.textContent.replace(/^\n+/,'').replace(/\s+$/,'');
    const lines=src.split('\n');
    const box=document.createElement('div');box.className='vba-box';
    box.innerHTML=`<div class="hd"><span>📄 ${esc(pre.dataset.title||'Module1')}</span><button type="button">📋 Копирай</button></div><div class="lines">${lines.map((l,i)=>`<div class="ln" data-n="${i+1}"><b>${i+1}</b><span>${hl(l)||' '}</span></div>`).join('')}</div>`;
    const notes=pre.dataset.notes&&document.getElementById(pre.dataset.notes);
    pre.replaceWith(box);
    const cbtn=$('.hd button',box);
    cbtn.onclick=()=>{const done=()=>{cbtn.textContent='✔ Копирано';setTimeout(()=>cbtn.textContent='📋 Копирай',1600)};
      if(navigator.clipboard)navigator.clipboard.writeText(src).then(done,()=>{});else{const t=document.createElement('textarea');t.value=src;document.body.append(t);t.select();try{document.execCommand('copy');done()}catch(e){}t.remove()}};
    const ol=notes||box.nextElementSibling;
    if(ol&&ol.matches('ol.lx')){box.classList.add('has-notes');
      const lis=$$('li',ol),rng=li=>{const r=[];String(li.dataset.l).split(',').forEach(p=>{const[a,b]=p.split('-').map(Number);for(let n=a;n<=(b||a);n++)r.push(n)});return r};
      const mark=li=>{lis.forEach(x=>x.classList.toggle('on',x==li));const r=li?rng(li):[];$$('.ln',box).forEach(l=>l.classList.toggle('on',r.includes(+l.dataset.n)))};
      lis.forEach(li=>{li.tabIndex=0;li.onclick=()=>mark(li);li.onkeydown=e=>{if(e.key=='Enter'||e.key==' '){e.preventDefault();mark(li)}}});
      $$('.ln',box).forEach(l=>l.onclick=()=>{const li=lis.find(x=>rng(x).includes(+l.dataset.n));mark(li||null);if(li)li.scrollIntoView({block:'nearest',behavior:'smooth'})});
    }
  });
}

/* ---------- „Намери грешката“: <div class="bug" data-bad="3" data-ok="обяснение"> ---------- */
function bugs(){
  $$('.bug').forEach(b=>{const bad=+b.dataset.bad,res=$('.res',b);
    $$('.ln',b).forEach(l=>l.onclick=e=>{e.stopPropagation();$$('.ln',b).forEach(x=>x.classList.remove('good','badl'));
      if(+l.dataset.n==bad){l.classList.add('good');res.innerHTML='✔ Точно така! '+b.dataset.ok;res.style.color='#0b6b34'}
      else{l.classList.add('badl');res.textContent='✘ Този ред е наред. Опитай пак.';res.style.color='#a3260b'}});
  });
}

/* ---------- проверка на име на макрос ---------- */
const RESERVED=new Set([...KW].map(w=>w.toLowerCase()).concat(["msgbox","inputbox","print","date","time","name"]));
function checkName(n){
  n=n.trim();
  if(!n)return[0,"Напиши име."];
  if(/\s/.test(n))return[0,"Името не може да съдържа интервал. Пиши слято: KamSlaid3 или Kam_Slaid_3."];
  if(/^[0-9]/.test(n))return[0,"Името трябва да започва с буква, не с цифра."];
  if(/^_/.test(n))return[0,"Името трябва да започва с буква, не с долна черта."];
  if(/[^A-Za-z0-9_Ѐ-ӿ]/.test(n))return[0,"Позволени са само букви, цифри и долна черта (_). Без тирета, точки, ! ? и други знаци."];
  if(n.length>255)return[0,"Името е твърде дълго."];
  if(RESERVED.has(n.toLowerCase()))return[0,`„${n}“ е запазена дума или име на вградена функция във VBA. Избери друго.`];
  if(/[Ѐ-ӿ]/.test(n))return[1,"Технически е позволено, но кирилицата може да се покаже като ???? на компютър с друг език. Препоръка: латиница, напр. Pozdrav."];
  return[1,"Името е правилно! ✔"];
}

const init=()=>{codes();bugs();fit()};
return{hl,codeLines,pp,vbe,options,trust,save,macros,action,msg,setup,vbErr,show,slide,put,walk,fit,init,checkName,LEVELS,esc};
})();
