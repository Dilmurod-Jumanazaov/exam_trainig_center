const elHeroMenuItem = document.querySelectorAll(".js-hero-menu-item");
const elGroupForm = document.querySelector(".js-group-form");
const elGroupSubjectSelect = elGroupForm.querySelector(".js-group-subject-select");
const elGroupLessonDaySelect = elGroupForm.querySelector(".js-group-day-select");
const elGroupNameInput = elGroupForm.querySelector(".js-group__form-group-name-input");
const elGroupTeacherSelect = elGroupForm.querySelector(".js-group-teacher-select");
const elGroupStartTimeInput = elGroupForm.querySelector(".js-group-start-time-input");
const elGroupStopimeInput = elGroupForm.querySelector(".js-group-stop-time-input");
const elGroupList = document.querySelector(".js-group-info-list");
const elGroupInputTitle = document.querySelectorAll(".group__form-input-title");
const elGroupModalForm = document.querySelector(".js-modal-form");
const elModalGroupNameInput = elGroupModalForm.querySelector(".js-modal-form-group-input");
const elModalGroupTimeStartInput = elGroupModalForm.querySelector(".js-modal-form-timestart-input");
const elModalGroupTimeStopInput = elGroupModalForm.querySelector(".js-modal-form-timestop-input");
const elInput = elGroupForm.getElementsByTagName("input");
let editGroupId = "";


if(window.location.href == "https://exam-training-center.netlify.app/group" || window.location.href == "http://127.0.0.1:5500/group.html") {
if (elHeroMenuItem[2].textContent.trim() == "Guruhlar") {
  elHeroMenuItem[2].classList.add("hero__menu-item-active");
}
};

// group form 
elGroupForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  
  createGroup(`http://localhost:9090/group/create`,elGroupNameInput.value,elGroupStartTimeInput.value,elGroupStopimeInput.value,Number(elGroupSubjectSelect.value),Number(elGroupLessonDaySelect.value),Number(elGroupTeacherSelect.value));
  
  if(elGroupSubjectSelect.value == "Select a subject") {
    elGroupInputTitle[0].classList.add("error-text");
    elGroupSubjectSelect.classList.add("error-input");
    return;
  } else {
    elGroupInputTitle[0].classList.remove("error-text");
    elGroupSubjectSelect.classList.remove("error-input");
  }
  if(elGroupLessonDaySelect.value == "Select a day") {
    elGroupInputTitle[1].classList.add("error-text");
    elGroupLessonDaySelect.classList.add("error-input");
    return;
  } else {
    elGroupInputTitle[1].classList.remove("error-text");
    elGroupLessonDaySelect.classList.remove("error-input");
  }
  if(elGroupNameInput.value == "") {
    elGroupInputTitle[2].classList.add("error-text");
    elGroupNameInput.classList.add("error-input");
    return;
  } else {
    elGroupInputTitle[2].classList.remove("error-text");
    elGroupNameInput.classList.remove("error-input");
  }
  if(elGroupTeacherSelect.value == "Select a teacher") {
    elGroupInputTitle[3].classList.add("error-text");
    elGroupTeacherSelect.classList.add("error-input");
    return;
  } else {
    elGroupInputTitle[3].classList.remove("error-text");
    elGroupTeacherSelect.classList.remove("error-input");
  }
  if(elGroupStartTimeInput.value == "") {
    elGroupInputTitle[4].classList.add("error-text");
    elGroupStartTimeInput.classList.add("error-input");
    return;
  } else {
    elGroupInputTitle[4].classList.remove("error-text");
    elGroupStartTimeInput.classList.remove("error-input");
  }
  if(elGroupStopimeInput.value == "") {
    elGroupInputTitle[5].classList.add("error-text");
    elGroupStopimeInput.classList.add("error-input");
    return;
  } else {
    elGroupInputTitle[5].classList.remove("error-text");
    elGroupStopimeInput.classList.remove("error-input");
  }
  
  if(elInput.value != "" && elGroupSubjectSelect.value != "Select a subject" && elGroupLessonDaySelect.value != "Select a day" && elGroupTeacherSelect.value != "Select a teacher") {
    elGroupSubjectSelect.value = "Select a subject";
    elGroupLessonDaySelect.value = "Select a day";
    elGroupNameInput.value = "";
    elGroupTeacherSelect.value = "Select a teacher";
    elGroupStartTimeInput.value = "";
    elGroupStopimeInput.value = "";
  }
});

// Create new group
function createGroup(url,group_name,group_time_start,group_time_stop,subject_id,week_id,teacher_id) {
  fetch(url, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      group_name,
      group_time_start,
      group_time_stop,
      subject_id,
      week_id,
      teacher_id,
    }),
  })
  .then(response => response.json())
  .then(data => {
    console.log(data.data);
    if(data) {
      getGroup(`http://localhost:9090/all-group`);
    }
  })
  .catch(error => {
    console.log(error);
  })
};

