

var passwordShowed  = false;
var passwordCreateShowed = false;
var passwordTransShowed = false;

var errorPassword = true;
var errorTelegram = true;
var errorWhatsapp = true;
var errorTransaction = true;
var langCode = 0;
var langToSwitch = "en"; // default
var iconPasswordLogin = document.querySelector(".btn-show-login-pass i");
var inputLoginPass = document.querySelector("#login-password");

$(".no-account").on("click", function() {
    $(".login").fadeOut(0);
    $(".register").fadeIn(300);
});

$(".lang.abs").on("click", function() {
    $(".choose-lang").fadeIn(200);
    $(".choose-lang").css("display", "flex");
});
$(".close-lang").on("click", function() {
    $(".choose-lang").fadeOut(200);
});
// var language

var languageText = ["<span><i class='fa fa-globe'></i></span> Language", "<span><i class='fa fa-globe'></i></span> Language"]; 
var connexionText = ["Connexion", "Connection"];
var dontHaveAccountText = ["I don't have an account? Register", "Je n'ai pas de compte? S'incrire"];
var haveAccountText = ["I have already an account - Log in", "J'ai déja un compte - Se connecter "];
var yourEmailText = ["Your email", "Votre email"];
var loginText = ["Log in", "Se connecter"];
var signUpText = ["Sign up", "Inscription"];
var passwordText = ["Password", "Mot de passe"];
var createPasswordText = ["Create password", "Créer un mots de passe"];
var confirmPasswordText = ["Confirm password", "Confirmer le mots de passe"];
var transactionPasswordText = ["Transaction password", "Mots de password de transaction"];
var registerText = ["Register", "S'incrire"];
var invitationText = ["Invitation code", "Code d'invitation"];
var passwordDoesntMatchText = ["Password doesn't match", "Password different"];
var atLeastPasswordText = ["Password must be 8 characters at least", "Le mots de passe doit être 8 caractères minimum"];
var errorTelegramText = ["Telegram link does not have a space", "Le lien Telegram ne doit pas contenir un espace."];
var impossibleText = ["Impossible value length", "Taille le valeur impossible"];
var errorTransactionText = ["Transaction password must has 6 character at least", "Le mots de passe de transaction ne doit pas être minimum de 6 caractéres."];
var emailAlreadyExistsText = ["Email already exists", "Le courrier électronique existe déjà"];
var transPassSameText = ["Transaction password never be the same of your password. Please, change it", "Le mot de passe de la transaction ne sera jamais le même de votre mot de passe. S'il vous plaît, changez-le"];
var checkAllFieldText = ["ERROR:: Check the all fields and fill them out please. Thank you!", "ERREUR:: Vérifiez tous les champs et remplissez-les s'il vous plaît. Merci!"];
var accountCreatedText = ["Hello, new account created successfully. You can login your account now. Thanks for you trusting.", "Bonjour, nouveau compte créé avec succès. Vous pouvez vous connecter à votre compte maintenant. Merci d'avoir confié."];
var inviteCodeErrorText = ["Invitation code does not exist.", "Le code d'invitation n'existe pas."];
var errorWhatsappText = ["Whatsapp number does not have space.", "Le numéro WhatsApp n'a pas d'espace."];
// end them here
function switchLanguageTo(lang) {
    if (lang == 'en') {
        langCode = 0;
    } else if (lang == 'fr') {
        langCode = 1;
    }
    changeMainPage(langCode);
}

