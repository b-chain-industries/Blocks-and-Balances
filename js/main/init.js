// Retrieves GET parameters
var getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = window.location.search.substring(1),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
        }
    }
};


var userParams = atob(getUrlParameter('user'));
userParams = JSON.parse(userParams);
console.log(userParams);


var userId = uid = parseInt(userParams.id);
var userToken = userParams.token;

$.post("http://blocksandbalancesserver.000webhostapp.com/user/getUser.php", {id: userId, token: userParams.token}, function(data){
    console.log(data);
    
    data = JSON.parse(data);
    user = data;
    
    if (data.token !== userToken){
        window.location = "index.html";
        
    }

    // elements to populate
    var userDisplay = document.getElementById('usernameDisplay');
    var statusNav = document.getElementById('statusNav');
    var balance = document.getElementById('balance');

    var username = data.username;
    userDisplay.innerHTML = username.charAt(0).toUpperCase()+username.slice(1);
    
    // var $firstLetter = usernameDisplay.charAt[0].
    // var firstLetterUppercase = usernameDisplay.charAt(0).toUpperCase();
    balance.innerHTML = data.balance;

    // initialize the correct nav
    initNav(data.status);

    // initial viewport when the page is first loaded
    $('#initTab').trigger("click");

});

// sets the user with the nav bar associated with their account status
function initNav(status){
    if (status == 0) {
        statusNav.innerHTML =
        `<div id="initTab" class="tab" onclick="getViewport('childRequest')"><i class="fas fa-exchange-alt"></i>Requests</div>
        <div class="tab" onclick="getViewport('transHist')"><i class="fas fa-chart-bar"></i>Transaction History</div>
         <div class="tab" onclick="getViewport('messenger')"><i class="fas fa-comment"></i>Messenger</div>`;
    } else {
        statusNav.innerHTML =
        `<div id="initTab" class="tab" onclick="getViewport('masterRequest')"><i class="fas fa-exchange-alt"></i>Requests</div>
        <div class="tab" onclick="getViewport('transHist')"><i class="fas fa-chart-bar"></i>Transaction History</div>
         <div class="tab" onclick="getViewport('messenger')"><i class="fas fa-comment"></i>Messenger</div>`;
    }
}
