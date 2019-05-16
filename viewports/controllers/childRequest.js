
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
        childId : user.ID,
        relationId : user.relation_id,
        masterRequested : status,
    }

    $("#requestLoader").css("display","flex");
    $("#requestSubmit").hide();
    console.log(params);
    //posting to data base to get response for the parameters
    $.post('http://blocksandbalancesserver.000webhostapp.com/transactions/addTransaction.php', params, function (data){

        getPending();
        $('#requestDescription').val('');
        $(radioSelect).prop('checked',false);
        $('#amountSelect').prop('selectedIndex',0)
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
        document.getElementById("commentSubmit"+x).style.display = "none";
        document.getElementById("loader"+x).style.display = "block";
        var params = {
            requestId:x,
            username:user.username,
            comment:comment,
        }
        
        
        $.post('http://blocksandbalancesserver.000webhostapp.com/transactions/addComment.php', params, function (data){
            
            getPending(x);
        
        });
    }
    
}

//function to hide the comments
function showComments(x){
    
    //targetting the elements with the argument
//    var displayComment = $('#commentDisplay'+x);
    var $commentHolder = $('#commentHolder'+x);
   
   // getting comment section to toggle
   var $addCommentBtn = $('#addComment'+x);
   //comment section toggle
   var $commentSection = $('#commentSection'+x)
   
   // arrow button rotate
  
    

   function AnimateRotate(d,s){
    var $arrow = $('#arrow'+x);
    $({deg: s}).animate({deg: d}, {
        duration: 500,
        step: function(now){
            $arrow.css({
                 transform: "rotate(" + now + "deg)"
            });
        }
    });
}
   
    //getting the parameters of the array
   var params = {
        requestId:x,
        username:user.username,
    }
    //display of comment holder
    if($commentHolder.css('display') == 'none'){
        $commentHolder.slideToggle();
        $commentHolder.css('display','flex');
        AnimateRotate(90,-90);
    }else{
        $commentHolder.hide();
        AnimateRotate(-90,90);
    }
    //display of comment section
    if($commentSection.css('display') == 'none'){
        $commentSection.slideToggle();
    }else{
        $commentSection.hide();
    }

    scrollToBottom(x);
    //display of add comment button
//    if($addCommentBtn.css('display') == "none"){
//          $addCommentBtn.slideToggle();
//    }else{
//         $addCommentBtn.hide();
//    }
   
}

function scrollToBottom(x){
    var element = document.getElementById("commentDisplay"+x);
    element.scrollTop = element.scrollHeight;

    console.log(x);
    
};


function childApproved(x){
    $("#childApprovalSubmit"+x).hide();
    $("#childApprovalLoader"+x).show();
    var params ={
        requestId:x
    }
    $.post('http://blocksandbalancesserver.000webhostapp.com/transactions/childApproval.php',params,function(data){
        getPending();
    })
}


