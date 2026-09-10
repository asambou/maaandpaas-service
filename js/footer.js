document.addEventListener('DOMContentLoaded', function () {
  var el = document.getElementById('footer-placeholder');
  if (!el) return;
  el.innerHTML = `
    <div class="container">
      <div class="footer-grid">
        <div>
          <div class="footer-brand">
            <img src="assets/logo.svg" alt="Maa & Paa's Homecare Service logo" style="width:38px;height:38px;filter:brightness(0) invert(1) opacity(.9);">
            <span>Maa &amp; Paa's Homecare Service</span>
          </div>
          <p>Comfort. Care. Companionship — we care like family. Professional homecare for elderly people in the comfort of their own homes.</p>
          <div class="social-row">
            <a href="#" target="_blank" rel="noopener" aria-label="Facebook">f</a>
            <a href="#" target="_blank" rel="noopener" aria-label="Instagram">ig</a>
            <a href="#" target="_blank" rel="noopener" aria-label="TikTok">tt</a>
            <a href="https://wa.me/2206070195" target="_blank" rel="noopener" aria-label="WhatsApp">wa</a>
          </div>
        </div>
        <div>
          <h4>Quick Links</h4>
          <ul>
            <li><a href="index.html">Home</a></li>
            <li><a href="about.html">About Us</a></li>
            <li><a href="why-us.html">Why Choose Us</a></li>
            <li><a href="pricing.html">Pricing</a></li>
            <li><a href="careers.html">Careers</a></li>
            <li><a href="giving-back.html">Giving Back</a></li>
            <li><a href="referral.html">Refer a Friend</a></li>
            <li><a href="agreement.html">Service Agreement</a></li>
            <li><a href="contact.html">Contact</a></li>
          </ul>
        </div>
        <div>
          <h4>Services</h4>
          <ul>
            <li><a href="services.html">Personal Care at Home</a></li>
            <li><a href="services.html">Hospital to Home Recovery</a></li>
            <li><a href="services.html">Companionship Care</a></li>
            <li><a href="booking.html">Book a FREE Assessment</a></li>
          </ul>
        </div>
        <div>
          <h4>Contact</h4>
          <ul>
            <li>Sanchaba Sulay Jobe, The Gambia</li>
            <li><a href="tel:+2206070195">+220 607 0195</a></li>
            <li>Senior Nurse Advisor / Secretary</li>
            <li><a href="mailto:info@maapaashomecare.com">info@maapaashomecare.com</a></li>
          </ul>
        </div>
      </div>
      <div class="footer-bottom">
        &copy; ${new Date().getFullYear()} Maa &amp; Paa's Homecare Service. All rights reserved.
      </div>
    </div>
  `;
});


/* ============================================================
   Add "Giving Back" to the top navigation on every page.
   (Injected here so we don't have to edit each page's nav by hand.)
   ============================================================ */
document.addEventListener('DOMContentLoaded', function () {
  var navUl = document.querySelector('header nav ul');
  if (!navUl) return;
  if (navUl.querySelector('a[href="giving-back.html"]')) return; // already present
  var li = document.createElement('li');
  var a = document.createElement('a');
  a.href = 'giving-back.html';
  a.textContent = 'Giving Back';
  if (location.pathname.indexOf('giving-back') !== -1) a.className = 'active';
  li.appendChild(a);
  var contact = navUl.querySelector('a[href="contact.html"]');
  if (contact && contact.parentNode) {
    navUl.insertBefore(li, contact.parentNode);
  } else {
    navUl.appendChild(li);
  }
});


/* ============================================================
   Hidden "declassified dossier" easter egg.
   Trigger: tap/click the site logo (top-left crest) 7 times quickly.
   Fully self-contained — styles are injected here, no other files needed.
   To change what it reveals, edit the DOSSIER values just below.
   ============================================================ */
