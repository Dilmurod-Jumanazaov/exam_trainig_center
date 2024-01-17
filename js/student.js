const elHeroMenuItem = document.querySelectorAll(".js-hero-menu-item");
const elStudentForm = document.querySelector(".student__form");
const elStudentSurnameInput = document.querySelector(".js-student__form-surname-input");
const elStudentNameInput = document.querySelector(".js-student__form-name-input");
const elStudentPhoneInput = document.querySelector(".js-student__form-phone-input");
const elStudentParentNameInput = document.querySelector(".js-student__form-parents-input");
const elStudentParentPhoneInput = document.querySelector(".js-student__form-parents-phone-input");
const elStudentAgeInput = document.querySelector(".js-student__form-age-input");
const elStudentGroupSelect = document.querySelector(".js-student-form-select");
const elStudentTableBody = document.querySelector(".table-body");
const elModalForm = document.querySelector(".js-modal-form");
const elModalNameInput = document.querySelector(".js-modal-form-name-input");
const elModalSurnameInput = document.querySelector(".js-modal-form-surname-input");
const elModalAgeInput = document.querySelector(".js-modal-form-age-input");
const elModalPhoneInput = document.querySelector(".js-modal-form-phone-input");
const elFormInputText = document.querySelectorAll(".student__form-input-title");


if(window.location.href == "http://127.0.0.1:5500/student.html") {
  if (elHeroMenuItem[1].textContent.trim() == "O’quvchilar") {
    elHeroMenuItem[1].classList.add("hero__menu-item-active");
  }
}
elHeroMenuItem[0].classList.remove("hero__menu-item-active");

// student form
elStudentForm.addEventListener("submit", (evt) => {
  evt.preventDefault();

  let formData = new FormData();
  formData.append("first_name",elStudentNameInput.value);
  formData.append("last_name",elStudentSurnameInput.value);
  formData.append("age",elStudentAgeInput.value);
  formData.append("phone_number",elStudentPhoneInput.value);
  formData.append("parent_name",elStudentParentNameInput.value);
  formData.append("parent_phone_number",elStudentParentPhoneInput.value);
  formData.append("group_id",elStudentGroupSelect.value);

  if(elStudentSurnameInput.value == "") {
    elFormInputText[0].classList.add("error-text");
    elStudentSurnameInput.classList.add("error-input");
    return;
  } else {
    elFormInputText[0].classList.remove("error-text");
    elStudentSurnameInput.classList.remove("error-input");
  }
  if(elStudentNameInput.value == "") {
    elFormInputText[1].classList.add("error-text");
    elStudentNameInput.classList.add("error-input");
    return;
  } else {
    elFormInputText[1].classList.remove("error-text");
    elStudentNameInput.classList.remove("error-input");
  }
  if(elStudentPhoneInput.value == "") {
    elFormInputText[2].classList.add("error-text");
    elStudentPhoneInput.classList.add("error-input");
    return;
  } else {
    elFormInputText[2].classList.remove("error-text");
    elStudentPhoneInput.classList.remove("error-input");
  }
  if(elStudentParentNameInput.value == "") {
    elFormInputText[3].classList.add("error-text");
    elStudentParentNameInput.classList.add("error-input");
    return;
  } else {
    elFormInputText[3].classList.remove("error-text");
    elStudentParentNameInput.classList.remove("error-input");
  }
  if(elStudentParentPhoneInput.value == "") {
    elFormInputText[4].classList.add("error-text");
    elStudentParentPhoneInput.classList.add("error-input");
    return;
  } else {
    elFormInputText[4].classList.remove("error-text");
    elStudentParentPhoneInput.classList.remove("error-input");
  }
  if(elStudentAgeInput.value == "") {
    elFormInputText[5].classList.add("error-text");
    elStudentAgeInput.classList.add("error-input");
    return;
  } else {
    elFormInputText[5].classList.remove("error-text");
    elStudentAgeInput.classList.remove("error-input");
  }
  if(elStudentGroupSelect.value == "Select a group") {
    elFormInputText[6].classList.add("error-text");
    elStudentGroupSelect.classList.add("error-input");
    return;
  } else {
    elFormInputText[6].classList.remove("error-text");
    elStudentGroupSelect.classList.remove("error-input");
  }

  createStudent(`http://localhost:9090/student/create`,formData);
});

