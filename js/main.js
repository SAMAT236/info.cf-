/* ============================================
   INFO.CF — MAIN JAVASCRIPT
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ── DATE EN TEMPS RÉEL ──
  function updateDate() {
    const days   = ['Dimanche','Lundi','Mardi','Mercredi','Jeudi','Vendredi','Samedi'];
    const months = ['janvier','février','mars','avril','mai','juin','juillet','août','septembre','octobre','novembre','décembre'];
    const d = new Date();
    const str = `${days[d.getDay()]} ${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
    document.querySelectorAll('[data-date]').forEach(el => el.textContent = str);
  }
  updateDate();

  // ── NAVIGATION ACTIVE ──
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    if (a.getAttribute('href') === currentPage) a.classList.add('active');
  });

  // ── MENU HAMBURGER ──
  const hamburger = document.getElementById('hamburgerBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      mobileMenu.classList.toggle('open');
    });
    // Fermer si clic dehors
    document.addEventListener('click', (e) => {
      if (!hamburger.contains(e.target) && !mobileMenu.contains(e.target)) {
        hamburger.classList.remove('open');
        mobileMenu.classList.remove('open');
      }
    });
  }

  // ── BARRE DE PROGRESSION LECTURE ──
  const progressBar = document.getElementById('readProgress');
  if (progressBar) {
    window.addEventListener('scroll', () => {
      const el  = document.documentElement;
      const scrolled = el.scrollTop || document.body.scrollTop;
      const max = el.scrollHeight - el.clientHeight;
      const pct = max > 0 ? (scrolled / max) * 100 : 0;
      progressBar.style.width = pct + '%';
    });
  }

  // ── BOTTOM NAV MOBILE ──
  document.querySelectorAll('.bn-item').forEach(item => {
    item.addEventListener('click', function () {
      document.querySelectorAll('.bn-item').forEach(x => x.classList.remove('active'));
      this.classList.add('active');
    });
  });

  // ── RÉACTIONS ARTICLE ──
  const reactionCounts = {};
  const reactionActive = {};
  document.querySelectorAll('.react-btn').forEach(btn => {
    const id = btn.dataset.reaction;
    const countEl = btn.querySelector('.react-count');
    reactionCounts[id] = parseInt(countEl?.textContent || 0);
    reactionActive[id] = false;

    btn.addEventListener('click', () => {
      reactionActive[id] = !reactionActive[id];
      reactionCounts[id] += reactionActive[id] ? 1 : -1;
      if (countEl) countEl.textContent = reactionCounts[id];
      btn.classList.toggle('active', reactionActive[id]);
    });
  });

  // ── SAUVEGARDER ARTICLE ──
  const saveBtn = document.querySelector('.save-btn');
  if (saveBtn) {
    saveBtn.addEventListener('click', () => {
      saveBtn.textContent = saveBtn.textContent.includes('Sauvegarder') ? '✓ Sauvegardé' : 'Sauvegarder';
    });
  }

  // ── FILTRES RUBRIQUES ──
  document.querySelectorAll('.filter-chips .chip').forEach(chip => {
    chip.addEventListener('click', function () {
      const group = this.closest('.filter-chips');
      group.querySelectorAll('.chip').forEach(c => c.classList.remove('active-a', 'active-m'));
      const tab = this.closest('[data-tab]')?.dataset.tab || 'afrique';
      this.classList.add(tab === 'monde' ? 'active-m' : 'active-a');
      filterArticles(tab, this.textContent.trim());
    });
  });

  function filterArticles(tab, region) {
    const grid = document.getElementById('grid-' + tab);
    if (!grid) return;
    grid.style.opacity = '.3';
    setTimeout(() => { grid.style.opacity = '1'; }, 350);
  }

  // ── VUE GRILLE / LISTE ──
  window.setView = function(view, tab) {
    const grid   = document.getElementById('grid-' + tab);
    const btnG   = document.getElementById('vb-grid-' + tab.charAt(0));
    const btnL   = document.getElementById('vb-list-' + tab.charAt(0));
    const cls    = tab === 'afrique' ? 'active-a' : 'active-m';
    if (!grid) return;

    if (view === 'grid') {
      grid.className = 'art-grid grid-view';
      btnG.className = 'view-btn ' + cls;
      btnL.className = 'view-btn';
    } else {
      grid.className = 'art-grid list-view';
      btnL.className = 'view-btn ' + cls;
      btnG.className = 'view-btn';
    }
  };

  // ── PAGINATION ──
  window.setPg = function(btn, tab) {
    const pag = document.getElementById('pag-' + tab);
    if (!pag) return;
    const cls = tab === 'afrique' ? 'active-a' : 'active-m';
    pag.querySelectorAll('.pg-btn').forEach(b => b.classList.remove('active-a', 'active-m'));
    btn.classList.add(cls);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // ── CHARGER PLUS ──
  window.loadMore = function(tab) {
    const btn = document.querySelector(`[data-loadmore="${tab}"]`);
    if (!btn) return;
    btn.textContent = 'Chargement…';
    btn.style.opacity = '.5';
    btn.disabled = true;
    setTimeout(() => {
      btn.textContent = "Charger plus d'articles";
      btn.style.opacity = '1';
      btn.disabled = false;
    }, 1200);
  };

  // ── SWITCH TABS (rubriques) ──
  window.switchTab = function(tab) {
    ['afrique', 'monde'].forEach(t => {
      const page = document.getElementById('page-' + t);
      const tabBtn = document.getElementById('tab-' + t);
      if (!page || !tabBtn) return;
      const isActive = t === tab;
      page.style.display = isActive ? 'block' : 'none';
      tabBtn.className = 'tab-btn' + (isActive ? ` active-${t === 'afrique' ? 'afrique' : 'monde'}` : '');
      if (isActive) {
        page.style.animation = 'none';
        page.offsetHeight;
        page.style.animation = 'fadeIn .3s ease';
      }
    });
  };

  // ── NEWSLETTER ──
  document.querySelectorAll('.nl-form').forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = form.querySelector('input[type="email"]');
      const btn   = form.querySelector('button');
      if (!input?.value.includes('@')) {
        input.style.borderColor = 'var(--red)';
        return;
      }
      btn.textContent = '✓ Inscription confirmée !';
      btn.style.background = 'var(--green)';
      input.disabled = true;
      btn.disabled = true;
    });
  });

  // ── ANIMATION SCROLL ──
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.art-card, .list-item, .op-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(16px)';
    el.style.transition = 'opacity .4s ease, transform .4s ease';
    observer.observe(el);
  });

});
