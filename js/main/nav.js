// sets the viewport
function getViewport(view){
    // gets the html from the specific html page associated with the tab clicked
    $.get("viewports/"+view+".html", function (data){

        $('#viewport').html($(data).find('#content').html());
    });
}
