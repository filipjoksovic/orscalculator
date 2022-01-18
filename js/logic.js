let system = ["DEC", "BIN", "OCT", "HEX"]
let chosenSystem = "";
let chosenOperator = "";

let operators = ["AND", "OR", "NOT", "NAND", "NOR", "XOR", "XNOR"]

$(document).ready(function () {
    chosenSystem = "BIN"
    setSystem(chosenSystem)
})

function getSystem(expression) {
    return expression.substring(0, 3)
}

function getExpression(expression) {
    return expression.substring(3, expression.length)
}

function parseExpression(expression) {
    //remove any spaces the user might input
    expression = expression.replace(" ", "")
    //find the number system the user will be using
    let system = getSystem(expression)
    let expressionToParse = getExpression(expression)
    let iterator = 0;
    let a;
    let b;
    let startIndex;
    let endIndex;
    //find the operation we're working with
    for (let operator of operators) {
        if (expressionToParse.includes(operator)) {
            selectedOperator = operator;
            if (operator != "NOT") {
                startIndex = expressionToParse.indexOf(selectedOperator)
                endIndex = startIndex + selectedOperator.length
                a = expressionToParse.substring(1, startIndex)
                b = expressionToParse.substring(endIndex, expressionToParse.length)
            } else {
                startIndex = expressionToParse.indexOf(selectedOperator) + 3
                endIndex = expressionToParse.length
                a = expressionToParse = expressionToParse.substring(startIndex,endIndex)
                b = ""
            }
            break;
        }
    }
    //convert from any system to binary so it can be used in the next steps
    console.log(a)
    console.log(b)
    a = convertToBinary(a, system)
    b = convertToBinary(b, system)
    console.log(a, b)
    let a_bits = convertToBits(a)
    let b_bits = convertToBits(b)
    //make the ammount of bits the same
    equalizeBits(a_bits, b_bits)

    let res;
    //pick a selected operation and to the function    
    if (new RegExp("\\b"+"NAND"+"\\b").test(selectedOperator)) {
        res = nand(a_bits, b_bits)
    } else if (new RegExp("\\b"+"XOR"+"\\b").test(selectedOperator)) {
        res = xor(a_bits, b_bits)
    } else if (new RegExp("\\b"+"NOR"+"\\b").test(selectedOperator)) {
        res = nor(a_bits, b_bits)
    } else if (new RegExp("\\b"+"NOT"+"\\b").test(selectedOperator)) {
        res = not(a_bits)
    } else if (new RegExp("\\b"+"OR"+"\\b").test(selectedOperator)) {
        res = or(a_bits, b_bits)
    } else if (new RegExp("\\b"+"AND"+"\\b").test(selectedOperator)) {
        res = nand(a_bits, b_bits)
    } else if (new RegExp("\\b"+"XNOR"+"\\b").test(selectedOperator)) {
        res = xnor(a_bits, b_bits)
    }
    console.log(res)
    return res
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
    $("#expression-area").val(sys + "(")
    setButtons(sys)
}

function setButtons(sys) {
    $(".number").prop("disabled", true)
    $("." + sys.toLowerCase()).prop("disabled", false)
}

function addToExpression(val) {
    $("#expression-area").val($("#expression-area").val() + val)
}

function clearExpression() {
    $("#expression-area").val('')
    $("#expression-area").change()
    setSystem("BIN")
}

function setOperator(sys) {
    if (chosenOperator == "") {
        $("#expression-area").val($("#expression-area").val() + sys)
    } else {
        let val = $("#expression-area").val()
        val = val.replace(chosenOperator, sys)
        $("#expression-area").val(val)
        $("#expression-area").change()
    }
    chosenOperator = sys
}

function calculateExpression() {
    let expression = $("#expression-area").val()
    console.log(expression)
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

function convertToBinary(a, sys) {
    if (sys == "BIN") {
        return a;
    } else if (sys == "OCT") {
        return parseInt(a, 8).toString(2)
    } else if (sys == "DEC") {
        return parseInt(a, 10).toString(2)
    } else if (sys == "HEX") {
        return parseInt(a, 16).toString(2)
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
        if(a[i] == 1 || a[i] == '1'){
            res.push(0);
        }
        else{
            res.push(1);
        }
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