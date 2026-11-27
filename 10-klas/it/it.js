/* Модул „Информационни технологии – 10. клас“.
   Преди този файл страницата задава CUR – номер на урока (индекс в P), -1 за началната страница.
   Тук са: менюто, оцветяване на Python код, упражнения (classify, order), проследяване на код (trace),
   Python в браузъра (Pyodide, зарежда се при първото натискане на „Изпълни“) и симулатор на чатбот. */
const G=[
 {n:"Начало",ic:"🧭",full:"Преговор",r:[0]},
 {n:"Информация",ic:"🟣",full:"Обработка на информацията и комуникация",r:[1,2,3,4]},
 {n:"Програмиране и ИИ",ic:"🔵",full:"Програмиране и изкуствен интелект",r:[5,6,7,8,9,10,11,12,13]},
 {n:"Проблеми и безопасност",ic:"🟢",full:"Решаване на проблеми и безопасност",r:[14,15,16,17,18]},
 {n:"Обобщение",ic:"🏁",full:"Какво научихте в 10. клас",r:[19,20]}];
/* [файл, заглавие, етикет в менюто] */
const P=[
 ["preg.html","Преговор и входно ниво","П"],
 ["urok-01-validnost-na-informaciyata.html","Оценяване на валидността и надеждността на информацията","1"],
 ["urok-02-digitalno-satrudnichestvo.html","Съвременни технологични средства за дигитално сътрудничество","2"],
 ["urok-03-ii-i-informaciyata.html","Изкуственият интелект и информацията","3"],
 ["test-1-informaciya.html","Тест: Обработка на информацията и комуникация","Т"],
 ["urok-04-algoritam.html","Алгоритъм","4"],
 ["urok-05-psevdokod-i-python.html","Представяне на алгоритми чрез псевдокод и език за програмиране","5"],
 ["urok-06-danni-v-python.html","Първи стъпки с данни в Python","6"],
 ["urok-07-nabori-ot-danni.html","Набори от данни: откриване и зареждане","7"],
 ["urok-08-obrabotka-i-vizualizacia.html","Обработка и визуализация на данни (упражнение)","8"],
 ["urok-09-obuchenie-na-ii.html","Как се обучава изкуственият интелект","9"],
 ["urok-10-dannite-okolo-nas.html","Данните около нас и работата с ИИ","10"],
 ["urok-11-proekt-analiz-na-danni.html","Проект: „Анализ на реален набор от данни“","11"],
 ["test-2-programirane-i-ii.html","Тест: Програмиране и изкуствен интелект","Т"],
 ["urok-12-reshavane-na-problemi.html","Решаване на проблеми, възникнали при използване на дигитални технологии","12"],
 ["urok-13-reshavane-na-problemi-uprazhnenie.html","Решаване на проблеми (упражнение)","13"],
 ["urok-14-chatbot-pomoshtnik.html","Чатбот с изкуствен интелект като помощник при решаване на проблеми","14"],
 ["urok-15-zdrave-i-okolna-sreda.html","Дигиталните технологии, здравето и околната среда","15"],
 ["test-3-problemi-i-bezopasnost.html","Тест: Решаване на проблеми и безопасност","Т"],
 ["obobshtenie.html","Какво научихте в 10. клас (обобщение)","О"],
 ["test-godishen.html","Какво научихте в 10. клас (тест)","Т"]];
const cur=typeof CUR=="number"?CUR:-1;
function go(i){location.href=i<0||!P[i]?"index.html":P[i][0]}

