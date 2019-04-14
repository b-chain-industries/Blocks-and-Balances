// sets the viewport
function getViewport(view){
    // gets the html from the specific html page associated with the tab clicked
    console.log("test");
    
    $.get("viewports/"+view+".html", function (data){
        console.log("gets");
        
        $('#viewport').html($(data).find('#content').html());
    });
}
