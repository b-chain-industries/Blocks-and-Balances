//
// Handling the register/login selection
//

// getting all elements involved in this process
var select = document.getElementById('select');
var login = document.getElementById('login');
var register = document.getElementById('register');

// onClick functions to display the desired section
function displayLogin(){
    select.style.display = "none";
    login.style.display = "block";
}
function displayRegister(){
    select.style.display = "none";
    register.style.display = "block";
}


//
// Handling the radio button section
//
var childUsername = document.getElementById('childUsername');

function masterClick(){
    childUsername.disabled = false;
}
function childClick(){
    childUsername.disabled = true;
}
