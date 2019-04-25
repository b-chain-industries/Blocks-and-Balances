
function getMasterPending(){
    var params = {
        userId: parseInt(user.id),
        relationId: parseInt(user.relation_id)
    }
    console.log(params);
    
    $.post( "http://blocksandbalancesserver.000webhostapp.com/transactions/getTransactions.php", params, function( data ) { 
        
        
    const block = JSON.parse(data);
    console.log(block);
    
    
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

        let approve = `<div class="status">
        <input type="radio"/>
        <span>Approve</span>
        <input type="radio"/>
        <span>Denied</span>
        <button>Submit</button>
    </div>`
    console.log(element.pendingRequest.master_requested);
    // console.log(user.id);
    
    

        if(element.pendingRequest.master_approval >=0 && element.pendingRequest.master_requested == user.id){
            approve = ``;
        }


         let template = `<div class="pending-holder">
         <div class="table pending">
             <div class="amount chart-section">
                 <span>` +element.pendingRequest.amount+ `</span>
             </div>
             <div class="description chart-section">
                 <span>` +element.pendingRequest.description+ `</span>
             </div>
             `+approve+`
 
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

