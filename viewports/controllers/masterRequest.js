// Fires to make sure everything is in order
function getMasterPending(){
// Sending server info to get correct info back
    let param = { 
        relationId: user.relation_id,
        userId: user.ID 
    }
    
    $.post( "http://blocksandbalancesserver.000webhostapp.com/transactions/getTransactions.php", param, function( data ) { 
        document.getElementById("master-content").innerHTML = "";
// Turing a String into object, array
    const block = JSON.parse(data);
// Forms the pending list, Loop
    block.forEach(function(element){
// This is the comment section to be filled by templates below        
        let commentTemplate = "";
// This fills the comment, Loop
        element.comments.forEach(function(comment){
// comment template
            let temp = 
            `<div class="comment">
                <span>`+comment.username+`</span><br/>
                <span>`+comment.comment+`</span>
            </div>`;
// Allows to add more comments below eachother
            commentTemplate += temp;
        });

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
                        <span>Approve</span>
                        <input name="requestStatus" type="radio" value="0"/>
                        <span>Denied</span>
                        <button class="statussbtn"onclick = "submitRequest(`+element.pendingRequest.request_id+`)" >Submit</button>
                    </div>
                    <div class="commentbtn-holder">
                        <button  class="commentbtn"onclick='showComments(`+element.pendingRequest.request_id+`)'>
                        <i class="fas fa-arrow-circle-left arrow"id="arrow`+element.pendingRequest.request_id+`"></i></button>
                    </div>
                </div>
        
                <div id="commentSection`+element.pendingRequest.request_id+`"class="comment-section">
                <div class="comment-holder" id="commentHolder`+element.pendingRequest.request_id+`">
                    <div id="commentDisplay`+element.pendingRequest.request_id+`" class="displayComment">
                        `+commentTemplate+`
                    </div>
                    <div class="txt-holder">
                        <textarea id="addComment`+element.pendingRequest.request_id+`" placeholder="Write your comment" class="addComment"></textarea>
                        <button class="submitComment"onclick='request(`+element.pendingRequest.request_id+`)'>Submit</button>
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
                    <button  class="commentbtn"onclick='showComments(`+element.pendingRequest.request_id+`)'>
                    <i class="fas fa-arrow-circle-left arrow"id="arrow`+element.pendingRequest.request_id+`"></i></button>
                </div>
            </div>

            <div id="commentSection`+element.pendingRequest.request_id+`"class="comment-section">
            <div class="comment-holder" id="commentHolder`+element.pendingRequest.request_id+`">
                <div id="commentDisplay`+element.pendingRequest.request_id+`" class="displayComment">
                    `+commentTemplate+`
                </div>
                <div class="txt-holder">
                    <textarea id="addComment`+element.pendingRequest.request_id+`" placeholder="Write your comment" class="addComment"></textarea>
                    <button class="submitComment"onclick='request(`+element.pendingRequest.request_id+`)'>Submit</button>
                </div>
                
            </div>
        </div>`
 }
console.log();

 // This HTML template will return from miner without button if clicked approved or denied
 if (element.pendingRequest.miner_approval != null && element.pendingRequest.miner == user.ID){
    template = `<div class="pending-holder">
                    <div class="tablee pending">
                        <div class="amount chart-section">
                            <span>` +element.pendingRequest.amount+ `</span>
                        </div>
                        <div class="description chart-section">
                            <span>` +element.pendingRequest.description+ `</span>
                        </div>
                            <div class="status">
                            </div>
                            <div class="commentbtn-holder">
                                <button  class="commentbtn"onclick='showComments(`+element.pendingRequest.request_id+`)'>
                                <i class="fas fa-arrow-circle-left arrow"id="arrow`+element.pendingRequest.request_id+`"></i></button>
                            </div>
                    </div>

                    <div id="commentSection`+element.pendingRequest.request_id+`"class="comment-section">
                            <div class="comment-holder" id="commentHolder`+element.pendingRequest.request_id+`">
                                <div id="commentDisplay`+element.pendingRequest.request_id+`" class="displayComment">
                                    `+commentTemplate+`
                                </div>
                                <div class="txt-holder">
                                    <textarea id="addComment`+element.pendingRequest.request_id+`" placeholder="Write your comment" class="addComment"></textarea>
                                    <button class="submitComment"onclick='request(`+element.pendingRequest.request_id+`)'>Submit</button>
                                </div>
                                
                            </div>
                        </div>
                </div>`
}





// console.log(user);
     document.getElementById("master-content").innerHTML += template;

    })

});
}



// ************************End of Receiving Request*********************

// ************************Start of Responding Request******************


// Function that submits final request
function submitRequest(x){
    
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
        
       getMasterPending();
       
   })


}

