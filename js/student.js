const elHeroMenuItem = document.querySelectorAll(".js-hero-menu-item");

if(window.location.href == "http://127.0.0.1:5500/student.html") {
  if (elHeroMenuItem[1].textContent.trim() == "O’quvchilar") {
    elHeroMenuItem[1].classList.add("hero__menu-item-active");
  }
}
elHeroMenuItem[0].classList.remove("hero__menu-item-active");