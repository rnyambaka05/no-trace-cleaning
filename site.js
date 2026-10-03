/* No Trace Cleaning , shared interactions across separate HTML pages. Edit the form endpoint ONCE here. */
(()=>{'use strict';
 const CONFIG={formspree:'https://formspree.io/f/mjykjyab',phone:'',email:''};
 const $=(s,root=document)=>root.querySelector(s),$$=(s,root=document)=>[...root.querySelectorAll(s)];
 const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
 const header=$('#siteHeader'),burger=$('#menuButton'),nav=$('#navLinks');
 function closeMenu(){if(!nav||!burger)return;nav.classList.remove('open');burger.setAttribute('aria-expanded','false');burger.setAttribute('aria-label','Open navigation');document.body.classList.remove('locked')}
 if(burger&&nav){burger.addEventListener('click',()=>{if(nav.classList.contains('open')){closeMenu();return}nav.classList.add('open');burger.setAttribute('aria-expanded','true');burger.setAttribute('aria-label','Close navigation')});$$('#navLinks a').forEach(a=>a.addEventListener('click',closeMenu));document.addEventListener('keydown',e=>{if(e.key==='Escape')closeMenu()});document.addEventListener('click',e=>{if(!e.target.closest('.navbar'))closeMenu()})}
 // Precision section navigation: align the beginning of every linked section directly below the compact sticky header.
 const alignHash=()=>{
   if(!location.hash)return;
   const target=document.getElementById(decodeURIComponent(location.hash.slice(1)));
   if(!target)return;
   const sectionHead=target.querySelector('.section-head,.faq-head,.v8-reviews-head,.plans-inner > .reveal');
   const visualTarget=sectionHead||target;
   header?.classList.add('scrolled');
   const offset=(header?.getBoundingClientRect().height||96)+1;
   const top=Math.max(0,visualTarget.getBoundingClientRect().top+scrollY-offset);
   scrollTo({top,behavior:reduced?'auto':'smooth'});
 };
 $$('a[href*="#"]').forEach(a=>a.addEventListener('click',e=>{
   const url=new URL(a.href,location.href);
   const samePage=url.origin===location.origin && (url.pathname===location.pathname || ((url.pathname.endsWith('/index.html')||url.pathname==='/') && (location.pathname.endsWith('/index.html')||location.pathname==='/')));
   if(!samePage||!url.hash)return;
   const target=document.getElementById(decodeURIComponent(url.hash.slice(1)));
   if(!target)return;
   e.preventDefault();
   history.pushState(null,'',url.hash);
   alignHash();
 }));
 addEventListener('load',()=>{if(location.hash)setTimeout(alignHash,80)});
 addEventListener('hashchange',()=>setTimeout(alignHash,20));
 function onScroll(){header?.classList.toggle('scrolled',scrollY>32)};addEventListener('scroll',onScroll,{passive:true});onScroll();
 if(!reduced&&'IntersectionObserver' in window){let ob=new IntersectionObserver((entries,o)=>{entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('is-visible');o.unobserve(e.target)}})},{threshold:.08,rootMargin:'0px 0px -12px 0px'});$$('.reveal').forEach(el=>ob.observe(el));document.documentElement.classList.add('can-animate');setTimeout(()=>$$('.quote .reveal').forEach(el=>el.classList.add('is-visible')),1800)}
 $$('#year').forEach(y=>y.textContent=new Date().getFullYear());
 const contact=$('#footerContact');if(contact){if(CONFIG.phone||CONFIG.email){contact.hidden=false;if(CONFIG.phone){let e=$('#publicPhone');e.href='tel:'+CONFIG.phone.replace(/[^+\d]/g,'');e.textContent=CONFIG.phone}else $('#publicPhone').hidden=true;if(CONFIG.email){let e=$('#publicEmail');e.href='mailto:'+CONFIG.email;e.textContent=CONFIG.email}else $('#publicEmail').hidden=true}}
 // Premium hero reel: six new, high-resolution cleaning clips, alternating residential and commercial scenes.
 const montage=$('#heroMontage'), dataSaver=navigator.connection&&navigator.connection.saveData;
 if(montage&&!reduced&&!dataSaver){
   const players=[$('#heroClipA'),$('#heroClipB'),$('#heroClipC')].filter(Boolean);
   const poster=$('#heroPoster');
   const clips=[
     'https://videos.pexels.com/video-files/6195186/6195186-uhd_3840_2160_25fps.mp4',
     'https://videos.pexels.com/video-files/6195190/6195190-uhd_3840_2160_25fps.mp4',
     'https://videos.pexels.com/video-files/7204664/7204664-uhd_3840_2160_24fps.mp4',
     'https://videos.pexels.com/video-files/10567296/10567296-uhd_4096_2160_25fps.mp4',
     'https://videos.pexels.com/video-files/4204928/4204928-uhd_3840_2160_25fps.mp4',
     'https://videos.pexels.com/video-files/6195531/6195531-uhd_3840_2160_25fps.mp4'
   ];
   let active=0,nextIndex=1,running=true,transitionTimer=0,started=false;
   const setPlaybackSpeed=v=>{v.playbackRate=.72;v.defaultPlaybackRate=.72};
   const ready=v=>new Promise(resolve=>{
     if(!v)return resolve(false);
     if(v.readyState>=3)return resolve(true);
     let done=false;
     const finish=ok=>{if(done)return;done=true;v.removeEventListener('canplay',onReady);v.removeEventListener('error',onError);resolve(ok)};
     const onReady=()=>finish(true),onError=()=>finish(false);
     v.addEventListener('canplay',onReady,{once:true});v.addEventListener('error',onError,{once:true});
     setTimeout(()=>finish(v.readyState>=2),12000);
   });
   const setSource=(v,url)=>{if(!v)return;v.pause();v.src=url;v.load();v.muted=true;v.playsInline=true;v.preload='auto';setPlaybackSpeed(v)};
   const warm=(v,url)=>{if(!v)return;setSource(v,url)};
   const ensureReady=async v=>await ready(v);
   const schedule=()=>{
     clearTimeout(transitionTimer);
     const current=players[active];
     const duration=Number.isFinite(current?.duration)&&current.duration>0?current.duration:18;
     const wait=Math.max(11500,(duration/.72-1.35)*1000);
     transitionTimer=setTimeout(()=>advance(),wait);
   };
   async function advance(){
     if(!running||document.hidden)return;
     const current=players[active],targetIndex=(active+1)%players.length,target=players[targetIndex],url=clips[nextIndex%clips.length];
     if(!target)return;
     if(target.src!==url)warm(target,url);
     const ok=await ensureReady(target);
     if(!running||document.hidden)return;
     if(!ok){nextIndex=(nextIndex+1)%clips.length;schedule();return}
     try{setPlaybackSpeed(target);target.currentTime=0;await target.play()}catch(_){schedule();return}
     target.classList.add('is-active');
     poster?.classList.add('is-faded');
     current?.classList.remove('is-active');
     setTimeout(()=>current?.pause(),1450);
     active=targetIndex;
     nextIndex=(nextIndex+1)%clips.length;
     const preloadPlayer=players[(active+1)%players.length],preloadUrl=clips[nextIndex%clips.length];
     if(preloadPlayer&&preloadPlayer.src!==preloadUrl)warm(preloadPlayer,preloadUrl);
     schedule();
   }
   // Load the first three scenes immediately so the reel can crossfade without visible loading gaps.
   players.forEach((v,i)=>warm(v,clips[i]));
   const boot=async()=>{
     const first=players[0];
     if(!first)return;
     const ok=await ensureReady(first);
     if(!ok){poster?.classList.remove('is-faded');return}
     try{setPlaybackSpeed(first);first.currentTime=0;await first.play();first.classList.add('is-active');poster?.classList.add('is-faded');started=true;schedule()}catch(_){poster?.classList.remove('is-faded')}
   };
   boot();
   document.addEventListener('visibilitychange',()=>{
     if(document.hidden){running=false;clearTimeout(transitionTimer);players.forEach(v=>v.pause())}
     else{running=true;const current=players[active];setPlaybackSpeed(current);current?.play().catch(()=>{});schedule()}
   });
   addEventListener('resize',()=>{if(started)schedule()},{passive:true});
 } else if(montage){
   $('#heroClipA')?.remove();$('#heroClipB')?.remove();$('#heroClipC')?.remove();
 }
 // Simple phone-only quote popup. Appears shortly after landing and can be dismissed.
 const quick=$('#quickQuote'),quickClose=$('#quickQuoteClose'),quickForm=$('#quickQuoteForm'),quickStatus=$('#quickQuoteStatus');
 if(quick&&quickForm){
   let revealed=false,skip=false,quickTimer;
   try{skip=sessionStorage.getItem('ntc_quick_quote_dismissed')==='1'}catch(_){skip=false}
   const quickPhone=$('#quickQuotePhone');
   const formatPhone=value=>{
     const d=value.replace(/\D/g,'').slice(0,10);
     if(d.length<4)return d;
     if(d.length<7)return `(${d.slice(0,3)}) ${d.slice(3)}`;
     return `(${d.slice(0,3)}) ${d.slice(3,6)}-${d.slice(6)}`;
   };
   quickPhone?.addEventListener('input',()=>{quickPhone.value=formatPhone(quickPhone.value)});
   const show=()=>{if(revealed||skip||document.hidden||location.pathname.endsWith('/quote.html'))return;revealed=true;quick.hidden=false;requestAnimationFrame(()=>quick.classList.add('is-open'));setTimeout(()=>quickPhone?.focus(),180)};
   const close=()=>{quick.classList.remove('is-open');setTimeout(()=>quick.hidden=true,260);skip=true;clearTimeout(quickTimer);try{sessionStorage.setItem('ntc_quick_quote_dismissed','1')}catch(_){} };
   quickClose?.addEventListener('click',close);
   document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!quick.hidden)close()});
   if(!skip)quickTimer=setTimeout(show,900);
   quickForm.action=CONFIG.formspree;
   quickForm.addEventListener('submit',async e=>{
     e.preventDefault();
     const phone=quickPhone,submit=$('#quickQuoteSubmit');
     quickStatus?.classList.remove('is-error');
     if(!phone?.value||phone.value.replace(/\D/g,'').length<10){quickStatus.textContent='Please enter a valid phone number.';quickStatus.classList.add('is-error');phone?.focus();return}
     if(quickForm.querySelector('input[name="_gotcha"]')?.value)return;
     submit.disabled=true;submit.style.opacity='.65';quickStatus.textContent='Sending…';
     try{const res=await fetch(CONFIG.formspree,{method:'POST',body:new FormData(quickForm),headers:{Accept:'application/json'}});if(!res.ok)throw Error('Send failed');quickForm.reset();quickStatus.textContent='Received. We’ll be in touch shortly.';setTimeout(close,3000)}
     catch(_){quickStatus.textContent='Unable to send right now. Please try again.';quickStatus.classList.add('is-error')}
     finally{submit.disabled=false;submit.style.opacity='1'}
   });
 }

 // Difference-section video starts only when it enters view, reducing initial page load.
 const differenceVideo=$('.difference-video');
 if(differenceVideo&&!reduced){
   const startDifferenceVideo=()=>{differenceVideo.muted=true;differenceVideo.play().catch(()=>{})};
   if('IntersectionObserver' in window){const dvObs=new IntersectionObserver(entries=>{if(entries.some(e=>e.isIntersecting)){startDifferenceVideo();dvObs.disconnect()}},{rootMargin:'180px'});dvObs.observe(differenceVideo)}else startDifferenceVideo();
 }
 // Testimonials: continuous roll-a-deck marquee with a duplicated card set for a seamless loop.
 const reviews=$('#reviewTrack');if(reviews){
   const viewport=$('#reviewViewport');
   const cards=[...reviews.children];
   if(cards.length){
     const group=document.createElement('div');
     group.className='review-group';
     cards.forEach(card=>group.appendChild(card));
     const clone=group.cloneNode(true);
     clone.setAttribute('aria-hidden','true');
     clone.querySelectorAll('a,button,input,textarea,select,[tabindex]').forEach(el=>el.setAttribute('tabindex','-1'));
     reviews.innerHTML='';
     reviews.append(group,clone);
     reviews.classList.add('is-marquee');
     const syncLoopWidth=()=>{
       const width=group.getBoundingClientRect().width;
       if(width>0)reviews.style.setProperty('--review-loop-width',`${width}px`);
     };
     syncLoopWidth();
     addEventListener('resize',syncLoopWidth,{passive:true});
     viewport?.addEventListener('keydown',e=>{
       if(e.key==='ArrowRight'){reviews.style.animationPlayState='paused';setTimeout(()=>reviews.style.animationPlayState='',700)}
       if(e.key==='ArrowLeft'){reviews.style.animationPlayState='paused';setTimeout(()=>reviews.style.animationPlayState='',700)}
     });
   }
 }
 // Homepage recurring option links DIRECTLY to the standalone quote page, not an anchor.
 const homepageLink=$('#plans .plan-actions a.btn');$$('.frequency').forEach(b=>b.addEventListener('click',()=>{$$('.frequency').forEach(x=>x.setAttribute('aria-pressed',String(x===b)));if(homepageLink){let url=new URL('quote.html','https://example.invalid/');url.searchParams.set('service','recurring-residential');url.searchParams.set('offer','50');url.searchParams.set('frequency',b.dataset.frequency||'');url.searchParams.set('source','home-recurring-plan');homepageLink.href=url.pathname.split('/').pop()+'?'+url.searchParams.toString()}}));
 const recurLink=$('#recurringPageCta');$$('.freq-choice').forEach(b=>b.addEventListener('click',()=>{$$('.freq-choice').forEach(x=>x.setAttribute('aria-pressed',String(x===b)));if(recurLink){let url=new URL(recurLink.getAttribute('href'),'https://example.invalid/');url.searchParams.set('frequency',b.dataset.frequency||'');recurLink.href=url.pathname.split('/').pop()+'?'+url.searchParams.toString()}}));
 // Forms use the same configuration and record intent/source in Formspree emails.
 const form=$('#leadForm'),notice=$('#offerNotice');if($('.quote-page')){const m=$('.mobile-cta');if(m)m.style.display='none'}if(!form)return;
 const service=$('#service'),frequency=$('#frequency'),source=$('#leadSource'),offer=$('#offerRequested'),status=$('#formStatus'),submit=$('#submitButton');
 form.action=CONFIG.formspree;
 let q=new URLSearchParams(location.search);
 let services={'residential':'Residential cleaning','commercial':'Commercial cleaning','deep':'Residential deep clean','recurring-residential':'Recurring residential cleaning','recurring-commercial':'Recurring commercial cleaning','standard':'Standard clean','deep':'Deep clean','move-in-out':'Move-in / move-out','airbnb':'Airbnb / rental turnover','carpet':'Carpet shampoo','tile':'Tile & grout','upholstery':'Upholstery steam clean','post-construction':'Post-construction cleanup','commercial-turnover':'Commercial turnover cleaning'};
 if(service&&services[q.get('service')])service.value=services[q.get('service')];
 if(frequency&&[...frequency.options].some(o=>o.value===q.get('frequency')))frequency.value=q.get('frequency');
 if(source&&q.get('source'))source.value=q.get('source').slice(0,110);
 if(q.get('offer')==='50'){if(service)service.value='Recurring residential cleaning';if(offer)offer.value='50% off first deep clean';notice?.classList.add('is-visible')}
 // Existing inline homepage quote form: links are independent pages now. The form still works if naturally reached by scrolling.
 function msg(text,type=''){status.className='status '+type;status.textContent=text}
 form.addEventListener('submit',async e=>{e.preventDefault();if(!form.reportValidity())return;if(CONFIG.formspree.includes('YOUR_FORM_ID')){msg('Setup needed: replace YOUR_FORM_ID in site.js with your Formspree form ID.','error');return}if($('#website')?.value)return;submit.disabled=true;submit.style.opacity='.65';msg('Sending your request…');try{let res=await fetch(form.action,{method:'POST',body:new FormData(form),headers:{Accept:'application/json'}});if(!res.ok)throw Error('Submission failed');form.reset();msg("Thank you! We've received your request and will reach out to discuss your quote.",'success');if(notice)notice.classList.remove('is-visible');if(offer)offer.value='No'}catch(err){msg('Your request could not be sent right now. Please try again.','error')}finally{submit.disabled=false;submit.style.opacity=''}})
})();
