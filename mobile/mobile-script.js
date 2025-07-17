// Dark/Light Mode Toggle
document.addEventListener('DOMContentLoaded', function() {
  const modeBtn = document.getElementById('modeToggle');
  const body = document.body;

  function setDarkMode(enabled) {
    body.classList.toggle('dark-mode', enabled);
    if (modeBtn) {
      modeBtn.innerHTML = enabled
        ? '<i class="fa fa-sun"></i>'
        : '<i class="fa fa-moon"></i>';
    }
    // Save preference
    if (enabled) localStorage.setItem('resume-theme', 'dark');
    else localStorage.setItem('resume-theme', 'light');
  }

  // Toggle mode on click
  if (modeBtn) {
    modeBtn.onclick = function() {
      setDarkMode(!body.classList.contains('dark-mode'));
    }
  }

  // Initial mode on load
  const saved = localStorage.getItem('resume-theme');
  if (saved === 'dark' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    setDarkMode(true);
  } else {
    setDarkMode(false);
  }
});

// Accordion and Floating Expand/Collapse All Button with true auto height
(function() {
  const sections = Array.from(document.querySelectorAll('.accordion-section'));
  const toggles = Array.from(document.querySelectorAll('.accordion-toggle'));
  const expandToggleBtn = document.getElementById('expandToggleBtn');
  const scrollTopBtn = document.getElementById('scrollTopBtn');

  function allExpanded() {
    return sections.every(sec => sec.classList.contains('open'));
  }

  function allCollapsed() {
    return sections.every(sec => !sec.classList.contains('open'));
  }

  // Animate panel open/close with auto height
  function setPanelHeight(panel, open) {
    if (!panel) return;
    if (open) {
      panel.style.maxHeight = panel.scrollHeight + "px";
    } else {
      panel.style.maxHeight = "0";
    }
  }

  // Accordion: Only one open at a time, unless all expanded
  toggles.forEach(btn => {
    btn.addEventListener('click', function() {
      const parent = btn.closest('.accordion-section');
      const isOpen = parent.classList.contains('open');
      if (!allExpanded()) {
        sections.forEach(sec => {
          sec.classList.remove('open');
          setPanelHeight(sec.querySelector('.accordion-panel'), false);
        });
        if (!isOpen) {
          parent.classList.add('open');
          setPanelHeight(parent.querySelector('.accordion-panel'), true);
        }
      } else {
        // If all expanded, allow collapsing this one only
        if (isOpen) {
          parent.classList.remove('open');
          setPanelHeight(parent.querySelector('.accordion-panel'), false);
        }
      }
      updateExpandBtn();
      updateFloatingBtns();
    });
  });

  // Floating Expand/Collapse All Button
  if (expandToggleBtn) {
    expandToggleBtn.addEventListener('click', function() {
      if (!allExpanded()) {
        sections.forEach(sec => {
          sec.classList.add('open');
          setPanelHeight(sec.querySelector('.accordion-panel'), true);
        });
        setTimeout(() => { window.scrollTo({ top: 0, behavior: 'smooth' }); }, 100);
      } else {
        sections.forEach(sec => {
          sec.classList.remove('open');
          setPanelHeight(sec.querySelector('.accordion-panel'), false);
        });
      }
      updateExpandBtn();
      updateFloatingBtns();
    });
  }

  // Scroll to Top Button
  if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', function() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  function updateExpandBtn() {
    if (!expandToggleBtn) return;
    if (allExpanded()) {
      expandToggleBtn.title = "Collapse all sections";
      expandToggleBtn.innerHTML = '<i class="fa fa-minus"></i>';
    } else {
      expandToggleBtn.title = "Expand all sections";
      expandToggleBtn.innerHTML = '<i class="fa fa-plus"></i>';
    }
  }

  function updateFloatingBtns() {
    if (scrollTopBtn) scrollTopBtn.style.display = allExpanded() ? 'flex' : 'none';
  }

  // On load: all closed, scroll-to-top hidden, + icon, correct heights
  sections.forEach(sec => {
    sec.classList.remove('open');
    setPanelHeight(sec.querySelector('.accordion-panel'), false);
  });
  updateExpandBtn();
  updateFloatingBtns();

  // --- Remove/Comment out this block! ---
  // // Optional: open first section by default on mobile
  // if (sections[0]) {
  //   setTimeout(() => {
  //     sections[0].classList.add('open');
  //     setPanelHeight(sections[0].querySelector('.accordion-panel'), true);
  //   }, 120);
  // }
  // ---------------------------------------

  // Handle window resize: re-calc height for open panels
  window.addEventListener('resize', () => {
    sections.forEach(sec => {
      if (sec.classList.contains('open')) {
        setPanelHeight(sec.querySelector('.accordion-panel'), true);
      }
    });
  });
})();
