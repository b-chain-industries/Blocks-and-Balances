
function getMessages(){
    
    $.post("http://blocksandbalancesserver.000webhostapp.com/messenger/getMessages.php", {relationId: user.relation_id}, function(data){
        data =JSON.parse(data);
        
        if(data.length !== messages.length || data.length == 0){
            document.getElementById("messages").innerHTML = "";
            
            messages = data;
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
                                            `</div>               
                                            <div class="time_stamp">`+timeStamp+
                                            `</div>
                                        </div>`
                if (loggedInUser == result.user_id) {
                 document.getElementById("messages").innerHTML += userTemplate;
                }
                else{
                    document.getElementById("messages").innerHTML += otherUserTemplate;
                }
            });
    
    
            function scrollBottom (messages) {
                var div = document.getElementById(messages);
                div.scrollTop = div.scrollHeight - div.clientHeight;
            }        
            scrollBottom("messages");
        }
    });
    
}



function postMessages(){

    let params = {relationId: user.relation_id, userId: user.ID, username: user.username, message: document.getElementById("chat_input").value}

        $.post("http://blocksandbalancesserver.000webhostapp.com/messenger/postMessage.php", params, function(messageResponse){
            getMessages()
            document.getElementById('chat_input').value='';       
        })
}