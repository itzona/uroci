/* Общ скрипт за уроците по уеб дизайн (12. клас).
   Всеки урок е отделен файл в тази папка. Преди този скрипт страницата задава:
   CUR  – номер на урока (-1 за началната страница, 100–103 за проекта),
   RAW, QUIZ – само за уроците (дали прегледът е без стил по подразбиране и въпросите за теста). */
const G=[{n:"Основи и дизайн",ic:"🗺️",r:[19,20,14,15,16,17,18]},{n:"HTML",ic:"🧱",r:[0,1,2,3,4,5,23,21,24,22,9]},{n:"CSS",ic:"🎨",r:[6,7,10,11]},{n:"JavaScript",ic:"⚡",r:[8,12,13]},{n:"Проект",ic:"📌",r:[100,101,102,103]}];
const ORD=G.flatMap(g=>g.r);
/* Файл и заглавие на всяка страница */
const P={
 19:["urok-1-ueb-tehnologii.html","Уеб технологии, стандарти и как работи интернет"],
 20:["urok-2-avtorski-prava.html","Авторски права и лицензи"],
 14:["urok-3-etapi-na-sazdavane.html","Етапи при създаване на уеб сайт"],
 15:["urok-4-planirane-i-zadanie.html","Планиране и задание за уеб сайт"],
 16:["urok-5-arhitektura-i-navigaciya.html","Проектиране: архитектура, структура, навигация"],
 17:["urok-6-wireframe-i-dostapnost.html","Схема на уеб страница (wireframe) и достъпност"],
 18:["urok-7-mockup-i-dizayn.html","Графичен модел (mockup) и графичен дизайн"],
 0:["urok-8-kakvo-e-ueb-sayt.html","Какво е уеб сайт?"],
 1:["urok-9-parva-html-stranica.html","Първата ми HTML страница"],
 2:["urok-10-tekst-i-formatirane.html","Текст: абзаци, заглавия, форматиране"],
 3:["urok-11-hipervrazki-i-spisatsi.html","Хипервръзки и списъци"],
 4:["urok-12-izobrazheniya.html","Изображения"],
 5:["urok-13-tablici.html","Таблици"],
 23:["urok-14-atribut-style.html","Оформление с атрибута style"],
 21:["urok-15-semantichna-struktura.html","HTML: контейнери и семантична структура"],
 24:["urok-16-audio-i-video.html","Аудио и видео в HTML"],
 22:["urok-17-meta-tagove-i-dom.html","HTML: мета тагове и HTML дървото (DOM)"],
 9:["urok-18-formulyari.html","Формуляри"],
 6:["urok-19-css-stilove-i-cvetove.html","CSS – стилове и цветове"],
 7:["urok-20-css-klasove-i-selektori.html","CSS: div, span, класове и селектори"],
 10:["urok-21-css-flexbox.html","CSS: Flexbox – подреждане на елементи"],
 11:["urok-22-css-adaptiven-dizayn.html","CSS: адаптивен дизайн, преходи и анимации"],
 8:["urok-23-javascript-interaktivnost.html","JavaScript – интерактивност"],
 12:["urok-24-javascript-usloviya-i-cikli.html","JavaScript: условия, цикли и масиви"],
 13:["urok-25-javascript-dom-i-sabitiya.html","JavaScript: DOM и събития – малка апликация"],
 100:["proekt-1-zadanie.html","Задание и правила"],
 101:["proekt-2-izbor-na-tema.html","Избор на тема"],
 102:["proekt-3-kriterii.html","Критерии за оценяване"],
 103:["proekt-4-samoocenka.html","Самооценка и предаване"]
};
const T=i=>P[i][1];
const cur=typeof CUR=="number"?CUR:-1;
const $=s=>document.querySelector(s);
let done={};
try{done=JSON.parse(localStorage.getItem("uroci_done")||"{}")}catch(e){}
function save(){try{localStorage.setItem("uroci_done",JSON.stringify(done))}catch(e){}}

