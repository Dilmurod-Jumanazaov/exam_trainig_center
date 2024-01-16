const elHeroMenuItem = document.querySelectorAll(".js-hero-menu-item");
const elTeacherForm = document.querySelector(".js-teacher-info-form");
const elTeacherFormSurnameInput = elTeacherForm.querySelector(".js-teacher-form-surname-input");
const elTeacherFormNameInput = elTeacherForm.querySelector(".js-teacher-form-name-input");
const elTeacherFormAgeInput = elTeacherForm.querySelector(".js-teacher-form-age-input");
const elTeacherFormPhoneInput = elTeacherForm.querySelector(".js-teacher-form-phone-input");
const elTeacherFormImageInput = elTeacherForm.querySelector(".js-teacher-form-image-input");
const elTeacherFormSubjectSelect = elTeacherForm.querySelector(".js-teacher-form-select");
const elTeacherSubjectSelect = elTeacherForm.querySelector(".js-teacher-form-select");
const elTeacherFormInputTitles = elTeacherForm.querySelectorAll(".teacher-form-input-title");
const elTeacherFormImageLabel = elTeacherForm.querySelector(".js-image-label");
const elTeacherTableBody = document.querySelector(".js-teacher-table-body");
const elTeacherModalForm = document.querySelector(".js-modal-form");
const elTeacherModalFormNameInput = document.querySelector(".js-modal-form-name-input");
const elTeacherModalFormAgeInput = document.querySelector(".js-modal-form-age-input");
const elTeacherModalFormImageInput = document.querySelector(".js-modal-form-image-label");


if(window.location.href == "http://127.0.0.1:5500/teacher.html") {
if (elHeroMenuItem[3].textContent.trim() == "O’qtuvchilar") {
  elHeroMenuItem[3].classList.add("hero__menu-item-active");
}
};

// teachers form submit
elTeacherForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  
  
  // if(elTeacherFormSurnameInput.value == "") {
  //   elTeacherFormInputTitles[0].classList.add("error-text");
  //   elTeacherFormSurnameInput.classList.add("error-input");
  //   return
  // } else {
  //   elTeacherFormInputTitles[0].classList.remove("error-text");
  //   elTeacherFormSurnameInput.classList.remove("error-input");
  // }
  // if(elTeacherFormNameInput.value == "") {
  //   elTeacherFormInputTitles[1].classList.add("error-text");
  //   elTeacherFormNameInput.classList.add("error-input");
  //   return
  // } else {
  //   elTeacherFormInputTitles[1].classList.remove("error-text");
  //   elTeacherFormNameInput.classList.remove("error-input");
  // }
  // if(elTeacherFormAgeInput.value == "") {
  //   elTeacherFormInputTitles[2].classList.add("error-text");
  //   elTeacherFormAgeInput.classList.add("error-input");
  //   return
  // } else {
  //   elTeacherFormInputTitles[2].classList.remove("error-text");
  //   elTeacherFormAgeInput.classList.remove("error-input");
  // }
  // if(elTeacherFormPhoneInput.value == "") {
  //   elTeacherFormInputTitles[3].classList.add("error-text");
  //   elTeacherFormPhoneInput.classList.add("error-input");
  //   return
  // } else {
  //   elTeacherFormInputTitles[3].classList.remove("error-text");
  //   elTeacherFormPhoneInput.classList.remove("error-input");
  // }
  // if(elTeacherFormImageInput.value == "") {
  //   elTeacherFormInputTitles[4].classList.add("error-text");
  //   elTeacherFormImageLabel.classList.add("error-input");
  //   return
  // } else {
  //   elTeacherFormInputTitles[4].classList.remove("error-text");
  //   elTeacherFormImageLabel.classList.remove("error-input");
  // }
  // if(elTeacherFormSubjectSelect.value == "Select a subject") {
  //   elTeacherFormInputTitles[5].classList.add("error-text");
  //   elTeacherFormSubjectSelect.classList.add("error-input");
  //   return
  // } else {
  //   elTeacherFormInputTitles[5].classList.remove("error-text");
  //   elTeacherFormSubjectSelect.classList.remove("error-input");
  // }
  
  let formData = new FormData();
  formData.append("first_name",elTeacherFormNameInput.value);
  formData.append("last_name",elTeacherFormSurnameInput.value);
  formData.append("age",elTeacherFormAgeInput.value);
  formData.append("phone_number", elTeacherFormPhoneInput.value.toString());
  formData.append("subject_id",elTeacherSubjectSelect.value);
  formData.append("img",elTeacherFormImageInput.files[0]);

  console.log(elTeacherFormImageInput.files[0]);
  
  createTeacher(`http://localhost:9090/teacher/create`,formData);
  
  elTeacherFormSurnameInput.value = "";
  elTeacherFormNameInput.value = "";
  elTeacherFormPhoneInput.value = "";
  elTeacherFormAgeInput.value = "";
  elTeacherFormSubjectSelect.value = "Select a subject";
  // elTeacherFormImageInput.files[0] = "";
})

