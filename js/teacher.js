const elHeroMenuItem = document.querySelectorAll(".js-hero-menu-item");

if(window.location.href == "http://127.0.0.1:5500/teacher.html") {
  if (elHeroMenuItem[3].textContent.trim() == "O’qtuvchilar") {
    elHeroMenuItem[3].classList.add("hero__menu-item-active");
  }
}