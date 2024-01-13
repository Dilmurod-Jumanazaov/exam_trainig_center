const elHeroMenuItem = document.querySelectorAll(".js-hero-menu-item");

if(window.location.href == "http://127.0.0.1:5500/subject.html") {
  if (elHeroMenuItem[4].textContent.trim() == "Fanlar") {
    elHeroMenuItem[4].classList.add("hero__menu-item-active");
  }
}