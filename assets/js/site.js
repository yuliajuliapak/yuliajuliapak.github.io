(function () {
  // ---- Mobile menu (hamburger) ----
  var body = document.body;
  document.querySelectorAll('.js-hamburger').forEach(function (el) {
    el.addEventListener('click', function () { body.classList.add('show-responsive-nav'); });
  });
  document.querySelectorAll('.js-close-responsive-nav').forEach(function (el) {
    el.addEventListener('click', function () { body.classList.remove('show-responsive-nav'); });
  });

  // ---- Image grids: same sizing logic as Adobe Portfolio's flexbox-sizer ----
  var BREAKPOINTS = [{ width: 1325, modifier: 220 / 260 }, { width: 1024, modifier: 170 / 260 }, { width: 768, modifier: 0.5 }, { width: 540, modifier: 90 / 260 }];
  var MAX_RATIO = 1.5;
  function cssFloat(el, prop) { return parseFloat(window.getComputedStyle(el)[prop]) || 0; }
  function bpModifier(w) {
    return BREAKPOINTS.reduce(function (acc, b) { return (b.width >= w && b.width < acc.width) ? b : acc; }, { width: Infinity, modifier: 1 }).modifier;
  }
  function gridData(grid) {
    return Array.prototype.map.call(grid.querySelectorAll('.js-grid-item-container'), function (it) {
      var h = parseFloat(it.getAttribute('data-height')) || it.offsetHeight;
      var w = parseFloat(it.getAttribute('data-width')) || it.offsetWidth;
      var fg = parseFloat(it.getAttribute('data-flex-grow'));
      var nonContent = cssFloat(it, 'borderLeftWidth') + cssFloat(it, 'borderRightWidth') + cssFloat(it, 'marginLeft') + cssFloat(it, 'marginRight') + cssFloat(it, 'paddingLeft') + cssFloat(it, 'paddingRight');
      return { el: it, height: h, width: w, flexWidth: fg, flexHeight: Math.round(fg * h / w), nonContentWidth: nonContent };
    });
  }
  function gridDimensions(items, gw, mod) {
    var rows = [], row = [], left = gw;
    function close() {
      if (!row.length) return;
      var sum = row.reduce(function (s, r) { return s + r.w; }, 0), k = gw / sum;
      rows.push(row.map(function (r) { return { width: r.w * k, height: r.h * k }; }));
      row = [];
    }
    items.forEach(function (it) {
      var w = mod * it.flexWidth + it.nonContentWidth, h = mod * it.flexHeight;
      if (left >= w) { left -= w; } else { close(); left = gw - w; }
      row.push({ w: w, h: h });
    });
    close();
    return rows;
  }
  function modifierData(items, gw, limit) {
    var base = bpModifier(gw), s = 1, u = 0, last = Infinity, avg = 1, sign = -1;
    while (last / avg > MAX_RATIO && s < limit) {
      sign *= -1;
      s = (1 + u * sign) * base;
      var heights = gridDimensions(items, gw, s).map(function (r) { return r[0].height; }).reverse();
      last = heights[0];
      var rest = heights.slice(1);
      avg = rest.reduce(function (a, b) { return a + b; }, 0) / rest.length;
      u += 0.005;
    }
    return { flexModifier: s, averageRowHeight: avg };
  }
  function autoSizeGrid(grid) {
    var items = gridData(grid);
    var gw = cssFloat(grid, 'width');
    if (window.getComputedStyle(grid).boxSizing === 'border-box') {
      gw -= 2 * cssFloat(grid, 'borderLeftWidth') + 2 * cssFloat(grid, 'paddingLeft');
    }
    var md = modifierData(items, gw, 2);
    var ok = md.flexModifier < 2, s = ok ? md.flexModifier : 1;
    items.forEach(function (it) { var w = s * it.flexWidth; it.el.style.width = w + 'px'; it.el.style.flexGrow = '' + w; });
    var spacer = grid.querySelector('.js-grid-spacer');
    if (spacer) { spacer.classList.remove('grid__item-spacer'); spacer.style.display = 'none'; }
    var lastItem = items.length ? items[items.length - 1].el : null;
    var lastH = lastItem ? lastItem.getBoundingClientRect().height : 0;
    var showSpacer = !ok || lastH / md.averageRowHeight > 2.5;
    if (spacer) { spacer.classList.toggle('grid__item-spacer', showSpacer); spacer.style.display = showSpacer ? 'block' : 'none'; }
  }
  function autoSizeMaxGrid(grid, max) {
    var items = gridData(grid);
    for (var start = 0; start < items.length; start += max) {
      var row = items.slice(start, start + max);
      var avgH = row.reduce(function (a, r) { return a + r.height; }, 0) / row.length;
      var total = 0;
      row.forEach(function (r) { r.adjustedWidth = r.width * (avgH / r.height); total += r.adjustedWidth; });
      var gw = Math.floor(cssFloat(grid, 'width'));
      row.forEach(function (r) {
        var avail = gw - row.length * r.nonContentWidth;
        r.el.style.width = Math.floor(r.adjustedWidth / total * avail) + 'px';
      });
    }
  }
  function sizeGrids() {
    document.querySelectorAll('.js-grid-main').forEach(function (grid) {
      var max = parseInt(grid.getAttribute('data-grid-max-images'), 10);
      if (max > 0) { autoSizeMaxGrid(grid, max); } else { autoSizeGrid(grid); }
      grid.classList.add('grid--ready');
    });
  }
  sizeGrids();
  window.addEventListener('resize', sizeGrids);

  // ---- Lightbox for image grids and the About photo ----
  var links = Array.prototype.slice.call(document.querySelectorAll('.lightbox-link, .js-lightbox'));
  if (links.length) {
    var box = document.createElement('div');
    box.className = 'pf-lightbox';
    box.innerHTML = '<button class="pf-close" aria-label="Close">&times;</button>' +
      '<button class="pf-prev" aria-label="Previous">&#8249;</button>' +
      '<img alt="">' +
      '<button class="pf-next" aria-label="Next">&#8250;</button>';
    document.body.appendChild(box);
    var imgEl = box.querySelector('img');
    var current = 0;
    function srcOf(el) {
      return el.getAttribute('data-full') || el.getAttribute('data-src') || (el.querySelector('img') || {}).src;
    }
    function show(i) {
      current = (i + links.length) % links.length;
      imgEl.src = srcOf(links[current]);
      box.classList.add('open');
    }
    function hide() { box.classList.remove('open'); }
    links.forEach(function (el, i) {
      el.addEventListener('click', function (e) { e.preventDefault(); show(i); });
    });
    box.addEventListener('click', function (e) {
      if (e.target.classList.contains('pf-prev')) { show(current - 1); }
      else if (e.target.classList.contains('pf-next')) { show(current + 1); }
      else { hide(); }
    });
    var single = links.length < 2;
    box.querySelector('.pf-prev').style.display = single ? 'none' : '';
    box.querySelector('.pf-next').style.display = single ? 'none' : '';
    document.addEventListener('keydown', function (e) {
      if (!box.classList.contains('open')) return;
      if (e.key === 'Escape') hide();
      if (e.key === 'ArrowLeft') show(current - 1);
      if (e.key === 'ArrowRight') show(current + 1);
    });
  }

  // ---- Contact form: opens the visitor's email app with the message filled in ----
  document.querySelectorAll('form.contact-form').forEach(function (form) {
    var to = form.getAttribute('data-mailto');
    var submit = form.querySelector('.js-submit');
    function send() {
      var name = form.querySelector('[name="field1"]');
      var email = form.querySelector('[name="email"]');
      var msg = form.querySelector('[name="field2"]');
      var ok = true;
      [name, email, msg].forEach(function (f) {
        if (!f.value.trim()) { ok = false; f.style.borderColor = '#c00'; } else { f.style.borderColor = ''; }
      });
      if (!ok) return;
      var subject = 'Portfolio enquiry from ' + name.value.trim();
      var text = msg.value.trim() + '\n\n— ' + name.value.trim() + ' (' + email.value.trim() + ')';
      window.location.href = 'mailto:' + to + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(text);
      var module = form.closest('.form');
      if (module) module.classList.add('sent');
    }
    if (submit) submit.addEventListener('click', send);
    form.addEventListener('submit', function (e) { e.preventDefault(); send(); });
  });
})();
