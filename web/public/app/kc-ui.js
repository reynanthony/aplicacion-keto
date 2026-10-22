/* ==========================================================================
   KETOCORE.OS · kc-ui.js — runtime vanilla de la UI v2 (sin dependencias)
   --------------------------------------------------------------------------
   Tus módulos (Supabase, planes, Keto Inspector…) NO tocan el DOM:
   arman un objeto de datos y llaman   KC.render('hoy', datos)
   La UI escucha atributos data-kc-* en el marcado de los componentes .astro.

   Atributos que entiende KC.bind(root, data):
     data-kc-text="a.b"      textContent   (+ data-kc-fmt="int|1|2|signed|pct")
     data-kc-pct="a.b"       width: N%     (barras .kc-bar > i, 0–100)
     data-kc-height="a.b"    height: N%    (barras verticales)
     data-kc-ring="a.b"      anillo SVG    (stroke-dashoffset, 0–100)
     data-kc-segs="a.b"      10 segmentos  (.kc-segs, 0–100)
     data-kc-color="a.b"     clase kc-c-{amber|cyan|mint|red|neutral}
     data-kc-icon="a.b"      innerHTML = <svg> del icono
     data-kc-attr="attr:a.b; attr2:c"   setAttribute (false/null lo quita)
     data-kc-show="a.b"      hidden si es falsy
     data-kc-list="a.b"      repite el <template> hijo por cada item
     data-kc-trend="a.b"     dibuja gráfico {series:[], goal}
   Eventos que emite:
     kc:ready   (document)  — la página está lista para KC.render
     kc:action  (document)  — detail {action, id, value, el} de [data-kc-action]
     kc:change  (document)  — detail {group, value} de segmented / días
   ========================================================================== */
