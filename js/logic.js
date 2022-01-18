
let system = ["DEC", "BIN", "OCT", "HEX"]
let chosenSystem = "";
let chosenOperator = "";

let a = [1, 0, 1]
let b = [1, 1, 0, 0, 1]

equalizeBits(a, b)
console.log(a, b)
console.log(and(a, b))
console.log(or(a, b))
console.log(not(a))
console.log(not(b))
console.log(nand(a, b))
console.log(nor(a, b))
console.log(xor(a, b))
console.log(xnor(a, b))

let operators = ["AND", "OR", "NOT", "NAND", "NOR", "XOR", "XNOR"]

$(document).ready(function () {
    chosenSystem = "BIN"
    setSystem(chosenSystem)
})

function parseExpression(expression) {
    let found = false;
    let iterator = 0;
    let a;
    let b;
    for (let operator of operators) {
        if (expression.includes(operator)) {
            selectedOperator = operator;
            let startIndex = expression.indexOf(selectedOperator)
            let endIndex = startIndex + selectedOperator.length
            a = expression.substring(0, startIndex)
            b = expression.substring(endIndex, expression.length)
            break;
        }
    }
    let a_bits = convertToBits(a)
    let b_bits = convertToBits(b)
    equalizeBits(a_bits, b_bits)
    let res;
    if (selectedOperator == "AND") {
        res = and(a_bits, b_bits)
    }
    else if (selectedOperator == "OR") {
        res = or(a_bits, b_bits)
    }
    else if (selectedOperator == "NOR") {
        res = nor(a_bits, b_bits)
    }
    else if (selectedOperator == "NOT") {
        res = not(a_bits)
    }
    else if (selectedOperator == "XOR") {
        res = xor(a_bits, b_bits)
    }
    else if (selectedOperator == "NAND") {
        res = nand(a_bits, b_bits)
    }
    else if (selectedOperator == "XNOR") {
        res = xnor(a_bits, b_bits)
    }
    console.log(res)

}
function convertToBits(str) {
    let bits = []
    for (let s of str) {
        bits.push(s)
    }
    return bits;
}
function setSystem(sys) {
    chosenSystem = sys
    $(".neumorphic.button").removeClass("neumorphic-pressed")
    $("#" + sys).toggleClass("neumorphic-pressed")

    setButtons(sys)
}
function setButtons(sys) {
    $(".number").prop("disabled",true)
    $("."+sys.toLowerCase()).prop("disabled",false)
}
function addToExpression(val) {
    $("#expression-area").val($("#expression-area").val() + val)
}

function clearExpression() {
    $("#expression-area").val('')
    $("#expression-area").change()
}
function setOperator(sys) {
    if (chosenSystem == "") {
        $("#expression-area").val($("#expression-area").val() + sys)
    }
    else {
        let val = $("#expression-area").val()
        val = val.replace(chosenSystem, sys)
        $("#expression-area").val(val)
        $("#expression-area").change()
    }
    chosenSystem = sys
}
function calculateExpression() {
    let expression = $("#expression-area").val()
    console.log(parseExpression(expression))
}



function equalizeBits(a, b) {
    let difference = Math.abs(a.length - b.length)

    if (a.length > b.length) {
        for (let i = 0; i < difference; i++) {
            b.unshift('0')
        }
    }
    if (a.length < b.length) {
        for (let i = 0; i < difference; i++) {
            a.unshift('0')
        }
    }
}

function and(a, b) {
    let res = []
    for (let i = 0; i < a.length; i++) {
        res.push(a[i] & b[i]);
    }
    return res;
}
function or(a, b) {
    let res = []
    for (let i = 0; i < a.length; i++) {
        res.push(a[i] | b[i]);
    }
    return res;
}
function not(a) {
    let res = []
    for (let i = 0; i < a.length; i++) {
        res.push(+!a[i]);
    }
    return res;
}
function nand(a, b) {
    res = and(a, b)
    for (let i = 0; i < a.length; i++) {
        res[i] = +!res[i]
    }
    return res
}
function nor(a, b) {
    res = or(a, b)
    for (let i = 0; i < a.length; i++) {
        res[i] = +!res[i]
    }
    return res
}
function xor(a, b) {
    let res = []
    for (let i = 0; i < a.length; i++) {
        res.push(a[i] ^ b[i]);
    }
    return res;
}
function xnor(a, b) {
    res = xor(a, b)
    for (let i = 0; i < a.length; i++) {
        res[i] = +!res[i]
    }
    return res
}