/* ---------- Падащи менюта ---------- */
let og=-1;
function tg(g,e){e.stopPropagation();og=og==g?-1:g;nav()}
document.addEventListener("click",e=>{if(e.target.closest&&e.target.closest(".menu a"))return;if(og!=-1){og=-1;nav()}});
document.addEventListener("keydown",e=>{if(e.key=="Escape"&&og!=-1){og=-1;nav()}});
function nav(){
  $("#nav").innerHTML='<a class="grp home" href="https://itzona.github.io/">🏠 Начало</a>'+G.map((g,gi)=>{
    const act=g.r.includes(cur);
    return `<div class="dd"><button class="grp ${act?'on':''}" onclick="tg(${gi},event)" aria-expanded="${og==gi}">${g.ic} ${g.n} ▾</button><div class="menu" style="display:${og==gi?'block':'none'}">${g.r.map(i=>`<a class="${i==cur?'on':''}${done[i]!=null?' done':''}" href="${P[i][0]}"${i==cur?' aria-current="page"':''}><span class="n">${i>=100?"•":ORD.indexOf(i)+1+"."}</span><span class="t">${T(i)}</span></a>`).join("")}</div></div>`}).join("");
}
/* go(-1) – към началната страница на модула, go(i) – към урок i */
function go(i){location.href=i<0||!P[i]?"index.html":P[i][0]}

const esc=s=>s.replace(/&/g,"&amp;").replace(/</g,"&lt;");
const DEMO={html:'<h1>Кафене „Роси“</h1>\n<p>Най-хубавото кафе в града.</p>\n<button>Поръчай</button>',
css:'<style>\n body {\n  font-family: Georgia, serif;\n  background: #fef3c7;\n  text-align: center;\n  padding: 20px;\n }\n h1 {\n  color: #78350f;\n }\n p {\n  color: #92400e;\n  font-size: 18px;\n }\n button {\n  background: #b45309;\n  color: #fff;\n  border: 0;\n  padding: 10px 22px;\n  border-radius: 20px;\n  font-size: 16px;\n }\n</style>',
js:'<script>\n var n=0;\n document.querySelector("button").onclick=function(){\n  n++;\n  document.querySelector("p").innerText="Поръчани кафета: "+n+" ☕";\n };\n<\/script>'};

/* Примерна картинка: в кода се пише src="kartinka.png", а прегледът я заменя с тази (разтяга се, за да се вижда ефектът от width/height) */
const SAMPLE_IMG="data:image/svg+xml,"+encodeURIComponent("<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 300 150' preserveAspectRatio='none'><rect width='300' height='150' fill='#fb923c'/><circle cx='150' cy='120' r='50' fill='#fde047'/><rect y='120' width='300' height='30' fill='#7c2d12'/></svg>");
/* Връзките в прегледа се отварят в нов раздел (иначе сайтовете блокират показването си вътре в прозореца) */
const LINKFIX='<script>document.addEventListener("click",function(e){var a=e.target.closest&&e.target.closest("a[href]");if(!a)return;var h=a.getAttribute("href");if(/^(https?:)?\\/\\//i.test(h)){e.preventDefault();window.open(a.href,"_blank")}})<\/script>';
/* Дръпване за височина и ширина на прозорците с код */
function drag(el,fn,start){
  el.addEventListener("pointerdown",e=>{
    e.preventDefault();const s=start(),x0=e.clientX,y0=e.clientY;
    el.setPointerCapture(e.pointerId);document.body.classList.add("dragging");
    const mv=ev=>fn(ev.clientX-x0,ev.clientY-y0,s);
    const up=()=>{document.body.classList.remove("dragging");el.removeEventListener("pointermove",mv);el.removeEventListener("pointerup",up);el.removeEventListener("pointercancel",up)};
    el.addEventListener("pointermove",mv);el.addEventListener("pointerup",up);el.addEventListener("pointercancel",up);
  });
}
function labInit(){
  document.querySelectorAll(".lab").forEach(lab=>{
    const gr=lab.nextElementSibling,sp=lab.querySelector(".split"),pane=lab.querySelector(".pane");
    if(gr&&gr.classList.contains("grip"))drag(gr,(dx,dy,s)=>lab.style.setProperty("--h",Math.max(120,Math.min(1200,s.h+dy))+"px"),()=>({h:pane.offsetHeight}));
    if(sp)drag(sp,(dx,dy,s)=>lab.style.setProperty("--c",Math.max(15,Math.min(85,(s.w+dx)/(lab.clientWidth-14)*100))+"%"),()=>({w:pane.offsetWidth}));
  });
}
function layer(n){
  document.querySelectorAll(".lay button").forEach((b,i)=>b.classList.toggle("on",i==n));
  $("#demo").srcdoc='<meta charset="UTF-8"><body style="margin:10px;font-family:Arial">'+DEMO.html+(n>=1?DEMO.css:'')+(n>=2?DEMO.js:'')+LINKFIX;
  const d=["Само HTML – голи тагове: браузърът подрежда всичко просто отгоре надолу.","Добавихме CSS – цветове, шрифт, закръглени ъгли. Същият HTML, съвсем друг вид!","Добавихме JavaScript – натисни бутона в прегледа и страницата реагира."];
  $("#dcode").innerHTML=esc(n==0?DEMO.html:n==1?DEMO.css:DEMO.js);$("#dtxt").innerText=d[n];
}

