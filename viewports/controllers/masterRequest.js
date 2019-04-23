// Fires to make sure everything is in order
function getMasterPending(){
// Sending server info to get correct info back
    let param = { relationId: user.relation_id }
    $.post( "http://blocksandbalancesserver.000webhostapp.com/transactions/pending.php", function( data ) { 
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
             <div class="status">
                 <input type="radio"/>
                 <span>Approve</span>
                 <input type="radio"/>
                 <span>Denied</span>
                 <button>Submit</button>
             </div>
 
         </div>
 
         <div class="comment-section">
                 <span id="commentBtn">Comment</span>
                 <div class="display-comment">
                     `+commentTemplate+`
                 </div>
                 <textarea id="addComment" placeholder="Write your comment"></textarea>
                 <button>Submit</button>
             </div>
 
     </div>`;
// Adds the temple to the HTML target
     document.getElementById("master-content").innerHTML += template;

    })


   
    


});
}