// this function for create teacher
function createTeacher(url,data) {
  fetch(url, {
    method: "POST",
    headers: {},
    body: data, 
  })
  .then(response => response.json())
  .then(data => {
    console.log(data);
    if(data) {
      getTeacher(`http://localhost:9090/all-teacher`);
    }
  })
}

// this function for get teachers
function getTeacher(url) {
  fetch(url, {
    method: "GET",
    headers: {
      
    },
  })
  .then(response => response.json())
  .then(data => {
    console.log(data);
    renderTeacher(data.data,elTeacherTableBody);
  })
};
getTeacher(`http://localhost:9090/all-teacher`);

// this function for render teachers
function renderTeacher(array,node) {
  node.innerHTML = "";
  
  array.forEach(element => {
    const newTeacherTableBodyRow = document.createElement("tr");
    const newTeacherId = document.createElement("td");
    const newTeacherFullname = document.createElement("td");
    const newTeacherPhone = document.createElement("td");
    const newTeacherDrift = document.createElement("td");
    const newTeacherAge = document.createElement("td");
    const newTeacherBtnBox = document.createElement("td");
    const newEditBtn = document.createElement("button");
    const newDeleteBtn = document.createElement("button");
    
    newTeacherTableBodyRow.classList.add("teacher-table__body-row");
    newTeacherId.classList.add("teacher-table__body-text");
    newTeacherFullname.classList.add("teacher-table__body-text");
    newTeacherPhone.classList.add("teacher-table__body-text");
    newTeacherDrift.classList.add("teacher-table__body-text");
    newTeacherAge.classList.add("teacher-table__body-text");
    newEditBtn.classList.add("teacher-table__edit-btn");
    newDeleteBtn.classList.add("teacher-table__delete-btn");
    
    newTeacherId.textContent = element.id;
    newTeacherFullname.textContent = element.last_name+" "+element.first_name;
    newTeacherPhone.textContent = `+998${element.phone_number}`;
    newTeacherDrift.textContent = element.subjects.subject_name;
    newTeacherAge.textContent = element.age;
    newEditBtn.dataset.id = element.id;
    newEditBtn.setAttribute("data-bs-toggle","modal");
    newEditBtn.setAttribute("data-bs-target","#staticBackdrop");
    
    newDeleteBtn.dataset.id = element.id;
    
    newTeacherBtnBox.append(newEditBtn,newDeleteBtn);
    newTeacherTableBodyRow.append(newTeacherId,newTeacherFullname,newTeacherPhone,newTeacherDrift,newTeacherAge,newTeacherBtnBox);
    node.append(newTeacherTableBodyRow);
  });
}

// this function for get all subject
function getTeacherSubject(url) {
  fetch(url)
  .then(response => response.json())
  .then(data => {
    if(data.data) {
      data.data.forEach(element => {
        const newOption = document.createElement("option");
        newOption.classList.add("teacher-form-select-option");
        newOption.textContent = element.subject_name;
        newOption.value = element.id;
        
        elTeacherSubjectSelect.appendChild(newOption);
      });
    }
  })
}
getTeacherSubject(`http://localhost:9090/all-subject`);

// this function for edited teachers data
function updateTeacher(url,data) {
  fetch(url, {
    method: "PUT",
    headers: {},
    body: data,
  })
  .then(response => response.json())
  .then(data => {
    console.log(data);
  })
};

// this function for delete teacher
function deleteTeacher(url) {
  fetch(url, {
    method: "DELETE",
    headers: {},
  })
  .then(response => response.json())
  .then(data => {
    console.log(data);
    if(data.status == 200) {
      getTeacher(`http://localhost:9090/all-teacher`);
    }
  })
}


elTeacherTableBody.addEventListener("click", (evt) => {
  if(evt.target.matches(".teacher-table__edit-btn")) {
    const editTeacherId = evt.target.dataset.id;
    
    elTeacherModalForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
      
      let modalFormData = new FormData();
      modalFormData.append("first_name",elTeacherModalFormNameInput.value);
      modalFormData.append("age",elTeacherModalFormAgeInput.value.toString());
      modalFormData.append("img",elTeacherModalFormImageInput.files[0]); 
      
      updateTeacher(`http://localhost:9090/teacher/update/${editTeacherId}`,modalFormData);
    });

    elTeacherModalFormNameInput.value = "";
    elTeacherModalFormAgeInput.value = "";
    elTeacherModalFormImageInput.files[0] = "";
  };
  
  if(evt.target.matches(".teacher-table__delete-btn")) {
    const deleteTeacherId = evt.target.dataset.id;
    deleteTeacher(`http://localhost:9090/teacher/delete/${deleteTeacherId}`);
  }
})