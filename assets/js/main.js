/* Alfa Teknik – site interactions (vanilla JS, no dependencies) */
(function () {
  'use strict';
  var reduce = false;
  try { reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches; } catch (e) {}
  var root = document.getElementById('root') || document.body;

  /* ================= HOUSE CUTAWAY ================= */
  var IMG = {
    cut: 'assets/img/house/house-cutaway.jpg',
    ext: 'assets/img/house/house-exterior.jpg',
    com: 'assets/img/house/commercial.jpg'
  };
  var K = 1000 / 1448, KC = 1000 / 1774;
  var CAMS = { 0: [1, 724, 543], 1: [1, 724, 543], 2: [1, 724, 543], 3: [1.8, 700, 140], 4: [1.5, 800, 450], 5: [2, 520, 370], 6: [2, 420, 560], 7: [1.5, 680, 660], 8: [1.7, 570, 860] };
  var RP = [
    { l: 'Güneş Kolektörü', h: '#kat-ticari', p: [560, 95], st: [1, 3] },
    { l: 'Hidrolik Grup', h: '#kat-ticari', p: [985, 140], st: [3] },
    { l: 'Isı Pompası', h: '#kat-isi-pompalari', p: [1240, 760], st: [1] },
    { l: 'Klima', h: '#kat-klimalar', p: [833, 340], st: [4] },
    { l: 'Panel Radyatör', h: '#kat-radyatorler', p: [975, 450], st: [4] },
    { l: 'Oda Termostatı', h: '#kat-kontrol', p: [470, 566], st: [4] },
    { l: 'Havlu Radyatör', h: '#kat-radyatorler', p: [493, 360], st: [5] },
    { l: 'Termosifon', h: '#kat-su-isiticilari', p: [580, 400], st: [5] },
    { l: 'Yoğuşmalı Kombi', h: '#kat-kombiler', p: [380, 548], st: [6] },
    { l: 'Baca Seti', h: '#kat-kontrol', p: [368, 505], st: [6] },
    { l: 'Yerden Isıtma', h: '#kat-tesisat', p: [840, 740], st: [7] },
    { l: 'Kolektör', h: '#kat-kontrol', p: [515, 615], st: [7] },
    { l: 'PPR Tesisat', h: '#kat-tesisat', p: [622, 600], st: [7] },
    { l: 'Boyler', h: '#kat-ticari', p: [370, 850], st: [8] },
    { l: 'Genleşme Tankı', h: '#kat-kontrol', p: [515, 820], st: [8] },
    { l: 'Üç Yollu Vana', h: '#kat-kontrol', p: [638, 878], st: [8] },
    { l: 'Hava & Pislik Ayırıcı', h: '#kat-kontrol', p: [722, 925], st: [8] }
  ];
  var CP = [
    { l: 'Kaskad Kazanlar', h: '#kat-ticari', p: [1140, 640], ly: 81, side: 'left' },
    { l: 'Denge Kabı', h: '#ticari', p: [1282, 730], ly: 88, side: 'left' },
    { l: 'Genleşme Tankı', h: '#kat-kontrol', p: [1340, 700], ly: 81, side: 'right' },
    { l: 'Isı Pompası', h: '#kat-isi-pompalari', p: [1632, 690], ly: 94, side: 'left' },
    { l: 'Güneş Kolektörleri', h: '#kat-ticari', p: [1280, 85], ly: 19, side: 'right' }
  ];
  var ALTS = {
    all: 'Ev kesiti: çatıda güneş kolektörleri, katlarda radyatör, kombi, klima ve yerden ısıtma, bodrumda boyler ve sistem ekipmanları',
    1: 'Modern bir evin dış görünüşü: çatıda güneş kolektörleri, yanında ısı pompası',
    2: 'Ön cephesi kaldırılmış ev kesiti: tüm katlardaki tesisat ürünleri',
    3: 'Çatı: güneş kolektörleri ve hidrolik grup', 4: 'Yaşam alanları: klima, panel radyatör, oda termostatı',
    5: 'Banyo: havlu radyatör ve termosifon', 6: 'Mutfak: yoğuşmalı kombi ve baca seti',
    7: 'Döşeme: yerden ısıtma, kolektör ve PPR tesisat', 8: 'Bodrum: boyler, genleşme tankı, hava ve pislik ayırıcı, üç yollu vana',
    9: 'Konut ve ticari bina; ticari binanın kazan dairesinde kaskad kazanlar'
  };

  function el(tag, cls, html) { var e = document.createElement(tag); if (cls) e.className = cls; if (html != null) e.innerHTML = html; return e; }
  function spot(label, href, withLabel) {
    var a = el('a', 'hs-spot');
    a.href = href; a.setAttribute('aria-label', label);
    a.appendChild(el('span', 'pl', '+'));
    if (withLabel) { var lb = el('span', 'lb'); lb.textContent = label; a.appendChild(lb); }
    return a;
  }
  function setVis(node, vis) {
    node.style.opacity = vis ? 1 : 0;
    node.style.pointerEvents = vis ? 'auto' : 'none';
    if (node.tagName === 'A') { node.tabIndex = vis ? 0 : -1; node.setAttribute('aria-hidden', vis ? 'false' : 'true'); }
  }

  function buildHouse(h) {
    h.setAttribute('role', 'img');
    var cam = el('div', 'hs-cam');
    var i1 = el('img'); i1.src = IMG.cut; i1.alt = ''; i1.loading = 'lazy';
    var i2 = el('img', 'hs-ext'); i2.src = IMG.ext; i2.alt = ''; i2.loading = 'lazy';
    cam.appendChild(i1); cam.appendChild(i2);
    var com = el('div', 'hs-com'); var i3 = el('img'); i3.src = IMG.com; i3.alt = ''; i3.loading = 'lazy'; com.appendChild(i3);
    h.appendChild(cam); h.appendChild(com);
    var spots = RP.map(function (d) { var a = spot(d.l, d.h, true); h.appendChild(a); return { d: d, a: a }; });
    var cps = CP.map(function (d) {
      var line = el('div', 'hs-line'); line.setAttribute('aria-hidden', 'true');
      var dot = spot(d.l, d.h, false);
      var tag = el('a', 'hs-tag'); tag.href = d.h; tag.textContent = d.l;
      var x = d.p[0] * KC / 10, y = (200 + d.p[1] * KC) / 9;
      line.style.left = x + '%'; line.style.top = Math.min(y, d.ly) + '%'; line.style.height = Math.abs(d.ly - y) + '%';
      dot.style.left = x + '%'; dot.style.top = y + '%'; dot.style.transform = 'translate(-22px,-22px)';
      tag.style.left = x + '%'; tag.style.top = d.ly + '%';
      tag.style.transform = d.side === 'left' ? 'translate(calc(-100% + 12px),-50%)' : 'translate(-12px,-50%)';
      h.appendChild(line); h.appendChild(dot); h.appendChild(tag);
      return { line: line, dot: dot, tag: tag };
    });
    h._hs = { cam: cam, ext: i2, com: com, spots: spots, cps: cps };
    setHouse(h, h.getAttribute('data-house-step'));
  }

  function setHouse(h, step) {
    var hs = h._hs; if (!hs) return;
    var all = step === 'all';
    var st = all ? 0 : Math.max(1, Math.min(9, parseInt(step, 10) || 1));
    var s, tx, ty;
    if (st === 9) { s = 0.45; tx = 35; ty = 437.5; }
    else { var c = CAMS[st]; s = c[0]; tx = 500 - s * c[1] * K; ty = 450 - s * (75 + c[2] * K); }
    hs.cam.style.transform = 'translate(' + (tx / 10) + '%,' + (ty / 9) + '%) scale(' + s + ')';
    hs.ext.style.opacity = st === 1 ? 1 : 0;
    hs.com.style.opacity = st === 9 ? 1 : 0;
    hs.spots.forEach(function (o) {
      var x = tx + s * o.d.p[0] * K, y = ty + s * (75 + o.d.p[1] * K);
      var vis = (all || o.d.st.indexOf(st) >= 0) && x > 20 && x < 980 && y > 20 && y < 880;
      var left = x > 640;
      o.a.style.left = (x / 10) + '%'; o.a.style.top = (y / 9) + '%';
      o.a.style.flexDirection = left ? 'row-reverse' : 'row';
      o.a.style.transform = left ? 'translate(calc(-100% + 22px),-22px)' : 'translate(-22px,-22px)';
      o.a.style.transitionDelay = vis && !h.hasAttribute('data-still') ? '.5s,0s,0s' : '0s';
      setVis(o.a, vis);
    });
    hs.cps.forEach(function (o) { var v = st === 9; setVis(o.line, v); setVis(o.dot, v); setVis(o.tag, v); });
    h.setAttribute('aria-label', ALTS[all ? 'all' : st]);
  }

  var houses = Array.prototype.slice.call(document.querySelectorAll('.house'));
  houses.forEach(buildHouse);
  var deskHouse = document.querySelector('.cut-desk .house');

  /* ================= CUTAWAY STEPS ================= */
  var marks = Array.prototype.slice.call(document.querySelectorAll('.cut-desk .cut-step[data-step]'));
  var rails = Array.prototype.slice.call(document.querySelectorAll('.rail [data-go]'));
  var cur = 1;
  function setStep(n) {
    if (n === cur) return; cur = n;
    if (deskHouse) setHouse(deskHouse, n);
    marks.forEach(function (m, i) { var c = m.querySelector('.sc-card'); if (c) c.classList.toggle('on', i + 1 === n); });
    rails.forEach(function (b, i) {
      b.className = 'rail-b' + (i + 1 === n ? ' on' : (i + 1 < n ? ' done' : ''));
      b.setAttribute('aria-current', i + 1 === n ? 'step' : 'false');
    });
  }
  rails.forEach(function (b, i) {
    b.addEventListener('click', function () { var m = marks[i]; if (m) m.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'center' }); });
  });

  /* ================= COUNTERS ================= */
  var nums = document.querySelector('[data-count]');
  var counted = false;
  var fmt = function (n) { return Math.round(n).toLocaleString('tr-TR'); };
  function startCount() {
    counted = true;
    var spans = Array.prototype.slice.call(nums.querySelectorAll('[data-to]'));
    if (reduce) return;
    var t0 = performance.now();
    (function run(t) {
      var p = Math.min(1, (t - t0) / 1600), e = 1 - Math.pow(1 - p, 3);
      spans.forEach(function (s) { s.textContent = fmt(+s.getAttribute('data-to') * e); });
      if (p < 1) requestAnimationFrame(run);
    })(t0);
  }
  if (nums && !reduce && nums.getBoundingClientRect().top > window.innerHeight) {
    nums.querySelectorAll('[data-to]').forEach(function (s) { s.textContent = '0'; });
  } else { counted = true; }

  /* ================= SCROLL ================= */
  var hdr = document.querySelector('header.hdr');
  var pars = Array.prototype.slice.call(document.querySelectorAll('[data-par]'));
  var raf = null;
  function tick() {
    raf = null;
    var vh = window.innerHeight || 800;
    var sy = Math.max(0, window.scrollY || window.pageYOffset || 0);
    root.style.setProperty('--sy', String(Math.round(sy)));
    pars.forEach(function (p) {
      var r = p.getBoundingClientRect();
      if (r.bottom > -300 && r.top < vh + 300) p.style.setProperty('--p', String(Math.round(r.top + r.height / 2 - vh / 2)));
    });
    if (hdr) hdr.classList.toggle('sc', sy > 30);
    var step = 1, best = Infinity;
    marks.forEach(function (m, i) {
      var r = m.getBoundingClientRect(); if (!r.height) return;
      var d = Math.abs(r.top + r.height / 2 - vh * 0.5);
      if (d < best) { best = d; step = i + 1; }
    });
    setStep(step);
    if (nums && !counted && nums.getBoundingClientRect().top < vh * 0.85) startCount();
  }
  function onScroll() { if (!raf) raf = requestAnimationFrame(tick); }
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
  tick();

  /* ================= REVEAL ================= */
  if (!reduce && 'IntersectionObserver' in window) {
    var vh0 = window.innerHeight;
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
    }, { threshold: 0.12 });
    document.querySelectorAll('[data-rv]').forEach(function (n) {
      if (n.getBoundingClientRect().top > vh0) { n.classList.add('pre'); io.observe(n); }
    });
  }

  /* ================= MENUS ================= */
  var panels = { brands: document.getElementById('dd-markalar'), products: document.getElementById('dd-urunler') };
  var menuBtns = Array.prototype.slice.call(document.querySelectorAll('[data-menu]'));
  var mnav = document.getElementById('mnav');
  var burger = document.querySelector('[data-burger]');
  function closeAll() {
    Object.keys(panels).forEach(function (k) { if (panels[k]) panels[k].hidden = true; });
    menuBtns.forEach(function (b) { b.setAttribute('aria-expanded', 'false'); });
    if (mnav) mnav.hidden = true;
    if (burger) { burger.setAttribute('aria-expanded', 'false'); burger.setAttribute('aria-label', 'Menüyü aç'); burger.querySelector('path').setAttribute('d', 'M4 7h16M4 12h16M4 17h16'); }
    if (hdr) hdr.classList.remove('open');
  }
  menuBtns.forEach(function (b) {
    b.addEventListener('click', function () {
      var k = b.getAttribute('data-menu'), wasOpen = panels[k] && !panels[k].hidden;
      closeAll();
      if (!wasOpen && panels[k]) { panels[k].hidden = false; b.setAttribute('aria-expanded', 'true'); hdr.classList.add('open'); }
    });
  });
  if (burger && mnav) {
    burger.addEventListener('click', function () {
      var open = mnav.hidden;
      closeAll();
      if (open) {
        mnav.hidden = false; hdr.classList.add('open');
        burger.setAttribute('aria-expanded', 'true'); burger.setAttribute('aria-label', 'Menüyü kapat');
        burger.querySelector('path').setAttribute('d', 'M6 6l12 12M18 6L6 18');
      }
    });
  }
  if (hdr) {
    hdr.addEventListener('mouseleave', function () { if (window.matchMedia('(min-width: 961px)').matches) closeAll(); });
    hdr.addEventListener('click', function (e) { var a = e.target.closest('a[href^="#"]'); if (a) closeAll(); });
  }
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeAll(); });

  /* ================= FORM ================= */
  var form = document.getElementById('quote-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var ok = form.querySelector('.sent');
      var endpoint = form.getAttribute('action');
      var done = function () { if (ok) ok.hidden = false; form.reset(); };
      if (!endpoint) { done(); return; }
      fetch(endpoint, { method: 'POST', body: new FormData(form), headers: { Accept: 'application/json' } })
        .then(function (r) { if (r.ok) done(); else alert('Gönderilemedi, lütfen 0312 310 98 00 numarasını arayın.'); })
        .catch(function () { alert('Gönderilemedi, lütfen 0312 310 98 00 numarasını arayın.'); });
    });
  }
})();
