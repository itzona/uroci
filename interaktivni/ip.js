/* Общ скрипт за раздела „Интерактивни презентации“ (11. и 12. клас).
   Всеки урок е отделен файл в тази папка. Преди този скрипт страницата задава
   CUR – номер на урока, броен от 0 (-1 за началната страница на модула).
   Нов урок: добавете ред в P и номера му в r на съответния раздел в G. */
const G=[{n:"Уроци",ic:"📊",full:"Интерактивни презентации – 11. и 12. клас",r:[0]}];
/* Файл и заглавие на всеки урок (по реда на номерата) */
const P=[
 ["urok-1-anketa-v-realno-vreme.html","Презентация с анкета в реално време"]
];
const cur=typeof CUR=="number"?CUR:-1;
/* go(-1) – към началната страница на модула, go(i) – към урок i */
function go(i){location.href=i<0||!P[i]?"index.html":P[i][0]}

/* ---------- Падащи менюта ---------- */
let og=-1;
function tg(g,e){e.stopPropagation();og=og==g?-1:g;nav()}
document.addEventListener("click",e=>{if(e.target.closest&&e.target.closest(".menu a"))return;if(og!=-1){og=-1;nav()}});
document.addEventListener("keydown",e=>{if(e.key=="Escape"&&og!=-1){og=-1;nav()}});
const items=g=>g.r.map(i=>`<a class="${i==cur?'on':''}" href="${P[i][0]}"${i==cur?' aria-current="page"':''}><span class="n">${i+1}.</span><span class="t">${P[i][1]}</span></a>`).join("");

/* Началната страница на модула ползва общия стил (style.css). */
function navIndex(){
  document.getElementById("nav").innerHTML='<a class="grp home" href="https://itzona.github.io/">🏠 Начало</a>'+G.map((g,gi)=>
    `<div class="dd"><button class="grp ${g.r.includes(cur)?'on':''}" onclick="tg(${gi},event)" aria-expanded="${og==gi}">${g.ic} ${g.n} ▾</button><div class="menu" style="display:${og==gi?'block':'none'}"><div class="mh">${g.full}</div>${items(g)}</div></div>`).join("");
}

/* Уроците имат собствено оформление, затова лентата с менютата носи свой стил (с префикс itzb-),
   а цветовете взема от променливите на урока (--card, --line, --ink, --acc). */
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
#itzbar .menu{position:absolute;top:calc(100% + 6px);left:0;width:min(420px,calc(100vw - 32px));background:var(--card);border:1px solid var(--line);border-radius:12px;padding:6px;box-shadow:0 14px 34px -14px rgba(0,0,0,.35)}
#itzbar .mh{padding:8px 12px 6px;font-size:12px;color:var(--mute);font-weight:700;border-bottom:1px solid var(--line);margin-bottom:4px}
#itzbar .menu a{display:flex;gap:8px;padding:9px 12px;border-radius:8px;color:var(--ink);text-decoration:none;font-size:14px;line-height:1.35}
#itzbar .menu a:hover{background:var(--line)}
#itzbar .menu a.on{color:var(--acc);font-weight:700}
#itzbar .menu .n{flex:0 0 1.5em;color:var(--mute)}`;
    document.head.appendChild(st);
    bar=document.createElement("div");bar.id="itzbar";bar.setAttribute("role","navigation");bar.setAttribute("aria-label","Менюта на модула");
    document.body.prepend(bar);
  }
  bar.innerHTML='<div class="itzb-in"><a class="itzb-g" href="https://itzona.github.io/">🏠 Начало</a><a class="itzb-g" href="index.html">📊 Интерактивни презентации</a>'+G.map((g,gi)=>
    `<div class="itzb-dd"><button class="itzb-g ${g.r.includes(cur)?'on':''}" onclick="tg(${gi},event)" aria-expanded="${og==gi}">${g.ic} ${g.n} ▾</button><div class="menu" style="display:${og==gi?'block':'none'}"><div class="mh">${g.full}</div>${items(g)}</div></div>`).join("")+'</div>';
}
function nav(){cur<0?navIndex():navLesson()}
nav();

/* ---------- Тест с избор: QUIZ=[{q,o:[...],a:верен индекс,w:обяснение}] ---------- */
function quizInit(){
  const box=document.getElementById("quizBox"),sc=document.getElementById("quizScore");
  if(!box||typeof QUIZ=="undefined")return;
  const key="ip_quiz_"+cur;let right=0,ans=0;
  const esc=t=>String(t).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
  let best=null;try{best=localStorage.getItem(key)}catch(e){}
  const score=()=>{sc.innerHTML=ans<QUIZ.length?`<span>Отговорени: ${ans} от ${QUIZ.length}${best!=null?` · Най-добър резултат досега: ${best} от ${QUIZ.length}`:""}</span>`:
    `<span>Резултат: ${right} от ${QUIZ.length} ${right==QUIZ.length?"🎉 Отлично!":right>=QUIZ.length*.7?"👍 Много добре!":"– препрочетете урока и опитайте пак"}</span><button type="button" id="quizAgain">Започни отначало</button>`;
    const b=document.getElementById("quizAgain");if(b)b.onclick=()=>{render();box.scrollIntoView({behavior:"smooth",block:"start"})}};
  function render(){right=0;ans=0;
    box.innerHTML=QUIZ.map((q,i)=>`<div class="qz" data-i="${i}"><h3><span>${i+1}.</span>${esc(q.q)}</h3>${q.o.map((o,j)=>`<button type="button" data-j="${j}">${esc(o)}</button>`).join("")}<div class="fb" hidden></div></div>`).join("");
    box.querySelectorAll(".qz").forEach(card=>{const q=QUIZ[+card.dataset.i];
      card.querySelectorAll("button").forEach(btn=>btn.onclick=()=>{const j=+btn.dataset.j,ok=j==q.a;
        card.querySelectorAll("button").forEach(b=>{b.disabled=true;if(+b.dataset.j==q.a)b.classList.add("ok")});
        if(!ok)btn.classList.add("bad");
        const fb=card.querySelector(".fb");fb.hidden=false;fb.className="fb "+(ok?"ok":"bad");
        fb.innerHTML=(ok?"<b>✔ Вярно!</b> ":`<b>✘ Грешно.</b> Верният отговор е: <b>${esc(q.o[q.a])}</b>. `)+esc(q.w);
        ans++;if(ok)right++;
        if(ans==QUIZ.length){if(best==null||right>+best){best=right;try{localStorage.setItem(key,right)}catch(e){}}}
        score()})});
    score()}
  render();
}
quizInit();
