function getTransactionHistory(){
    $.ajax({url: "http://blocksandbalancesserver.000webhostapp.com/transactions/transaction-history.php", success: function(result){
        const transHist = JSON.parse(result)
        transHist.forEach(function(result){

            

            let template = `<div class="pending-holder">
                                <div class="table">
                                    <div class="amount chart-section">
                                        `+result.amount+`
                                    </div>
                                    <div class="description chart-section">
                                        `+result.description+`
                                    </div>
                                    <div class="status">
                                        `+result.master1Response+result.master2Responsive+`
                                    </div>
                                </div>
                            </div>
                            <div class="border"></div>`
            document.getElementById("trans_content").innerHTML += template;
        });
    }});   
}