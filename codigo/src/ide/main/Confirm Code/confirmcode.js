const { ipcRenderer } = require("electron")

var code_bool = false
var new_pass_bool = false
var confirm_pass_bool = false

/**
 * Alera o tipo ds caixas de input "nova senha" e "confirmar senha" entre text e password, além de alterar o svg do olho entre aberto e fechado
 * @param num: qual tipo está atualmente
 */
function changeType(num){
    eye_1 = document.getElementById("eye-1")
    eye_slashed_1 = document.getElementById("eye-slashed-1")
    new_password = document.getElementById("new-password")
    
    eye_2 = document.getElementById("eye-2")
    eye_slashed_2 = document.getElementById("eye-slashed-2")
    confirm_password = document.getElementById("confirm-password")

    if(num == 1)
        if (eye_1.style.display != "none") {
            eye_1.style.display = "none"
            eye_slashed_1.style.display = "block"
            new_password.type = "text"
        } else {
            eye_slashed_1.style.display = "none"
            eye_1.style.display = "block"
            new_password.type = "password"
        }
    else if (num == 2) {
        if (eye_2.style.display != "none") {
            eye_2.style.display = "none"
            eye_slashed_2.style.display = "block"
            confirm_password.type = "text"
        } else {
            eye_slashed_2.style.display = "none"
            eye_2.style.display = "block"
            confirm_password.type = "password"
        }
    }
}

/**
 * Altera a estilização das caixas onde nada foi escrito, colocando uma borda vermelha e tornando visivel o erro
 */
function checkInfo(){
    var inputs = document.getElementById("inputs")

    var code = document.getElementById("code")
    var alert_code_error = document.getElementById("alert-code-error")
    var code_error = document.getElementById("code-error")

    var new_password = document.getElementById("new-password")
    var alert_new_pass= document.getElementById("alert-new-pass-error")
    var new_pass_error = document.getElementById("new-pass-error")
    var new_pass_div = document.getElementById("new-password-div")
    
    var confirm_password = document.getElementById("confirm-password")
    var alert_confirm_pass= document.getElementById("alert-confirm-pass-error")
    var confirm_pass_error = document.getElementById("confirm-pass-error")
    var confirm_pass_div = document.getElementById("confirm-password-div")

    if(code.value == "" && code_error.style.display == "") {
        alert_code_error.style.display = "block"
        code_error.style.display = "block"
        code.style.border = "2px solid red"
        inputs.style.gap = "0px";
    } else if (code.value != "") {
        checkCode(code.value)
    }

    if(new_password.value == "" && new_pass_error.style.display == "") {
        alert_new_pass.style.display = "block"
        new_pass_error.style.display = "block"
        new_pass_div.style.border = "2px solid red"
        inputs.style.gap = "0px";
    } else if (new_password.value != "") {
        alert_new_pass.style.display = ""
        new_pass_error.style.display = ""
        new_pass_div.style.border = ""
        inputs.style.gap = "15px";
        if(new_password.value == confirm_password.value){
            new_pass_bool = true
        }
    }

    if(confirm_password.value == "" && confirm_pass_error.style.display == "") {
        alert_confirm_pass.style.display = "block"
        confirm_pass_error.style.display = "block"
        confirm_pass_div.style.border = "2px solid red"
    } else if (confirm_password.value != "") {
        alert_confirm_pass.style.display = ""
        confirm_pass_error.style.display = ""
        confirm_pass_div.style.border = ""
        inputs.style.gap = "15px";
        if(new_password.value == confirm_password.value){
            confirm_pass_bool = true
        }
    }
}

/**
 * Confere se o código tem tamanho 6, caso não tenha, ele torna visivel um erro
 * Obs.: medida provisória devida a falta de back
 */
function sdsadsadz(){
    var inputs = document.getElementById("inputs")
    var code = document.getElementById("code")
    var alert_code_len_error = document.getElementById("alert-code-len-error")
    var code_len_error = document.getElementById("code-len-error")

    if(code.value.length != 6 && code.value != ""){
        alert_code_len_error.style.display = "block"
        code_len_error.style.display = "block"
        code.style.border = "2px solid red"
        inputs.style.gap = "0px"
        return false
    } else {
        alert_code_len_error.style.display = ""
        code_len_error.style.display = ""
        if(code.value.length != 6 && code.value != ""){
            inputs.style.gap = "15px"
            code.style.border = ""
            return true
        }
    }
}

function checkCode(code){
    if(code.length != 6){
        return false
    } else {
        ipcRenderer.send('read-codigo', code)
        ipcRenderer.on("resposta-read-codigo", (event, arg) => {
            console.log(arg)
        })
    }
}
 /**
  * Confere se as senhas inseridas nos inputs "nova senha" e "confirmar senha" são iguais. Caso não for, torna visivel um erro
  */
function passMatch(){
    var inputs = document.getElementById("inputs")

    var new_password = document.getElementById("new-password")
    var new_pass_div = document.getElementById("new-password-div")
    
    var confirm_password = document.getElementById("confirm-password")
    var confirm_pass_div = document.getElementById("confirm-password-div")

    var alert_dont_match= document.getElementById("alert-dont-match")
    var dont_match= document.getElementById("dont-match")

    if(new_password.value != confirm_password.value){
        alert_dont_match.style.display = "block"
        dont_match.style.display = "block"
        new_pass_div.style.border = "2px solid red"
        confirm_pass_div.style.border = "2px solid red"
        inputs.style.gap = "0px";
    } else if (new_password.value != "" && confirm_pass_div.value != ""){
        alert_dont_match.style.display = ""
        dont_match.style.display = ""
        new_pass_div.style.border = ""
        confirm_pass_div.style.border = ""
        inputs.style.gap = "15px"
        new_pass_bool = true
        confirm_pass_bool = true
    }
}

/**
 * Dependendo de todas as variáveis que indicam que estão num cenário correto, o botão leva para a tela de login
 */
function changePass(){
    passMatch()
    checkInfo()
//     if(code_bool && new_pass_bool && confirm_pass_bool){
//         window.location.href = '../Login/index.html'
//     }
}