/* ---------- меню ---------- */
let og=-1;
function tg(g,e){e.stopPropagation();og=og==g?-1:g;nav()}
document.addEventListener("click",e=>{if(e.target.closest&&e.target.closest(".menu a"))return;if(og!=-1){og=-1;nav()}});
document.addEventListener("keydown",e=>{if(e.key=="Escape"&&og!=-1){og=-1;nav()}});
const items=g=>g.r.map(i=>`<a class="${i==cur?'on':''}" href="${P[i][0]}"${i==cur?' aria-current="page"':''}><span class="n">${P[i][2]}</span><span class="t">${P[i][1]}</span></a>`).join("");
function navIndex(){
  document.getElementById("nav").innerHTML='<a class="grp home" href="https://itzona.github.io/">🏠 Начало</a><a class="grp" href="../index.html">🎓 10. клас</a>'+G.map((g,gi)=>
    `<div class="dd"><button class="grp ${g.r.includes(cur)?'on':''}" onclick="tg(${gi},event)" aria-expanded="${og==gi}">${g.ic} ${g.n} ▾</button><div class="menu" style="display:${og==gi?'block':'none'}"><div class="mh">${g.full}</div>${items(g)}</div></div>`).join("");
}
function navLesson(){
  let bar=document.getElementById("itzbar");
  if(!bar){
    const st=document.createElement("style");
    st.textContent=`#itzbar{background:var(--card);border-bottom:1px solid var(--line);font-family:Inter,Manrope,system-ui,sans-serif;position:relative;z-index:20}
#itzbar .itzb-in{max-width:1140px;margin:0 auto;padding:8px max(5vw,16px);display:flex;flex-wrap:wrap;gap:6px;align-items:center}
#itzbar .itzb-g{font-family:inherit;font-weight:700;font-size:14px;line-height:1;color:var(--ink);background:none;border:1px solid var(--line);border-radius:9px;padding:10px 14px;min-height:40px;cursor:pointer;text-decoration:none;display:inline-flex;align-items:center;gap:6px}
#itzbar .itzb-g:hover{background:var(--line)}
#itzbar .itzb-g.on{background:var(--acc);border-color:var(--acc);color:#fff}
#itzbar .itzb-dd{position:relative}
#itzbar .menu{position:absolute;top:calc(100% + 6px);left:0;width:min(440px,calc(100vw - 32px));background:var(--card);border:1px solid var(--line);border-radius:12px;padding:6px;box-shadow:0 14px 34px -14px rgba(0,0,0,.35);max-height:70vh;overflow:auto}
#itzbar .mh{padding:8px 12px 6px;font-size:12px;color:var(--mute);font-weight:700;border-bottom:1px solid var(--line);margin-bottom:4px}
#itzbar .menu a{display:flex;gap:8px;padding:9px 12px;border-radius:8px;color:var(--ink);text-decoration:none;font-size:14px;line-height:1.35}
#itzbar .menu a:hover{background:var(--line)}
#itzbar .menu a.on{color:var(--acc);font-weight:700}
#itzbar .menu .n{flex:0 0 1.8em;color:var(--mute)}
@media(max-width:600px){#itzbar .itzb-dd{position:static}#itzbar .menu{left:16px;right:16px;width:auto}}`;
    document.head.appendChild(st);
    bar=document.createElement("div");bar.id="itzbar";bar.setAttribute("role","navigation");bar.setAttribute("aria-label","Менюта на модула");
    document.body.prepend(bar);
  }
  bar.innerHTML='<div class="itzb-in"><a class="itzb-g" href="https://itzona.github.io/">🏠</a><a class="itzb-g" href="../index.html">🎓 10. клас</a><a class="itzb-g" href="index.html">💻 ИТ</a>'+G.map((g,gi)=>
    `<div class="itzb-dd"><button class="itzb-g ${g.r.includes(cur)?'on':''}" onclick="tg(${gi},event)" aria-expanded="${og==gi}">${g.ic} ${g.n} ▾</button><div class="menu" style="display:${og==gi?'block':'none'}"><div class="mh">${g.full}</div>${items(g)}</div></div>`).join("")+'</div>';
}
function nav(){cur<0?navIndex():navLesson()}
nav();

