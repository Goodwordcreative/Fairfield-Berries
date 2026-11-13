(() => {
  const toggle=document.querySelector('.menu-toggle');
  const nav=document.querySelector('.site-nav');
  if(toggle&&nav){
    toggle.addEventListener('click',()=>{
      const isOpen=nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded',String(isOpen));
      toggle.textContent=isOpen?'✕':'☰';
    });
    nav.querySelectorAll('a').forEach(link=>link.addEventListener('click',()=>{
      nav.classList.remove('open');toggle.setAttribute('aria-expanded','false');toggle.textContent='☰';
    }));
  }
  document.querySelectorAll('[data-carousel]').forEach(button=>button.addEventListener('click',()=>{
    const track=document.getElementById(button.dataset.carousel);
    const card=track?.querySelector('figure');
    if(!card)return;
    const gap=parseFloat(getComputedStyle(track).gap)||17;
    track.scrollBy({left:Number(button.dataset.direction)*(card.getBoundingClientRect().width+gap),behavior:'smooth'});
  }));
  const form=document.getElementById('contact-message');
  if(form) form.addEventListener('submit',event=>{
    event.preventDefault();
    if(!form.reportValidity())return;
    const data=new FormData(form);
    const subject='Fairfield Berries website enquiry';
    const body=['Name: '+data.get('name'),'Email: '+data.get('email'),'','Message:',data.get('message')].join('\n');
    window.location.href='mailto:fairfieldberries@gmail.com?subject='+encodeURIComponent(subject)+'&body='+encodeURIComponent(body);
  });
})();