
var oldPasswordValue = null;
var confirmPasswordValue = null;
var createPasswordValue = null;
var errorPassword = true;
var errorOldPass = "";
var errorCreatePass = "";
var errorConfirmPass = "";

$(window).on("load", function() {
    errorOldPass = $(".error.error-old-pass").attr("error");
    errorCreatePass = $(".error.error-create-pass").attr("error");
    errorConfirmPass = $(".error.error-confirm-pass").attr("error");
    if (errorOldPass == "true") {
        $("form .error.error-old-pass").show();
        $("form .error.error-old-pass").html("Wrong password");
    }
});

var c = document.querySelector("form .field.create input");

function oldPasswordInput() {
    $("form .error.error-old-pass").hide();
}

function createPasswordInput() {
    createPasswordValue = $("form .field.create input").val();
    confirmPasswordValue = $("form .field.confirm input").val();
    
    if (createPasswordValue.length >= 8) {
        if (confirmPasswordValue >= 8) {
            if (confirmPasswordValue != createPasswordValue) {
                $("form .error.error-confirm-pass").show();
                $("form .error.error-confirm-pass").html("Password does not match");
                $("form .error.error-create-pass").show();
                $("form .error.error-create-pass").html("Password does not match");
                errorPassword = true;
            } else {
                errorPassword = false;
                $("form .error.error-confirm-pass").hide();
                $("form .error.error-create-pass").hide();
            }
        } else {
            $("form .error.error-confirm-pass").hide();
            $("form .error.error-create-pass").hide();
        }
    } else {
         $("form .error.error-confirm-pass").hide();
         $("form .error.error-create-pass").hide();
    }
}

function confirmPasswordInput() {
    createPasswordValue = $("form .field.create input").val();
    confirmPasswordValue = $("form .field.confirm input").val();
    if (confirmPasswordValue.length >= 8) {
        if (createPasswordValue.length >= 8) {
            if (confirmPasswordValue != createPasswordValue) {
                $("form .error.error-confirm-pass").show();
                $("form .error.error-confirm-pass").html("Password does not match");
                $("form .error.error-create-pass").show();
                $("form .error.error-create-pass").html("Password does not match");
                errorPassword = true;
            } else {
                $("form .error.error-confirm-pass").hide();
                $("form .error.error-create-pass").hide();
                errorPassword = false;
            }
        } else {
            $("form .error.error-confirm-pass").hide();
            $("form .error.error-create-pass").hide();
        }
    } else {
        $("form .error.error-confirm-pass").hide();
        $("form .error.error-create-pass").hide();
    }
}

$("form").on("submit", function(e) {
    oldPasswordValue = $("form .field.old input").val();
    if (errorPassword) {
        e.preventDefault();
        c.focus();
    } else {
        if (createPasswordValue == oldPasswordValue) {
            e.preventDefault();
            $("form .error.error-create-pass").show();
            $("form .error.error-create-pass").html("Old password and new password will never be the same. Please, try another one");
            c.focus();
        }
    }
});

$(".submit").on("click", function() {
    document.querySelector("form .submit button").click();
});

$(".home").on("click", function() {
    document.querySelector(".home a").click();
});

$("form .field.old input").on("input", oldPasswordInput);
$("form .field.create input").on("input", createPasswordInput);
$("form .field.confirm input").on("input", confirmPasswordInput);