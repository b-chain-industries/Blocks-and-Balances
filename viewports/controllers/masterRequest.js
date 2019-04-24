// Fires to make sure everything is in order
function getMasterPending(){
    
    
// Sending server info to get correct info back
    let param = { 
        relationId: user.relation_id,
        userId: user.id 
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

// Pending request template
        let template = `<div class="pending-holder">
         <div class="table pending">
             <div class="amount chart-section">
                 <span>` +element.pendingRequest.amount+ `</span>
             </div>
             <div class="description chart-section">
                 <span>` +element.pendingRequest.description+ `</span>
             </div>
             <div id="status">
                 <input name="requestStatus" type="radio" value="0"/>
                 <span>Approve</span>
                 <input name="requestStatus" type="radio" value="1"/>
                 <span>Denied</span>
                 <button onclick = "submitRequest(`+element.pendingRequest.request_id+`)" >Submit</button>
             </div>
 
         </div>
 
         <div class="comment-section">
                 <span id="commentBtn">Comment</span>
                 <div class="display-comment">
                     `+commentTemplate+`
                 </div>
                 <textarea id="addComment`+element.pendingRequest.request_id+`" placeholder="Write your comment"></textarea>
                 <button onclick = "masterRequest(`+element.pendingRequest.request_id+`)">Submit</button>
             </div>
 
     </div>`;
// Adds the temple to the HTML target
     document.getElementById("master-content").innerHTML += template;

    })

});
}





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
        userId: user.id,
        request_id: x,
        approved: status,
    
    }
    
    
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
