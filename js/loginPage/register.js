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

//child input prop selecter
var $master = $('#master').prop();
var $childUser = $('#childUsername').prop();
var $child = $('#child');

if($master.prop('checked',true)){
    $childUser.prop('disabled', true);
              
}else {
    $childUser.prop('disabled', false);
}

//backbutton function

function goBackBtn(){
    console.log('click')
    window.location.replace('index.html');
}

// if($master.prop('checked') == true){
//     $childUser.css('display','block');
// }else  if($child.prop('checked') == true){
//     $childUser.css('display','none');
// }else{
//     $childUser.css('disabled',true);
// }