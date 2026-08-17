document.addEventListener('DOMContentLoaded', function () {
  var toggle = document.querySelector('.menu-toggle');
  var nav = document.querySelector('nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      nav.classList.toggle('open');
    });
    nav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        nav.classList.remove('open');
      });
    });
  }

  // Only the Contact-page mailto form (forms with a Formspree action submit natively).
  var form = document.querySelector('.contact-form:not([action])');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var name = form.querySelector('#name').value.trim();
      var message = form.querySelector('#message').value.trim();
      var subject = encodeURIComponent('Homecare enquiry from ' + (name || 'website visitor'));
      var body = encodeURIComponent(message + '\n\nFrom: ' + name);
      window.location.href = 'mailto:info@maapaashomecare.com?subject=' + subject + '&body=' + body;
    });
  }
});
