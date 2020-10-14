class User{
    constructor(name,surname,email,date){
        this.name = name;
        this.surname = surname;
        this.email = email;
        this.date = date;
    }
}

function addUser(){
    var form = document.getElementById("form-add-user");

    if(validateEmail(form.email.value)){
    var user = new User(
        form.name.value,
        form.surname.value,
        form.email.value,
        getToday()
        );

    var table = document.getElementById("table-users");

    var row = table.insertRow(table.getElementsByTagName("tr").length);

    var name = row.insertCell(0);
    var surname = row.insertCell(1);
    var email = row.insertCell(2);
    var date = row.insertCell(3);
    var editBtnCell = row.insertCell(4)
    var deleteBtnCell = row.insertCell(5);
    var flagCell = row.insertCell(6);
   

    name.innerHTML = user.name;
    surname.innerHTML = user.surname;
    email.innerHTML = user.email;
    date.innerHTML = user.date;
    
    var deleteBtn = document.createElement("button");
    deleteBtn.innerHTML = "Delete";
    deleteBtn.className = "delete-table-user-btn"
    deleteBtn.addEventListener("click",function(){
        deleteUser(row);
    },false)
    deleteBtnCell.appendChild(deleteBtn);

    var editBtn = document.createElement("button");
    editBtn.innerHTML = "Edit";
    editBtn.className = "edit-table-user-btn"
    editBtn.addEventListener("click",function(){
        generateEditWindow(row);
    },false)
    editBtnCell.appendChild(editBtn);

    var flag = document.createElement("input")
    flag.type = "checkbox";
    flagCell.appendChild(flag);

    }else{
        alert(form.email.value != "" ? form.email.value  + " is not valid" : "email is not valid")
        form.email.focus();
    }
}

function editUser(row){
    row.cells[0].innerHTML = document.getElementById("editName").value;
    row.cells[1].innerHTML = document.getElementById("editSurname").value;
    row.cells[2].innerHTML = document.getElementById("editEmail").value;
    closeEditWindow();
}

function deleteUser(row){
    row.remove();
}

function deleteMultipleRows(){
    var rows = document.getElementById("table-users").rows;

    for(let i = rows.length - 1;i >= 0;i--){
        if(rows[i].cells[6].firstChild.checked){
            rows[i].remove();
        }
    }
}



function getToday(){
    var today = new Date();

    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); 
    var yyyy = today.getFullYear();

    today = mm + '/' + dd + '/' + yyyy;
    return today;
}

function validateEmail(email) { 
    //this method is copied from https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}


function generateEditWindow(row){
    var background = document.createElement("div");
    background.id = "background";
    background.className = "background";
    background.addEventListener("click",closeEditWindow,false);

    var window = document.createElement("div");
    window.className = "window";


    for(let i = 0;i < 3;i++){
        var container = document.createElement("div");
        container.className = "edit-window-input-container";

        var inputTitel = document.createElement("div");
        inputTitel.innerHTML = document.getElementById("thead-users").rows[0].cells[i].innerHTML;

        var input = document.createElement("input");
        input.id = "edit" + document.getElementById("thead-users").rows[0].cells[i].innerHTML;
        input.value = row.cells[i].innerHTML;

        container.appendChild(inputTitel);
        container.appendChild(input);
        window.appendChild(container);
    }       

    var closeButton = document.createElement("button");
    closeButton.className = "close-button";
    closeButton.innerHTML = "Close";

    var editBtn = document.createElement("button");
    editBtn.className = "edit-button";
    editBtn.innerHTML = "Edit";
    editBtn.addEventListener("click",function(){
        if(validateEmail(document.getElementById("editEmail").value)){
            editUser(row);
        }else{
            alert(document.getElementById("editEmail").value != "" ? document.getElementById("editEmail").value  + " is not valid" : "email is not valid")
            document.getElementById("editEmail").focus();
        }
        
    },false);

    window.appendChild(editBtn);
    window.appendChild(closeButton);
    background.appendChild(window);
    var body = document.getElementById("body");
    body.appendChild(background);
    body.classList.add("stop-scrolling");
}

function closeEditWindow(element){
    //bug 2 if
    if(element){
        if(element.path[0].className == "background" || element.path[0].className == "close-button"){
            document.getElementById("background").remove();
            body.classList.remove("stop-scrolling");
        }
    }
    else{
        document.getElementById("background").remove();
        body.classList.remove("stop-scrolling");
    }
}