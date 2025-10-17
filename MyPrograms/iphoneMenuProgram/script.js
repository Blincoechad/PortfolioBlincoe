
    // changed subject to a iphone order form
    window.addEventListener('load', function () {
      var iphoneForm = document.getElementById("iphoneForm");
      var iphoneModel = document.getElementById("iphoneModel");
      var addons = document.getElementsByClassName("addon");
      var totalOutput = document.getElementById("total");
      var resetButton = document.getElementById("btnreset");
      var message = document.getElementById("message");

      // Base prices for iPhones
      var iphoneModelCost = {
        "16": 1199,
        "15": 999,
        "13": 799
      };

      // Calculate running total
      function calculateTotal() {
        var total = 0;

        // Add model price if selected
        if (iphoneModel.value) {
          total += iphoneModelCost[iphoneModel.value];
        }
        

        // Add extras
        for (var i = 0; i < addons.length; i++) {
          if (addons[i].checked) {
            total += parseFloat(addons[i].value);
          }
        }

        totalOutput.textContent = total.toFixed(2);
      }

      // Live updates on all changes
      iphoneModel.addEventListener('change', calculateTotal);
      for (var i = 0; i < addons.length; i++) {
        addons[i].addEventListener('change', calculateTotal);
      }

      // Reset
      resetButton.addEventListener('click', function () {
        iphoneForm.reset();
        totalOutput.textContent = "0.00";
        message.textContent = "";
        message.style.color = "";
      });

      // Validation on submit
      iphoneForm.addEventListener('submit', function (event) {
        event.preventDefault();
        message.textContent = "";
        message.style.color = "red";

        if (!iphoneModel.value) {
          message.textContent = " ‼️Please select an iPhone model.‼️";
          return;
        }

        message.style.color = "Green";
        message.textContent = "SUCCESS! 🎉🎉🎉 Order submitted! Total: $" + totalOutput.textContent;
      });

      // Run initial calc (sets default 0.00)
      calculateTotal();
    });
  