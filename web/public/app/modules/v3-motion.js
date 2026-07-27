/* KetoCore v3 — utilidad genérica de animación (regla de 720ms del handoff).
   No es específica de BudgetHeader: cualquier cifra que cambie por una acción
   del usuario puede reutilizar animateNumber (Health Score, streak, etc). */
(function () {
  'use strict';

  function prefersReducedMotion() {
    return window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  function animateNumber(from, to, durationMs, onFrame, onDone) {
    if (from === to || prefersReducedMotion()) {
      onFrame(to);
      if (onDone) onDone();
      return;
    }
    var t0 = null;
    function step(now) {
      if (t0 === null) t0 = now;
      var p = Math.min(1, (now - t0) / durationMs);
      var eased = 1 - Math.pow(1 - p, 3);
      var value = from + (to - from) * eased;
      onFrame(value);
      if (p < 1) {
        requestAnimationFrame(step);
      } else if (onDone) {
        onDone();
      }
    }
    requestAnimationFrame(step);
  }

  window.V3Motion = {
    animateNumber: animateNumber,
    prefersReducedMotion: prefersReducedMotion
  };
})();