/* ---------- Урок: прозорец „Пробвай сам“ и кратък тест ---------- */
function lessonInit(){
  const ed=$("#ed");
  if(ed){
    const m3=typeof SAMPLE_MP3!="undefined"?SAMPLE_MP3:"zvuk.mp3",m4=typeof SAMPLE_MP4!="undefined"?SAMPLE_MP4:"klip.mp4";
    const run=()=>$("#pv").srcdoc='<meta charset="UTF-8">'+(RAW?'':'<body style="font-family:Arial;margin:10px">')+ed.value.split('"kartinka.png"').join('"'+SAMPLE_IMG+'"').split('"zvuk.mp3"').join('"'+m3+'"').split('"klip.mp4"').join('"'+m4+'"')+LINKFIX;
    ed.oninput=run;run();
  }
  if(typeof QUIZ=="undefined")return;
  let right=0,ans=0;
  $("#quiz").innerHTML=QUIZ.map((q,qi)=>`<div class="q"><p>${qi+1}. ${q.q.replace(/</g,'&lt;')}</p>${q.o.map((o,oi)=>`<button data-q="${qi}" data-o="${oi}">${o.replace(/</g,'&lt;')}</button>`).join("")}<div class="why" id="w${qi}"></div></div>`).join("");
  document.querySelectorAll(".q button").forEach(b=>b.onclick=()=>{
    const qi=+b.dataset.q,oi=+b.dataset.o,q=QUIZ[qi],grp=[...document.querySelectorAll(`[data-q="${qi}"]`)];
    if(grp.some(x=>x.disabled))return;
    grp.forEach(x=>x.disabled=true);
    grp[q.a].classList.add("good");
    const w=$("#w"+qi);w.style.display="block";
    if(oi==q.a){right++;w.innerHTML="✅ Вярно! "+q.w.replace(/</g,'&lt;')}else{b.classList.add("bad");w.innerHTML="❌ Грешно. "+q.w.replace(/</g,'&lt;')}
    ans++;
    if(ans==QUIZ.length){$("#sc").innerHTML=`Резултат: ${right} от ${QUIZ.length} ${right==QUIZ.length?'🎉 Браво!':'– опитай пак след като препрочетеш урока'}`;done[cur]=Math.max(done[cur]||0,right);save();nav()}
  });
}

