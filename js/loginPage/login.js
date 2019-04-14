var loginForm = $("#login");
loginForm.submit(function (event){
    event.preventDefault();

    var user = document.getElementById('user').value;
    var pass = document.getElementById('pass').value;
    var err = document.getElementById('logError');

    // checking if all inputs are filled out
    if (user === "" || pass === "") {
        err.innerHTML = "Username/Password is empty";
    }else{
        // if all inputs are filled out...
        err.innerHTML = "";
        var params = {
            user: user,
            pass: pass
        }

        $.post("http://blocksandbalancesserver.000webhostapp.com/user/login.php", params, function(data){
            data = JSON.parse(data);

            if (!data.login) {
                err.innerHTML = data.error;
            }
            if (data.login) {
                err.innerHTML = "Logging in...";
                window.location = "testPage.html?id="+data.userId;
                // console.log(data);
                
            }

        });
    }
});
