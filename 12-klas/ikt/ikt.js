/* Общ скрипт за модула „Решаване на проблеми с ИКТ“ (12. клас).
   Всеки урок е отделен файл в тази папка. Преди този скрипт страницата задава
   CUR – номер на урока, броен от 0 (-1 за началната страница), и QUIZ – въпросите за теста. */
const G=[{n:"Управление на проекти",ic:"📋",full:"Управление на проекти",r:[0,1,2,3,4,5,6,7,8,9,10,11]},{n:"Компютърни системи",ic:"🖥️",full:"Управление на компютърни системи и приложен софтуер",r:[12,13,14,15,16,17,18]}];
/* Файл и заглавие на всеки урок (по реда на номерата) */
const P=[
 ["urok-1-etapi-na-softueren-proekt.html","Дефиниране и основни етапи в един софтуерен проект"],
 ["urok-2-lineyni-modeli.html","Последователни (линейни) модели"],
 ["urok-3-ciklichni-modeli.html","Циклични модели"],
 ["urok-4-vodopaden-model.html","Етапи на водопадния модел"],
 ["urok-5-analiz-na-riska.html","Анализ на риска"],
 ["urok-6-ekipna-rabota.html","Екипна и групова работа"],
 ["urok-7-reshavane-na-problemi.html","Решаване на проблеми"],
 ["urok-8-sredstva-za-upravlenie.html","Софтуерни средства за управление на проекти (Упражнение)"],
 ["urok-9-priklyuchvane-na-proekta.html","Приключване на проекта"],
 ["urok-10-obobshtenie.html","Обобщение на раздела"],
 ["urok-11-test-upravlenie-na-proekti.html","Тест върху раздел „Управление на проекти“"],
 ["urok-12-ekipen-proekt.html","Задание за екипен проект"],
 ["urok-13-konfiguracii-1-nuzhdi.html","Подбор на компютърни конфигурации – I част: нужди и компоненти"],
 ["urok-14-konfiguracii-2-sravnenie.html","Подбор на компютърни конфигурации – II част: сравнение, бюджет и обосновка"],
 ["urok-15-prilozhni-programi.html","Приложни програми – основни функционални характеристики"],
 ["urok-16-upravlenie-na-sistemi.html","Управление на компютърни системи"],
 ["urok-17-sigurnost-i-arhivirane.html","Сигурност и архивиране на данни"],
 ["urok-18-intelektualna-sobstvenost.html","Интелектуална собственост и правни аспекти"],
 ["urok-19-softuerno-piratstvo.html","Софтуерно пиратство"]
];
const cur=typeof CUR=="number"?CUR:-1;
const $=s=>document.querySelector(s);
let done={};
try{done=JSON.parse(localStorage.getItem("ikt12_proekti_done")||"{}")}catch(e){}
function save(){try{localStorage.setItem("ikt12_proekti_done",JSON.stringify(done))}catch(e){}}

/* ---------- Падащи менюта ---------- */
let og=-1;
function tg(g,e){e.stopPropagation();og=og==g?-1:g;nav()}
document.addEventListener("click",e=>{if(e.target.closest&&e.target.closest(".menu a"))return;if(og!=-1){og=-1;nav()}});
document.addEventListener("keydown",e=>{if(e.key=="Escape"&&og!=-1){og=-1;nav()}});
function nav(){
  $("#nav").innerHTML=G.map((g,gi)=>{
    const act=g.r.includes(cur);
    return `<div class="dd"><button class="grp ${act?'on':''}" onclick="tg(${gi},event)" aria-expanded="${og==gi}">${g.ic} ${g.n} ▾</button><div class="menu" style="display:${og==gi?'block':'none'}"><div class="mh">${g.full}</div>${g.r.map(i=>`<a class="${i==cur?'on':''}${done[i]!=null?' done':''}" href="${P[i][0]}"${i==cur?' aria-current="page"':''}><span class="n">${i+1}.</span><span class="t">${P[i][1]}</span></a>`).join("")}</div></div>`}).join("");
}
/* go(-1) – към началната страница на модула, go(i) – към урок i */
function go(i){location.href=i<0||!P[i]?"index.html":P[i][0]}

/* Дръпване за височина и ширина на прозорците с код */
function drag(el,fn,start){
  el.addEventListener("pointerdown",e=>{
    e.preventDefault();const st=start(),x0=e.clientX,y0=e.clientY;
    el.setPointerCapture(e.pointerId);document.body.classList.add("dragging");
    const mv=ev=>fn(ev.clientX-x0,ev.clientY-y0,st);
    const up=()=>{document.body.classList.remove("dragging");el.removeEventListener("pointermove",mv);el.removeEventListener("pointerup",up);el.removeEventListener("pointercancel",up)};
    el.addEventListener("pointermove",mv);el.addEventListener("pointerup",up);el.addEventListener("pointercancel",up);
  });
}
function labInit(){
  document.querySelectorAll(".lab").forEach(lab=>{
    const gr=lab.nextElementSibling,sp=lab.querySelector(".split"),pane=lab.querySelector(".pane");
    if(gr&&gr.classList.contains("grip"))drag(gr,(dx,dy,st)=>lab.style.setProperty("--h",Math.max(120,Math.min(1200,st.h+dy))+"px"),()=>({h:pane.offsetHeight}));
    if(sp)drag(sp,(dx,dy,st)=>lab.style.setProperty("--c",Math.max(15,Math.min(85,(st.w+dx)/(lab.clientWidth-14)*100))+"%"),()=>({w:pane.offsetWidth}));
  });
}

/* ---------- Начална страница: етапите на проекта ---------- */
const STEPS=[
 {n:"Анализ",t:"Определяме какво трябва да прави системата и какви са ограниченията.",e:"Библиотекарят иска да записва книги, читатели и заемания и да търси бързо по заглавие."},
 {n:"Проектиране",t:"Решаваме как ще бъде изградена: структура, данни, екрани.",e:"Таблици „Книги“, „Читатели“, „Заемания“ и екран за търсене."},
 {n:"Реализация",t:"Създаваме продукта – програмираме, свързваме и настройваме.",e:"Създава се базата от данни и програмата за работа с нея."},
 {n:"Тестване",t:"Проверяваме дали работи правилно и отговаря на изискванията.",e:"Заемане на книга, връщане, търсене, въвеждане на грешни данни."},
 {n:"Внедряване",t:"Предаваме продукта на потребителите и ги обучаваме.",e:"Инсталиране в библиотеката и обучение на библиотекаря."},
 {n:"Поддръжка",t:"Поправяме грешки и добавяме нови възможности.",e:"Добавя се справка за просрочените книги."}];
function step(n){
  document.querySelectorAll(".lay button").forEach((b,i)=>b.classList.toggle("on",i==n));
  $("#dtxt").innerHTML=`<b>${n+1}. ${STEPS[n].n}</b> – ${STEPS[n].t}`;
  $("#dex").innerHTML=`<b>Пример – информационна система за училищна библиотека:</b> ${STEPS[n].e}`;
}

/* ---------- Урок: кратък тест ---------- */
function quizInit(){
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
  if(!QUIZ.length&&done[cur]==null){done[cur]=0;save()}
}

/* ---------- Старт ---------- */
if(cur<0){if($("#dtxt"))step(0)}else{labInit();quizInit()}
nav();
