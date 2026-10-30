
const display = document.getElementById("display");
const history = document.getElementById("history");
const buttons = document.querySelectorAll(".btn");

let expression = "";

buttons.forEach(function(button) {
    button.addEventListener("click", function() {

        const value = button.textContent;

        if (value === "C") {
            expression = "";
            display.value = "0";
            history.textContent = "";
        }

        else if (value === "⌫") {
            expression = expression.slice(0, -1);
            display.value = expression || "0";
            history.textContent = "";
        }

        else if (value === "=") {
            try {
                if (expression.trim() === "") return;

                if (!/^[0-9+\-*/().\s]+$/.test(expression)) {
                    throw new Error("Invalid");
                }

                const result = Function(
                    '"use strict"; return (' + expression + ')'
                )();

                if (!Number.isFinite(result)) {
                    throw new Error("Invalid");
                }

                // Show entered expression above result
                history.textContent = expression + " =";

                // Show result below
                expression = String(result);
                display.value = expression;

            } catch {
                display.value = "Error";
                expression = "";
                history.textContent = "";
            }
        }

        else {
            if (display.value === "Error") {
                expression = "";
            }

            expression += value;
            display.value = expression;
            history.textContent = "";
        }

    });
});
