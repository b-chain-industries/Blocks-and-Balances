// Fires to make sure everything is in order
function getMasterPending(x){
// Sending server info to get correct info back
    let param = { 
        relationId: user.relation_id,
        userId: user.ID 
    }
    
    
    $.post( "http://blocksandbalancesserver.000webhostapp.com/transactions/getTransactions.php", param, function( data ) { 
        document.getElementById("master-content").innerHTML = "";
// Turing a String into object, array
    const block = JSON.parse(data);

    
    if(block.length == 0){
        var template = "No request at this time.";

        document.getElementById("master-content").innerHTML = template;
        
    }else{
        
        // Forms the pending list, Loop
    block.forEach(function(element){

// This is the comment section to be filled by templates below        

        let commentTemplate = "";
// This fills the comment, Loop
        element.comments.forEach(function(comment){
// comment template
        var commentPos = "";
        if(comment.username === user.username){
            commentPos = "comment-position";
        }

//placing our information in html template
        var temp = 
        ` <div class="comment">
            <span class="`+commentPos+` comment-color">`+comment.username+`</span><br/>
            <span class="`+commentPos+`">`+comment.comment+`</span>
        </div>`;
// Allows to add more comments below eachother
            commentTemplate += temp;
        });

        let showComments = "";
        if(x == element.pendingRequest.request_id){
            showComments = "showComments";
        }
        
        // HTML pending request template
                let template = 
                `<div class="pending-holder">
                        <div class="tablee pending">
                            <div class="amountt chart-sectionn">
                                <span>` +element.pendingRequest.amount+ `</span>
                            </div>
                            <div class="descriptionn chart-sectionn">
                                <span>` +element.pendingRequest.description+ `</span>
                            </div>
                            <div class="statuss">
                                <input name="requestStatus" type="radio" value="1"/>
                                <span class="master-radio">Approve</span>
                                <input class="master-position"name="requestStatus" type="radio" value="0"/>
                                <span class="master-position master-radio">Denied</span>
                                <button id="masterApprovalSubmit`+element.pendingRequest.request_id+`" onclick = "submitRequest(`+element.pendingRequest.request_id+`)" class="statussbtn">Submit</button>
                                <div id="masterApprovalLoader`+element.pendingRequest.request_id+`" class="loaderWrapper">
                                        <div class="loading">
                                        <div class="loading-element"></div>
                                        <div class="loading-element"></div>
                                        <div class="loading-element"></div>
                                        <div class="loading-element"></div>
                                    </div></div>
                            </div>
                            <div class="commentbtn-holder">
                                <button  class="commentbtn"onclick='showCommentsMaster(`+element.pendingRequest.request_id+`)'>
                                <i class="fas fa-arrow-circle-left arrow"id="arrow`+element.pendingRequest.request_id+`"></i></button>
                            </div>
                        </div>
        
                <div id="commentSection`+element.pendingRequest.request_id+`"class="comment-section `+showComments+`">
                <div class="comment-holder `+showComments+`" id="commentHolder`+element.pendingRequest.request_id+`">
                    <div id="commentDisplay`+element.pendingRequest.request_id+`" class="displayComment">
                        `+commentTemplate+`
                    </div>
                    <div class="txt-holder">
                        <textarea id="addComment`+element.pendingRequest.request_id+`" placeholder="Write your comment" class="addComment"></textarea>
                        <button class="submitComment"onclick='masterRequest(`+element.pendingRequest.request_id+`)' id="commentSubmit`+element.pendingRequest.request_id+`">Submit</button>
                        <div class="commentLoaderContainer" id="loader`+element.pendingRequest.request_id+`">
                            <div class="square darkGreen topRight" ></div>
                            <div class="square lightGreen bottomLeft"></div>
                        </div>
                    </div>
                    
                </div>
        </div>`;
// Adds the templete to the HTML target
        
        // This HTML template will will be sent to miner if approved or back to child if denied
         if (element.pendingRequest.master_approval != null && element.pendingRequest.master_requested == user.ID){
             template = 
             `<div class="pending-holder">
                    <div class="tablee pending">
                        <div class="amountt chart-sectionn">
                            <span>` +element.pendingRequest.amount+ `</span>
                        </div>
                        <div class="descriptionn chart-sectionn">
                            <span>` +element.pendingRequest.description+ `</span>
                        </div>

                        <div class="statuss">
                        </div>
                        <div class="commentbtn-holder">
                            <button  class="commentbtn"onclick='showCommentsMaster(`+element.pendingRequest.request_id+`)'>
                            <i class="fas fa-arrow-circle-left arrow"id="arrow`+element.pendingRequest.request_id+`"></i></button>
                        </div>

                    </div>
        
                    <div id="commentSection`+element.pendingRequest.request_id+`"class="comment-section `+showComments+`">
                    <div class="comment-holder `+showComments+`" id="commentHolder`+element.pendingRequest.request_id+`">
                        <div id="commentDisplay`+element.pendingRequest.request_id+`" class="displayComment">
                            `+commentTemplate+`
                        </div>
                        <div class="txt-holder">
                            <textarea id="addComment`+element.pendingRequest.request_id+`" placeholder="Write your comment" class="addComment"></textarea>
                            <button class="submitComment"onclick='masterRequest(`+element.pendingRequest.request_id+`)' id="commentSubmit`+element.pendingRequest.request_id+`">Submit</button>
                            <div class="commentLoaderContainer" id="loader`+element.pendingRequest.request_id+`">
                                <div class="square darkGreen topRight" ></div>
                                <div class="square lightGreen bottomLeft"></div>
                            </div>
                        </div>
                        
                    </div>
                </div>`
         }
        console.log();
        
         // This HTML template will return from miner without button if clicked approved or denied
         if (element.pendingRequest.miner_approval != null && element.pendingRequest.miner == user.ID){
            template = `<div class="pending-holder">
                            <div class="tablee pending">
                                <div class="amountt chart-sectionn">
                                    <span>` +element.pendingRequest.amount+ `</span>
                                </div>
                                <div class="descriptionn chart-sectionn">
                                    <span>` +element.pendingRequest.description+ `</span>
                                </div>
                                    <div class="statuss">
                                    </div>
                                    <div class="commentbtn-holder">
                                        <button  class="commentbtn"onclick='showCommentsMaster(`+element.pendingRequest.request_id+`)'>
                                        <i class="fas fa-arrow-circle-left arrow"id="arrow`+element.pendingRequest.request_id+`"></i></button>
                                    </div>
                            </div>
        
                            <div id="commentSection`+element.pendingRequest.request_id+`"class="comment-section `+showComments+`">
                                    <div class="comment-holder `+showComments+`" id="commentHolder`+element.pendingRequest.request_id+`">
                                        <div id="commentDisplay`+element.pendingRequest.request_id+`" class="displayComment">
                                            `+commentTemplate+`
                                        </div>
                                        <div class="txt-holder">
                                            <textarea id="addComment`+element.pendingRequest.request_id+`" placeholder="Write your comment" class="addComment"></textarea>
                                            <button class="submitComment"onclick='masterRequest(`+element.pendingRequest.request_id+`)' id="commentSubmit`+element.pendingRequest.request_id+`">Submit</button>
                                            <div class="commentLoaderContainer" id="loader`+element.pendingRequest.request_id+`">
                                                <div class="square darkGreen topRight" ></div>
                                                <div class="square lightGreen bottomLeft"></div>
                                            </div>
                                        </div>
                                        
                                    </div>
                                </div>
                        </div>`
        }
        
        
        
        
        
        // console.log(user);
    
    document.getElementById("master-content").innerHTML += template;
            })
    }


});
}



