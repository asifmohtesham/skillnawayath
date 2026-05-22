gsap.registerPlugin(ScrollTrigger);

var E = 'power3.out';

function animateHome() {
  var tl = gsap.timeline({ defaults: { ease: E } });
  tl.from('#site-nav',      { autoAlpha: 0, y: -28, duration: 0.65 })
    .from('#hero-tagline',  { autoAlpha: 0, y:  22, duration: 0.55 }, '-=0.25')
    .from('#hero-headline', { autoAlpha: 0, y:  36, duration: 0.70 }, '-=0.35')
    .from('#hero-sub',      { autoAlpha: 0, y:  24, duration: 0.60 }, '-=0.40')
    .from('#divider-left',  { scaleX: 0, transformOrigin: 'right center', duration: 0.55 }, '-=0.20')
    .from('#divider-right', { scaleX: 0, transformOrigin: 'left center',  duration: 0.55 }, '<')
    .from('#divider-text',  { autoAlpha: 0, duration: 0.40 }, '-=0.30')
    .from(['#pillar-learn', '#pillar-think', '#pillar-grow'],
          { autoAlpha: 0, y: 22, stagger: 0.13, duration: 0.50 }, '-=0.15');

  gsap.from('#story-strip', {
    scrollTrigger: { trigger: '#story-strip', start: 'top 82%' },
    autoAlpha: 0, y: 32, duration: 0.75, ease: E
  });
  gsap.from('#site-footer', {
    scrollTrigger: { trigger: '#site-footer', start: 'top 92%' },
    autoAlpha: 0, duration: 0.50, ease: E
  });
}

function animateAbout() {
  var tl = gsap.timeline({ defaults: { ease: E } });
  tl.from('#site-nav',              { autoAlpha: 0, y: -28, duration: 0.60 })
    .from('#page-hero .page-eyebrow', { autoAlpha: 0, y:  16, duration: 0.45 }, '-=0.20')
    .from('#page-hero .page-title',   { autoAlpha: 0, y:  32, duration: 0.65 }, '-=0.35')
    .from('#page-hero .page-intro',   { autoAlpha: 0, y:  20, duration: 0.55 }, '-=0.35');

  ['#section-community', '#section-platform', '#section-values'].forEach(function (sel) {
    gsap.from(sel, {
      scrollTrigger: { trigger: sel, start: 'top 80%' },
      autoAlpha: 0, y: 28, duration: 0.65, ease: E
    });
  });
}

function animatePrivacy() {
  var tl = gsap.timeline({ defaults: { ease: E } });
  tl.from('#site-nav',              { autoAlpha: 0, y: -28, duration: 0.60 })
    .from('#page-hero .page-eyebrow', { autoAlpha: 0, y:  16, duration: 0.45 }, '-=0.20')
    .from('#page-hero .page-title',   { autoAlpha: 0, y:  32, duration: 0.65 }, '-=0.35')
    .from('#page-hero .page-intro',   { autoAlpha: 0, y:  20, duration: 0.55 }, '-=0.35')
    .from(['#section-collect', '#section-contact'],
          { autoAlpha: 0, y: 24, stagger: 0.15, duration: 0.55 }, '-=0.20');
}

var page = document.body.dataset.page;
if (page === 'home')    animateHome();
if (page === 'about')   animateAbout();
if (page === 'privacy') animatePrivacy();
