function getInputValue(id) {
    return document.getElementById(id).value;
}

function setInputValue(id, value) {
    document.getElementById(id).value = value;
}

function saveStateInStorage() {
    const currentValue = getInputValue("data");
    setInputValue("store", currentValue);
}

function numberAction(number) {
    if (getInputValue("data") === "0") {
        setInputValue("data", "");
    }

    if (getInputValue("data").length + 2 <= String(Number.MAX_SAFE_INTEGER).length) {
        setInputValue("data", getInputValue("data") + number);
    }
}

function plusAction() {
    saveStateInStorage();
    setInputValue("data", "");
    setInputValue("operation", "+");
}

function minusAction() {
    saveStateInStorage();
    setInputValue("data", "");
    setInputValue("operation", "-");
}

function multiplyAction() {
    saveStateInStorage();
    setInputValue("data", "");
    setInputValue("operation", "*");
}

function divideAction() {
    saveStateInStorage();
    setInputValue("data", "");
    setInputValue("operation", "/");
}

function deleteAction() {
    const currentValue = getInputValue("data");
    setInputValue("data", currentValue.substring(0, currentValue.length - 1));
}

function performEvaluation() {
    document.getElementById("error").textContent = "";
    const a = Number(getInputValue("store"));
    const b = Number(getInputValue("data"));
    const operation = getInputValue("operation");

    let result;
    if (operation === "+") {
        result = a + b;
    } else if (operation === "-") {
        result = a - b;
    } else if (operation === "*") {
        result = a * b;
    } else if (operation === "/") {
        if (Number(b) === 0) {
            document.getElementById("error").textContent = "На ноль делить нельзя!";
            result = b;
        } else {
            result = a / b;
        }
    } else {
        result = b;
    }

    setInputValue("data", result);
    setInputValue("operation", "");
}

document.onkeydown = function (e) {
	switch(e.key){
		case '1':
		case '2':
		case '3':
		case '4':
		case '5':
		case '6':
		case '7':
		case '8':
		case '9':
		case '0':
			numberAction(e.key);
		break;
		case '+':
			plusAction();
		break;
		case '-':
			minusAction();
		break;
		case '*':
			multiplyAction();
		break;
		case '/':
			divideAction();
		break;
		case 'Backspace':
			deleteAction();
		break;
		case '=':
		case 'Enter':
			performEvaluation()
		break;
	}
};