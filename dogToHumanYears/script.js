// a function that converts dog years to human years
// grabs the users input using the onClick property
  function dogToHum() {
        let inputNumber = document.getElementById("dogAge").value;
        let  dogAge = parseInt(inputNumber);
        // made sure the input is a number
        if (isNaN(dogAge)) {
            document.getElementById("theResult").innerText = `Has to be a number dork`;
            return;
        }
        let result = dogAge * 7;
        document.getElementById("theResult").innerText = `Your Dog is ${result} in human years!`;
    };
function reset() {
    document.getElementById('theResult').innerText = 'TO HUMAN YEARS';
};
// i made a onClick for a reset button and connected
// a function that resets to what it started out looking like