(function () {
  var DOSSIER = {
    codename: 'GHOST',
    operative: 'Alex Sambou',
    operation: "MAA & PAA'S HOMECARE",
    domain: 'maapaashomecare.com',
    deployed: '2026',
    motto: 'Hidden in plain sight. Built with care.'
  };

  // --- Console breadcrumb (for those who open developer tools) ---
  try {
    console.log('%c  TOP SECRET // INTERCEPTED TRANSMISSION  ',
      'background:#0b0b0b;color:#39ff14;font-family:monospace;font-size:13px;font-weight:bold;padding:6px 10px;border:1px solid #39ff14;');
    console.log('%cClearance required. Some doors open only to those who knock on the crest seven times.',
      'color:#7a7a7a;font-family:monospace;font-size:12px;');
  } catch (e) {}

  function injectStyles() {
    if (document.getElementById('dossier-style')) return;
    var s = document.createElement('style');
    s.id = 'dossier-style';
    s.textContent =
      '#dossier-overlay{position:fixed;inset:0;z-index:99999;background:rgba(3,6,3,.94);' +
      'display:flex;align-items:center;justify-content:center;opacity:0;transition:opacity .5s ease;' +
      'font-family:"Courier New",monospace;padding:24px;}' +
      '#dossier-overlay.show{opacity:1;}' +
      '.dossier{width:100%;max-width:560px;color:#39ff14;text-shadow:0 0 6px rgba(57,255,20,.35);' +
      'border:1px solid rgba(57,255,20,.4);border-radius:8px;padding:30px;background:rgba(0,0,0,.5);' +
      'box-shadow:0 0 40px rgba(57,255,20,.15);position:relative;}' +
      '.dossier .stamp{position:absolute;top:14px;right:16px;border:3px solid #ff3b3b;color:#ff3b3b;' +
      'font-weight:bold;font-size:12px;letter-spacing:2px;padding:4px 10px;border-radius:4px;' +
      'transform:rotate(9deg);opacity:0;transition:opacity .3s ease .3s;}' +
      '.dossier.done .stamp{opacity:.9;}' +
      '.dossier h3{color:#39ff14;font-size:14px;letter-spacing:3px;margin:0 0 16px;}' +
      '.dossier .line{font-size:13.5px;line-height:2;white-space:pre;}' +
      '.dossier .k{color:#7dffb0;}' +
      '.dossier .redacted{background:#39ff14;color:transparent;border-radius:2px;}' +
      '.dossier .motto{margin-top:16px;color:#bfffd0;font-style:italic;font-size:13px;opacity:0;transition:opacity .5s ease;}' +
      '.dossier.done .motto{opacity:1;}' +
      '.dossier .cursor{display:inline-block;width:9px;height:15px;background:#39ff14;margin-left:3px;' +
      'animation:dossierBlink 1s steps(1) infinite;vertical-align:middle;}' +
      '@keyframes dossierBlink{50%{opacity:0;}}' +
      '.dossier .hint{margin-top:18px;font-size:11px;color:#4c7a58;}';
    document.head.appendChild(s);
  }

  function declassify() {
    if (document.getElementById('dossier-overlay')) return;
    injectStyles();

    var ov = document.createElement('div');
    ov.id = 'dossier-overlay';
    var box = document.createElement('div');
    box.className = 'dossier';
    box.innerHTML = '<div class="stamp">DECLASSIFIED</div><h3>&#9617; TOP SECRET &#9617; CLEARANCE 6</h3><div id="dossier-body"></div>';
    ov.appendChild(box);
    document.body.appendChild(ov);
    requestAnimationFrame(function () { ov.classList.add('show'); });

    var rows = [
      ['CODENAME', DOSSIER.codename],
      ['OPERATIVE', DOSSIER.operative],
      ['OPERATION', DOSSIER.operation],
      ['DOMAIN', DOSSIER.domain],
      ['DEPLOYED', DOSSIER.deployed],
      ['STATUS', 'ACTIVE']
    ];
    var body = box.querySelector('#dossier-body');
    var i = 0;
    function pad(k) { k = k + ':'; while (k.length < 11) k += ' '; return k; }

    function next() {
      if (i >= rows.length) {
        var motto = document.createElement('div');
        motto.className = 'motto';
        motto.textContent = '“' + DOSSIER.motto + '”';
        body.appendChild(motto);
        var hint = document.createElement('div');
        hint.className = 'hint';
        hint.textContent = '[ press Esc or tap anywhere to close ]';
        body.appendChild(hint);
        box.classList.add('done');
        setTimeout(closeIt, 6000);
        return;
      }
      var r = rows[i];
      var line = document.createElement('div');
      line.className = 'line';
      line.innerHTML = '<span class="k">' + pad(r[0]) + '</span><span class="redacted"></span><span class="cursor"></span>';
      line.querySelector('.redacted').textContent = r[1];
      body.appendChild(line);
      setTimeout(function () {
        var red = line.querySelector('.redacted');
        if (red) red.classList.remove('redacted');
        var cur = line.querySelector('.cursor');
        if (cur) cur.remove();
        i++;
        setTimeout(next, 260);
      }, 430);
    }
    setTimeout(next, 500);

    function closeIt() {
      ov.classList.remove('show');
      setTimeout(function () { if (ov.parentNode) ov.remove(); }, 550);
      document.removeEventListener('keydown', escClose);
    }
    function escClose(e) { if (e.key === 'Escape') closeIt(); }
    document.addEventListener('keydown', escClose);
    ov.addEventListener('click', function (e) { if (e.target === ov) closeIt(); });
  }

  document.addEventListener('DOMContentLoaded', function () {
    var logo = document.querySelector('.brand');
    if (!logo) return;
    var clicks = 0, timer = null;
    logo.addEventListener('click', function (e) {
      e.preventDefault();
      clicks++;
      clearTimeout(timer);
      if (clicks >= 7) { clicks = 0; declassify(); return; }
      timer = setTimeout(function () {
        if (clicks === 1) { window.location.href = logo.getAttribute('href') || 'index.html'; }
        clicks = 0;
      }, 420);
    });
  });
})();