const IT=(()=>{
const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
const esc=t=>String(t).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const shuffle=a=>{a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a};

/* ---------- оцветяване на Python ---------- */
const KW=new Set("False None True and as assert break class continue def del elif else except finally for from global if import in is lambda nonlocal not or pass raise return try while with yield".split(" "));
const BI=new Set("print input int float str bool len range sum max min sorted round list dict set abs type enumerate zip open".split(" "));
function hl(s){let o='',i=0;
  while(i<s.length){const ch=s[i];
    if(ch=='#'){o+=`<span class="c">${esc(s.slice(i))}</span>`;break}
    if(ch=='"'||ch=="'"){let j=i+1;while(j<s.length&&s[j]!=ch){if(s[j]=='\\')j++;j++}let pre='';if(/[fFrR]$/.test(o.replace(/<[^>]*>/g,'').slice(-1))){}o+=`<span class="s">${esc(s.slice(i,j+1))}</span>`;i=j+1;continue}
    if(/[0-9]/.test(ch)&&!/[A-Za-z_0-9]/.test(s[i-1]||'')){let j=i;while(j<s.length&&/[0-9.]/.test(s[j]))j++;o+=`<span class="nm">${s.slice(i,j)}</span>`;i=j;continue}
    if(/[A-Za-z_Ѐ-ӿ]/.test(ch)){let j=i;while(j<s.length&&/[A-Za-z0-9_Ѐ-ӿ]/.test(s[j]))j++;const w=s.slice(i,j);
      o+=KW.has(w)?`<span class="k">${w}</span>`:BI.has(w)&&s[j]=='('?`<span class="bi">${w}</span>`:esc(w);i=j;continue}
    o+=esc(ch);i++}
  return o}
/* псевдокод: главните думи са ключови */
const PKW=/\b(НАЧАЛО|КРАЙ|ВЪВЕДИ|ИЗВЕДИ|АКО|ТО|ИНАЧЕ|КРАЙ_АКО|ДОКАТО|ПОВТАРЯЙ|КРАЙ_ДОКАТО|ЗА|ОТ|ДО|КРАЙ_ЗА|И|ИЛИ|НЕ)\b/g;
const hlp=s=>{const c=s.indexOf('//');const a=c<0?s:s.slice(0,c),b=c<0?'':s.slice(c);return esc(a).replace(/(„[^“]*“|"[^"]*")/g,'<span class="s">$1</span>').replace(/(^|[^\wА-я])(НАЧАЛО|КРАЙ_АКО|КРАЙ_ДОКАТО|КРАЙ_ЗА|КРАЙ|ВЪВЕДИ|ИЗВЕДИ|АКО|ТО|ИНАЧЕ|ДОКАТО|ЗА|ОТ|ДО|ИЛИ|НЕ|И)(?=$|[^\wА-я])/g,'$1<span class="k">$2</span>')+(b?`<span class="c">${esc(b)}</span>`:'')};

/* ---------- блокове с код: <pre class="pyc|psc" data-title> + по желание <ol class="lx"> ---------- */
function codes(){
  $$('pre.pyc,pre.psc').forEach(pre=>{
    const ps=pre.classList.contains('psc'),src=pre.textContent.replace(/^\n+/,'').replace(/\s+$/,''),lines=src.split('\n');
    const box=document.createElement('div');box.className='vba-box'+(ps?' pseudo':'');
    box.innerHTML=`<div class="hd"><span>${ps?'📝':'🐍'} ${esc(pre.dataset.title||(ps?'Псевдокод':'Python'))}</span><button type="button">📋 Копирай</button></div><div class="lines">${lines.map((l,i)=>`<div class="ln" data-n="${i+1}"><b>${i+1}</b><span>${(ps?hlp:hl)(l)||' '}</span></div>`).join('')}</div>`;
    const notes=pre.dataset.notes&&document.getElementById(pre.dataset.notes);
    pre.replaceWith(box);
    const cb=$('.hd button',box);cb.onclick=()=>{const ok=()=>{cb.textContent='✔ Копирано';setTimeout(()=>cb.textContent='📋 Копирай',1500)};if(navigator.clipboard)navigator.clipboard.writeText(src).then(ok,()=>{})};
    const ol=notes||box.nextElementSibling;
    if(ol&&ol.matches('ol.lx')){box.classList.add('has-notes');
      const lis=$$('li',ol),rng=li=>{const r=[];String(li.dataset.l).split(',').forEach(p=>{const[a,b]=p.split('-').map(Number);for(let n=a;n<=(b||a);n++)r.push(n)});return r};
      const mark=li=>{lis.forEach(x=>x.classList.toggle('on',x==li));const r=li?rng(li):[];$$('.ln',box).forEach(l=>l.classList.toggle('on',r.includes(+l.dataset.n)))};
      lis.forEach(li=>{li.tabIndex=0;li.onclick=()=>mark(li);li.onkeydown=e=>{if(e.key=='Enter'||e.key==' '){e.preventDefault();mark(li)}}});
      $$('.ln',box).forEach(l=>l.onclick=()=>{const li=lis.find(x=>rng(x).includes(+l.dataset.n));mark(li||null)})}
  });
}

/* ---------- разпредели в групи ---------- */
function classify(id,o){const el=document.getElementById(id);if(!el)return;
  let sel=null,done=0,right=0;const items=shuffle(o.items.map((x,i)=>({t:x[0],c:x[1],w:x[2]||'',i})));
  el.classList.add('cls');
  el.innerHTML=`<p class="note">${o.hint||'Щракни върху карта, после върху групата, в която мислиш, че принадлежи.'}</p><div class="pool">${items.map(x=>`<button type="button" class="chip" data-i="${x.i}">${esc(x.t)}</button>`).join('')}</div>
  <div class="cats" style="--n:${o.cats.length}">${o.cats.map((c,k)=>`<div class="cat" data-k="${k}" tabindex="0" role="button" aria-label="Група ${esc(c)}"><h4>${c}</h4><div class="in"></div></div>`).join('')}</div>
  <div class="fbk" aria-live="polite"></div><div class="row"><span class="score"></span><button type="button" class="btn ghost again">↺ Отначало</button></div>`;
  const fb=$('.fbk',el),sc=$('.score',el);
  const upd=()=>sc.textContent=`Верни: ${right} от ${done}${done==items.length?(right==items.length?' 🎉 Отлично!':' – виж обясненията'):''}`;
  $$('.chip',el).forEach(b=>b.onclick=()=>{if(b.disabled)return;$$('.chip',el).forEach(x=>x.classList.remove('sel'));b.classList.add('sel');sel=b});
  const put=cat=>{if(!sel)return;const it=o.items[+sel.dataset.i],k=+cat.dataset.k,ok=it[1]==k;
    const c=document.createElement('span');c.className='chip '+(ok?'ok':'bad');c.textContent=it[0]+(ok?' ✔':' ✘');$('.in',cat).append(c);
    sel.remove();sel=null;done++;if(ok)right++;
    fb.innerHTML=(ok?'<b>✔ Вярно.</b> ':`<b>✘ Не.</b> Правилната група е „${o.cats[it[1]]}“. `)+esc(it[2]||'');fb.className='fbk '+(ok?'ok':'bad');upd()};
  $$('.cat',el).forEach(c=>{c.onclick=()=>put(c);c.onkeydown=e=>{if(e.key=='Enter'||e.key==' '){e.preventDefault();put(c)}}});
  $('.again',el).onclick=()=>classify(id,o);upd()}

/* ---------- подреди ---------- */
function order(id,o){const el=document.getElementById(id);if(!el)return;
  let arr=shuffle(o.items.map((t,i)=>({t,i})));if(arr.every((x,i)=>x.i==i))arr.reverse();
  el.classList.add('ord');
  const draw=(chk)=>{el.innerHTML=`<p class="note">${o.hint||'Подреди с бутоните ▲ ▼ и натисни „Провери“.'}</p><ol>${arr.map((x,k)=>`<li class="${chk?(x.i==k?'ok':'bad'):''}"><span>${esc(x.t)}</span><span class="mv"><button type="button" data-k="${k}" data-d="-1" aria-label="Нагоре"${k==0?' disabled':''}>▲</button><button type="button" data-k="${k}" data-d="1" aria-label="Надолу"${k==arr.length-1?' disabled':''}>▼</button></span></li>`).join('')}</ol>
    <div class="row"><button type="button" class="btn chk">✔ Провери</button><button type="button" class="btn ghost again">↺ Разбъркай</button><span class="score" aria-live="polite">${chk?(arr.every((x,k)=>x.i==k)?'🎉 Правилно! '+(o.ok||''):`Верни места: ${arr.filter((x,k)=>x.i==k).length} от ${arr.length}`):''}</span></div>`;
    $$('.mv button',el).forEach(b=>b.onclick=()=>{const k=+b.dataset.k,d=+b.dataset.d;[arr[k],arr[k+d]]=[arr[k+d],arr[k]];draw()});
    $('.chk',el).onclick=()=>draw(true);$('.again',el).onclick=()=>order(id,o)};
  draw()}

/* ---------- проследяване на код ---------- */
function trace(id,o){const el=document.getElementById(id);if(!el)return;let k=-1,tm=null;
  el.classList.add('trc');
  el.innerHTML=`<div class="vba-box"><div class="hd"><span>${o.pseudo?'📝':'🐍'} ${esc(o.title||'Проследяване')}</span></div><div class="lines"></div></div>
  <div><div class="watch"></div><div class="cons"><div class="ch">Изход (конзола)</div><pre></pre></div>${o.note?`<p class="note">${o.note}</p>`:''}
  <div class="row"><button type="button" class="btn ghost" data-a="p">◀ Назад</button><button type="button" class="btn" data-a="n">Стъпка ▶</button><button type="button" class="btn ghost" data-a="r">⏩ Докрай</button><button type="button" class="btn ghost" data-a="z">↺</button></div><p class="note sinfo" aria-live="polite"></p></div>`;
  const L=$('.lines',el),W=$('.watch',el),C=$('.cons pre',el),I=$('.sinfo',el);
  const draw=()=>{const s=o.steps[k]||{};L.innerHTML=o.code.map((l,i)=>`<div class="ln${s.l==i+1?' on':''}"><b>${i+1}</b><span>${(o.pseudo?hlp:hl)(l)||' '}</span></div>`).join('');
    const vars=s.v||{};W.innerHTML=Object.keys(vars).length?Object.entries(vars).map(([a,b])=>`<div>${esc(a)} = <b>${esc(b)}</b></div>`).join(''):'<div class="muted">Още няма променливи</div>';
    C.textContent=o.steps.slice(0,k+1).map(x=>x.o).filter(x=>x!=null).join('\n');
    I.innerHTML=k<0?'Натисни „Стъпка ▶“.':`Стъпка ${k+1} от ${o.steps.length}${s.t?' – '+s.t:''}`;
    $('[data-a=p]',el).disabled=k<0;$('[data-a=n]',el).disabled=k>=o.steps.length-1};
  $('[data-a=n]',el).onclick=()=>{k=Math.min(o.steps.length-1,k+1);draw()};
  $('[data-a=p]',el).onclick=()=>{k=Math.max(-1,k-1);draw()};
  $('[data-a=z]',el).onclick=()=>{clearInterval(tm);k=-1;draw()};
  $('[data-a=r]',el).onclick=()=>{clearInterval(tm);tm=setInterval(()=>{if(k>=o.steps.length-1)return clearInterval(tm);k++;draw()},350)};
  draw()}

/* ---------- Python в браузъра ---------- */
let pyP=null;
function loadPy(status){if(pyP)return pyP;
  pyP=new Promise((res,rej)=>{status('⏳ Зареждам Python в браузъра (само първия път, до ~20 секунди)…');
    const s=document.createElement('script');s.src='https://cdn.jsdelivr.net/pyodide/v0.26.4/full/pyodide.js';
    s.onload=async()=>{try{const py=await loadPyodide();await py.runPythonAsync("import builtins, js\ndef _inp(p=''):\n    r = js.prompt(str(p))\n    return '' if r is None else str(r)\nbuiltins.input = _inp");res(py)}catch(e){rej(e)}};
    s.onerror=()=>rej(new Error('няма връзка с cdn.jsdelivr.net'));document.head.append(s)});
  pyP.catch(()=>{pyP=null});return pyP}
function pyRunners(){
  $$('div.py').forEach(d=>{
    const src=d.textContent.replace(/^\n+/,'').replace(/\s+$/,''),exp=d.dataset.out,files=(d.dataset.files||'').split(',').filter(Boolean);
    d.innerHTML=`<div class="pyhd"><span>🐍 ${esc(d.dataset.title||'Опитай сам – можеш да променяш кода')}</span><span class="row" style="gap:6px"><button type="button" class="btn run">▶ Изпълни</button><button type="button" class="btn ghost rst" title="Върни оригиналния код">↺</button></span></div>
    <div class="ed"><pre class="hl" aria-hidden="true"></pre><textarea spellcheck="false" autocapitalize="off" autocomplete="off" aria-label="Код на Python"></textarea></div>
    <div class="out"><div class="oh">Изход</div><pre class="o">${exp?'':d.dataset.img?'<span class="muted">Очакван резултат – диаграмата отдолу. Натисни „▶ Изпълни“, за да я начертаеш сам.</span>':'Натисни „▶ Изпълни“.'}</pre><div class="imgs"></div></div>`;
    const ta=$('textarea',d),hp=$('.hl',d),o=$('.o',d),imgs=$('.imgs',d);
    const paint=()=>{hp.innerHTML=ta.value.split('\n').map(l=>hl(l)||' ').join('\n')+'\n';ta.style.height='auto';ta.style.height=(ta.scrollHeight+4)+'px';hp.style.height=ta.style.height};
    ta.value=src;paint();ta.oninput=paint;
    ta.onkeydown=e=>{if(e.key=='Tab'){e.preventDefault();const s=ta.selectionStart;ta.setRangeText('    ',s,ta.selectionEnd,'end');paint()}if(e.key=='Enter'&&(e.ctrlKey||e.metaKey)){e.preventDefault();run()}};
    if(exp)o.innerHTML=`<span class="muted">Очакван резултат:</span>\n${esc(exp)}`;
    const expImg=d.dataset.img;if(expImg)imgs.innerHTML=`<img alt="Очаквана диаграма" src="${expImg}">`;
    $('.rst',d).onclick=()=>{ta.value=src;paint()};
    const status=t=>{o.textContent=t};
    async function run(){const b=$('.run',d);b.disabled=true;imgs.innerHTML='';
      try{const py=await loadPy(status);status('⏳ Изпълнявам…');
        for(const f of files){try{const r=await fetch(f);if(!r.ok)throw 0;py.FS.writeFile(f.split('/').pop(),new Uint8Array(await r.arrayBuffer()))}catch(e){throw new Error('не мога да заредя файла '+f+' (отвори страницата от сайта, не от диска)')}}
        let out='';py.setStdout({batched:s=>out+=s+'\n'});py.setStderr({batched:s=>out+=s+'\n'});
        await py.loadPackagesFromImports(ta.value);
        const mpl=/matplotlib/.test(ta.value);if(mpl)await py.runPythonAsync("import matplotlib\nmatplotlib.use('agg')");
        try{await py.runPythonAsync(ta.value)}catch(e){out+=String(e.message||e).split('\n').filter(l=>!/^  File "<exec>"|^  File "\/lib/.test(l)||/line \d+/.test(l)).slice(-4).join('\n').replace(/File "<exec>", /g,'')}
        if(mpl){const pics=py.runPython("import base64, io\nimport matplotlib.pyplot as plt\n_r=[]\nfor _n in plt.get_fignums():\n    _b=io.BytesIO(); plt.figure(_n).savefig(_b, format='png', dpi=110, bbox_inches='tight'); _r.append(base64.b64encode(_b.getvalue()).decode())\nplt.close('all')\n_r").toJs();
          imgs.innerHTML=pics.map(p=>`<img alt="Диаграма от кода" src="data:image/png;base64,${p}">`).join('')}
        o.textContent=out.trim()||'(програмата не изведе нищо)'}
      catch(e){o.innerHTML=`<span style="color:#b42318">Python не можа да се зареди: ${esc(e.message||e)}.</span>\nМожеш да копираш кода в Thonny или на https://www.online-python.com.${exp?'\n\n<span class="muted">Очакван резултат:</span>\n'+esc(exp):''}`;if(d.dataset.img)imgs.innerHTML=`<img alt="Очаквана диаграма" src="${d.dataset.img}">`}
      finally{b.disabled=false}}
    $('.run',d).onclick=run;
  });
}

/* ---------- чатбот (сценарии с избор на промпт) ---------- */
function chat(id,o){const el=document.getElementById(id);if(!el)return;el.classList.add('chatsim');
  el.innerHTML=`<div class="chat-scr"><div class="chat-top">🤖 ${esc(o.bot||'Чатбот с ИИ')}</div><div class="msgs"></div></div><div class="opts"></div><div class="fbk" aria-live="polite"></div>`;
  const M=$('.msgs',el),O=$('.opts',el),F=$('.fbk',el);let st=0;
  const add=(who,t)=>{const b=document.createElement('div');b.className='bub '+who;b.innerHTML=t;M.append(b);M.scrollTop=M.scrollHeight};
  const step=()=>{const s=o.steps[st];if(!s){O.innerHTML=`<button type="button" class="btn ghost">↺ Отначало</button>`;$('button',O).onclick=()=>{M.innerHTML='';F.textContent='';st=0;step()};return}
    if(s.q)F.innerHTML=`<b>${s.q}</b>`;
    O.innerHTML=s.opts.map((x,i)=>`<button type="button" class="opt" data-i="${i}">${esc(x.p)}</button>`).join('');
    $$('.opt',O).forEach(b=>b.onclick=()=>{const x=s.opts[+b.dataset.i];add('me',esc(x.p));O.innerHTML='';
      const typing=document.createElement('div');typing.className='bub bot';typing.textContent='…';M.append(typing);
      setTimeout(()=>{typing.remove();add('bot',x.a);F.innerHTML=`<span class="grade g${x.g}">${['','⚠️ Слаб промпт','👍 По-добре','🌟 Отличен промпт'][x.g]}</span> ${x.w}`;
        O.innerHTML=x.g<3&&!s.next?`<button type="button" class="btn ghost">↩ Опитай с друг промпт</button>`:`<button type="button" class="btn">Напред →</button>`;
        $('button',O).onclick=()=>{if(x.g<3&&!s.next){step()}else{st++;step()}}},650)})};
  step()}

const init=()=>{codes();pyRunners()};
return{hl,hlp,codes,classify,order,trace,pyRunners,chat,init,esc,shuffle};
})();
