
function getMasterPending(){
    $.get( "http://blocksandbalancesserver.000webhostapp.com/transactions/pending.php", function( data ) { 
    const block = JSON.parse(data);


    
    block.forEach(function(element){
        let commentTemplate = "";
        element.comments.forEach(function(comment){
            let temp = 
            `<div class="comment">
                <span>`+comment.username+`</span><br/>
                <span>`+comment.comment+`</span>
            </div>`;

            commentTemplate += temp;
        });


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
     document.getElementById("master-content").innerHTML += template;

    })


   
    


});
}

