function addToExpression(val){
    let existingText = $("#expression-area").val()
    console.log(existingText)
    existingText += " "
    existingText+=val
    $("#expression-area").val(existingText)
}