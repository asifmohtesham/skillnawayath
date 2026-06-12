(function () {
  var docEl = document.documentElement;

  // If the GSAP CDN failed, drop the .js class so the CSS that
  // pre-hides [data-anim] elements stops applying.
  if (!window.gsap) {
    docEl.classList.remove('js');
    return;
  }
  if (window.ScrollTrigger) gsap.registerPlugin(ScrollTrigger);

  var E = 'power3.out';

  function introPlayed() {
    try { return sessionStorage.getItem('sn-intro') === '1'; } catch (e) { return false; }
  }
  function markIntroPlayed() {
    try { sessionStorage.setItem('sn-intro', '1'); } catch (e) {}
  }

  function fadeUp(tl, sel, y, duration, pos) {
    tl.fromTo(sel,
      { autoAlpha: 0, y: y },
      { autoAlpha: 1, y: 0, duration: duration }, pos);
  }

  function scrollReveal(sel) {
    if (!window.ScrollTrigger) {
      gsap.set(sel, { autoAlpha: 1 });
      return;
    }
    gsap.fromTo(sel,
      { autoAlpha: 0, y: 28 },
      {
        autoAlpha: 1, y: 0, duration: 0.7, ease: E,
        scrollTrigger: { trigger: sel, start: 'top 82%' }
      });
  }

  // Repeat visit within the session: one quick fade instead of the
  // full choreography, so navigation doesn't feel slow.
  function quickReveal(scrollSels) {
    gsap.fromTo('[data-anim]',
      { autoAlpha: 0 },
      { autoAlpha: 1, duration: 0.35, ease: 'none' });
    scrollSels.forEach(scrollReveal);
  }

  function heroIntro(tl) {
    fadeUp(tl, '#site-nav', -28, 0.65, 0);
    fadeUp(tl, '#hero-tagline', 22, 0.55, '-=0.25');
    fadeUp(tl, '#hero-headline', 36, 0.7, '-=0.35');
    fadeUp(tl, '#hero-sub', 24, 0.6, '-=0.40');
    fadeUp(tl, '#hero-cta', 20, 0.55, '-=0.35');
    tl.fromTo('#divider-left',
      { scaleX: 0, autoAlpha: 1, transformOrigin: 'right center' },
      { scaleX: 1, duration: 0.55 }, '-=0.20');
    tl.fromTo('#divider-right',
      { scaleX: 0, autoAlpha: 1, transformOrigin: 'left center' },
      { scaleX: 1, duration: 0.55 }, '<');
    tl.fromTo('#divider-text',
      { autoAlpha: 0 },
      { autoAlpha: 1, duration: 0.4 }, '-=0.30');
    fadeUp(tl, ['#pillar-learn', '#pillar-think', '#pillar-grow'], 22, 0.5, '-=0.15');
    tl.fromTo('.pillar-dot',
      { scale: 0 },
      { scale: 1, duration: 0.4, ease: 'back.out(2.5)', stagger: 0.13 }, '-=0.40');
  }

  function pageHeroIntro(tl) {
    fadeUp(tl, '#site-nav', -28, 0.6, 0);
    fadeUp(tl, '#page-hero .page-eyebrow', 16, 0.45, '-=0.20');
    fadeUp(tl, '#page-hero .page-title', 32, 0.65, '-=0.35');
    fadeUp(tl, '#page-hero .page-intro', 20, 0.55, '-=0.35');
  }

  var pages = {
    home: {
      scroll: ['#story-strip'],
      intro: heroIntro
    },
    about: {
      scroll: ['#section-community', '#section-platform', '#section-values'],
      intro: pageHeroIntro
    },
    privacy: {
      scroll: [],
      intro: function (tl) {
        pageHeroIntro(tl);
        tl.fromTo(['#section-collect', '#section-contact'],
          { autoAlpha: 0, y: 24 },
          { autoAlpha: 1, y: 0, stagger: 0.15, duration: 0.55 }, '-=0.20');
      }
    }
  };

  var config = pages[document.body.dataset.page];
  if (!config) {
    docEl.classList.remove('js');
    return;
  }

  var mm = gsap.matchMedia();
  mm.add('(prefers-reduced-motion: no-preference)', function () {
    if (introPlayed()) {
      quickReveal(config.scroll);
      return;
    }
    markIntroPlayed();
    // Scroll triggers are created only after the intro finishes, so a
    // section already in the viewport doesn't compete with the hero.
    var tl = gsap.timeline({
      defaults: { ease: E },
      onComplete: function () { config.scroll.forEach(scrollReveal); }
    });
    config.intro(tl);
  });
})();
