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

                if (transHistClass == 1) {
                    transHistClass = `histApproved`
                    $display = "Approved";
                }
                else {
                    transHistClass = `histDenied` 
                    $display = "Denied";
                }


                let template = `<div class="pending-holder ` +transHistClass+ `">
                                    <div class="table">
                                        <div class="amount chart-section">
                                            Amount: `+result.amount+`
                                        </div>
                                        <div class="description chart-section">
                                            `+result.description+`
                                        </div>
                                        <div class="transactionStatus">
                                        `+$display+`
                                        </div>
                                    </div>
                                </div>
                                <div class="border"></div>`
                document.getElementById("trans_content").innerHTML += template;
            });
        }

    });   
}