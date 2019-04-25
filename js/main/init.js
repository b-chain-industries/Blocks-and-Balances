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




var userId = uid = getUrlParameter('id');

$.post("http://blocksandbalancesserver.000webhostapp.com/user/getUser.php", {id: userId}, function(data){
    data = JSON.parse(data);
    user = data;

    // elements to populate
    var userDisplay = document.getElementById('usernameDisplay');
    var statusNav = document.getElementById('statusNav');
    var balance = document.getElementById('balance');


    usernameDisplay.innerHTML = data.username;
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
        `<div id="initTab" class="tab" onclick="getViewport('childRequest')">Requests</div>
        <div class="tab" onclick="getViewport('transHist')">Transaction History</div>
         <div class="tab" onclick="getViewport('messenger')">Messenger</div>`;
    } else {
        statusNav.innerHTML =
        `<div id="initTab" class="tab" onclick="getViewport('masterRequest')">Requests</div>
        <div class="tab" onclick="getViewport('transHist')">Transaction History</div>
         <div class="tab" onclick="getViewport('messenger')">Messenger</div>`;
    }
}
