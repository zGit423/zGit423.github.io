// Simple JavaScript Calculator
// Repeatedly prompts the user for two numbers and an operator,
// computes the result, and displays a results table.
// After the loop exits, a summary table of valid results is displayed.

let keepGoing = true;
let results = []; // stores valid numeric results only

// Start the results table
document.write("<table>");
document.write("<tr><th>Number 1</th><th>Operator</th><th>Number 2</th><th>Result</th></tr>");

while (keepGoing) {
  // Prompt for first number
  let xInput = prompt("Enter the first number (x):");
  if (xInput === null) {
    keepGoing = false;
    break;
  }

  // Prompt for second number
  let yInput = prompt("Enter the second number (y):");
  if (yInput === null) {
    keepGoing = false;
    break;
  }

  // Prompt for operator
  let operator = prompt("Enter an operator (+, -, *, /, %):");
  if (operator === null) {
    keepGoing = false;
    break;
  }

  let x = parseFloat(xInput);
  let y = parseFloat(yInput);
  let result;

  // Validate numeric input
  if (isNaN(x) || isNaN(y)) {
    result = "Error: Non-numeric input";
  } else if (operator !== "+" && operator !== "-" && operator !== "*" && operator !== "/" && operator !== "%") {
    result = "Error: Invalid operator";
  } else {
    switch (operator) {
      case "+":
        result = x + y;
        break;
      case "-":
        result = x - y;
        break;
      case "*":
        result = x * y;
        break;
      case "/":
        result = (y === 0) ? "Error: Division by zero" : x / y;
        break;
      case "%":
        result = (y === 0) ? "Error: Division by zero" : x % y;
        break;
    }
  }

  // Write this row to the table
  document.write("<tr><td>" + xInput + "</td><td>" + operator + "</td><td>" + yInput + "</td><td>" + result + "</td></tr>");

  // Only store valid numeric results for the summary table
  if (typeof result === "number" && !isNaN(result)) {
    results.push(result);
  }
}

document.write("</table>");

// Build the summary table from valid results
document.write("<h2>Summary of Valid Results</h2>");

if (results.length > 0) {
  let min = Math.min(...results);
  let max = Math.max(...results);
  let total = results.reduce((sum, val) => sum + val, 0);
  let avg = total / results.length;

  document.write("<table>");
  document.write("<tr><th>Minimum</th><th>Maximum</th><th>Average</th><th>Total</th></tr>");
  document.write("<tr><td>" + min + "</td><td>" + max + "</td><td>" + avg.toFixed(2) + "</td><td>" + total + "</td></tr>");
  document.write("</table>");
} else {
  document.write("<p>No valid results were entered.</p>");
}
