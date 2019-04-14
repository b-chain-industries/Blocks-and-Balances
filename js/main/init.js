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

    // console.log(data);
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
        statusNav.style.backgroundColor = "blue";
        statusNav.innerHTML =
        `<div id="initTab" class="tab" onclick="getViewport('test1')">child tab 1</div>
         <div class="tab" onclick="getViewport('test2')">child tab 2</div>
         <div class="tab" onclick="getViewport('test3')">child tab 3</div>
          <div class="tab" onclick="getViewport('test4')">child tab 4</div>
          <div class="tab" onclick="getViewport('messenger')">child messenger</div>`;
    } else {
        statusNav.style.backgroundColor = "green";
        statusNav.innerHTML =
        `<div id="initTab" class="tab" onclick="getViewport('test1')">master tab 1</div>
         <div class="tab" onclick="getViewport('test2')">master tab 2</div>
         <div class="tab" onclick="getViewport('test3')">master tab 3</div>
          <div class="tab" onclick="getViewport('test4')">master tab 4</div>
          <div class="tab" onclick="getViewport('messenger')">master messenger</div>`;
    }
}
