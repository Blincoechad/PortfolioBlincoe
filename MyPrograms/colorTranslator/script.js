  function showTime() {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      const seconds = String(now.getSeconds()).padStart(2, '0');
      document.getElementById('time').textContent = `${hours}:${minutes}:${seconds}`;
    }

    setInterval(showTime, 1000);
    showTime();
     // initial call to avoid delay
    
    
var bike = {
    model: "kawasaki",
            year: 2020,
            color: "Black",
            size: "400cc"
};
function bikeInfo() {
document.getElementById('bikeSpecs').value = `${bike.model} ${bike.year} ${bike.color} ${bike.size}`;

};
