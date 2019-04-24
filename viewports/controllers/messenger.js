
function getMessages(){
    $.post("http://blocksandbalancesserver.000webhostapp.com/messenger/getMessages.php", {relationId: user.relation_id},
     function(data){
        const messages = JSON.parse(data)
            console.log(messages)
        messages.forEach(function(result){
            let loggedInUser = user.id
            let userTemplate = 
                `<div class="user">
                    
                </div>`
            let otherUserTemplate = 
                `<div class="other_user">

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
