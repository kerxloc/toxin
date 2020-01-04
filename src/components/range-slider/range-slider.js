import noUiSlider from "nouislider";
import wNumb from "wnumb";

var stepsSlider = document.getElementById("range");
var input0 = document.getElementById("input-with-keypress-0");
var input1 = document.getElementById("input-with-keypress-1");
var inputs = [input0, input1];

noUiSlider.create(stepsSlider, {
  start: [5000, 10000],
  connect: true,
  format: wNumb({ decimals: 0 }),
  range: {
    min: [600],
    max: 15000
  }
});

stepsSlider.noUiSlider.on("update", function(values, handle) {
  inputs[handle].value = values[handle];
});

// Listen to keydown events on the input field.
inputs.forEach(function(input, handle) {
  input.addEventListener("change", function() {
    stepsSlider.noUiSlider.setHandle(handle, this.value);
  });

  input.addEventListener("keydown", function(e) {
    var values = stepsSlider.noUiSlider.get();
    var value = Number(values[handle]);

    // [[handle0_down, handle0_up], [handle1_down, handle1_up]]
    var steps = stepsSlider.noUiSlider.steps();

    // [down, up]
    var step = steps[handle];

    var position;

    // 13 is enter,
    // 38 is key up,
    // 40 is key down.
    switch (e.which) {
      case 13:
        stepsSlider.noUiSlider.setHandle(handle, this.value);
        break;

      case 38:
        // Get step to go increase slider value (up)
        position = step[1];

        // false = no step is set
        if (position === false) {
          position = 1;
        }

        // null = edge of slider
        if (position !== null) {
          stepsSlider.noUiSlider.setHandle(handle, value + position);
        }

        break;

      case 40:
        position = step[0];

        if (position === false) {
          position = 1;
        }

        if (position !== null) {
          stepsSlider.noUiSlider.setHandle(handle, value - position);
        }

        break;
    }
  });
});
