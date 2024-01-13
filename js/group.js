const elHeroMenuItem = document.querySelectorAll(".js-hero-menu-item");

if(window.location.href == "http://127.0.0.1:5500/group.html") {
  if (elHeroMenuItem[2].textContent.trim() == "Guruhlar") {
    elHeroMenuItem[2].classList.add("hero__menu-item-active");
  }
}
