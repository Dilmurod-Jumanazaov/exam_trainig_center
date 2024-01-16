const elHeroMenuItem = document.querySelectorAll(".js-hero-menu-item");
const elCount = document.querySelectorAll(".main-info__item-number");


// this code that identifies which menu you are in.
if(window.location.href == "http://127.0.0.1:5500/index.html") {
  if (elHeroMenuItem[0].textContent.trim() == "Xisobot") {
    elHeroMenuItem[0].classList.toggle("hero__menu-item-active");
  }
};


function getSubjectData(url) {
  fetch(url)
  .then(response => response.json())
  .then(data => {
    console.log(data.data);
    if(data.data) {
      elCount[2].textContent = `${data.data.length} ta`;
    }
  })
}
getSubjectData(`http://localhost:9090/all-subject`);

function getTeacherData(url) {
  fetch(url)
  .then(response => response.json())
  .then(data => {
    console.log(data.data);
    if(data.data) {
      elCount[1].textContent = `${data.data.length} ta`;
    }
  })
}
getTeacherData(`http://localhost:9090/all-teacher`);

function getStudentData(url) {
  fetch(url)
  .then(response => response.json())
  .then(data => {
    console.log(data.data);
    if(data.data) {
      elCount[0].textContent = `${data.data.length} ta`;
    }
  })
}
getStudentData(`http://localhost:9090/all-student`);

function getGroupData(url) {
  fetch(url)
  .then(response => response.json())
  .then(data => {
    console.log(data.data);
    if(data.data) {
      elCount[3].textContent = `${data.data.length} ta`;
    }
  })
}
getGroupData(`http://localhost:9090/all-group`);
