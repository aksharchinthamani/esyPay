let userInput = document.getElementById("inrAmount");
let convertBar = document.getElementById("convertedAmount");
let resultOutput = document.getElementById("billAmount");
let exchangeButton = document.getElementById("convertButton");
let payButton = document.getElementById("payBtn");
let dropD = document.getElementById("selectDropdown");
let denomination = document.getElementById("denomination");



exchangeButton.onclick = () => {
    const firstVal = parseFloat(userInput.value);
    const selecter = dropD.value;

    if (!firstVal || firstVal <= 0) {
        alert("Please enter a valid INR amount and select a currency.");
        
        return;
    }
    let url = "https://api.exchangerate-api.com/v4/latest/INR";
    let options = {
        method: "GET"
    };
    fetch(url, options)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            const exchangeRate = data.rates[selecter];
            const resultValue = firstVal * exchangeRate;
            convertBar.value = resultValue.toFixed(2);
            resultOutput.value = resultValue.toFixed(2);
            denomination.innerText = selecter;
        })



}
function transverse(){
    if(convertBar.value != 0 && resultOutput.value > 0){
        payButton.disabled = false;
        localStorage.setItem("amountToPay", resultOutput.value);
        localStorage.setItem("currency", denomination.innerText);
          window.location.href = "payment.html";
    }
    else{
        alert("Select and convert currency to pay ")
}
}

 
function pay(event) {
    let cardName = document.getElementById("cardName").value.trim();
    let number = document.getElementById("number").value.trim();
    let cvv = document.getElementById("cvv").value.trim();

    
    let cardsDetails = JSON.parse(localStorage.getItem("cardDetails"));
    let amountpayed = localStorage.getItem("amountToPay");
    let currencyType = localStorage.getItem("currency");

    if (!cardsDetails) {
        alert("Card details are not saved or invalid.");
        return;
    }

    if (cardName === cardsDetails.name && number === cardsDetails.cardNumber && cvv === cardsDetails.CVV) {
        document.getElementById("loadingOverlay").style.display = "flex";
        
        setTimeout(() => {
            let transactionId = Math.floor(Math.random() * 1000000000000);
            let dateString = new Date().toLocaleString();

// saving history
            const newTransaction = {
                id: transactionId,
                date: dateString,
                amount: amountpayed,
                currency: currencyType
            };

        
            let history = JSON.parse(localStorage.getItem("paymentHistory")) || [];
            history.unshift(newTransaction); 
            localStorage.setItem("paymentHistory", JSON.stringify(history));
        

            document.getElementById("loadingOverlay").style.display = "none";
            alert(`Payment Successful!\n ID: ${transactionId}\n 
                Date: ${dateString}`);
            
            // window.location.href = "history.html"; 
        }, 2000);
    } else {
        alert("Invalid card details. Please try again.");
    }
}

function back() {
    window.location.href = "convertion.html"; 
};
function history() {
    window.location.href = "history.html"; 
}

