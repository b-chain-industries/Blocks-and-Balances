
// function that send requests
function sendRequest(){
    // getting the amount select
    var selectAmount = document.getElementById('amountSelect');
    //getting the value of amount 
    var amount = selectAmount.options[selectAmount.selectedIndex].value;
    //getting the value of message
    var userDescriptoion = document.getElementById('requestDescription').value;
    // making an empty vaiable to set the status of each transaction
    var status = "";
    // making varibale for the radio button 
    var radioSelect = document.getElementsByName('masterSelect');
    // making a loop that gets which master sent the request to
    for (var i =0; i < radioSelect.length;i++){
        if (radioSelect[i].checked){

            status = radioSelect[i].value;
        }
        
    }
    //getting different parameters
    var params = {
        amount: amount,
        description: userDescriptoion,
        childId : user.id,
        relationId : user.relation_id,
        masterRequested : status,
    }
    //posting to data base to get response for the parameters
    $.post('http://blocksandbalancesserver.000webhostapp.com/transactions/addTransaction.php', params, function (data){

        getPending();
        
    })
    
}
//making function to process the request
function request(x){
    //comment variable plus the "x" for request ID
    var comment = document.getElementById('addComment'+x).value;

    //if comment is empty pop an alert

    if(comment == ""){
        alert("No comments added");
    }else{
        var params = {
            requestId:x,
            username:user.username,
            comment:comment,
        }
        $.post('http://blocksandbalancesserver.000webhostapp.com/transactions/addComment.php', params, function (data){
            
            getPending();
            
        });
    }
    
}

//function to hide the comments
function showComments(x){
    //targetting the elements with the argument
   var displayComment = $('#commentDisplay'+x);
   //getting the parameters of the array

   var params = {
        requestId:x,
        username:user.username,
    }

    //if display is none 
   if(displayComment.css("display") == "none"){
    //show the the elements
       displayComment.show();
      //otherwise hide the elements

   }else{
       displayComment.hide();
                     
    
   }
  

}





// function for pending requests
function getPending(){
    
    let params = {
        relationId : parseInt(user.relation_id),
        userId : parseInt(user.id),
    };
    console.log(user);
    //Posting user information from our data base to the browser
    $.post( "http://blocksandbalancesserver.000webhostapp.com/transactions/getTransactions.php", params, function( data ) {
        //clearing old HTML without refreshing the browsers
        document.getElementById('displayPending').innerHTML = "";
    // making the string to objects by using JSON.parse
    data = JSON.parse(data);
    // creating a loop to get the amount,description and status of the request
    data.forEach(element => {
        
        //displaying user and comment on browser
        // creating an empty variable
        var commentSection = "";
        //making a loop that goes through each comments
        element.comments.forEach(comment =>{
            //placing our information in html template
            var commentTemplate = 
            ` <div class="comment">
                <span>`+comment.username+`</span><br/>
                <span>`+comment.comment+`</span>
            </div>`;
            //setting comment section to comment template to place in the html format by adding one to it
            commentSection += commentTemplate;
        })
        //template is for placing Amount,description and status of user
        var template = `<div class="pending-holder">
        <div class="table pending">
            <div class="amount chart-section">
                <span>Amount: `+ element.pendingRequest.amount +`</span>
            </div>
            <div class="description chart-section">
                <span>`+element.pendingRequest.description+`</span>
            </div>
            <div class="status">
                <span>`+element.pendingRequest.master_approval+`</span><br/>
                <span>`+element.pendingRequest.miner_approval+`</span>
            </div>
        </div>
        <div class="comment-section">
            <span id="commentBtn">Comment</span>
            <div id="commentDisplay`+element.pendingRequest.request_id+`" class="displayComment">
               `+commentSection+`
            </div>
            <textarea id="addComment`+element.pendingRequest.request_id+`" placeholder="Write your comment"></textarea>
            <button onclick='request(`+element.pendingRequest.request_id+`)'>Submit</button>
            <button onclick='showComments(`+element.pendingRequest.request_id+`)'>comment</button>
        </div>
    </div>`
    // setting our information in our HTML file
    document.getElementById('displayPending').innerHTML += template;
    
    
    
    });

  });
}
