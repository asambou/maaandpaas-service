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
            <li><a href="services.html">Services</a></li>
            <li><a href="contact.html">Contact</a></li>
          </ul>
        </div>
        <div>
          <h4>Services</h4>
          <ul>
            <li><a href="services.html">Daily Living Assistance</a></li>
            <li><a href="services.html">Health Monitoring</a></li>
            <li><a href="services.html">Companionship Care</a></li>
            <li><a href="services.html">In-Home Nursing</a></li>
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
