var registerForm = $("#register");
registerForm.submit(function (event){
    event.preventDefault();

    var err = document.getElementById('regError');
    var user = document.getElementById('userReg').value;
    var pass = document.getElementById('passReg').value;
    var status = $('input[name=status]:checked', registerForm).val();
    var childUsername = document.getElementById('childUsername').value;

// if status is child then childUsername must be null
    if (status === "child") {
        childUsername = null;
    }
// form validation
    if (user === "" || user === "")
    {
        err.innerHTML = "Please fill out all fields!";
    }
    else if (status === "master" && childUsername === "")
    {
        err.innerHTML = "Your child's username is required!";
    }
    else
    {
        var params = {
            user: user,
            pass: pass,
            status: status,
            childUsername: childUsername
        }

        $.post("http://blocksandbalancesserver.000webhostapp.com/user/register.php", params, function(data){
            data = JSON.parse(data);
            console.log(data);
            if (!data.register) {
                err.innerHTML = data.error;
            }
            if (data.register) {
                err.innerHTML = "Registering...";
                window.location = "testPage.html?id="+data.userId;
            }
        });
    }


});