// ************************End of Receiving Request*********************

// ************************Start of Responding Request******************


// Function that submits final request
function submitRequest(x){

    $("#masterApprovalSubmit"+x).hide();
    $("#masterApprovalLoader"+x).show();
    
    // variable to name which button was pushed
    let status = "";
    // labels and determines which buttons are pushed
    let radioBtn = document.getElementsByName("requestStatus");
    for (var i = 0; i < radioBtn.length; i++){
        if (radioBtn[i].checked){
            status = radioBtn[i].value;
        }
    }

    // tells server who, what and where the request/approval will go
    let param = {
        userId: user.ID,
        requestId: x,
        approved: status,
    
    }
    $.post('http://blocksandbalancesserver.000webhostapp.com/transactions/approveTransaction.php', param, function (data){
    getMasterPending()
    
    })

    
    
}


// Comments from the master to child
function masterRequest(x){
    document.getElementById("commentSubmit"+x).style.display = "none";
    document.getElementById("loader"+x).style.display = "block";

    // adds the new comment is the comment box
   var comment = document.getElementById('addComment'+x).value;
    // tells who, where, and what the comment is saying
   var params = {
       requestId:x,
       username:user.username,
       comment:comment,
   }
    //AJAX call to the server to move and transfer the data  
   $.post('http://blocksandbalancesserver.000webhostapp.com/transactions/addComment.php', params, function (data){
        
       getMasterPending(x);
       
   })


}


function showCommentsMaster(x){
    
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
   
}