let expression = "";
let result = "";

let systems = ["DEC", "BIN", "HEX", "OCT"]

let parsedExpression = {
    "starting_system": null,
    "number": null,
    "ending_system": null
}

function setSystem(val) {
    let lastChar = expression[expression.length - 1]
    if (Number.isNaN(parseInt(lastChar))) {
        expression += val
    } else {
        expression += " " + val
    }
    console.log(expression)
    setExpressionHolder(expression)
}

function addToExpression(val) {
    let lastChar = expression[expression.length - 1]
    if (Number.isNaN(parseInt(lastChar))) {
        expression += " " + val
        console.log('isnan')
    } else {
        expression += val
    }
    console.log(expression)
    setExpressionHolder(expression)
}

function setExpressionHolder(expression) {
    $("#expression-area").text(expression)
}

function clearExpression() {
    expression = ""
    setExpressionHolder(expression)
}

function calculateExpression() {
    if (expression == "") {
        console.log('here')
        console.log(expression)
        console.log($("#expression-area").val())
        expression = $("#expression-area").val()
    }
    let data = expression.split(" ")
    console.log(data)
    parsedExpression.starting_system = data[0]
    parsedExpression.number = data[1]
    parsedExpression.ending_system = data[2]
    if (parsedExpression.starting_system == "" && parsedExpression.ending_system == "" && parsedExpression.number == "") {
        console.log('here')
        return
    } else {
        console.log(parsedExpression)
        if (parsedExpression.starting_system == "DEC") {
            console.log('dec')
            if (parsedExpression.ending_system == "BIN") {
                console.log('bin')

                result = decToBin(parsedExpression.number)
            } else if (parsedExpression.ending_system == "OCT") {
                console.log('oct')

                result = decToOct(parsedExpression.number)

            } else if (parsedExpression.ending_system == "HEX") {
                console.log('hex')
                result = decToHex(parsedExpression.number)
            }
        } else if (parsedExpression.starting_system == "BIN") {
            console.log('bin')

            if (parsedExpression.ending_system == "DEC") {
                result = binToDec(parsedExpression.number)
            } else if (parsedExpression.ending_system == "OCT") {
                result = binToOct(parsedExpression.number)

            } else if (parsedExpression.ending_system == "HEX") {
                result = binToHex(parsedExpression.number)
            }
        } else if (parsedExpression.starting_system == "OCT") {
            if (parsedExpression.ending_system == "DEC") {
                result = octToDec(parsedExpression.number)
            } else if (parsedExpression.ending_system == "BIN") {
                result = octToBin(parsedExpression.number)
            } else if (parsedExpression.ending_system == "HEX") {
                result = octToHex(parsedExpression.number)
            }
        } else if (parsedExpression.starting_system == "HEX") {
            if (parsedExpression.ending_system == "DEC") {
                result = hexToDec(parsedExpression.number)
            } else if (parsedExpression.ending_system == "BIN") {
                result = hexToBin(parsedExpression.number)
            } else if (parsedExpression.ending_system == "OCT") {
                result = hexToOct(parsedExpression.number)
            }
        } else {
            console.log('err')
        }
        result = expression + " = " + (result == "") ? "Error" : result
        return result
    }
}

function evaluateExpression() {
    result = calculateExpression()
    $("#result-area").val(result)
    clearExpression()
}

function decToBin(number) {
    if (number >= 0) {
        return parseInt(number, 10).toString(2);
    } else {
        return (~number).toString(2);
    }
}

function decToHex(number) {
    console.log(number)
    return parseInt(number, 10).toString(16)
}

function decToOct(number) {
    return parseInt(number, 10).toString(8).toUpperCase();
}

function binToDec(number) {
    return parseInt(number, 2).toString(10).toUpperCase();
}

function binToOct(number) {
    console.log(parseInt(number, 2))
    console.log(parseInt(number, 2).toString(8))
    return parseInt(number, 2).toString(8).toUpperCase();
}

function binToHex(number) {
    return parseInt(number, 2).toString(16).toUpperCase();
}

function octToBin(number) {
    return parseInt(number, 8).toString(8).toUpperCase();
}

function octToDec(number) {
    return parseInt(number, 8).toString(10).toUpperCase();
}

function octToHex(number) {
    return parseInt(number, 8).toString(16).toUpperCase();
}

function hexToBin(number) {
    return parseInt(number, 16).toString(2).toUpperCase();
}

function hexToDec(number) {
    return parseInt(number, 16).toString(10).toUpperCase();
}

function hexToOct(number) {
    return parseInt(number, 16).toString(8).toUpperCase();
}
$("#fUp").change(function () {
    let file = document.getElementById("fUp")
    let selectedFile = file.files[0]
    var fr = new FileReader();
    let textContent;
    fr.onload = function () {
        textContent = fr.result
        equationsArray(textContent.split("\n"))
        setTextContent(textContent, fr.result)
        calculateFromFile()
    }
    fr.readAsText(file.files[0])
})
equations = []

function equationsArray(arr) {
    for (let element of arr) {
        equations.push(element.replace("=", "").replace("\r", ""))
    }
}

function calculateFromFile() {
    for (let i = 0; i <  equations.length -1; i++) {
        expression = equations[i]
        console.log(expression)
        // res = expression + " = " + calculateExpression() + "\n"
        document.getElementById("result-area").value += calculateExpression() + "\n"
        clearExpression()
    }
}

function setTextContent(tc, content) {
    tc = content
}