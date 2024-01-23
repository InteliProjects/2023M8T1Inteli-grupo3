const{ ipcRenderer } = require("electron")
const path = require('path')
const fs = require('fs')

var name_bool = false
var last_name_bool = false
var email_bool = false
var pass_bool = false

/**
 * Alera o tipo ds caixas de input "nova senha" e "confirmar senha" entre text e password, além de alterar o svg do olho entre aberto e fechado
 */
function changeType(){
    eye = document.getElementById("eye")
    eye_slashed = document.getElementById("eye-slashed")
    password = document.getElementById("password")

    if (eye.style.display != "none") {
        eye.style.display = "none"
        eye_slashed.style.display = "block"
        password.type = "text"
    } else {
        eye_slashed.style.display = "none"
        eye.style.display = "block"
        password.type = "password"
    }
}

/**
 * Verifica se o email inputado se encontra dentro do RegEx
 * @param email: recebe o email inserido pelo usuário
 * @returns: retorna true ou false dependendo se o email se encontra dentros do RegEx
 */
function validateEmail(email) {
    var inputs = document.getElementById("inputs")
    const emailRegex1 = /[A-Za-z0-9]+@[A-Za-z]+\.[A-Za-z]+/i;
    const emailRegex2 = /[A-Za-z0-9]+@[A-Za-z]+\.[A-Za-z]+\.[A-Za-z]/i;
    return emailRegex1.test(email) || emailRegex2.test(email);
}

/**
 * Altera a estilização da caixa de email se o formato for inválido, colocando uma borda vermelha e tornando visivel o erro
 */
function checkEmail(){
    var email = document.getElementById("email")
    var alert_email = document.getElementById("alert-email-format-error")
    var email_format_error = document.getElementById("wrong-format")

    if(!validateEmail(email.value) && email.value != ""){
        alert_email.style.display = "block"
        email_format_error.style.display = "block"
        email.style.border = "2px solid red"
        inputs.style.gap = "0px"
    } else if(validateEmail(email.value) || email.value == "") {
        alert_email.style.display = ""
        email_format_error.style.display = ""
        if(validateEmail(email.value)){
            inputs.style.gap = "15px"
            email.style.border = ""
            email_bool = true
        }
    }
}

/**
 * Altera a estilização das caixas onde nada foi escrito, colocando uma borda vermelha e tornando visivel o erro
 */
function checkInfo(){
    var inputs = document.getElementById("inputs")

    var name = document.getElementById("first-name")
    var alert_name = document.getElementById("alert-name-error")
    var name_error = document.getElementById("name-error")

    var last_name = document.getElementById("last-name")
    var alert_last_name = document.getElementById("alert-last-name-error")
    var last_name_error = document.getElementById("last-name-error")

    var email = document.getElementById("email")
    var alert_email = document.getElementById("alert-email-error")
    var email_error = document.getElementById("email-error")

    var password = document.getElementById("password")
    var alert_pass= document.getElementById("alert-pass-error")
    var pass_error = document.getElementById("pass-error")
    var pass_div = document.getElementById("password-div")

    if(name.value == "" && name_error.style.display == "") {
        alert_name.style.display = "block"
        name_error.style.display = "block"
        name.style.border = "2px solid red"
        inputs.style.gap = "0px"
    } else if (name.value != "") {
        alert_name.style.display = ""
        name_error.style.display = ""
        name.style.border = ""
        inputs.style.gap = "15px"
        name_bool = true
    }
    if(last_name.value == "" && last_name_error.style.display == "") {
        alert_last_name.style.display = "block"
        last_name_error.style.display = "block"
        last_name.style.border = "2px solid red"
        inputs.style.gap = "0px"
    } else if (last_name.value != "") {
        alert_last_name.style.display = ""
        last_name_error.style.display = ""
        last_name.style.border = ""
        inputs.style.gap = "15px"
        last_name_bool = true
    }
    if(email.value == "" && email_error.style.display == "") {
        alert_email.style.display = "block"
        email_error.style.display = "block"
        email.style.border = "2px solid red"
        inputs.style.gap = "0px"
    } else if (email.value != "") {
        alert_email.style.display = ""
        email_error.style.display = ""
        inputs.style.gap = "15px"
        if(validateEmail(email.value)){
            email.style.border = ""
            email_bool = true
        }
    }
    if(password.value == "" && pass_error.style.display == "") {
        alert_pass.style.display = "block"
        pass_error.style.display = "block"
        pass_div.style.border = "2px solid red"
        inputs.style.gap = "0px"
    } else if (password.value != "") {
        alert_pass.style.display = ""
        pass_error.style.display = ""
        pass_div.style.border = ""
        inputs.style.gap = "15px"
        pass_bool = true
    }
}

