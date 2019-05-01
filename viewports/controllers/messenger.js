function getMessages(){
    $.post("http://blocksandbalancesserver.000webhostapp.com/messenger/getMessages.php", {relationId: user.relation_id},
     function(data){
        const messages = JSON.parse(data)
            console.log(messages)
        messages.forEach(function(result){
            let loggedInUser = user.ID
            let userTemplate = 
                `<div class="user">
                    
                </div>`
            let otherUserTemplate = 
                `<div class="other_user"></div>

                </div>`
            if (loggedInUser == result.user_id) {
                document.getElementById("messages").innerHTML += userTemplate;
            }
            else{
                document.getElementById("messages").innerHTML += otherUserTemplate;
            }
                        console.log(user)
                        console.log(result)
                        // console.log(userMessages)
        });
    });
}


    function postMessages(){
    let params = {relationId: user.relation_id, userId: user.ID, username: user.username, message: document.getElementById("chat_input").value}
    $.post("http://blocksandbalancesserver.000webhostapp.com/messenger/postMessage.php", params,
    function(messageResponse){ 
        getMessages()
    }
    
    
    )
}
// relationid, userid, username, message