
function getMessages(){
    $.get("http://localhost/blocksandbalancesserver/messenger/getmessenges.php?id="+uid, function(data){
        console.log(data);
        
    });
}