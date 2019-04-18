function getPending(){

    
    
    $.get( "http://blocksandbalancesserver.000webhostapp.com/transactions/pending.php?id="+uid, function( data ) {
    data = JSON.parse(data);
    data.forEach(element => {
        

        var commentSection = "";
        element.comments.forEach(comment =>{
            var commentTemplate = 
            ` <div class="comment">
                <span>`+comment.username+`</span><br/>
                <span>`+comment.comment+`</span>
            </div>`;
            commentSection += commentTemplate;
        })

        var template = `<div class="pending-holder">
        <div class="table pending">
            <div class="amount chart-section">
                <span>Amount: `+ element.pendingRequest.amount +`</span>
            </div>
            <div class="description chart-section">
                <span>`+element.pendingRequest.description+`</span>
            </div>
            <div class="status">
                <span>`+element.pendingRequest.masterResponse+`</span><br/>
                <span>`+element.pendingRequest.minerResponse+`</span>
            </div>
        </div>
        <div class="comment-section">
            <span id="commentBtn">Comment</span>
            <div class="display-comment">
               `+commentSection+`
            </div>
            <textarea id="addComment" placeholder="Write your comment"></textarea>
            <button onclick='request(`+element.pendingRequest.requestId+`)'>Submit</button>
        </div>
    </div>`
    document.getElementById('displayPending').innerHTML += template;
    
    
    
    });











  });
}



// handeling the add comment function
function request(id){
    console.log(id);
    
}