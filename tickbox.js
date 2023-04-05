// Get the canvas element and context
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
ctx.font = "20px Arial";
ctx.fillText("I'm not a robot", 100, 257);

// Set up the checkboxes array
var checkboxes = [  {    x: canvas.width / 2 - 200,    y: canvas.height / 2 - 10,    checked: false  }];

// Draw the initial checkbox
drawCheckbox(checkboxes[0]);

// Counter to keep track of checked checkboxes
var numChecked = 0;

// Add event listener for canvas clicks
canvas.addEventListener("click", function(event) {
  // Check if the click is inside any checkbox
  checkboxes.forEach(function(checkbox) {
    if (!checkbox.checked &&
        event.offsetX >= checkbox.x &&
        event.offsetX <= checkbox.x + 20 &&
        event.offsetY >= checkbox.y &&
        event.offsetY <= checkbox.y + 20) {
      // Mark the checkbox as checked
      checkbox.checked = true;
      numChecked++;

      // Draw the checked state of the checkbox
      drawCheckbox(checkbox);

      // If eighth checkbox is checked, display button
      if (numChecked === 10) {
        document.getElementById("submitBtn").style.display = "block";
      }

      // If less than eighth checkbox is checked, add a new checkbox to the array in a random location
      if (numChecked < 10) {
        var newCheckbox = {
          x: Math.floor(Math.random() * (canvas.width - 20)),
          y: Math.floor(Math.random() * (canvas.height - 20)),
          checked: false
        };
        checkboxes.push(newCheckbox);

        // Draw the new checkbox
        drawCheckbox(newCheckbox);
      }
    }
  });
});

// Draw a checkbox at the specified location
function drawCheckbox(checkbox) {
  // Clear the area within the checkbox bounds
  ctx.clearRect(checkbox.x, checkbox.y, 20, 20);

  // Draw the checkbox shape
  ctx.beginPath();
  ctx.rect(checkbox.x, checkbox.y, 20, 20);
  ctx.stroke();

  // Draw the tick image if the checkbox is checked
  if (checkbox.checked) {
    ctx.beginPath();
    ctx.moveTo(checkbox.x + 3, checkbox.y + 10);
    ctx.lineTo(checkbox.x + 8, checkbox.y + 15);
    ctx.lineTo(checkbox.x + 17, checkbox.y + 4);
    ctx.stroke();
  }
}
