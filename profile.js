(function(){
  const form=document.querySelector('#profileForm'),nickname=document.querySelector('#nickname');
  const characters={fox:{label:'Volpe esploratrice',story:'Una volpe curiosa: nessuna domanda è troppo piccola!'},robot:{label:'Robot inventore',story:'Un robot gentile, pronto a inventare e imparare con te.'},owl:{label:'Gufo detective',story:'Un gufo attento: ogni indizio è una nuova scoperta.'},dragon:{label:'Draghetto creativo',story:'Un piccolo drago con una grande immaginazione!'}};
  const colors={blue:'#2563eb',mint:'#16876d',purple:'#7c3aed',coral:'#c94a32'};
  let profile=readStored('imparaia-profile',null);
  if(profile&&(!characters[profile.character]||!colors[profile.color]||!['primaria','media'].includes(profile.school)||typeof profile.nickname!=='string'))profile=null;
  function preview(){const data=new FormData(form),character=data.get('character'),color=data.get('color');document.querySelector('#previewArt').className='character-art preview-art '+character;document.querySelector('#previewArt').setAttribute('aria-label',characters[character].label);document.querySelector('#previewName').textContent=nickname.value.trim()||'Piccolo esploratore';document.querySelector('#characterStory').textContent=characters[character].story;document.querySelector('#characterPreview').style.setProperty('--character-color',colors[color]);}
  function applyProfile(){document.querySelector('#welcomeName').textContent='Ciao, '+profile.nickname+'!';document.querySelector('#welcomePath').textContent='IL TUO PERCORSO · '+(profile.school==='media'?'SCUOLA MEDIA':'SCUOLA PRIMARIA');document.querySelector('#schoolLevel').value=profile.school;document.querySelector('#profileLabel').textContent=profile.nickname;document.querySelector('#editProfile .character-art').className='character-art '+profile.character;document.querySelector('#editProfile').hidden=false;document.body.classList.remove('creating-profile');}
  function openProfile(){document.body.classList.add('creating-profile');showView('signup');if(profile){nickname.value=profile.nickname;form.elements.school.value=profile.school;form.elements.character.value=profile.character;form.elements.color.value=profile.color;document.querySelector('#adultCheck').checked=true;document.querySelector('#saveProfile').textContent='Salva il personaggio →';document.querySelector('#cancelProfile').hidden=false;document.querySelector('#signupTitle').innerHTML='Il tuo personaggio,<br>la tua <span>avventura.</span>';}preview();}
  form.addEventListener('input',preview);form.addEventListener('change',preview);
  form.addEventListener('submit',event=>{
    event.preventDefault();const name=nickname.value.trim(),error=document.querySelector('#profileError');
    if(!/^[\p{L}\p{N}_ -]{2,20}$/u.test(name)||name.split(/\s+/).length>1){error.textContent='Scegli un soprannome di 2–20 caratteri, senza spazi: per esempio AstroBlu.';error.hidden=false;nickname.focus();return;}
    if(!form.reportValidity())return;
    const data=new FormData(form),next={nickname:name,school:data.get('school'),character:data.get('character'),color:data.get('color')};
    try{localStorage.setItem('imparaia-profile',JSON.stringify(next));if(!profile){state={...defaults};localStorage.removeItem('imparaia-prompt-bonus');localStorage.removeItem('imparaia-interactions');save();}}
    catch{error.textContent='Non posso salvare il profilo. Abilita la memoria del browser e riprova.';error.hidden=false;return;}
    profile=next;error.hidden=true;applyProfile();showView('home');toast('Il tuo personaggio è pronto!');
  });
  document.querySelector('#editProfile').addEventListener('click',openProfile);
  document.querySelector('#cancelProfile').addEventListener('click',()=>{applyProfile();showView('home')});
  document.querySelector('.brand').addEventListener('click',event=>{event.preventDefault();if(profile){applyProfile();showView('home')}else openProfile()});
  if(profile){applyProfile();showView('home')}else{showView('signup');preview();}
})();
