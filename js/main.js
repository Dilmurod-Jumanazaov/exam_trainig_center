const elHeroMenuItem = document.querySelectorAll(".js-hero-menu-item");

if(window.location.href == "http://127.0.0.1:5500/index.html") {
  if (elHeroMenuItem[0].textContent.trim() == "Xisobot") {
    elHeroMenuItem[0].classList.toggle("hero__menu-item-active");
  }
}