// function for pending requests
function getPending(x){
    
    let master1 = "";
    let master2 = "";

    

    $.post("http://blocksandbalancesserver.000webhostapp.com/user/getRelations.php", {relationId: user.relation_id}, function(data){
        data=JSON.parse(data);
        
        master1 = data.master1.username;
        $("#master1Display").html(master1);
        master2 = data.master2.username;
        $("#master2Display").html(master2);
    
        let params = {
            relationId : parseInt(user.relation_id),
            userId : parseInt(user.ID),
        };
        
        //Posting user information from our data base to the browser
        $.post( "http://blocksandbalancesserver.000webhostapp.com/transactions/getTransactions.php", params, function( data ) {
        //border display
        var $border = $('#border-show');
        $border.show(); 
        //clearing old HTML without refreshing the browsers
            document.getElementById('displayPending').innerHTML = "";
        // making the string to objects by using JSON.parse
        data = JSON.parse(data);
        if(data.length === 0){
            var template = `You get nothing! You lose! Good Day Sir!!!`;
            document.getElementById('displayPending').innerHTML = template;
        }else{

            // creating a loop to get the amount,description and status of the request
            data.forEach(element => {

                //displaying user and comment on browser
                // creating an empty variable
                var commentSection = "";
                //making a loop that goes through each comments
                element.comments.forEach(comment =>{
                    var commentPos = "";
                    if(comment.username === user.username){
                        commentPos = "comment-position";
                    }

                    //placing our information in html template
                    var commentTemplate = 
                    ` <div class="comment">
                        <span class="`+commentPos+` comment-color">`+comment.username+`</span><br/>
                        <span class="`+commentPos+`">`+comment.comment+`</span>
                    </div>`;
                    console.log(commentTemplate);
                    
                    console.log(comment.username)
                    console.log(user.username)

                    
                    //setting comment section to comment template to place in the html format by adding one to it
    
                    commentSection += commentTemplate;
                });
              
                //displaying status for master
                if(element.pendingRequest.master_approval == "0"){
                    element.pendingRequest.master_approval = "Denied"
                }else if(element.pendingRequest.master_approval == "1"){
                    element.pendingRequest.master_approval = "Approved"
                }else if(element.pendingRequest.master_approval == null){
                    element.pendingRequest.master_approval = "Pending"
                }
                //displaying status for miner
                if(element.pendingRequest.miner_approval == "0"){
                    element.pendingRequest.miner_approval = "Denied"
                }else if(element.pendingRequest.miner_approval == "1"){
                    element.pendingRequest.miner_approval = "Approved"
                }else if(element.pendingRequest.miner_approval == null){
                    element.pendingRequest.miner_approval = "Pending"
                }
                //approvalhtml is for to place the transaction status
                let approvedHtml = 
                `<span id="statusDisplay">`+master1+": "+element.pendingRequest.master_approval+`</span><br/>
                <span id="statusDisplay">`+master2+": "+element.pendingRequest.miner_approval+`</span>`
                //child approval
                if(element.pendingRequest.master_approval =="Approved" && element.pendingRequest.miner_approval == "Approved"){
    
                    approvedHtml += `<button id="childApprovalSubmit`+element.pendingRequest.request_id+`" class="approve-button" onclick="childApproved(`+element.pendingRequest.request_id+`)">Approve</button>
                                    <div id="childApprovalLoader`+element.pendingRequest.request_id+`" class="loaderWrapper">
                                        <div class="loading">
                                        <div class="loading-element"></div>
                                        <div class="loading-element"></div>
                                        <div class="loading-element"></div>
                                        <div class="loading-element"></div>
                                    </div></div>`;
    
                }

                let showComments = "";
                if(x == element.pendingRequest.request_id){
                    showComments = "showComments";
                }
                

                //template is for placing Amount,description and status of user
                var template =
                    `<div class="pending-holder">
                        <div class="tablee pending">
                            <div class="amountt chart-sectionn">
                                <span>Amount: `+ element.pendingRequest.amount +`</span>
                            </div>
                            <div class="descriptionn chart-sectionn">
                                <span>`+element.pendingRequest.description+`</span>
                            </div>
                            <div class="statuss">
                                `+approvedHtml+`
                            </div>
                            <div class="commentbtn-holder">
                                <button  class="commentbtn"onclick='showComments(`+element.pendingRequest.request_id+`)'>
                                <i class="fas fa-arrow-circle-left arrow"id="arrow`+element.pendingRequest.request_id+`"></i></button>
                        </div>
                    </div>
                 <div id="commentSection`+element.pendingRequest.request_id+`"class="comment-section `+showComments+`">
                    <div class="comment-holder `+showComments+`" id="commentHolder`+element.pendingRequest.request_id+`">
                        <div id="commentDisplay`+element.pendingRequest.request_id+`" class="displayComment">
                            `+commentSection+`
                        </div>
                        
                        <div class="txt-holder">
                            <textarea id="addComment`+element.pendingRequest.request_id+`" placeholder="Write your comment" class="addComment"></textarea>
                            <button class="submitComment"onclick='request(`+element.pendingRequest.request_id+`)' id="commentSubmit`+element.pendingRequest.request_id+`">Submit</button>
                                <div class="commentLoaderContainer" id="loader`+element.pendingRequest.request_id+`">
                                    <div class="square darkGreen topRight" ></div>
                                    <div class="square lightGreen bottomLeft"></div>
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>`
          
            // setting our information in our HTML file
            document.getElementById('displayPending').innerHTML += template;
            $("#requestLoader").hide();
            $("#requestSubmit").show();
    
        });
        }
       

    });
    
    });
}
