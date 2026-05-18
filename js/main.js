document.addEventListener('DOMContentLoaded', () => {
  const body = document.body;
  const avatar = document.getElementById('avatarImg');
  const overlay = document.getElementById('spotlightOverlay');
  const avatarLink = document.querySelector('.hero-image a');
  const badgePointer = document.querySelector('.badge-pointer');

  if (avatarLink && avatar && overlay) {
    avatarLink.addEventListener('click', (event) => {
      event.preventDefault();
      const targetUrl = avatarLink.getAttribute('href');
      
      /* Calculate coordinate centers for the profile avatar node */
      const rect = avatar.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      /* Inject dynamic tracking variables into global CSS context */
      body.style.setProperty('--target-x', centerX + 'px');
      body.style.setProperty('--target-y', centerY + 'px');
      
      /* Freeze active badge pointer animation states immediately */
      if (badgePointer) {
        badgePointer.classList.add('spotlight-active');
      }
      
      /* Initiate the automated screen sweep sequence (runs for 5.5s) */
      body.classList.add('spotlight-active');
      
      /* Trigger sequence transition once primary sweep concludes at 5.5s */
      setTimeout(() => {
        body.classList.remove('spotlight-active');
        body.classList.add('spotlight-shockwave');
        
        /* Generator function creating expanding wave particle nodes */
        const createRing = () => {
          const ring = document.createElement('div');
          ring.classList.add('shockwave-ring');
          overlay.appendChild(ring);
          
          /* Garbage collection tracking to clear stale DOM particles */
          setTimeout(() => {
            ring.remove();
          }, 1500);
        };

        /* Fire the initial shockwave particle immediately */
        createRing();
        
        /* Establish continuous loop intervals for successive wave particles */
        setInterval(createRing, 750);

        /* VISUAL SYNC FIX: 
          As the first wave expands past the avatar boundaries at 300ms, 
          instantly illuminate and lock the permanent target focus mask.
        */
        setTimeout(() => {
          body.classList.add('spotlight-expand');
        }, 300);
        
      }, 5500);

      /* Redirect execution context to target URL when full sequence ends */
      setTimeout(() => {
        window.location.href = targetUrl;
      }, 7500);
    });
  }
});