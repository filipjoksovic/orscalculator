function addToExpression(val) {
    document.getElementById("expression").value = document.getElementById("expression").value + val
}

function evaluateExpression() {
    expression = document.getElementById("expression").value
    document.getElementById("result").value = expression + " = " + math.evaluate(expression)
    clearExpression()
}

function evaluateFromString(str) {
    document.getElementById("result").value += str + " = " + math.evaluate(str) + "\n"
    clearExpression()
}

function clearExpression() {
    console.log('clearing')
    $("#expression").val("")
    $("#expression").change()
}

function removeLastChar() {
    let newVal = $("#expression").val().substring(0, $("#expression").val().length - 1)
    console.log(newVal)
    $("#expression").val(newVal)
    $("#expression").change()
}
console.log($("#fUp"))
$("#fUp").change(function () {
    let file = document.getElementById("fUp")
    console.log(file)
    console.log(file.files)
    console.log(file.files[0])
    let selectedFile = file.files[0]
    var fr = new FileReader();
    let textContent;
    fr.onload = function () {
        textContent = fr.result
        console.log(textContent.split("\n"))
        equationsArray(textContent.split("\n"))
        setTextContent(textContent, fr.result)
        calculateFromFile()
    }
    fr.readAsText(file.files[0])
    console.log(textContent)
    // console.log(fr.readAsText(file.files[0]));
})
equations = []

function equationsArray(arr) {
    for (let element of arr) {
        equations.push(element.replace("=", "").replace("\r", ""))
    }
    console.log(equations)
}

function calculateFromFile() {
    for (let equation of equations) {
        evaluateFromString(equation)
    }
}

function setTextContent(tc, content) {
    tc = content
}