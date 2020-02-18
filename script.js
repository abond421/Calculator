const buttons = document.querySelectorAll(".btn");
const formula = document.querySelector("#input");
const deleteBtn = document.querySelectorAll(".delete");
const result = document.querySelector("#result");

for (const button of buttons) {
  button.addEventListener("click", e => {
    console.log("you clicked: ", button.innerHTML);

    if (button.innerHTML == "AC") {
      wipeFormula();
    } else if (button.innerHTML == "DEL") {
      deleteLast();
    } else if (button.innerHTML == "=") {
      result.innerHTML = calculate(formula.innerHTML);
    } else if (button.innerHTML == "Ans") {
      formula.innerHTML = result.innerHTML;
    } else {
      formula.innerHTML += button.innerHTML;
    }
  });
}

function calculate(formula) {
  const noWsStr = formula.replace(/\s/g, "");
  const operator = noWsStr.replace(/[\d.,]/g, "").split("");
  const operand = noWsStr
    .replace(/[+/%*-]/g, " ")
    .replace(/\,/g, ".")
    .split(" ")
    .map(parseFloat)
    .filter(it => it);

  if (operator.length >= operand.length) {
    throw new Error("Too many operators!");
  }

  while (operator.includes("*")) {
    let placement = operator.indexOf("*");
    operand.splice(placement, 2, operand[placement] * operand[placement + 1]);
    operator.splice(placement, 1);
  }
  while (operator.includes("/")) {
    let placement = operator.indexOf("/");
    operand.splice(placement, 2, operand[placement] / operand[placement + 1]);
    operator.splice(placement, 1);
  }
  while (operator.includes("%")) {
    let placement = operator.indexOf("%");
    operand.splice(placement, 2, operand[placement] % operand[placement + 1]);
    operator.splice(placement, 1);
  }

  let result = operand[0];
  for (let i = 0; i < operator.length; i++) {
    operator[i] === "+"
      ? (result += operand[i + 1])
      : (result -= operand[i + 1]);
  }
  return result;
}

function wipeFormula() {
  formula.innerHTML = "";
  result.innerHTML = "";
}

function deleteLast() {
  formula.innerHTML = formula.innerHTML.slice(0, -1);
}
