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
      
      const rect = avatar.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      body.style.setProperty('--target-x', centerX + 'px');
      body.style.setProperty('--target-y', centerY + 'px');
      
      /* freeze badge text movement loop immediately on click event */
      if (badgePointer) {
        badgePointer.classList.add('spotlight-active');
      }
      
      /* trigger active camera tracking state sequence */
      body.classList.add('spotlight-active');
      
      /* trigger endpoint lock and spotlight expansion after target arrival */
      setTimeout(() => {
        body.classList.remove('spotlight-active');
        body.classList.add('spotlight-expand');
        
        /* helper function to construct and inject a single shockwave instance */
        const createRing = () => {
          const ring = document.createElement('div');
          ring.classList.add('shockwave-ring');
          overlay.appendChild(ring);
          
          /* Ökad livslängd till 1500ms så ringen hinner tona ut snyggt i den nya långsammare takten */
          setTimeout(() => {
            ring.remove();
          }, 1500);
        };

        /* Skapar en ny ring var 750:e millisekund (0.75 sek) helt synkroniserat */
        setInterval(createRing, 750);
        
      }, 5500);

      /* process view redirect routing once cinematic expansion and shockwave complete */
      setTimeout(() => {
        window.location.href = targetUrl;
      }, 7500);
    });
  }
});