function changeMainPage(code) {
    $(".fields .login h2").html(loginText[code]);
    $(".fields .register h2").html(signUpText[code]);
    $(".no-account").html(dontHaveAccountText[code]);
    $(".btn-register button").html(registerText[code]);
    $(".fields .register form .create-password input").attr("placeholder", createPasswordText[code]);
    $(".fields .register form .confirm-password input").attr("placeholder", confirmPasswordText[code]);
    $(".fields .register form .transaction-password input").attr("placeholder", transactionPasswordText[code]);
    $(".lang.abs p").html(languageText[code]);
    $(".fields .login form .email input").attr("placeholder", yourEmailText[code]);
    $(".fields .register form .email input").attr("placeholder", yourEmailText[code]);
    $(".fields .login form .password input").attr("placeholder", passwordText[code]);
    $(".fields .register form .invitation-code input").attr("placeholder", invitationText[code]);
    $(".btn-login button").html(connexionText[code]);
    $(".have-account").html(haveAccountText[code]);
    $(".choose-lang").fadeOut(200);
}
$(".success-alert .main-success .ok").on("click", function() {
    $(".success-alert").fadeOut(200);
    document.querySelector(".login-form .password input").focus();
});

var availLang = ["en", "fr"];
var screenH = screen.availHeight - 100;

$(window).on("load", function() {
    $(".main-street").css("height", screenH + "px");
    var key = $("input#invitation-code").val();
    var error_pass = $(".login-form .error.error-password").attr("error");
    var error_email = $(".login-form .error.error-user").attr("error");
    if (key.length == 6 && key != "") {
        $(".login").fadeOut(0);
        $(".register").fadeIn(300);
    }
    
    if (error_pass == "true") {
        $(".login-form .error.error-password").show()
    }
    if (error_email == "true") {
        $(".login-form .error.error-user").show()
    }
});

$(".each-lang").on("click", function() {
    var languageCode = $(this).attr("lang");
    var haldId = null;
    for (let i = 0; i < availLang.length; i++) {
        if (languageCode == availLang[i]) {
            halfId = ".each-lang." + availLang[i] + " .rond span";
            document.querySelector(halfId).classList.replace("disabled", "active");
            langToSwitch = availLang[i] 
        } else {
            halfId = ".each-lang." + availLang[i] + " .rond span";
            document.querySelector(halfId).classList.replace("active", "disabled");
        }
    }
});

$(".valid-change").on("click", function() {
    switchLanguageTo(langToSwitch);
});

$(".register-form .email input").on("input", function() {
    $(".error-create-email").hide();
});

$(".register-form .invitation-code input").on("input", function() {
    $(".error-code").hide();
});


$(".have-account").on("click", function() {
    $(".login").fadeIn(300);
    $(".register").fadeOut(0);
});

$(".btn-show-transaction-password").on("click", function() {
    if (passwordTransShowed) {
        $(".transaction-password input").attr("type", "password");
        passwordTransShowed = false;
        $(".btn-show-transaction-password i").attr("class", "fa fa-eye-slash");
    } else {
        $(".transaction-password input").attr("type", "text");
        passwordTransShowed = true;
        $(".btn-show-transaction-password i").attr("class", "fa fa-eye");
    }
});


function checkCreatePassword() {
    var createPasswordValue = $(".create-password input").val();
    var confirmPasswordValue = $(".confirm-password input").val();
    if (confirmCreatePassword == "" && createPasswordValue == "") {
        $(".error-create-pass").hide();
        $(".error-confirm-pass").hide();
        errorPassword = true;
    }
    if (createPasswordValue.length < 8 && confirmPasswordValue == "") {
        $(".error-create-pass").show();
        $(".error-create-pass").html(atLeastPasswordText[langCode]);
        errorPassword = true;
    } else {
        if (confirmPasswordValue != "" && createPasswordValue != "" && confirmPasswordValue != createPasswordValue) {
            $(".error-create-pass").show();
            $(".error-create-pass").html(passwordDoesntMatchText[langCode]);
            
            $(".error-confirm-pass").show();
            $(".error-confirm-pass").html(passwordDoesntMatchText[code]);
            errorPassword = true;
        } else {
            $(".error-create-pass").hide();
            $(".error-confirm-pass").hide();
            errorPassword = false;
        }
    }
};

