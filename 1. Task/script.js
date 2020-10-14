function calculate(){

    var sum = document.getElementById("sum").value;
    var price = document.getElementById("price").value;

    var rest = sum - price;
    var parts = rest.toString().split('.');
    
    var dollars = parts[0];
 
    var cents = parts[1] != undefined ? parts[1].substr(0,2) : 0;
    cents.length == 1 ? cents = cents + "0" : null; 


    alert("Your rest is " + dollars + " dollars, " + cents + " cents");
}
