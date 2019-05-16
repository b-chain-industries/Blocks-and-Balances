function getTransactionHistory(){
    var params = {
        relationId: user.relation_id
    }
    $.post("http://blocksandbalancesserver.000webhostapp.com/transactions/getTransHist.php", params, function(result){
        document.getElementById("trans_content").innerHTML = "";
        const transHist = JSON.parse(result)

        let noHistTemplate = `<div><h2>No transactions have been made yet.</h2></div>`
        if (result.length === 0){
            document.getElementById("trans_content").innerHTML += noHistTemplate;
        }
        else {
            transHist.forEach(function(result){
                var $display;
                var transHistClass = result.approved
                var transactionColor = '';
                if (transHistClass == 1) {
                    transHistClass = `histApproved`
                    transactionColor = `transactionBlack`
                    $display = "Approved";

                }
                else {
                    transHistClass = `histDenied` 
                    $display = "Denied";
                }


                let template = `<div class="pending-holder ` +transHistClass+ `">
                                    <div class="table-history">
                                        <div class=" amount chart-section transactionDis">
                                           <span class="`+transactionColor+`"> Amount:
                                            `+result.amount+`</span>
                                        </div>
                                        <div class="description chart-section transactionDis">
                                            <span class="`+transactionColor+`"> `+result.description+`</span>
                                        </div>
                                        <div class="transactionStatus">
                                            <span class="`+transactionColor+`"> `+$display+`</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="border"></div>`
                document.getElementById("trans_content").innerHTML += template;
                $('.table').css('background-color','none')
            });
        }

    });   
}