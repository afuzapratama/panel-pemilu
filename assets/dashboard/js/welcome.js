const navUser = document.getElementById('nav-user');

navUser.addEventListener('click', () => {
 
  const iconUser = document.getElementById('icon-user');

  iconUser.classList.toggle('fa-circle-xmark');

  const navUserMenu = document.getElementById('nav-drop-user');
  navUserMenu.classList.toggle('drop-show');

});

$(document).ready(function() {
  const input = $('input');
  const navBottom = $('.nav-bottom');

  // Hide nav when input is focused
  input.focus(function() {
    navBottom.addClass('nav-bottom-hide');
  });

  // Show nav when input is not focused
  input.blur(function() {
    navBottom.removeClass('nav-bottom-hide');
  });
});