var file = document.getElementById("file")
var image = document.getElementById("image-profile")
var placeholder = document.getElementById("placeholder-img") 
var trash = document.getElementById("trash")
var imageFile
/**
 * Fica de olho se a pessoa inputa uma imagem, caso ela inpute, coloca a imagem inserida como background da div
 * faz com que o input nao seja visivel e acrescenta uma lixeira para a remoção da imagem
 */
file.addEventListener('change', function(e) {
    if (e.target.files.length > 0) {
        const file = e.target.files[0]
        imageFile = file
        imageUrl = URL.createObjectURL(file)
        placeholder.style.display = "none"
        image.style.cssText = ` display: flex; 
                                border: 5px solid white; 
                                width: 90px; 
                                height: 90px; 
                                border-radius: 50%; 
                                background-image: url(${imageUrl}); 
                                background-size: cover;
                                justify-content: center;
                                align-items: center;
                                margin-top: -20px;`
        trash.style.display = "block"
    }
})

/**
 * Caso a lixeira seja clicada, apaga a imagem, retorna o input e a lixeira some
 */
function deleteImg(){
    image.style.cssText =     ` display: flex; 
                                border: 5px solid white; 
                                width: 90px; 
                                height: 90px; 
                                border-radius: 50%; 
                                background-color: #174040; 
                                background-size: cover;
                                justify-content: center;
                                align-items: center;
                                margin-top: -20px;`
    placeholder.style.display = "block"
    trash.style.display = "none"
    file.value = "";
}

function positiveFeedback(div, text){
    let message = "<p>" + text + "</p>"
    let positiveSvg = '<svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor" class="bi bi-check-circle" viewBox="0 0 16 16"><path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/><path d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05"/></svg>'

    div.innerHTML = message + positiveSvg
    div.style.backgroundColor = "rgba(52, 170, 52, 0.695)"
    div.style.border = "1px solid white"
}

function negativeFeedback(div, text){
    let message = "<p>" + text + "</p>"
    let negativeSvg = '<svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor" class="bi bi-x-circle" viewBox="0 0 16 16"><path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/><path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/></svg>'

    div.innerHTML = message + negativeSvg
    div.style.backgroundColor = "rgba(255, 0, 0, 0.622)"
    div.style.border = "1px solid white"
}

async function sendRegister(name, last_name, email){
    let imgName
    if (imageFile == undefined) {
        imgName = null
    } else {
        imgName = imageFile.name
    }
    ipcRenderer.send('register-therapist', {
        first_name: name.value,
        last_name: last_name.value,
        email: email.value,
        file_name_image: imgName
    });
}

async function getResponse(){
    localStorage.clear()
    const respostaPromise = new Promise((resolve) => {
        ipcRenderer.once('resposta-register-therapist', (event, arg) => {
            resolve(arg);
        });
    });

    const resposta = await respostaPromise;

    let feedback = document.getElementById("feedback")
    if (resposta.message != "Houve erro no cadastramento!") {
        localStorage.setItem('id', JSON.stringify(resposta.response.dataValues.id));
    } else {
        negativeFeedback(feedback, resposta.message)
    }
    return resposta
}

/**
 * 
 * @param password 
 */
async function sendPassword(password){
    ipcRenderer.send('register-password', {
        password: password.value,
        TherapistId: parseInt(localStorage.getItem("id"))
    });
}

/**
 * Se tudo estiver dentro das condições ideais, volta para a tela de login
 */
async function createAccount(){
    checkEmail()
    checkInfo()

    var name = document.getElementById("first-name")
    var last_name = document.getElementById("last-name")
    var email = document.getElementById("email")
    var password = document.getElementById("password")
    var feedback = document.getElementById("feedback")

    if(name_bool && last_name_bool && email_bool && pass_bool){
        await sendRegister(name, last_name, email)
        let resposta = await getResponse()
        await sendPassword(password)

        if (imageFile != undefined) {
            let destinationPath = path.join(__dirname, '..', 'Profile_images', imageFile.name)
            fs.copyFile(imageFile.path, destinationPath, (err) => {
                if (err) throw err;
                console.log('Arquivo copiado com sucesso!');
            });
        }

        if(resposta.message == "Cadastro criado com sucesso!"){
            positiveFeedback(feedback, resposta.message)
            setTimeout(() => {
                localStorage.clear()
                feedback.innerHTML = ""
                feedback.style.backgroundColor = ""
                feedback.style.border = ""
                window.location.href = "../Login/index.html"
            }, 3000)
        } else {
            negativeFeedback(feedback, resposta.message)
            setTimeout(() => {
                localStorage.clear()
                feedback.innerHTML = ""
                feedback.style.backgroundColor = ""
                feedback.style.border = ""
            }, 3000)
        }
    }
}