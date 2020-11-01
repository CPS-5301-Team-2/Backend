function showModel(name, username, email, phone, id, role){
    
    // Unescapes characters and sets null values to empty strings.
    name = ifNull(name);
    username = ifNull(username);
    email = ifNull(email);
    phone = ifNull(phone);
    id = ifNull(id);
    role = ifNull(role);
    console.log(name, username, email, phone, id, role);
    // Grabs model elements from front end
    var nameElement = document.getElementById("modelName");
    var usernameElement = document.getElementById("modelUsername");
    var emailElement = document.getElementById("modelEmail");
    var phoneElement = document.getElementById("modelPhone");
    var idElement = document.getElementById("modelID");
    var roleElement = document.getElementById("modelRole");
    var passwordElement = document.getElementById("modelPassword");

    // Sets input box values to users information
    nameElement.value = name;
    usernameElement.value = username;
    emailElement.value = email;
    phoneElement.value = phone;
    idElement.value = id;
    roleElement.value = role;
    passwordElement.value = "";

}

function ifNull(string){
    if(string === "null"){
        return "";
    }else{
        return unescape(string);
    }
}

function saveChanges(){

}

function deleteUser(){

    // Grabs model elements from front end
    var name = document.getElementById("modelName").value;
    var id = document.getElementById("modelID").value;

    if(window.confirm(`Delete user ${name}`)){
        // TODO create delete user endpoint
    }
}

function resetPassword(){
    var idElement = document.getElementById("modelID");
    var passwordElement = document.getElementById("modelPassword");
}