/* ==========================================================================
   INTERACTIVIDAD — Web Convocatoria FPU 2026
   ========================================================================== */
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

  // Acordeones
  document.querySelectorAll('.acordeon-header').forEach(function (header) {
    header.addEventListener('click', function () {
      var contenido = this.nextElementSibling;
      var estaActivo = this.classList.contains('activo');
      this.closest('.seccion').querySelectorAll('.acordeon-header').forEach(function (h) {
        h.classList.remove('activo');
        h.nextElementSibling.classList.remove('activo');
      });
      if (!estaActivo) {
        this.classList.add('activo');
        contenido.classList.add('activo');
      }
    });
  });

  // Acordeones de novedades (estilo card naranja con desplegable animado)
  document.querySelectorAll('.novedad-acordeon-header').forEach(function (header) {
    header.addEventListener('click', function () {
      var card = this.closest('.novedad-acordeon');
      card.classList.toggle('abierto');
      this.setAttribute('aria-expanded', card.classList.contains('abierto'));
    });
  });

  // Carrusel auto: duplica los items para crear loop sin saltos
  document.querySelectorAll('.carrusel-pista').forEach(function (pista) {
    var items = Array.from(pista.children);
    items.forEach(function (it) { pista.appendChild(it.cloneNode(true)); });
  });

  // Scroll suave
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
});
