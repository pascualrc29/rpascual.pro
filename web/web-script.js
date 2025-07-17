// Elegant Resume Dark/Light Toggle
document.addEventListener('DOMContentLoaded', function() {
  const btn = document.getElementById('modeToggle');
  const body = document.body;

  function setDarkMode(enabled) {
    body.classList.toggle('dark-mode', enabled);
    if (btn) {
      btn.innerHTML = enabled
        ? '<i class="fa fa-sun"></i>'
        : '<i class="fa fa-moon"></i>';
    }
    // Save preference
    if (enabled) localStorage.setItem('resume-theme', 'dark');
    else localStorage.setItem('resume-theme', 'light');
  }

  // On click, toggle mode
  if (btn) {
    btn.onclick = function() {
      setDarkMode(!body.classList.contains('dark-mode'));
    }
  }

  // On page load, set initial mode
  const saved = localStorage.getItem('resume-theme');
  if (saved === 'dark' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    setDarkMode(true);
  } else {
    setDarkMode(false);
  }
});