function confirmCreatePassword() {
    var createPasswordValue = $(".create-password input").val();
    var confirmPasswordValue = $(".confirm-password input").val();
    if (confirmCreatePassword == "" && createPasswordValue == "") {
        $(".error-create-pass").hide();
        errorPassword = true;
        $(".error-confirm-pass").hide();
    }
    if (confirmPasswordValue.length < 8 && createPasswordValue == "") {
        $(".error-confirm-pass").show();
        $(".error-confirm-pass").html(atLeastPasswordText[langCode]);
        errorPassword = true;
    } else {
        if (confirmPasswordValue != "" && createPasswordValue != "" && confirmPasswordValue != createPasswordValue) {
            $(".error-create-pass").show();
            $(".error-create-pass").html(passwordDoesntMatchText[langCode]);
            
            $(".error-confirm-pass").show();
            $(".error-confirm-pass").html(passwordDoesntMatchText[langCode]);
            errorPassword = true;
        } else {
            $(".error-create-pass").hide();
            $(".error-confirm-pass").hide();
            errorPassword = false;
        }
    }
};

function checkTelegram() {
    var telegramValue = $(".telegram input").val();
    var len = telegramValue.split(" ");
    if (len.length != 1) {
        $(".error-telegram").show();
        $(".error-telegram").html(errorTelegramText[langCode]);
        errorTelegram = true;
    } else {
        if (telegramValue.length < 3) {
            $(".error-telegram").html(impossibleText[langCode]);
            errorTelegram = true;
        } else {
            $(".error-telegram").hide();
            errorTelegram = false;
        }
    }
};

function checkWhatsapp() {
    var telegramValue = $(".whatsapp input").val();
    var len = telegramValue.split(" ");
    if (len.length != 1) {
        $(".error-whatsapp").show();
        $(".error-whatsapp").html(errorWhatsappText[langCode]);
        errorWhatsapp = true;
    } else {
        $(".error-whatsapp").hide();
        errorWhatsapp = false;
    }
};

function checkTransaction() {
    var value = $(".transaction-password input").val();
    
    if (value.length == 0) {
        $(".error-transaction").hide();
        errorTransaction = true;
    } else {
        if (value.length < 7) {
            $(".error-transaction").show();
            $(".error-transaction").html(errorTransactionText[langCode]);
            errorTransaction = true;
        } else {
            $(".error-transaction").hide();
            errorTransaction = false;
        }
    }
}

function checkAll() {
    if (errorPassword) {
        var p = document.querySelector(".create-password input");
        p.focus();
        return false;
    } else {
        if (errorTransaction) {
            var t = document.querySelector(".transaction-password input");
            t.focus();
            return false;
        } else {
            if (errorTelegram) {
                var tel = document.querySelector(".telegram input");
                tel.focus();
                return false;
            } else {
                if (errorWhatsapp) {
                    var w = document.querySelector(".whatsapp input");
                    w.focus();
                    return false;
                } else {
                    return true;
                }
            }
        }
    }
};

$(".create-password input").on("input", checkCreatePassword);
$(".confirm-password input").on("input", confirmCreatePassword);
$(".telegram input").on("input", checkTelegram);
$(".whatsapp input").on("input", checkWhatsapp);
$(".transaction-password input").on("input", checkTransaction);

var loginPasswordShowed = false;

$(".login-form .password .show-password").on("click", function() {
    if (loginPasswordShowed) {
        $(".login-form .password input").attr("type", "password");
        $(".login-form .password .show-password i").attr("fa fa-eye-slash");
        loginPasswordShowed = false;
    } else {
        $(".login-form .password input").attr("type", "text");
        $(".login-form .password .show-password i").attr("fa fa-eye");
        loginPasswordShowed = true;
    }
});


function hideBlack() {
    $(".black").fadeOut(300);
}

function showBlack() {
    $(".black").fadeIn(300);
}

