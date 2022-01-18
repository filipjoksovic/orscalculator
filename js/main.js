
function addToExpression(val){
    document.getElementById("expression").value = document.getElementById("expression").value + val
}
function evaluateExpression(){
    expression = document.getElementById("expression").value
    document.getElementById("result").value = expression + " = " + math.evaluate(expression)
    clearExpression()
}  
function clearExpression(){
    console.log('clearing')
    $("#expression").val("")
    $("#expression").change()
}
function removeLastChar(){
    let newVal = $("#expression").val().substring(0,$("#expression").val().length - 1)
    console.log(newVal)
    $("#expression").val(newVal)
    $("#expression").change()
}
console.log($("#fUp"))
$("#fUp").change(function(){
    let file = document.getElementById("fUp")
    console.log(file)
    console.log(file.files)
    console.log(file.files[0])
    let selectedFile = file.files[0]
    $.ajax({
        url:'/upload',
        type:'POST',
        contentType:"application/json",
        data:{
            'file':selectedFile
        },
        success:function(response){
            console.log(response)
        },
        error:function(response){
            console.log(response)

        }
    })
}) 