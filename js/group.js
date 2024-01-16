const elHeroMenuItem = document.querySelectorAll(".js-hero-menu-item");
const elGroupForm = document.querySelector(".js-group-form");
const elGroupSubjectSelect = elGroupForm.querySelector(".js-group-subject-select");
const elGroupLessonDaySelect = elGroupForm.querySelector(".js-group-day-select");
const elGroupNameInput = elGroupForm.querySelector(".js-group__form-group-name-input");
const elGroupTeacherSelect = elGroupForm.querySelector(".js-group-teacher-select");
const elGroupStartTimeInput = elGroupForm.querySelector(".js-group-start-time-input");
const elGroupStopimeInput = elGroupForm.querySelector(".js-group-stop-time-input");
const elGroupList = document.querySelector(".js-group-info-list");


if(window.location.href == "http://127.0.0.1:5500/group.html") {
  if (elHeroMenuItem[2].textContent.trim() == "Guruhlar") {
    elHeroMenuItem[2].classList.add("hero__menu-item-active");
  }
};

// group form 
elGroupForm.addEventListener("submit", (evt) => {
  evt.preventDefault();

  let formData = new FormData();
  formData.append("group_name",elGroupNameInput.value);
  formData.append("group_time_start",elGroupStartTimeInput.value);
  formData.append("group_time_stop",elGroupStopimeInput.value);
  formData.append("subject_id",elGroupSubjectSelect.value);
  formData.append("week_id",elGroupLessonDaySelect.value);
  formData.append("teacher_id",elGroupTeacherSelect.value);

  createGroup(`http://localhost:9090/group/create`,formData);
});

// render function 
function renderGroup(array,node) {
  node.innerHTML = "";

  array.forEach(element => {
    console.log(element);
    `
    <li class="group__info-item">
    <h4 class="group__info-item-title">
      Matematika
    </h4>
    <div class="group__info-itembox">
      <div class="group__info-item-img-box">
        <img class="group__info-item-img" src="images/png/imageone.png" width="80" height="80" alt="imageone">
        <div class="group__info-item-teacher-infobox">
          <div class="group__info-item-teacherbox">
            <span class="group__info-item-subtitle">O’qituvchi:</span>
            <p class="group__info-item-text">
              Muxamadaliyev Ibroxim
            </p>
          </div>
          <div class="group__info-item-teacherbox">
            <span class="group__info-item-subtitle">Tell raqam:</span>
            <p class="group__info-item-text">
              +998900113861
            </p>
          </div>
        </div>
      </div>
      <div class="group__info-item-lesson-wrapper">
        <div class="group__info-item-lessonbox">
          <span class="group__info-item-subtitle">
            Dars kunlari:
          </span>
          <p class="group__info-item-text">
            DU-CHOR-JUMA
          </p>
        </div>
        <div class="group__info-item-lessonbox">
          <span class="group__info-item-subtitle">
            Dars vaqti:
          </span>
          <p class="group__info-item-text">
            14:00-16:00
          </p>
        </div>
        <div class="group__info-item-lessonbox">
          <span class="group__info-item-subtitle">
            O’quvchilar soni
          </span>
          <p class="group__info-item-text">
            25ta
          </p>
        </div>
      </div>
    </div>
  </li>
  `
  });
}

function createGroup(url,value) {
  fetch(url, {
    method: "POST",
    headers: {},
    body: value,
  })
  .then(response => response.json())
  .then(data => {
    console.log(data);
    if(data.data) {
      getGroup(`http://localhost:9090/all-group`);
    }
  })
};

function getGroup(url) {
  fetch(url, {
    method: "GET",
    headers: {},
  })
  .then(response => response.json())
  .then(data => {
    console.log(data);
  })
}
getGroup(`http://localhost:9090/all-group`);

function editGroup(url,newValue) {
  fetch(url, {
    method: "PUT",
    headers: {},
    body: newValue,
  })
  .then(response => response.json())
  .then(data => {
    console.log(data);
  })
};

function deleteGroup(url) {
  fetch(url, {
    method: 'DELETE',
    headers: {},
  })
  .then(response => response.json())
  .then(data => {
    console.log(data);
    if(data.status == 200) {
      getGroup(`http://localhost:9090/all-group`);
    }
  })
};


// elGroupList.addEventListener("click", (evt) => {
//   if(evt.target.matches())
// })

function getAllSubject(url) {
  fetch(url)
  .then(response => response.json())
  .then(data => {
    if(data.data) {
      renderSubject(data.data,elGroupSubjectSelect);
    }
  })
}
getAllSubject(`http://localhost:9090/all-subject`)

function renderSubject(array,node) {

  array.forEach(element => {
    console.log(element);
    const newOption = document.createElement("option");
    newOption.textContent = element.subject_name;
    newOption.value = element.id;

    elGroupSubjectSelect.appendChild(newOption);
  });
};


function getWeekDay(url) {
  fetch(url)
  .then(response => response.json())
  .then(data => {
    console.log(data);
    if(data.data) {
      renderWeek(data.data,elGroupLessonDaySelect);
    }
  })
}
getWeekDay(`http://localhost:9090/all-week`);

function renderWeek(array,node) {
  array.forEach(element => {
    console.log(element);
    const newOption = document.createElement("option");
    newOption.textContent = element.week_name;
    newOption.value = element.id;

    elGroupLessonDaySelect.appendChild(newOption);
  });
}

function getAllTeacher(url) {
  fetch(url)
  .then(response => response.json())
  .then(data => {
    console.log(data);
    if(data.data) {
      renderTeacher(data.data,elGroupTeacherSelect);
    }
  })
}
getAllTeacher(`http://localhost:9090/all-teacher`);

function renderTeacher(array,node) {
  array.forEach(element => {
    console.log(element);
    const newOption = document.createElement("option");
    newOption.textContent = `${element.last_name} ${element.first_name}`;
    newOption.value = element.id;

    elGroupTeacherSelect.appendChild(newOption);
  });
}