const elHeroMenuItem = document.querySelectorAll(".js-hero-menu-item");
const elSubjectForm = document.querySelector(".js-subject-form");
const elSubjectFormInput = document.querySelector(".js-subject-form-input");
const elSubjectTableBody = document.querySelector(".js-subject-table-body");
const elModalForm = document.querySelector(".js-modal-form");
const elModalFormInput = document.querySelector(".js-modal-form-input");
const elInputTitle = document.querySelector(".subject-form__input-title");
let editId = "";

// this code that identifies which menu you are in.
if(window.location.href == "https://exam-training-center.netlify.app/subject" || window.location.href == "http://127.0.0.1:5500/subject.html") {
if (elHeroMenuItem[4].textContent.trim() == "Fanlar") {
  elHeroMenuItem[4].classList.add("hero__menu-item-active");
}
};

// subject form 
elSubjectForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  
  if(elSubjectFormInput.value == "") {
    elInputTitle.classList.add("error-text");
    elSubjectFormInput.classList.add("error-input");
    elSubjectFormInput.style.border = "red";
    return;
  } else {
    elInputTitle.classList.remove("error-text");
    elSubjectFormInput.classList.remove("error-input");
  }
  
  createSubject(`http://localhost:9090/subject/create`,elSubjectFormInput.value);
  elSubjectFormInput.value = "";
});
elSubjectTableBody.style.display = "block";

// this function for create subject
function createSubject(url,subject) {
  fetch(url, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      subject_name: subject,
    }),
  })
  .then(response => response.json())
  .then(data => {
    if(data) {
      getSubject(`http://localhost:9090/all-subject`);
    }
  })
  .catch(error => {
    console.log(error);
  })
};

// this function for get subject
function getSubject(url) {
  fetch(url, {
    method: "GET",
    headers: {},
  })
  .then(response => response.json())
  .then(data => {
    // console.log(data.data);
    if(data.data) {
      renderSubject(data.data,elSubjectTableBody);
    }
  })
  .catch(error => {
    console.log(error);
  });
}
getSubject(`http://localhost:9090/all-subject`);

function renderSubject(array,node) {
  node.innerHTML = "";
  
  array.forEach(element => {
    const newTableBodyRow = document.createElement("tr");
    const newTableBodyText = document.createElement("td");
    const newTableBodyId = document.createElement("td");
    const newTableBodyBtnBox = document.createElement("td");
    const newEditBtn = document.createElement("button");
    const newDeleteBtn = document.createElement("button");
    
    newTableBodyRow.classList.add("subject-table__body-row");
    newTableBodyId.classList.add("subject-table__body-text-id");
    newTableBodyText.classList.add("subject-table__body-text");
    newEditBtn.classList.add("subject-table__edit-btn");
    newEditBtn.setAttribute("data-bs-toggle","modal");
    newEditBtn.setAttribute("data-bs-target","#staticBackdrop");
    newDeleteBtn.classList.add("subject-table__delete-btn");
    
    newTableBodyId.textContent = element.id;
    newTableBodyText.textContent = element.subject_name;
    newEditBtn.dataset.id = element.id;
    newDeleteBtn.dataset.id = element.id;
    
    newTableBodyBtnBox.append(newEditBtn,newDeleteBtn);
    newTableBodyRow.append(newTableBodyId,newTableBodyText,newTableBodyBtnBox);
    node.appendChild(newTableBodyRow);
  });
};


// this function for delete subject
function deleteSubject(url,id) {
  fetch(url + id, {
    method: "DELETE",
    headers: {},
  })
  .then(response => response.json())
  .then(data => {
    if(data.status == 200) {
      getSubject(`http://localhost:9090/all-subject`);
    }
  })
  .catch(error => {
    console.log(error);
  })
};

// this function for edit subject
function editSubject(url,id,value) {
  fetch(url + id, {
    method: "PUT",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      subject_name: value,
    })
  })
  .then(response => response.json())
  .then(data => {
    console.log(data);
    if(data.status == 200) {
      getSubject(`http://localhost:9090/all-subject`);
    }
  })
  .catch(error => {
    console.log(error);
  })
}

elSubjectTableBody.addEventListener("click", (evt) => {
  // delete
  if(evt.target.matches(".subject-table__delete-btn")) {
    const subjectId = evt.target.dataset.id;
    deleteSubject(`http://localhost:9090/subject/delete/`,subjectId);
  };
  
  // edit
  if(evt.target.matches(".subject-table__edit-btn")) {
    editId = evt.target.dataset.id;
  }
});

//  modal form submit code
elModalForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  
  editSubject(`http://localhost:9090/subject/update/`,editId,elModalFormInput.value);

  elModalFormInput.value = "";
});