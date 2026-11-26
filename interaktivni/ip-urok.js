/* Общ скрипт за уроците в раздела „Интерактивни презентации“.
   Менюто на урока, примерни QR кодове, карусел и тест.
   Тестът се задава в страницата преди този файл:
   const QUIZ=[[въпрос,[отговори],индекс на верния,обяснение], …] */
{
const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];

// таблици с клас .stack: на телефон всяка клетка получава етикет от заглавния ред
$$('.stack td').forEach(c=>{let i=0,p=c;while(p=p.previousElementSibling)i+=p.colSpan;c.dataset.l=c.closest('table').rows[0].cells[i]?.textContent||''});

// падащи менюта
const dets=$$('nav details');
dets.forEach(d=>d.addEventListener('toggle',()=>{if(d.open)dets.forEach(o=>{if(o!==d)o.open=false})}));
document.addEventListener('click',e=>{if(!e.target.closest('nav details'))dets.forEach(o=>o.open=false)});
$$('nav .menu a').forEach(a=>a.addEventListener('click',()=>a.closest('details').open=false));
document.addEventListener('keydown',e=>{if(e.key==='Escape')dets.forEach(o=>o.open=false)});

// отстъп при скок до раздел = височината на лепкавото меню (на телефон е на два реда)
const navEl=$('nav');
if(navEl){const pad=()=>document.documentElement.style.scrollPaddingTop=(navEl.offsetHeight+12)+'px';pad();addEventListener('resize',pad)}

// примерни QR кодове (не водят никъде)
function qr(seed){let s=seed,r=()=>(s=(s*9301+49297)%233280)/233280,n=21,o='';
  const fin=(x,y)=>`<rect x="${x}" y="${y}" width="7" height="7" fill="#13246e"/><rect x="${x+1}" y="${y+1}" width="5" height="5" fill="#fff"/><rect x="${x+2}" y="${y+2}" width="3" height="3" fill="#13246e"/>`;
  for(let y=0;y<n;y++)for(let x=0;x<n;x++){const f=(x<8&&y<8)||(x>12&&y<8)||(x<8&&y>12);if(!f&&r()>.52)o+=`<rect x="${x}" y="${y}" width="1" height="1" fill="#13246e"/>`}
  return `<svg viewBox="0 0 21 21" shape-rendering="crispEdges">${o}${fin(0,0)}${fin(14,0)}${fin(0,14)}</svg>`}
$$('.qr').forEach(q=>q.innerHTML=qr(+q.dataset.qr||5));

// карусел с примерни слайдове
const car=$('#car');
if(car){
  const step=d=>{const s=car.querySelector('.slide');car.scrollBy({left:d*(s.offsetWidth+16),behavior:'smooth'})};
  $('#prev').addEventListener('click',()=>step(-1));$('#next').addEventListener('click',()=>step(1));
  car.addEventListener('keydown',e=>{if(e.key==='ArrowRight'){e.preventDefault();step(1)}if(e.key==='ArrowLeft'){e.preventDefault();step(-1)}});
}

// тест
const form=$('#quiz');
if(form&&typeof QUIZ!=='undefined'){
  const render=()=>{form.classList.remove('done');$('#score').textContent='';
    form.innerHTML=QUIZ.map((q,i)=>`<div class="qz"><fieldset><legend>${i+1}. ${q[0]}</legend>${q[1].map((a,j)=>`<label id="l${i}_${j}"><input type="radio" name="q${i}" value="${j}">${a}</label>`).join('')}<p class="why">${q[3]}</p></fieldset></div>`).join('')};
  $('#check').addEventListener('click',()=>{let ok=0;
    QUIZ.forEach((q,i)=>{const c=form.querySelector(`input[name=q${i}]:checked`);
      q[1].forEach((_,j)=>$(`#l${i}_${j}`).classList.remove('ok','bad'));$(`#l${i}_${q[2]}`).classList.add('ok');
      if(c){if(+c.value===q[2])ok++;else $(`#l${i}_${c.value}`).classList.add('bad')}});
    form.classList.add('done');$('#score').textContent=`Резултат: ${ok} от ${QUIZ.length}`});
  $('#again').addEventListener('click',render);render();
}
}
