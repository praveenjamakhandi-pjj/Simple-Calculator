const display = document.getElementById("display");
const buttons = document.querySelectorAll(".btn");

let expression = "";


buttons.forEach(function(button) {
    button.addEventListener("click", function() {
        const value = button.textContent;

        if (value === "C") {
            expression = "";
            display.value = "0";
        }
        else if (value === "⌫") {
            expression = expression.slice(0, -1);
            display.value = expression || "0";
        }
        else if (value === "=") {
            try {
                if (expression.trim() === "") {
                    display.value = "0";
                    return;
                }

                if (!/^[0-9+\-*/().\s]+$/.test(expression)) {
                    throw new Error("Invalid expression");
                }

                const result = Function(
                    '"use strict"; return (' + expression + ')'
                )();

                if (!Number.isFinite(result)) {
                    display.value = "Error";
                    expression = "";
                } else {
                    expression = String(result);
                    display.value = expression;
                }
            }
            catch {
                display.value = "Error";
                expression = "";
            }
        }
        else {
            if (display.value === "Error") {
                expression = "";
            }

            expression += value;
            display.value = expression;
        }
    });
});