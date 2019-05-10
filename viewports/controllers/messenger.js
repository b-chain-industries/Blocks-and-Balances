
function getMessages(){
    console.log("fired");
    
    
    $.post("http://blocksandbalancesserver.000webhostapp.com/messenger/getMessages.php", {relationId: user.relation_id},
     function(data){
        document.getElementById("messages").innerHTML = "";
        const messages = JSON.parse(data)
        messages.forEach(function(result){
            let loggedInUser = user.ID
            let messageText = result.message
            let timeStamp = result.timestamp
            let userTemplate = `<div class="user">
                                    <div class="message_text">`
                                        +messageText+
                                    `</div>
                                    <div class="time_stamp">`
                                        +timeStamp+
                                    `</div>
                                </div>`
            let otherUserTemplate = `<div class="other_user">
                                        <div class="message_text">`
                                            +messageText+
                                        `</div>                    <div class="time_stamp">`       +timeStamp+
                                        `</div>
                                    </div>`
            if (loggedInUser == result.user_id) {
             document.getElementById("messages").innerHTML += userTemplate;
            }
            else{
                document.getElementById("messages").innerHTML += otherUserTemplate;
            }
        });
    });
}


function postMessages(){
    let params = {relationId: user.relation_id, userId: user.ID, username: user.username, message: document.getElementById("chat_input").value}

    function clearTexArea(){
        document.getElementById('chat_input').value='';
    }

    $.post("http://blocksandbalancesserver.000webhostapp.com/messenger/postMessage.php", params,
    function(messageResponse){getMessages()})
}