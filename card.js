let name = document.getElementById("name");
let cardNumber = document.getElementById("cardNumber");
let CVV = document.getElementById("CVV");
let saveButton = document.getElementById("save");
function save() {
    const cardDetails = {
        name: name.value.trim(),
        cardNumber: cardNumber.value.trim(),
        CVV: CVV.value.trim()
    };
    if (!cardDetails.name || !cardDetails.cardNumber || !cardDetails.CVV) {
        alert("Please fill in all card details.");
        return;
    }       
    localStorage.setItem("cardDetails", JSON.stringify(cardDetails));
    alert("Card details saved successfully!");
}
function main() {
    const cardName = document.getElementById("name").value.trim();
    const cardNum = document.getElementById("cardNumber").value.trim();
    const cvvNum = document.getElementById("CVV").value.trim();
    
    if (cardName && cardNum && cvvNum) {
        window.location.href = "convertion.html"; 
    } 
    else {
        alert("Please fill in all card details.");
    }
}
