const navUser = document.getElementById('nav-user');

navUser.addEventListener('click', () => {
 
  const iconUser = document.getElementById('icon-user');

  iconUser.classList.toggle('fa-circle-xmark');

  const navUserMenu = document.getElementById('nav-drop-user');
  navUserMenu.classList.toggle('drop-show');

});