// Get all group 
function getGroup(url) {
  fetch(url)
  .then(response => response.json())
  .then(data => {
    if(data.data) {
      renderGroup(data.data,elGroupList);
    }
  })
  .catch(error => {
    console.log(error);
  })
}
getGroup(`http://localhost:9090/all-group`);

// Edit group
function editGroup(url,id,group_name,group_time_start,group_time_stop) {
  fetch(url + id, {
    method: "PUT",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      group_name,
      group_time_start,
      group_time_stop,
    }),
  })
  .then(response => response.json())
  .then(data => {
    console.log(data);
    if(data.status == 200) {
      getGroup(`http://localhost:9090/all-group`);
    }
  })
  .catch(error => {
    console.log(error);
  })
};

// Delete group
function deleteGroup(url,id) {
  fetch(url + id, {
    method: 'DELETE',
  })
  .then(response => response.json())
  .then(data => {
    console.log(data);
    if(data.status == 200) {
      getGroup(`http://localhost:9090/all-group`);
    }
  })
  .catch(error => {
    console.log(error);
  })
};


elGroupList.addEventListener("click", (evt) => {
  // edit
  if(evt.target.matches(".group__info-edit-btn")) {
    editGroupId = evt.target.dataset.id;
  }
  // delete
  if(evt.target.matches(".group__info-delete-btn")) {
    const deleteGroupId = evt.target.dataset.id;
    deleteGroup(`http://localhost:9090/group/delete/`,deleteGroupId);
  }
})

// group modal form submit code
elGroupModalForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  
  editGroup(`http://localhost:9090/group/update/`,editGroupId,elModalGroupNameInput.value,elModalGroupTimeStartInput.value,elModalGroupTimeStopInput.value);

  elModalGroupNameInput.value = "";
  elModalGroupTimeStartInput.value = "";
  elModalGroupTimeStopInput.value = "";
});

function getAllSubject(url) {
  fetch(url)
  .then(response => response.json())
  .then(data => {
    if(data.data) {
      renderSubject(data.data,elGroupSubjectSelect);
    }
  })
  .catch(error => {
    console.log(error);
  })
}
getAllSubject(`http://localhost:9090/all-subject`)

function renderSubject(array,node) {
  
  array.forEach(element => {
    const newOption = document.createElement("option");
    newOption.textContent = element.subject_name;
    newOption.value = element.id;
    
    node.appendChild(newOption);
  });
};


function getWeekDay(url) {
  fetch(url)
  .then(response => response.json())
  .then(data => {
    if(data.data) {
      renderWeek(data.data,elGroupLessonDaySelect);
    }
  })
  .catch(error => {
    console.log(error);
  })
}
getWeekDay(`http://localhost:9090/all-week`);

function renderWeek(array,node) {
  array.forEach(element => {
    const newOption = document.createElement("option");
    newOption.textContent = element.week_name;
    newOption.value = element.id;
    
    node.appendChild(newOption);
  });
}

function getAllTeacher(url) {
  fetch(url)
  .then(response => response.json())
  .then(data => {
    if(data.data) {
      renderTeacher(data.data,elGroupTeacherSelect);
    }
  })
  .catch(error => {
    console.log(error);
  })
}
getAllTeacher(`http://localhost:9090/all-teacher`);

function renderTeacher(array,node) {
  array.forEach(element => {
    const newOption = document.createElement("option");
    newOption.textContent = `${element.last_name} ${element.first_name}`;
    newOption.value = element.id;
    
    node.appendChild(newOption);
  });
}

// render group function 
function renderGroup(array,node) {
  node.innerHTML = "";
  array.forEach(element => {
    console.log(element);
    node.innerHTML += `
    <li class="group__info-item">
    <h4 class="group__info-item-title">
    ${element.subjects.subject_name}
    </h4>
    <div class="group__info-itembox">
    <div class="group__info-item-img-box">
    <img class="group__info-item-img" src="http://localhost:9090${element.teachers.img}" width="80" height="80" alt="${element.teachers.first_name} ${element.teachers.last_name}">
    <div class="group__info-item-teacher-infobox">
    <div class="group__info-item-teacherbox">
    <span class="group__info-item-subtitle">O’qituvchi:</span>
    <p class="group__info-item-text">
    ${element.teachers.last_name} ${element.teachers.first_name}
    </p>
    </div>
    <div class="group__info-item-teacherbox">
    <span class="group__info-item-subtitle">Tell raqam:</span>
    <p class="group__info-item-text">
    +998${element.teachers.phone_number}
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
    ${element.weeks.week_name}
    </p>
    </div>
    <div class="group__info-item-lessonbox">
    <span class="group__info-item-subtitle">
    Dars vaqti:
    </span>
    <p class="group__info-item-text">
    ${element.group_time_start}-${element.group_time_stop}
    </p>
    </div>
    <div class="group__info-item-lessonbox">
    <button class="group__info-edit-btn" data-id="${element.id}" data-bs-toggle="modal" data-bs-target="#staticBackdrop" type="button">Edit</button>
    <button class="group__info-delete-btn" data-id="${element.id}" type="button">Delete</button>
    </div>
    </div>
    </div>
    </li>
    `
  });
}