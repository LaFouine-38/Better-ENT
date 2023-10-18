// // Importez GSAP comme vous l'avez fait précédemment

// // Sélectionnez les éléments HTML
// const credentialsInfo = document.getElementById('credentials-info');
// const infoMessageContainer = document.querySelector('.info-message-container');
// const infoMessage = document.getElementById('info-message');

// // Animation GSAP
// const tl = gsap.timeline({ paused: true });
// tl.to(infoMessageContainer, { width: '100%', opacity: 1, duration: 0.3, ease: 'power3.inOut' });
// tl.from(infoMessage, { x: '100%', duration: 0.3, ease: 'power3.inOut' }, '<');

// // Écouteur d'événement de survol
// credentialsInfo.addEventListener('mouseenter', () => {
//   tl.play();
// });

// credentialsInfo.addEventListener('mouseleave', () => {
//   tl.reverse();
// });
