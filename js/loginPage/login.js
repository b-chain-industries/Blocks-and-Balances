var loginForm = $("#login");
loginForm.submit(function (event){
    // console.log("fired");
    
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
            console.log(data);

            if (!data.login) {
                err.innerHTML = data.error;
            }
            if (data.login) {
                err.innerHTML = "Logging in...";
                var base = {
                    id: data.userId,
                    token: data.token
                }
                var base = JSON.stringify(base);
                base = btoa(base);                
                
                window.location = "testPage.html?user="+base;
                
                
                
            }

        });
    }
});
