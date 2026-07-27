/* KetoCore v3 — re-renderiza un BudgetHeader.astro ya montado con datos reales
   de KetoBudget.compute(), sin tocar el componente. Solo la cifra grande anima
   720ms (V3Motion), y únicamente cuando la llamada pasa {animate:true} — eso lo
   decide quien llama (la página), nunca este módulo: carga inicial y sync entre
   pestañas deben pasar animate:false. */
(function () {
  'use strict';

  function ensureBonusChip(root, bonus) {
    var chip = root.querySelector('.v3-bonus-chip');
    if (bonus > 0) {
      if (!chip) {
        chip = document.createElement('span');
        chip.className = 'v3-bonus-chip';
        root.insertBefore(chip, root.firstChild);
      }
      chip.innerHTML = '<span class="material-symbols-outlined" style="font-size:13px">fitness_center</span>+' + bonus + ' g';
    } else if (chip) {
      chip.remove();
    }
  }

  function ensureBonusBar(root, usedPct, bonusPct) {
    var track = root.querySelector('.v3-bh-bar-track');
    if (!track) return;
    var bar = track.querySelector('.v3-bh-bar-bonus');
    if (bonusPct > 0) {
      if (!bar) {
        bar = document.createElement('div');
        bar.className = 'v3-bh-bar-bonus';
        track.appendChild(bar);
      }
      bar.style.left = usedPct + '%';
      bar.style.width = bonusPct + '%';
    } else if (bar) {
      bar.remove();
    }
  }

  function renderFooter(root, computeResult) {
    if (!root.classList.contains('v3-budget-header--hero')) return;
    var footer = root.querySelector('.v3-bh-footer');
    if (!footer) {
      footer = document.createElement('div');
      footer.className = 'v3-bh-footer';
      root.appendChild(footer);
    }
    var stateSpan = '';
    if (computeResult.state === 'warn') stateSpan = '<span class="v3-icon-amber">Margen bajo</span>';
    if (computeResult.state === 'over') stateSpan = '<span class="v3-icon-orange">Fuera de margen</span>';
    footer.innerHTML = '<span>' + computeResult.used + ' usados</span>' + stateSpan;
  }

  function render(rootEl, computeResult, opts) {
    if (!rootEl) return;
    var animate = !!(opts && opts.animate);

    var limit = computeResult.limit || 0;
    var used = computeResult.used || 0;
    var bonus = computeResult.trainingBonus || 0;
    var available = Math.max(0, computeResult.available || 0);

    var usedPct = limit > 0 ? Math.min(100, (used / limit) * 100) : 0;
    var bonusPct = limit > 0 ? Math.min(100 - usedPct, (bonus / limit) * 100) : 0;

    rootEl.setAttribute('data-v3-state', computeResult.state);

    ensureBonusChip(rootEl, bonus);
    ensureBonusBar(rootEl, usedPct, bonusPct);

    var ofEl = rootEl.querySelector('.v3-bh-of');
    if (ofEl) ofEl.textContent = 'de ' + limit;

    var fillEl = rootEl.querySelector('.v3-bh-bar-fill');
    if (fillEl) fillEl.style.width = usedPct + '%';

    renderFooter(rootEl, computeResult);

    var numEl = rootEl.querySelector('.v3-bh-num');
    if (!numEl) return;
    var from = parseFloat(rootEl.getAttribute('data-v3-current-available'));
    if (isNaN(from)) from = available;
    rootEl.setAttribute('data-v3-current-available', String(available));

    if (!animate) {
      numEl.textContent = Math.round(available);
      return;
    }
    window.V3Motion.animateNumber(from, available, 720, function (value) {
      numEl.textContent = value.toFixed(1);
    }, function () {
      numEl.textContent = Math.round(available);
    });
  }

  window.V3BudgetHeader = { render: render };
})();
