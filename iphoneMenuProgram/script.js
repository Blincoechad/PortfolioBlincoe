window.addEventListener('load', function () {
  let iphoneForm = document.getElementById("iphoneForm");
  let addons = document.getElementsByClassName("addon");
  let totalOutput = document.getElementById("total");
  let resetButton = document.getElementById("btnreset");
  let message = document.getElementById("message");

  // Dropdown
  let dropdown = document.getElementById("iphoneDropdown");
  let selected = dropdown.querySelector(".dropdown-selected");
  let listItems = dropdown.querySelectorAll("li");
  let iphoneModelValue = "";

  let iphoneModelCost = { "16": 1199, "15": 999, "13": 799 };

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
    let total = 0;
    if (iphoneModelValue) total += iphoneModelCost[iphoneModelValue];

    for (var i = 0; i < addons.length; i++) {
      if (addons[i].checked) total += parseFloat(addons[i].value);
    }

    totalOutput.textContent = total.toFixed(2);
  }

  // Extras changes
  for (let i = 0; i < addons.length; i++) {
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

