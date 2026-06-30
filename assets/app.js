/* INTERACTIVIDAD — Web Convocatoria FPU 2026 */
document.addEventListener('DOMContentLoaded', function () {
  // Menú hamburguesa
  var navToggle = document.querySelector('.nav-toggle');
  var navMenu = document.getElementById('nav-menu');
  if (navToggle && navMenu) {
    navToggle.addEventListener('click', function () {
      var isOpen = navMenu.classList.toggle('nav-open');
      navToggle.setAttribute('aria-expanded', isOpen);
      navToggle.innerHTML = isOpen ? '&#10005;' : '&#9776;';
    });
    navMenu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navMenu.classList.remove('nav-open');
        navToggle.setAttribute('aria-expanded', 'false');
        navToggle.innerHTML = '&#9776;';
      });
    });
  }

  // Acordeón clásico
  document.querySelectorAll('.acordeon-header').forEach(function (h) {
    h.addEventListener('click', function () {
      var c = this.nextElementSibling;
      var ok = this.classList.contains('activo');
      this.closest('.seccion').querySelectorAll('.acordeon-header').forEach(function (x) {
        x.classList.remove('activo');
        x.nextElementSibling.classList.remove('activo');
      });
      if (!ok) { this.classList.add('activo'); c.classList.add('activo'); }
    });
  });

  // Acordeón de novedades
  document.querySelectorAll('.novedad-acordeon-header').forEach(function (h) {
    h.addEventListener('click', function () {
      var card = this.closest('.novedad-acordeon');
      card.classList.toggle('abierto');
      this.setAttribute('aria-expanded', card.classList.contains('abierto'));
    });
  });

  // Mensaje del director (carta desplegable única)
  document.querySelectorAll('.mensaje-director-cta').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var open = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', open ? 'false' : 'true');
    });
  });

  // Carrusel manual con scroll nativo + flechas + dots
  document.querySelectorAll('.carrusel-wrapper').forEach(function (W) {
    var cont = W.querySelector('.carrusel-pista-cont');
    var pista = W.querySelector('.carrusel-pista');
    if (!cont || !pista) return;
    var items = Array.from(pista.children);
    if (!items.length) return;
    var bp = W.querySelector('.carrusel-btn.prev');
    var bn = W.querySelector('.carrusel-btn.next');
    var dotsC = W.querySelector('.carrusel-dots');

    function step() {
      var iw = items[0].getBoundingClientRect().width;
      var gap = parseFloat(getComputedStyle(pista).gap) || 20;
      return iw + gap;
    }
    function visibles() {
      var w = window.innerWidth;
      if (w < 600) return 1;
      if (w < 900) return 2;
      return 3;
    }
    function maxPag() { return Math.max(0, items.length - visibles()); }
    function currentPag() { return Math.round(cont.scrollLeft / step()); }

    function update() {
      var p = currentPag();
      var mx = maxPag();
      if (bp) bp.disabled = p <= 0;
      if (bn) bn.disabled = p >= mx;
      if (dotsC) {
        if (dotsC.children.length !== mx + 1) {
          dotsC.innerHTML = '';
          for (var i = 0; i <= mx; i++) {
            var d = document.createElement('button');
            d.className = 'dot';
            d.type = 'button';
            d.setAttribute('aria-label', 'Página ' + (i + 1));
            (function (idx) {
              d.addEventListener('click', function () {
                cont.scrollTo({ left: idx * step(), behavior: 'smooth' });
              });
            })(i);
            dotsC.appendChild(d);
          }
        }
        Array.from(dotsC.children).forEach(function (d, i) {
          d.classList.toggle('activo', i === p);
        });
      }
    }

    if (bp) bp.addEventListener('click', function () {
      cont.scrollBy({ left: -step(), behavior: 'smooth' });
    });
    if (bn) bn.addEventListener('click', function () {
      cont.scrollBy({ left: step(), behavior: 'smooth' });
    });
    cont.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update, { passive: true });
    window.addEventListener('load', update);
    update();
  });

  // Scroll suave + scroll-spy
  var sticky = document.querySelectorAll('.acceso-rapido a[href^="#"]');
  var off = 64;
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      var t = document.querySelector(this.getAttribute('href'));
      if (t) {
        e.preventDefault();
        window.scrollTo({ top: t.getBoundingClientRect().top + window.pageYOffset - off, behavior: 'smooth' });
      }
    });
  });
  if (sticky.length) {
    var sec = Array.from(sticky).map(function (a) { return document.querySelector(a.getAttribute('href')); }).filter(Boolean);
    window.addEventListener('scroll', function () {
      var y = window.pageYOffset + off + 5;
      var idx = sec.findIndex(function (s, i) {
        var n = sec[i + 1];
        return s && s.offsetTop <= y && (!n || n.offsetTop > y);
      });
      sticky.forEach(function (a, i) { a.classList.toggle('activo', i === idx); });
    }, { passive: true });
  }
});
