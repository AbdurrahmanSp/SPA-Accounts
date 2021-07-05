window.addEventListener('beforeunload', save);

let accountsTableBody = document.querySelector('#accounts-table-body');
//let accountsViewBtn = document.querySelector('[href="accounts-view"]');
//let addAccountsViewBtn = document.querySelector('[href="add-account-view"]');
let allLinks = document.querySelectorAll('.nav-link');
let accountsView = document.querySelector('#accounts-view');
let addAccountView = document.querySelector('#add-account-view');
let views = document.querySelectorAll('.view');
let idInput = document.querySelector('[placeholder = "id"]');
let nameInput = document.querySelector('[placeholder = "name"]');
let lastnameInput = document.querySelector('[placeholder = "lastname"]');
let emailInput = document.querySelector('[placeholder = "email"]');
let phoneInput = document.querySelector('[placeholder = "phone"]');
let addSaveBtn = document.querySelector('#add-save');
let formControl = document.querySelector('.form-control');
let editId = document.querySelector('.edit-id');
let editName = document.querySelector('.edit-name');
let editLastname = document.querySelector('.edit-lastname');
let editEmail = document.querySelector('.edit-email');
let editPhone = document.querySelector('.edit-phone');
let editSaveBtn = document.querySelector('#edit-save');
let id;

addSaveBtn.addEventListener('click', saveAccount);
editSaveBtn.addEventListener('click', saveEditedAccount)

function saveAccount() {
    const newAccount = {
        id: idInput.value,
        name: nameInput.value,
        lastname: lastnameInput.value,
        email: emailInput.value,
        phone: phoneInput.value
    }

    db.push(newAccount);
    idInput.value = '';
    nameInput.value = '';
    lastnameInput.value = '';
    emailInput.value = '';
    phoneInput.value = '';
    createAccountsTable();
    showView("#accounts-view");
}

function saveEditedAccount() {
    const editedAccount = {
        id: editId.value,
        name: editName.value,
        lastname: editLastname.value,
        email: editEmail.value,
        phone: editPhone.value
    }

    db[id] = editedAccount;
    console.log(db[id]);
    createAccountsTable();
    showView("#accounts-view")
}


for (let i = 0; i < allLinks.length; i++) {
    allLinks[i].addEventListener('click', showView);

}

function showView(e) {
    for (let i = 0; i < views.length; i++) {
        views[i].style.display = 'none';
    }
    if (e instanceof Event) {
        e.preventDefault();
        let id = `#${this.getAttribute("href")}`;
        document.querySelector(id).style.display = 'block';
    } else {
        document.querySelector(e).style.display = 'block';
    }
}

/*
//Manual add click listener

addAccountsViewBtn.addEventListener('click', function(e) {
    e.preventDefault();
    addAccountView.style.display = 'block';
    accountsView.style.display = 'none';
})

accountsViewBtn.addEventListener('click', function(e) {
    e.preventDefault();
    addAccountView.style.display = 'none';
    accountsView.style.display = 'block';
})
*/

createAccountsTable();

function createAccountsTable() {
    let html = ``;
    for (let i = 0; i < db.length; i++) {
        const account = db[i];
        html += `
        <tr>
            <td>${account.id}</td>
            <td>${account.name}</td>
            <td>${account.lastname}</td>
            <td>${account.email}</td>
            <td>${account.phone}</td>
            <td><button data-id="${i}" class=" edit-btn btn-sm btn-warning form-control">Edit</button></td>
            <td><button data-id="${i}" class=" delete-btn btn-sm btn-danger form-control">Delete</button></td>
            
        </tr>`
    }

    accountsTableBody.innerHTML = html;
    let allDeleteBtns = document.querySelectorAll('.delete-btn');
    let allEditBtns = document.querySelectorAll('.edit-btn');

    for (let i = 0; i < allDeleteBtns.length; i++) {
        allDeleteBtns[i].addEventListener('click', deleteAccount);
        allEditBtns[i].addEventListener('click', editAccount);

    }
}

function deleteAccount() {
    let id = this.getAttribute('data-id');
    db.splice(id, 1)
    createAccountsTable();
    showView('#accounts-view');
}


function editAccount() {
    id = this.getAttribute('data-id');
    let selectedAccount = db[id];
    editId.value = selectedAccount.id;
    editName.value = selectedAccount.name;
    editLastname.value = selectedAccount.lastname;
    editEmail.value = selectedAccount.email;
    editPhone.value = selectedAccount.phone;
    showView('#edit-account-view')
}

function save() {
    localStorage.db = JSON.stringify(db);
}