(function () {
  'use strict';
  var ICONS = window.KC_ICONS || {};
  var COLORS = ['amber', 'cyan', 'mint', 'red', 'neutral'];

  function get(obj, path) {
    if (path === '$' || path === '.') return obj;
    return String(path).split('.').reduce(function (o, k) { return o == null ? undefined : o[k]; }, obj);
  }
  var thin = ' ';
  function fmt(v, f) {
    if (v == null || v === '') return '';
    if (typeof v !== 'number') return String(v);
    switch (f) {
      case 'int': return Math.round(v).toString().replace(/\B(?=(\d{3})+(?!\d))/g, thin);
      case '1': return v.toFixed(1);
      case '2': return v.toFixed(2);
      case 'signed': return (v > 0 ? '+' : v < 0 ? '−' : '') + Math.abs(Math.round(v)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, thin);
      case 'signed1': return (v > 0 ? '+' : v < 0 ? '−' : '') + Math.abs(v).toFixed(1);
      case 'pct': return Math.round(v) + '%';
      default: return Number.isInteger(v) ? String(v) : String(Math.round(v * 10) / 10);
    }
  }
  function clamp(n) { n = Number(n) || 0; return Math.max(0, Math.min(100, n)); }

  /* Añade {pct, left} a todo objeto con {value, goal} — recursivo */
  function prepare(data) {
    (function walk(o) {
      if (!o || typeof o !== 'object') return;
      if (typeof o.value === 'number' && typeof o.goal === 'number' && o.goal > 0) {
        if (o.pct == null) o.pct = Math.round((o.value / o.goal) * 100);
        if (o.left == null) o.left = Math.max(0, Math.round((o.goal - o.value) * 10) / 10);
      }
      for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) walk(o[k]);
    })(data);
    return data;
  }

  function owned(root, el) {
    var it = el.closest('[data-kc-item]');
    return !it || it === root || !root.contains(it);
  }
  function each(root, sel, fn) {
    var list = root.querySelectorAll(sel);
    for (var i = 0; i < list.length; i++) if (owned(root, list[i])) fn(list[i]);
    if (root.matches && root.matches(sel)) fn(root);
  }

  function bind(root, data) {
    root = root || document;
    var scope = root === document ? document.documentElement : root;

    // 1) listas primero (cada item se liga con su propio objeto)
    each(scope, '[data-kc-list]', function (el) {
      var items = get(data, el.getAttribute('data-kc-list')) || [];
      var tpl = el.querySelector(':scope > template');
      if (!tpl) return;
      Array.prototype.slice.call(el.querySelectorAll(':scope > [data-kc-item]')).forEach(function (n) { n.remove(); });
      items.forEach(function (item, i) {
        var frag = tpl.content.cloneNode(true);
        var nodes = Array.prototype.slice.call(frag.children);
        nodes.forEach(function (n) { n.setAttribute('data-kc-item', i); });
        el.appendChild(frag);
        var ctx = (item && typeof item === 'object') ? item : { value: item };
        ctx.$index = i;
        nodes.forEach(function (n) { bind(n, ctx); });
      });
    });

    each(scope, '[data-kc-text]', function (el) {
      el.textContent = fmt(get(data, el.getAttribute('data-kc-text')), el.getAttribute('data-kc-fmt'));
    });
    each(scope, '[data-kc-pct]', function (el) {
      var v = get(data, el.getAttribute('data-kc-pct'));
      if (v != null) el.style.width = clamp(v) + '%';
    });
    each(scope, '[data-kc-height]', function (el) {
      var v = get(data, el.getAttribute('data-kc-height'));
      if (v != null) el.style.height = clamp(v) + '%';
    });
    each(scope, '[data-kc-ring]', function (el) {
      var v = get(data, el.getAttribute('data-kc-ring'));
      var r = parseFloat(el.getAttribute('r')); var len = 2 * Math.PI * r;
      el.style.strokeDasharray = len.toFixed(1);
      el.style.strokeDashoffset = (len * (1 - clamp(v) / 100)).toFixed(1);
    });
    each(scope, '[data-kc-segs]', function (el) {
      var v = clamp(get(data, el.getAttribute('data-kc-segs')));
      var segs = el.children, full = Math.floor(v / 10), rest = v % 10;
      for (var i = 0; i < segs.length; i++) {
        segs[i].className = i < full ? 'on' : (i === full && rest >= 3 ? 'half' : '');
      }
    });
    each(scope, '[data-kc-color]', function (el) {
      var c = get(data, el.getAttribute('data-kc-color'));
      if (!c) return;
      COLORS.forEach(function (x) { el.classList.remove('kc-c-' + x); });
      el.classList.add('kc-c-' + c);
    });
    each(scope, '[data-kc-icon]', function (el) {
      var n = get(data, el.getAttribute('data-kc-icon'));
      if (n && ICONS[n]) el.innerHTML = '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true">' + ICONS[n] + '</svg>';
    });
    each(scope, '[data-kc-attr]', function (el) {
      el.getAttribute('data-kc-attr').split(';').forEach(function (pair) {
        var p = pair.split(':'); if (p.length < 2) return;
        var name = p[0].trim(), v = get(data, p[1].trim());
        if (v === false || v == null) el.removeAttribute(name);
        else el.setAttribute(name, v === true ? '' : v);
      });
    });
    each(scope, '[data-kc-show]', function (el) {
      el.hidden = !get(data, el.getAttribute('data-kc-show'));
    });
    each(scope, '[data-kc-trend]', function (el) {
      trend(el, get(data, el.getAttribute('data-kc-trend')));
    });
    if (root === document) document.body.removeAttribute('data-kc-loading');
    return root;
  }

  /* Gráfico de tendencia: {series:[n…], goal:n, labels?:{start,end}} */
  function trend(el, t) {
    if (!t || !t.series || t.series.length < 2) return;
    var W = 700, H = 140, pad = 16, s = t.series;
    var lo = Math.min.apply(null, s.concat(t.goal != null ? [t.goal] : [])) - 0.4;
    var hi = Math.max.apply(null, s) + 0.4;
    var x = function (i) { return (i / (s.length - 1)) * W; };
    var y = function (v) { return pad + (1 - (v - lo) / (hi - lo)) * (H - pad * 2); };
    var p = s.map(function (v, i) { return [x(i), y(v)]; });
    var d = 'M' + p[0][0].toFixed(1) + ',' + p[0][1].toFixed(1);
    for (var i = 0; i < p.length - 1; i++) {
      var p0 = p[i - 1] || p[i], p1 = p[i], p2 = p[i + 1], p3 = p[i + 2] || p2;
      d += ' C' + (p1[0] + (p2[0] - p0[0]) / 6).toFixed(1) + ',' + (p1[1] + (p2[1] - p0[1]) / 6).toFixed(1) +
        ' ' + (p2[0] - (p3[0] - p1[0]) / 6).toFixed(1) + ',' + (p2[1] - (p3[1] - p1[1]) / 6).toFixed(1) +
        ' ' + p2[0].toFixed(1) + ',' + p2[1].toFixed(1);
    }
    var goal = t.goal != null ? '<line class="goal" x1="0" x2="' + W + '" y1="' + y(t.goal).toFixed(1) + '" y2="' + y(t.goal).toFixed(1) + '"/>' : '';
    var svg = el.querySelector('svg');
    svg.setAttribute('viewBox', '0 0 ' + W + ' ' + H);
    svg.setAttribute('preserveAspectRatio', 'none');
    var gid = 'kcg' + Math.random().toString(36).slice(2, 7);
    svg.innerHTML = '<defs><linearGradient id="' + gid + '" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-opacity=".9"/><stop offset="1" stop-opacity="0"/></linearGradient></defs>' +
      goal + '<path class="area" fill="url(#' + gid + ')" d="' + d + ' L' + W + ',' + H + ' L0,' + H + ' Z"/><path class="ln" d="' + d + '"/>';
    var last = el.querySelector('[data-kc-pin="end"]');
    if (last) last.style.top = Math.max(6, Math.min(H - 34, y(s[s.length - 1]) - 34)) + 'px';
  }

  /* ---------- Interacciones ---------- */
  function emit(name, detail) { document.dispatchEvent(new CustomEvent(name, { detail: detail })); }

  function openSheet(id) {
    var sh = document.getElementById(id); if (!sh) return;
    var scrim = document.querySelector('[data-kc-scrim="' + id + '"]');
    sh.setAttribute('data-open', ''); sh.removeAttribute('inert'); sh.setAttribute('aria-hidden', 'false');
    if (scrim) scrim.setAttribute('data-open', '');
    document.querySelectorAll('[data-kc-sheet-open="' + id + '"]').forEach(function (b) { b.setAttribute('aria-expanded', 'true'); });
    var f = sh.querySelector('button, a, input'); if (f) setTimeout(function () { f.focus(); }, 60);
  }
  function closeSheet(id) {
    var sh = document.getElementById(id); if (!sh) return;
    var scrim = document.querySelector('[data-kc-scrim="' + id + '"]');
    sh.removeAttribute('data-open'); sh.setAttribute('inert', ''); sh.setAttribute('aria-hidden', 'true');
    if (scrim) scrim.removeAttribute('data-open');
    document.querySelectorAll('[data-kc-sheet-open="' + id + '"]').forEach(function (b) { b.setAttribute('aria-expanded', 'false'); });
  }

  function setTheme(t) {
    document.documentElement.setAttribute('data-theme', t);
    try { localStorage.setItem('kc-theme', t); } catch (e) {}
    var m = document.querySelector('meta[name="theme-color"]');
    if (m) m.setAttribute('content', t === 'light' ? '#f5f4f0' : '#0b0c10');
  }

  document.addEventListener('click', function (e) {
    var t = e.target.closest('[data-kc-sheet-open],[data-kc-sheet-close],[data-kc-scrim],[data-kc-theme-toggle],[data-kc-group] > button,[data-kc-action]');
    if (!t) return;
    if (t.hasAttribute('data-kc-sheet-open')) {
      var id = t.getAttribute('data-kc-sheet-open');
      var sh = document.getElementById(id);
      sh && sh.hasAttribute('data-open') ? closeSheet(id) : openSheet(id);
      return;
    }
    if (t.hasAttribute('data-kc-sheet-close')) { closeSheet(t.closest('.kc-sheet').id); }
    if (t.hasAttribute('data-kc-scrim')) { closeSheet(t.getAttribute('data-kc-scrim')); return; }
    if (t.hasAttribute('data-kc-theme-toggle')) {
      setTheme(document.documentElement.getAttribute('data-theme') === 'light' ? 'dark' : 'light'); return;
    }
    var grp = t.parentElement && t.parentElement.getAttribute('data-kc-group');
    if (grp && !t.hasAttribute('data-kc-action')) {
      Array.prototype.forEach.call(t.parentElement.children, function (b) { b.setAttribute('aria-pressed', b === t ? 'true' : 'false'); });
      emit('kc:change', { group: grp, value: t.getAttribute('data-value') });
      return;
    }
    if (t.hasAttribute('data-kc-action')) {
      var item = t.closest('[data-id]');
      emit('kc:action', { action: t.getAttribute('data-kc-action'), id: item && item.getAttribute('data-id'), value: t.getAttribute('data-value'), el: t });
    }
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') document.querySelectorAll('.kc-sheet[data-open]').forEach(function (s) { closeSheet(s.id); });
  });

  /* ---------- API pública ---------- */
  var KC = window.KC = {
    icons: ICONS,
    fmt: fmt,
    prepare: prepare,
    bind: bind,
    trend: trend,
    openSheet: openSheet,
    closeSheet: closeSheet,
    setTheme: setTheme,
    /* KC.render('hoy', datos) → prepara y liga toda la página */
    render: function (screen, data) {
      prepare(data);
      var root = document.querySelector('[data-kc-screen="' + screen + '"]') || document;
      bind(root, data);
      document.body.removeAttribute('data-kc-loading');
      return root;
    }
  };

  function ready() {
    var screen = document.body.getAttribute('data-kc-screen');
    if (window.KC_DEMO_ON && window.KC_DEMO && window.KC_DEMO[screen]) {
      KC.render(screen, JSON.parse(JSON.stringify(window.KC_DEMO[screen])));
    }
    emit('kc:ready', { screen: screen });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', ready); else ready();
})();