/* ---------- Проект ---------- */
const TOP=[
["🧑‍💻","Личен сайт – портфолио","Представяне на теб, уменията и работите ти.","Страници: Начало, За мен, Проекти, Контакти","JS идея: светла/тъмна тема"],
["🏞️","Туристически сайт","Твоят град, курорт или забележителност.","Страници: Начало, Места, Галерия, Как да стигнем","JS идея: слайдер със снимки"],
["☕","Кафене или ресторант","Малък бизнес с меню и цени.","Страници: Начало, Меню, За нас, Резервация","JS идея: формуляр за резервация с проверка"],
["🛍️","Мини магазин","Каталог от продукти с цени.","Страници: Начало, Продукти, Кошница, Контакти","JS идея: „Добави“ и обща сума"],
["🎮","Хоби, спорт или игра","Твоята страст, представена като сайт.","Страници: Начало, Правила/История, Отбори/Герои, Галерия","JS идея: викторина с резултат"],
["🏫","Училище или клас","Класът, учителите и събитията.","Страници: Начало, Учители, Събития, Контакти","JS идея: брояч до края на учебната година"],
["📚","Образователен сайт","История, наука или литература за съученици.","Страници: Начало, Теми, Хронология, Тест","JS идея: тест с оценка"],
["🧮","Интерактивен проект","Калкулатор, игра или малък инструмент.","Страници: Начало, Приложението, Инструкции","JS идея: калкулатор за среден успех"]];
const MAN=[["HTML структура и семантика","Правилен документ, заглавия, header/nav/main/footer, alt на снимките",12],
["Поне 3 свързани страници","Работеща навигация между всички страници",10],
["CSS във външен файл","Цветове, шрифтове, кутиен модел, класове",15],
["Съдържание по темата","Собствен текст, поне 3 изображения, списък и таблица",10],
["JavaScript","Поне една работеща интерактивна функция",8],
["Чист код и подредени файлове","Отстъпи, смислени имена, папка images",5]];
const OPT=[["Формуляр с проверка на данните","form + JavaScript проверка преди изпращане"],
["Адаптивен дизайн","Поне една media query – добър вид и на телефон"],
["Flexbox или Grid","Подредба на карти, меню или галерия"],
["Анимации и преходи","transition, :hover, transform или @keyframes"],
["Галерия или слайдер","Смяна на снимки с JavaScript"],
["Светъл/тъмен режим","Бутон, който сменя цветовете с JavaScript"],
["Брояч, таймер или калкулатор","Изчисления с JavaScript"],
["Мултимедия и SVG","Видео, аудио, карта или собствено SVG лого"]];
const GR=[[90,"Отличен 6"],[75,"Мн. добър 5"],[60,"Добър 4"],[45,"Среден 3"],[0,"Слаб 2"]];
const PR=["Задание и правила","Избор на тема","Критерии за оценяване","Самооценка и предаване"];
let PS={t:-1,m:[],o:[]};
try{PS=Object.assign(PS,JSON.parse(localStorage.getItem("uroci_proj")||"{}"))}catch(e){}
const psave=()=>{try{localStorage.setItem("uroci_proj",JSON.stringify(PS))}catch(e){}};
function pick(i){PS.t=i;psave();render()}
function tgl(k,i){const a=PS[k],j=a.indexOf(i);
  if(j>=0)a.splice(j,1);else{if(k=="o"&&a.length>=4){alert("Можеш да избереш най-много 4 критерия по избор.");render();return}a.push(i)}
  psave();render()}
