/* nav.js — RWN Revolving Fund sidebar navigation v1.1 */
(function () {

  /* ── Expandable table rows ── */
  window.dtToggle = function (row) {
    const id = row.getAttribute('data-expand');
    const expandRow = document.getElementById(id);
    if (!expandRow) return;
    const isOpen = expandRow.classList.contains('open');
    expandRow.classList.toggle('open', !isOpen);
    row.classList.toggle('open', !isOpen);
  };

  /* Auto-bind all dt-toggle rows */
  function bindExpandRows() {
    document.querySelectorAll('.dt-toggle').forEach(function(row) {
      row.addEventListener('click', function() { dtToggle(this); });
    });
  }

  window.sbToggle = function (trigger) {
    const itemsId = trigger.id.replace('trigger', 'items');
    const items = document.getElementById(itemsId);
    if (!items) return;
    const isOpen = items.classList.contains('open');
    items.classList.toggle('open', !isOpen);
    trigger.classList.toggle('open', !isOpen);
  };

  window.sbMobileToggle = function () {
    const sidebar = document.getElementById('rwn-sidebar');
    const overlay = document.getElementById('sb-overlay');
    const hbg     = document.getElementById('sb-hbg');
    if (!sidebar) return;
    const isOpen = sidebar.classList.toggle('mob-open');
    if (overlay) overlay.classList.toggle('open', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
    if (hbg) {
      const spans = hbg.querySelectorAll('span');
      if (isOpen) {
        if (spans[0]) spans[0].style.transform = 'rotate(45deg) translate(4px,4px)';
        if (spans[1]) spans[1].style.opacity   = '0';
        if (spans[2]) spans[2].style.transform = 'rotate(-45deg) translate(4px,-4px)';
      } else {
        spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
      }
    }
  };

  window.sbMobileClose = function () {
    const sidebar = document.getElementById('rwn-sidebar');
    const overlay = document.getElementById('sb-overlay');
    const hbg     = document.getElementById('sb-hbg');
    if (!sidebar) return;
    sidebar.classList.remove('mob-open');
    if (overlay) overlay.classList.remove('open');
    document.body.style.overflow = '';
    if (hbg) hbg.querySelectorAll('span').forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
  };

  document.addEventListener('DOMContentLoaded', function () {
    bindExpandRows();
    const sidebar = document.getElementById('rwn-sidebar');
    if (sidebar) {
      sidebar.querySelectorAll('a').forEach(function (a) {
        a.addEventListener('click', function () { setTimeout(sbMobileClose, 80); });
      });
    }

    const page = location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.sb-nav a[href]').forEach(function (a) {
      const href = a.getAttribute('href');
      if (href === page || (page === '' && href === 'index.html')) {
        a.classList.add('active');
      }
    });

    /* Auto-open group for sub-pages */
    const fundPages = ['fund-structure.html', 'fund-projections.html'];
    const ecoPages  = ['ecosystem.html', 'marketplace.html', 'ai-tools.html'];
    if (fundPages.includes(page)) {
      const t = document.getElementById('sb-fund-trigger');
      const i = document.getElementById('sb-fund-items');
      if (t) t.classList.add('open'); if (i) i.classList.add('open');
    }
    if (ecoPages.includes(page)) {
      const t = document.getElementById('sb-eco-trigger');
      const i = document.getElementById('sb-eco-items');
      if (t) t.classList.add('open'); if (i) i.classList.add('open');
    }
  });

})();