$(".register-form").on("submit", function(e) {
    e.preventDefault();
    if (checkAll()) {
        $(".btn-register button").hide(); // show
        $(".btn-register svg").show(); // hide
        showBlack();
        var emailvalue = $(".register-form .email input").val();
        var create_pass_value = $(".register-form .create-password input").val();
        var confirm_pass_value = $(".register-form .confirm-password input").val();
        var transvalue = $(".register-form .transaction-password input").val();
        var whatvalue = $(".register-form .whatsapp input").val();
        var televalue = $(".register-form .telegram input").val();
        var invalue = $(".register-form .invitation-code input").val();

        $.ajax({
            type: "POST",
            data: {
                email: emailvalue,
                create_password: create_pass_value,
                confirm_password: confirm_pass_value,
                transaction_password: transvalue,
                invite_code: invalue,
                telegram: televalue,
                whatsapp: whatvalue,
                csrfmiddlewaretoken: $("input[name=csrfmiddlewaretoken]").val()
            },
            url: "/register/",
            success: function(data) {
                hideBlack();
                $(".btn-register button").show(); // show
                $(".btn-register svg").hide(); // hide
                if (data == "email_already_exists") {
                    $(".error.error-create-email").html(emailAlreadyExistsText[langCode]);
                    $(".error.error-create-email").show();
                    document.querySelector(".register-form .email input").focus();
                } else if (data == "ok") {
                    $(".login").fadeIn(300);
                    $(".register").fadeOut(0);
                    
                    $(".success-alert .main-success .texts p strong").html(emailvalue);
                    $(".success-alert").fadeIn(200);
                    $(".success-alert").css("display", "flex");
                    
                    $(".register-form .email input").val("");
                    $(".login-form .email input").val(emailvalue);
                    $(".register-form .create-password input").val("");
                    $(".register-form .confirm-password input").val("");
                    $(".register-form .transaction-password input").val("");
                    $(".register-form .whatsapp input").val("");
                    $(".register-form .telegram input").val("");
                    $(".register-form .invitation-code input").val("");
                } else if (data == "invite_code_error") {
                    $(".error-code").html(inviteCodeErrorText[langCode]);
                    $(".error-code").show();
                    
                } else if (data == "pass_do_not_match") {
                    $(".error-create-pass").show();
                    $(".error-create-pass").html(passwordDoesntMatchText[langCode]);
            
                    $(".error-confirm-pass").show();
                    $(".error-confirm-pass").html(passwordDoesntMatchText[langCode]);
                    
                } else if (data == "field_error") {
                    alert(checkAllFieldText[langCode]);
                } else if (data == "trans_pass_and_create_pass") {
                    $(".error-transaction").show();
                    $(".error-transaction").html(transPassSameText[langCode]);
                }
            },
            error: function() {
                alert("Server error or try you connection. Thank you!");
                hideBlack();
            }
        })
    }
});

let body = document.body;

$(".footer .telegram").on("click", function() {
    document.querySelector(".to-telegram").click();
});

$(".foot .join-telegram").on("click", function() {
    body.querySelector(".to-telegram").click();
});

$(".foot .join-instagram").on("click", function() {
    body.querySelector(".to-instagram").click();
});

$(".join-facebook").on("click", function() {
    body.querySelector(".to-facebook").click();
});

$(".join-whatsapp").on("click", function() {
    body.querySelector(".to-whatsapp").click();
});

$(".join-phone").on("click", function() {
    body.querySelector(".to-phone").click();
});

$(".join-email").on("click", function() {
    body.querySelector(".to-email").click();
});

$(".join-messenger").on("click", function() {
    body.querySelector(".to-facebook").click();
});




$(".btn-show-create-password").on("click", function() {
    if (passwordCreateShowed) {
        $(".create-password input").attr("type", "password");
        $(".confirm-password input").attr("type", "password");
        passwordCreateShowed = false;
        $("#cr-pass").attr("class", "fa fa-eye-slash");
        $("#cn-pass").attr("class", "fa fa-eye-slash");
        
    } else {
        $(".create-password input").attr("type", "text");
        $(".confirm-password input").attr("type", "text");
        passwordCreateShowed = true;
        $("#cr-pass").attr("class", "fa fa-eye");
        $("#cn-pass").attr("class", "fa fa-eye");
    }
});