const ck=(k,i,t,d,p)=>`<label class="ck"><input type="checkbox" ${PS[k].includes(i)?'checked':''} onchange="tgl('${k}',${i})"><span><b>${t}</b> <small>(${p} т.)</small><br>${d}</span></label>`;
const tab=(h,rows)=>`<table class="t"><tr>${h.map(x=>`<th>${x}</th>`).join("")}</tr>${rows.map(r=>`<tr>${r.map(c=>`<td>${c}</td>`).join("")}</tr>`).join("")}</table>`;
const PG=()=>{const p=ORD.indexOf(cur),a=ORD[p-1],b=ORD[p+1];return `<div class="pager">${a!=null?`<a href="${P[a][0]}">← Назад</a>`:`<a href="index.html">← Начало</a>`}${b!=null?`<a href="${P[b][0]}">Напред →</a>`:`<button disabled>Напред →</button>`}</div>`};
function projPage(){
  const p=cur-100;let b="";
  if(p==0)b=`<p>В края на курса изготвяш <b>собствен многостраничен уеб сайт</b> с HTML, CSS и JavaScript. Сам избираш <b>тема</b> и <b>критерии по избор</b> – така показваш това, което ти е най-интересно.</p>
  <h3>Как протича работата</h3>
  <ol><li>Избери тема от следващата страница (или предложи своя и я съгласувай с учителя).</li><li>Избери 4 критерия по избор.</li><li>Начертай на хартия схема на страниците.</li><li>Напиши HTML на всички страници.</li><li>Оформи ги с CSS във външен файл.</li><li>Добави JavaScript.</li><li>Провери се със самооценката и предай проекта.</li></ol>
  <h3>Подредба на файловете</h3>
  <pre>proekt/\n  index.html\n  za-nas.html\n  kontakti.html\n  style.css\n  script.js\n  images/</pre>
  <div class="fact">📅 Срокът, работата сам или по двойки и начинът на предаване се определят от учителя.</div>`;
  if(p==1)b=`<p>Натисни върху карта, за да избереш тема. Темите са само насока – можеш да я промениш по свой вкус.</p>
  <div class="sg">${TOP.map((t,i)=>`<div class="sc${PS.t==i?' sel':''}" onclick="pick(${i})"><div class="tx"><b>${t[0]} ${t[1]}</b>${t[2]}<small>${t[3]}<br>${t[4]}</small></div></div>`).join("")}</div>
  <div class="box">${PS.t>=0?`✅ Избрана тема: <b>${TOP[PS.t][1]}</b>`:'Още не си избрал тема. Можеш да предложиш и <b>своя тема</b> – съгласувай я с учителя.'}</div>`;
  if(p==2)b=`<h3>Задължителни критерии – 60 точки</h3>${tab(["Критерий","Какво се проверява","Точки"],MAN)}
  <h3>Критерии по избор – 4 от 8, по 10 точки (40 т.)</h3>${tab(["Критерий","Какво се проверява","Точки"],OPT.map(o=>[o[0],o[1],10]))}
  <h3>Оценка (примерна скала)</h3>${tab(["Точки","Оценка"],GR.map((g,i)=>[g[0]+" – "+(i?GR[i-1][0]-1:100),g[1]]))}
  <div class="box">Общо 100 точки. Скалата може да бъде променена от учителя.</div>`;
  if(p==3){const pts=PS.m.reduce((s,i)=>s+MAN[i][2],0)+PS.o.length*10;
    b=`<p>Отбележи какво си изпълнил. Отметките се пазят в браузъра.</p>
  <h3>Задължителни критерии</h3>${MAN.map((m,i)=>ck("m",i,m[0],m[1],m[2])).join("")}
  <h3>Критерии по избор – избрани ${PS.o.length} от 4</h3>${OPT.map((o,i)=>ck("o",i,o[0],o[1],10)).join("")}
  <div class="box pts">${PS.t>=0?`Тема: <b>${TOP[PS.t][1]}</b><br>`:''}Точки: <b>${pts} от 100</b> – ${GR.find(g=>pts>=g[0])[1]}</div>
  <h3>Преди да предадеш</h3><ul><li>Всички връзки между страниците работят.</li><li>Сайтът се отваря от папката на друг компютър (пътищата до снимките са относителни).</li><li>Правопис и качество на снимките са проверени.</li><li>Папката е архивирана (zip) и именувана с твоето име.</li></ul>`}
  $("#main").innerHTML=`<h2>📌 Проект: ${PR[p]}</h2>${b}${PG()}`;nav();
}
function render(){if(cur>=100)projPage()}

/* ---------- Старт ---------- */
if(cur>=100)projPage();
else{if(cur<0&&$("#demo"))layer(0);else lessonInit();labInit();nav()}
