// Nav toggle (hamburger overlay), shared on every page
document.addEventListener('DOMContentLoaded', function () {
  var toggle = document.querySelector('.menu-toggle');
  var overlay = document.querySelector('.nav-overlay');
  if (toggle && overlay) {
    toggle.addEventListener('click', function () {
      toggle.classList.toggle('open');
      overlay.classList.toggle('open');
      document.body.style.overflow = overlay.classList.contains('open') ? 'hidden' : '';
    });
    overlay.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        toggle.classList.remove('open');
        overlay.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }
});

// Renders a video grid from an array of {title, youtubeId} objects.
// youtubeId left empty ("") shows a placeholder card instead of an embed —
// see assets/data/videos.js for how to add your real links.
function renderVideoGrid(containerId, items) {
  var grid = document.getElementById(containerId);
  if (!grid) return;

  items.forEach(function (item) {
    var tile = document.createElement('div');
    tile.className = 'video-tile';

    if (item.youtubeId) {
      var iframe = document.createElement('iframe');
      iframe.src = 'https://www.youtube.com/embed/' + item.youtubeId;
      iframe.title = item.title || 'Video';
      iframe.loading = 'lazy';
      iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
      iframe.allowFullscreen = true;
      tile.appendChild(iframe);
    } else {
      tile.innerHTML =
        '<div class="video-placeholder">' +
          '<div class="play-icon">&#9658;</div>' +
          '<div class="ph-title">' + (item.title || 'Untitled project') + '</div>' +
          '<div class="ph-note">Add a YouTube link in assets/data/videos.js</div>' +
        '</div>';
    }

    grid.appendChild(tile);
  });
}
