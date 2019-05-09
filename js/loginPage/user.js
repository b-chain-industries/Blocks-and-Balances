//
// Handling the register/login selection
//

// getting all elements involved in this process
var login = document.getElementById('login');
var register = document.getElementById('register');

// onClick functions to display the desired section

function displayRegister(){
    login.style.display = 'none';
    register.style.display = "block";    // select.style.display = "none";
    // register.style.display = "block";
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