elStudentNameInput.value = "";
elStudentSurnameInput.value = "";
elStudentAgeInput.value = "";
elStudentPhoneInput.value = "";
elStudentParentNameInput.value = "";
elStudentParentPhoneInput.value = "";
elStudentGroupSelect.value = "Select a group";

// render student function
function renderStudent(array,node) {
  node.innerHTML = "";

  array.forEach(element => {
    node.innerHTML += `
    <tr class="tabel-body__row">
    <td class="table-body__text">
      ${element.id}
    </td>
    <td class="table-body__text">
      ${element.last_name} ${element.first_name}
    </td>
    <td class="table-body__text">
      +998${element.phone_number}
    </td>
    <td class="table-body__text">
      ${element.group_name}
    </td>
    <td class="table-body__text">
      ${element.parent_name}
    </td>
    <td class="table-body__text">
      +998${element.parent_phone_number}
    </td>
    <td class="table-body__text">
      <button class="table-body__edit-btn" data-bs-toggle="modal" data-bs-target="#staticBackdrop" data-id="${element.id}" type="button"></button>
      <button class="table-body__delete-btn" data-id="${element.id}" type="button"></button>
    </td>
  </tr>
    `
  });
}

// create student
function createStudent(url,data) {
  fetch(url, {
    method: "POST",
    headers: {},
    body: data,
  })
  .then(response => response.json())
  .then(data => {
    console.log(data);
    if(data.data) {
      getStudent(`http://localhost:9090/all-student`);
    }
  })
  .catch(error => {
    console.log(error);
  })
}

// get all student
function getStudent(url) {
  fetch(url)
  .then(response => response.json())
  .then(data => {
    console.log(data);
  })
  .catch(error => {
    console.log(error);
  })
}
getStudent(`http://localhost:9090/all-student`);

// delete student
function deleteStudent(url,id) {
  fetch(url + id, {
    method: "DELETE",
    headers: {},
  })
  .then(response => response.json())
  .then(data => {
    console.log(data);
    if(data.status == 200) {
      getStudent(`http://localhost:9090/all-student`);
    }
  })
  .catch(error => {
    console.log(error);
  })
};

// update student
function updateStudent(url,id,data) {
  fetch(url + id, {
    method: "PUT",
    headers: {},
    body: data,
  })
  .then(response => response.json())
  .then(data => {
    console.log(data);
    if(data.status == 200) {
      getStudent(`http://localhost:9090/all-student`);
    }
  })
  .catch(error => {
    console.log(error);
  })
}

// get all group
function getAllGroup(url) {
  fetch(url)
  .then(response => response.json())
  .then(data => {
    renderGroup(data.data,elStudentGroupSelect);
  })
};

// render group function
function renderGroup(array,node) {
  array.forEach(element => {
    const newOption = document.createElement("option");
    newOption.textContent = element.group_name;
    newOption.value = element.id;

    node.appendChild(newOption);
  });
}

// table body
elStudentTableBody.addEventListener("click", (evt) => {
  if(evt.target.matches(".table-body__edit-btn")) {
    const editStudentId = evt.target.dataset.id;
    
    let modalFormData = new FormData();
    modalFormData.append("first_name",elModalNameInput.value);
    modalFormData.append("last_name",elModalSurnameInput.value);
    modalFormData.append("age",elModalAgeInput.value);
    modalFormData.append("phone_number",elModalPhoneInput.value);

    updateStudent(`http://localhost:9090/student/update/`,editStudentId,modalFormData);
  }
  elModalNameInput.value = "";
  elModalSurnameInput.value = "";
  elModalAgeInput.value = "";
  elModalPhoneInput.value = "";

  if(evt.target.matches(".table-body__delete-btn")) {
    const deleteStudentId = evt.target.dataset.id;

    deleteStudent(`http://localhost:9090/student/delete/`,deleteStudentId);
  }
})