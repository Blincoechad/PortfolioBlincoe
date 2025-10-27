window.addEventListener('load', function () {
  var iphoneForm = document.getElementById("iphoneForm");
  var addons = document.getElementsByClassName("addon");
  var totalOutput = document.getElementById("total");
  var resetButton = document.getElementById("btnreset");
  var message = document.getElementById("message");

  // Dropdown
  var dropdown = document.getElementById("iphoneDropdown");
  var selected = dropdown.querySelector(".dropdown-selected");
  var listItems = dropdown.querySelectorAll("li");
  var iphoneModelValue = "";

  var iphoneModelCost = { "16": 1199, "15": 999, "13": 799 };

  // Toggle dropdown
  selected.addEventListener("click", function () {
    dropdown.classList.toggle("open");
  });

  // Select item
  listItems.forEach(function(item) {
    item.addEventListener("click", function () {
      selected.textContent = item.textContent;
      iphoneModelValue = item.dataset.value;
      dropdown.classList.remove("open");
      calculateTotal();
    });
  });

  // Calculate total
  function calculateTotal() {
    var total = 0;
    if (iphoneModelValue) total += iphoneModelCost[iphoneModelValue];

    for (var i = 0; i < addons.length; i++) {
      if (addons[i].checked) total += parseFloat(addons[i].value);
    }

    totalOutput.textContent = total.toFixed(2);
  }

  // Extras changes
  for (var i = 0; i < addons.length; i++) {
    addons[i].addEventListener('change', calculateTotal);
  }

  // Reset
  resetButton.addEventListener('click', function () {
    iphoneForm.reset();
    iphoneModelValue = "";
    selected.textContent = "-- Select an iPhone --";
    totalOutput.textContent = "0.00";
    message.textContent = "";
    message.style.color = "";
  });

  // Submit validation
  iphoneForm.addEventListener('submit', function (event) {
    event.preventDefault();
    message.textContent = "";

    if (!iphoneModelValue) {
      message.style.color = "red";
      message.textContent = " ‼️Please select an iPhone model‼️";
      return;
    }

    message.style.color = "green";
    message.textContent = "SUCCESS! 🎉🎉🎉 Order submitted! Total: $" + totalOutput.textContent;
  });

  // Initial total
  calculateTotal();
})

