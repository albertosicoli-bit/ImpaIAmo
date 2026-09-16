const defaults={xp:0,missions:0,streak:0,missionDone:false,lastStudyDay:null};
function readStored(key,fallback){try{return JSON.parse(localStorage.getItem(key))||fallback}catch{return fallback}}
let state={...defaults,...readStored('imparaia-progress',{})};
const $=(s,root=document)=>root.querySelector(s);const $$=(s,root=document)=>[...root.querySelectorAll(s)];
function save(){try{localStorage.setItem('imparaia-progress',JSON.stringify(state))}catch{toast('Salvataggio non disponibile: abilita la memoria del browser.')}renderStats()}
function renderStats(){
  ['xpTop','xpStat'].forEach(id=>$('#'+id).textContent=state.xp);
  $('#missionsStat').textContent=state.missions;
  $('#streakDays').textContent=$('#streakStat').textContent=state.streak;
  $('#startMission').textContent=state.missionDone?'Missione completata ✓':'Inizia la missione →';
  $('#startMission').disabled=state.missionDone;
  const promptDone=Boolean(readStored('imparaia-prompt-bonus',false));
  const done=Number(state.missionDone)+Number(promptDone),percent=done*20;
  $('#pathPercent').textContent=percent+'%';$('#pathBar').style.width=percent+'%';
  $('#levelNumber').textContent=1+Math.floor(state.xp/100);
  $('.level-orbit').setAttribute('aria-label','Livello '+$('#levelNumber').textContent);
  const steps=$$('.path-steps span');steps.forEach((step,i)=>{step.className=i<done?'done':i===done?'current':'';step.textContent=i<done?'✓':i+1});
  $('.section-title>span').textContent=done+' di 5 completate';
  const earned=[state.missions>0,promptDone,state.missionDone,state.xp>=300];
  $$('.badge').forEach((badge,i)=>badge.classList.toggle('earned',earned[i]));
  const promptCard=$('[data-lesson="Prompt perfetti"]');promptCard.classList.toggle('complete',promptDone);$('small',promptCard).textContent=promptDone?'COMPLETATA':'DA ESPLORARE';$('b',promptCard).textContent=promptDone?'✓':'→';
  $('#insightTitle').textContent=state.missionDone?'Hai imparato a verificare!':'Il tuo primo passo da detective';
  $('#insightText').textContent=state.missionDone?'Prova il Laboratorio per formulare una richiesta completa.':'Inizia la missione “L’AI dice sempre la verità?”.';
}
function toast(text){const el=$('#toast');el.textContent=text;el.classList.add('show');setTimeout(()=>el.classList.remove('show'),2400)}
function showView(id){if(!readStored('imparaia-profile',null)&&id!=='signup')id='signup';$$('.nav-btn,.view').forEach(el=>el.classList.remove('active'));$(`[data-view="${id}"]`)?.classList.add('active');$('#'+id).classList.add('active');if(id!=='signup')renderStats();window.scrollTo({top:0,behavior:'smooth'})}
$$('.nav-btn').forEach(btn=>btn.addEventListener('click',()=>showView(btn.dataset.view)));
const modal=$('#missionModal');let missionIndex=0;
const questions=[
  {title:'Quale frase ti sembra sospetta?',text:'Un’AI dice: “I polpi hanno cinque cuori.” Che cosa fai?',answers:['La copio subito nei compiti','La verifico su una fonte affidabile','È scritta bene, quindi è vera'],correct:1,feedback:'Ottima scelta! I polpi hanno tre cuori, non cinque. Una frase sicura può comunque essere sbagliata.'},
  {title:'Qual è la fonte migliore?',text:'Devi verificare quanti pianeti ci sono nel Sistema Solare. Dove cerchi?',answers:['Un commento anonimo','Un sito scientifico o un libro scolastico','Chiedo alla stessa AI di ripeterlo'],correct:1,feedback:'Esatto. Per una verifica scegli fonti riconoscibili, aggiornate e adatte all’argomento.'},
  {title:'La regola del detective',text:'Cosa puoi chiedere all’AI quando risponde?',answers:['Di parlare più velocemente','Di indicare le fonti da controllare','Di non sbagliare mai'],correct:1,feedback:'Giusto! Chiedere le fonti è un buon inizio, ma dovrai comunque aprirle e controllarle.'}
];
function openMission(){missionIndex=0;modal.hidden=false;document.body.style.overflow='hidden';renderQuestion();$('.close-btn').focus()}
function closeMission(){modal.hidden=true;document.body.style.overflow='';$('#startMission').focus()}
function renderQuestion(){const q=questions[missionIndex];$('#missionStep').innerHTML=`<p class="eyebrow">SFIDA ${missionIndex+1} DI ${questions.length}</p><h2 id="missionTitle" class="question-title">${q.title}</h2><p>${q.text}</p><div class="answers">${q.answers.map((a,i)=>`<button class="answer-btn" data-answer="${i}">${a}</button>`).join('')}</div><div class="feedback" hidden role="status"></div>`;$$('[data-answer]',modal).forEach(b=>b.addEventListener('click',()=>answer(Number(b.dataset.answer))));$('.modal-card',modal).focus()}
function answer(i){const q=questions[missionIndex],buttons=$$('.answer-btn',modal),feedback=$('.feedback',modal);buttons.forEach(b=>b.disabled=true);buttons[q.correct].classList.add('correct');if(i!==q.correct)buttons[i].classList.add('wrong');feedback.hidden=false;feedback.innerHTML=`<strong>${i===q.correct?'Perfetto!':'Ci sei quasi.'}</strong><br>${q.feedback}<br><button class="primary-btn" id="nextQuestion" style="margin-top:.8rem">${missionIndex<questions.length-1?'Prossima sfida':'Vedi il risultato'}</button>`;$('#nextQuestion').addEventListener('click',()=>{missionIndex++;missionIndex<questions.length?renderQuestion():completeMission()})}
function studyToday(){const today=new Date().toISOString().slice(0,10);if(state.lastStudyDay===today)return;const previous=state.lastStudyDay?new Date(state.lastStudyDay+'T00:00:00Z'):null;state.streak=previous&&Date.now()-previous.getTime()<172800000?state.streak+1:1;state.lastStudyDay=today}
function completeMission(){if(!state.missionDone){state.xp+=80;state.missions+=1;state.missionDone=true;studyToday();save()}$('#missionStep').innerHTML='<div class="success-screen"><div class="success-icon">✓</div><p class="eyebrow" style="margin-top:1rem">MISSIONE COMPIUTA</p><h2 id="missionTitle" class="question-title" style="margin-right:0">Sei un vero detective!</h2><p>Hai imparato che l’AI può sbagliare e che una risposta va controllata. Hai guadagnato <b>80 XP</b>.</p><button class="primary-btn" data-close="true">Torna alle missioni</button></div>';$$('[data-close]',modal).forEach(x=>x.addEventListener('click',closeMission))}
$('#startMission').addEventListener('click',openMission);modal.addEventListener('click',e=>{if(e.target.dataset.close)closeMission()});document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!modal.hidden)closeMission()});
const promptInput=$('#promptInput');promptInput.addEventListener('input',()=>$('#charCount').textContent=`${promptInput.value.length} / 300`);
$$('[data-prompt]').forEach(b=>b.addEventListener('click',()=>{promptInput.value=b.dataset.prompt;promptInput.dispatchEvent(new Event('input'));promptInput.focus()}));
$('#analyzePrompt').addEventListener('click',()=>{const t=promptInput.value.trim();if(t.length<5){toast('Scrivi prima una richiesta un po’ più completa.');return}const tests={topic:t.split(/\s+/).length>=3,goal:/spiega|aiuta|crea|fammi|scrivi|confronta|riassumi|parlami/i.test(t),format:/punti|tabella|quiz|domande|parole|elenco|storia|dialogo/i.test(t),level:/elementare|media|anni|classe|semplice|facile|ragazz/i.test(t)};Object.entries(tests).forEach(([k,v])=>$(`[data-check="${k}"]`).classList.toggle('pass',v));const missing=Object.entries(tests).filter(([,v])=>!v).map(([k])=>({topic:'l’argomento',goal:'cosa vuoi ottenere',format:'il formato della risposta',level:'il livello di difficoltà'}[k]));const score=Object.values(tests).filter(Boolean).length;if(score===4){$('#coachMessage').innerHTML='<b>Prompt eccellente!</b> È chiaro, specifico e adatto al tuo livello. Ricorda comunque di controllare le informazioni ricevute.';if(!localStorage.getItem('imparaia-prompt-bonus')){state.xp+=30;save();localStorage.setItem('imparaia-prompt-bonus','1');toast('+30 XP: primo prompt completo!')}}else{$('#coachMessage').innerHTML=`Buon inizio! Per renderlo ancora migliore aggiungi <b>${missing.join('</b> e <b>')}</b>.`}});
$$('.lesson-card:not(.locked)').forEach(b=>b.addEventListener('click',()=>toast(b.classList.contains('complete')?'Questa missione è già completata.':'Completa prima la missione di oggi.')));
const resetDialog=$('#resetDialog');let resetScope='mission';
function askReset(scope){resetScope=scope;$('#resetDescription').textContent=scope==='all'?'XP, missioni e badge verranno azzerati. Il tuo personaggio resterà salvato.':'Ripartirai dalla prima domanda. Il premio di questa missione verrà azzerato; il personaggio e le altre attività rimarranno.';resetDialog.showModal();$('#cancelReset').focus()}
$('#restartMission').addEventListener('click',()=>askReset('mission'));
$('#resetProgress').addEventListener('click',()=>askReset('all'));
$('#cancelReset').addEventListener('click',()=>resetDialog.close());
$('#confirmReset').addEventListener('click',()=>{
  if(resetScope==='all'){state={...defaults};localStorage.removeItem('imparaia-prompt-bonus');localStorage.removeItem('imparaia-interactions');}
  else{if(state.missionDone){state.xp=Math.max(0,state.xp-80);state.missions=Math.max(0,state.missions-1);}state.missionDone=false;}
  save();resetDialog.close();showView('home');if(resetScope==='mission')openMission();else toast('Si riparte da zero! Il personaggio è rimasto con te.');
});
document.addEventListener('keydown',event=>{if(event.key!=='Tab'||modal.hidden)return;const focusable=$$('button:not([disabled]),[tabindex="0"]',modal);const first=focusable[0],last=focusable.at(-1);if(event.shiftKey&&document.activeElement===first){event.preventDefault();last?.focus()}else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first?.focus()}});
if('serviceWorker'in navigator)window.addEventListener('load',()=>navigator.serviceWorker.register('./sw.js'));
renderStats();
