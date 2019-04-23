function getTransactionHistory(){
    $.ajax({url: "http://blocksandbalancesserver.000webhostapp.com/transactions/transaction-history.php", success: function(result){
        const transHist = JSON.parse(result)
        transHist.forEach(function(result){

            let transResponse1 = result.master1Response
            let transResponse2 = result.master2Response

            if (transResponse1 == 1) {
                transResponse1 = `Approved`
            }

            else {transResponse1 = `Denied`
            }

            if (transResponse2 == 1) {
                transResponse2 = `Approved`
            }
            
            else {transResponse2 = 'Denied'}

            let template = `<div class="pending-holder">
                                <div class="table">
                                    <div class="amount chart-section">
                                        Amount: `+result.amount+`
                                    </div>
                                    <div class="description chart-section">
                                        `+result.description+`
                                    </div>
                                    <div class="status">
                                        Master1: `+transResponse1+` Master2: `+transResponse2+`
                                    </div>
                                </div>
                            </div>
                            <div class="border"></div>`
            document.getElementById("trans_content").innerHTML += template;
        });
    }});   
}