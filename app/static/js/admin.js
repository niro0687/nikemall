

// script

var logout = document.querySelector(".valid-logout");

function showBlack() {
    $(".black-page").fadeIn(200);
}
function hideBlack() {
    $(".black-page").fadeOut(200);
}

var vip0Loaded = false;
var vip1Loaded = false;
var vip2Loaded = false;
var vip3Loaded = false;
var vip4Loaded = false;
var vip4Loaded = false;
var vip5Loaded = false;
var vip6Loaded = false;
var vip7Loaded = false;
var vip8Loaded = false;
var vip9Loaded = false;
var vip10Loaded = false;
var withdrawReqLoaded = false;
var vipReqLoaded = false;
var allUsersLoaded = false;
var boxAlert = document.querySelector(".box-alert");
var userPassChanging = false;

function getText(email) {
    var str = "No result for '";
    if (email.length > 3) {
        str = str + email + "'";
        return true;
    } else {
        return false;
    }
}

$(".allow").on("click", function() {
    startLoadPage();
    $.ajax({
        type: "GET",
        url: "/web_access/",
        success: function(data) {
            endLoadPage();
            if (data == "on") {
                $(".allow .text p:nth-child(2)").html("On");
                $(".allow .text p:nth-child(2)").attr("class", "on");
                $(".allow .icon-on i").attr("class", "fa fa-toggle-on");
                document.querySelector(".allow .icon-on").classList.replace("off", "on");
            } else {
                $(".allow .text p:nth-child(2)").html("Off");
                $(".allow .text p:nth-child(2)").attr("class", "off");
                $(".allow .icon-on i").attr("class", "fa fa-toggle-off");
                document.querySelector(".allow .icon-on").classList.replace("on", "off");
            }
        },
        error: function() {
            alert("Check the server");
        }
    });
});

$(".btn-option").on("click", function() {
    showBlack();
    $(".option").fadeIn(200);
    $(".option").css("display", "flex");
});

$(".cancel").on("click", function() {
    hideBlack();
    $(".option").fadeOut(200);
});

$(".btn-logout").on("click", function() {
    logout.click();
});

$(".main .cancel-users").on("click", function() {
    document.querySelector(".second-box.all-users-box").classList.replace("show", "hide");
});


$(".users").on("click", function() {
    if (allUsersLoaded) {
        document.querySelector(".second-box.all-users-box").classList.replace("hide", "show");
    } else {
        startLoadPage();
        getData("/all_users/", "all-users-box", "all_users");
    }
    
});

function startLoadPage() {
    $(".loading").fadeIn(200);
    $(".loading").css("display", "flex");
}
function endLoadPage() {
    $(".loading").fadeOut(200);
}
// vip get in

function getData(link, el, box) {
    var elToShow = ".second-box." + el;
    $.ajax({
        type: "GET",
        url: link,
        success: function(data) {
            endLoadPage();
            $(elToShow + " .main").append(data);
            document.querySelector(elToShow).classList.replace("hide", "show");
            if (box == "vip0") {
                vip0Loaded = true;
            } else if (box == "vip1") {
                vip1Loaded = true;
            } else if (box == "vip2") {
                vip2Loaded = true;
            } else if (box == "vip3") {
                vip3Loaded = true;
            } else if (box == "vip4") {
                vip4Loaded = true;
            } else if (box == "vip5") {
                vip5Loaded = true;
            } else if (box == "vip6") {
                vip6Loaded = true;
            } else if (box == "vip7") {
                vip7Loaded = true;
            } else if (box == "vip8") {
                vip8Loaded = true;
            } else if (box == "vip9") {
                vip9Loaded = true;
            } else if (box == "vip10") {
                vip10Loaded = true;
            } else if (box == "withreq") {
                withdrawReqLoaded = true;
            } else if (box == "vipreq") {
                vipReqLoaded = true;
            } else if (box == "all_users") {
                allUsersLoaded = true;
            }
        },
        timeout: 3000,
        error: function() {
            endLoadPage();
            $(".box-alert div").css("background", "#FF0053");
            $(".box-alert div p").html("Oouups, try your connexion.");
            boxAlert.classList.replace("hide", "show");
            setTimeout(function() {
                boxAlert.classList.replace("show", "hide");
            }, 3000);
        }
    });
};

$(".withdraw-box .main").on("click", ".each-request .detail .choice .send", function() {
    var key = $(this).attr("id_req");
    var id = ".withdraw-box #req-" + key;
    var link = "/valid_request/" + key + "/";
    startLoadPage();
    
    $.get(link, function(data) {
        endLoadPage();
        if (data == "ok") {
            $(".box-alert div").css("background", "#0098FF");
            $(".box-alert div p").html("Request accepted and payment done with successfully.");
            boxAlert.classList.replace("hide", "show");
            setTimeout(function() {
                boxAlert.classList.replace("show", "hide");
            }, 3000);
            $(id).fadeOut(200);
        }
    }); 
});

$(".withdraw-box .main").on("click", ".each-request .detail .choice .refuse", function() {
    var key = $(this).attr("id_req");
    var id = ".withdraw-box #req-" + key;
    var link = "/deny_request/" + key + "/";
    startLoadPage();
    
    $.get(link, function(data) {
        endLoadPage();
        if (data == "ok") {
            $(".box-alert div").css("background", "#0098FF");
            $(".box-alert div p").html("Request accepted and payment done with successfully.");
            boxAlert.classList.replace("hide", "show");
            setTimeout(function() {
                boxAlert.classList.replace("show", "hide");
            }, 3000);
            $(id).fadeOut(200);
        }
    }); 
});

$(".vip-box .main").on("click", ".each-request .detail .choice .send", function() {
    var key = $(this).attr("id_req");
    var id = ".vip-box #req-vip-" + key;
    var link = "/valid_request/" + key + "/";
    startLoadPage();
    $.get(link, function(data) {
        endLoadPage();
        if (data == "ok") {
            $(".box-alert div").css("background", "#0098FF");
            $(".box-alert div p").html("Request accepted and payment done with successfully.");
            boxAlert.classList.replace("hide", "show");
            setTimeout(function() {
                boxAlert.classList.replace("show", "hide");
            }, 3000);
            $(id).fadeOut(200);
        }
    });
});

$(".vip-box .main").on("click", ".each-request .detail .choice .refuse", function() {
    var key = $(this).attr("id_req");
    var id = ".vip-box #req-vip-" + key;
    var link = "/deny_request/" + key + "/";
    startLoadPage();
    $.get(link, function(data) {
        endLoadPage();
        if (data == "ok") {
            $(".box-alert div").css("background", "#0098FF");
            $(".box-alert div p").html("Request accepted and payment done with successfully.");
            boxAlert.classList.replace("hide", "show");
            setTimeout(function() {
                boxAlert.classList.replace("show", "hide");
            }, 3000);
            $(id).fadeOut(200);
        }
    });
});


$(".vip0").on("click", function() {
    if (vip0Loaded) {
        document.querySelector(".second-box.vip0-box").classList.replace("hide", "show");
    } else {
        startLoadPage();
        getData("/user/vip/0/", "vip0-box", 'vip0');
    }
});


$(".vip1").on("click", function() {
    if (vip1Loaded) {
        document.querySelector(".second-box.vip1-box").classList.replace("hide", "show");
    } else {
        startLoadPage();
        getData("/user/vip/1/", "vip1-box", "vip1");
    }
    
});

$(".vip2").on("click", function() {
    if (vip2Loaded) {
        document.querySelector(".second-box.vip2-box").classList.replace("hide", "show");
    } else {
        startLoadPage();
        getData("/user/vip/2/", "vip2-box", "vip2");
    }
});

$(".vip3").on("click", function() {
    if (vip3Loaded) {
        document.querySelector(".second-box.vip3-box").classList.replace("hide", "show");
    } else {
        startLoadPage();
        getData("/user/vip/3/", "vip3-box", "vip3");
    }
});

$(".vip4").on("click", function() {
    if (vip4Loaded) {
        document.querySelector(".second-box.vip4-box").classList.replace("hide", "show");
    } else {
        startLoadPage();
        getData("/user/vip/4/", "vip4-box", "vip4");
    }
});

$(".vip5").on("click", function() {
    if (vip5Loaded) {
        document.querySelector(".second-box.vip5-box").classList.replace("hide", "show");
    } else {
        startLoadPage();
        getData("/user/vip/5/", "vip5-box", "vip5");
    }
});

$(".vip6").on("click", function() {
    if (vip6Loaded) {
        document.querySelector(".second-box.vip6-box").classList.replace("hide", "show");
    } else {
        startLoadPage();
        getData("/user/vip/6/", "vip6-box", "vip6");
    }
});

$(".vip7").on("click", function() {
    if (vip7Loaded) {
        document.querySelector(".second-box.vip7-box").classList.replace("hide", "show");
    } else {
        startLoadPage();
        getData("/user/vip/7/", "vip7-box", "vip7");
    }
});

$(".vip8").on("click", function() {
    if (vip8Loaded) {
        document.querySelector(".second-box.vip8-box").classList.replace("hide", "show");
    } else {
        startLoadPage();
        getData("/user/vip/8/", "vip8-box", "vip8");
    }
});

$(".vip9").on("click", function() {
    if (vip9Loaded) {
        document.querySelector(".second-box.vip9-box").classList.replace("hide", "show");
    } else {
        startLoadPage();
        getData("/user/vip/9/", "vip9-box", "vip9");
    }
});

$(".vip10").on("click", function() {
    if (vip10Loaded) {
        document.querySelector(".second-box.vip10-box").classList.replace("hide", "show");
    } else {
        startLoadPage();
        getData("/user/vip/10/", "vip10-box", "vip10");
    }
});

$(".upload-apk form .file input").on("change", function() {
    var file_name = document.querySelector(".upload-apk form .file input").files[0].name;
    $(".upload-apk form .file .text p:nth-child(2)").html(file_name);
});

$(".upload-apk form .file").on("click", function() {
    document.querySelector(".upload-apk form .file input").click(); 
})

$(".upload-apk form").on("submit", function(e) {
    e.preventDefault();
    startLoadPage();
    $(".upload_apk form .btn-submit-upload button").html("Uploading...");
    var apk_name = $(".upload-apk form .apk-name .text input").val();
    var version = $(".upload-apk form .version .text input").val();
    var file = document.querySelector(".upload-apk form .file input").files[0];
    var csrf_token = $("input[name=csrfmiddlewaretoken]").val();
    var formData = new FormData();
    formData.append("name", apk_name);
    formData.append("version", version);
    formData.append("file", file);
    formData.append("csrfmiddlewaretoken", csrf_token);
    $.ajax({
        type: "POST",
        url: "/upload_apk/",
        data: formData,
        cache: false,
        contentType: false,
        processData: false,
        success: function(data) {
            if (data == "ok") {
                $(".upload-apk form .apk-name .text input").val("");
                $(".upload-apk form .version .text input").val("");
                $(".upload_apk form .btn-submit-upload button").html("Upload new version");
                
                $(".box-alert div").css("background", "#00FF8B");
                $(".box-alert div p").html("New version of application is uploaded.");
                boxAlert.classList.replace("hide", "show");
                setTimeout(function() {
                    boxAlert.classList.replace("show", "hide");
                }, 3000);
            } else {
                alert(data);
                $(".box-alert div").css("background", "#FF0053");
                $(".box-alert div p").html("Oouups, try your connexion.");
                boxAlert.classList.replace("hide", "show");
                setTimeout(function() {
                    boxAlert.classList.replace("show", "hide");
                }, 3000);
            }
            endLoadPage();
        },
        error: function() {
            $(".box-alert div").css("background", "#FF0053");
            $(".box-alert div p").html("Oouups, try your connexion.");
            boxAlert.classList.replace("hide", "show");
            setTimeout(function() {
                boxAlert.classList.replace("show", "hide");
            }, 3000);
        }
    })
});


$(".btn-upload-new-version").on("click", function() {
    $(".upload-apk").fadeIn(200);
    $(".black-page").fadeIn(200);
});

$(".black-page").on("click", function() {
    $(".upload-apk").fadeOut(200);
    $(this).fadeOut(200);
    $(".option").fadeOut(200);
});

    

$(".withdraw").on("click", function() {
    if (withdrawReqLoaded) {
        document.querySelector(".second-box.withdraw-box").classList.replace("hide", "show");
    } else {
        startLoadPage();
        getData("/preview_withdraw_requests/", "withdraw-box", "withreq");
    }
});

$(".vip").on("click", function() {
    if (vipReqLoaded) {
        document.querySelector(".second-box.vip-box").classList.replace("hide", "show");
    } else {
        startLoadPage();
        getData("/preview_vip_requests/", "vip-box", "vipreq");
    }
});

$(".btn-change-my-pass").on("click", function() {
    document.querySelector(".change-my-pass").classList.replace("hide", "show");
});

// cancel vip box

$(".main .cancel-vip0").on("click", function() {
    document.querySelector(".second-box.vip0-box").classList.replace("show", "hide");
});

$(".main .cancel-vip1").on("click", function() {
    document.querySelector(".second-box.vip1-box").classList.replace("show", "hide");
});

$(".cancel-change-pass").on("click", function() {
    document.querySelector(".change-my-pass").classList.replace("show", "hide");
});



$(".main .cancel-vip2").on("click", function() {
    document.querySelector(".second-box.vip2-box").classList.replace("show", "hide");
});

$(".main .cancel-vip3").on("click", function() {
    document.querySelector(".second-box.vip3-box").classList.replace("show", "hide");
});

$(".main .cancel-vip4").on("click", function() {
    document.querySelector(".second-box.vip4-box").classList.replace("show", "hide");
});



$(".main .cancel-vip5").on("click", function() {
    document.querySelector(".second-box.vip5-box").classList.replace("show", "hide");
});

$(".main .cancel-vip6").on("click", function() {
    document.querySelector(".second-box.vip6-box").classList.replace("show", "hide");
});

$(".main .cancel-vip7").on("click", function() {
    document.querySelector(".second-box.vip7-box").classList.replace("show", "hide");
});



$(".main .cancel-vip8").on("click", function() {
    document.querySelector(".second-box.vip8-box").classList.replace("show", "hide");
});

$(".main .cancel-vip9").on("click", function() {
    document.querySelector(".second-box.vip9-box").classList.replace("show", "hide");
});



$(".main .cancel-vip10").on("click", function() {
    document.querySelector(".second-box.vip10-box").classList.replace("show", "hide");
});


$(".main .cancel-with").on("click", function() {
    document.querySelector(".second-box.withdraw-box").classList.replace("show", "hide");
});

$(".main .cancel-vip").on("click", function() {
    document.querySelector(".second-box.vip-box").classList.replace("show", "hide");
});

var errorPassword = true;
var errorOldPass = true; 
var errorUserPassword = true;

function checkCreatePassword() {
    var createPasswordValue = $(".my-pass-form .new-pass input").val();
    var confirmPasswordValue = $(".my-pass-form .confirm-pass input").val();
    if (confirmCreatePassword == "" && createPasswordValue == "") {
        $(".my-pass-form .error-create-pass").hide();
        $(".my-pass-form .error-confirm-pass").hide();
        errorPassword = true;
    }
    if (createPasswordValue.length < 8 && confirmPasswordValue == "") {
        $(".my-pass-form .error-create-pass").show();
        $(".my-pass-form .error-create-pass").html("Password must be at least 8 characters");
        errorPassword = true;
    } else {
        if (confirmPasswordValue != "" && createPasswordValue != "" && confirmPasswordValue != createPasswordValue) {
            $(".my-pass-form .error-create-pass").show();
            $(".my-pass-form .error-create-pass").html("Password doesn't match.");
            
            $(".my-pass-form .error-confirm-pass").show();
            $(".my-pass-form .error-confirm-pass").html("Password doesn't match.");
            errorPassword = true;
        } else {
            $(".my-pass-form .error-create-pass").hide();
            $(".my-pass-form .error-confirm-pass").hide();
            errorPassword = false;
        }
    }
};



function confirmCreatePassword() {
    var createPasswordValue = $(".my-pass-form .new-pass input").val();
    var confirmPasswordValue = $(".my-pass-form .confirm-pass input").val();
    if (confirmCreatePassword == "" && createPasswordValue == "") {
        $(".my-pass-form .error-create-pass").hide();
        errorPassword = true;
        $(".my-pass-form .error-confirm-pass").hide();
    }
    if (confirmPasswordValue.length < 8 && createPasswordValue == "") {
        $(".my-pass-form .error-confirm-pass").show();
        $(".my-pass-form .error-confirm-pass").html("Password must be at least 8 characters.");
        errorPassword = true;
    } else {
        if (confirmPasswordValue != "" && createPasswordValue != "" && confirmPasswordValue != createPasswordValue) {
            $(".my-pass-form .error-create-pass").show();
            $(".my-pass-form .error-create-pass").html("Password doesn't match.");
            
            $(".my-pass-form .error-confirm-pass").show();
            $(".my-pass-form .error-confirm-pass").html("Password doesn't much");
            errorPassword = true;
        } else {
            $(".my-pass-form .error-create-pass").hide();
            $(".my-pass-form .error-confirm-pass").hide();
            errorPassword = false;
        }
    }
};

function checkOldPassword() {
    var value = $(".my-pass-form .old-pass input").val();
    
    if (value == "") {
        $(".error-old-pass").hide();
        errorOldPass = true;
    } else {
        if (value.length < 8) {
            $(".my-pass-form .error-old-pass").show();
            $(".my-pass-form .error-old-pass").html("Password must be at least 8 characters");
            errorOldPass = true;
        } else {
            $(".my-pass-form .error-old-pass").hide();
            errorOldPass = false;
        }
    }
}

function checkAll() {
    if (errorOldPass) {
        document.querySelector(".my-pass-form .old-pass input").focus();
        return false
    } else {
        if (errorPassword) {
            document.querySelector(".my-pass-form .new-pass input").focus();
            return false;
        } else {
            return true;
        }
    }
}

function checkPasswordsLength() {
    var crPass = $(".my-pass-form .new-pass input").val();
    var cnPass = $(".my-pass-form .confirm-pass input").val();
    if (cnPass.length < 8 || crPass.length < 8) {
        $(".my-pass-form .error-create-pass").show();
        $(".my-pass-form .error-create-pass").html("Password must be at least 8 characters.");
            
        $(".my-pass-form .error-confirm-pass").show();
        $(".my-pass-form .error-confirm-pass").html("Password must be at least 8 characters.");
        document.querySelector(".my-pass-form .new-pass input").focus();
        return false;
    } else {
        var ol_p = $(".my-pass-form .old-pass input").val();
        if (ol_p == crPass) {
            $(".my-pass-form .error-create-pass").show();
            $(".my-pass-form .error-create-pass").html("New password will never be similar to the old password.<br> Try another one.");
                
            $(".my-pass-form .error-confirm-pass").show();
            $(".my-pass-form .error-confirm-pass").html("New password will never be similar to the old password.<br> Try another one.");
            document.querySelector(".my-pass-form .new-pass input").focus();
            return false;
        } else {
            $(".my-pass-form .error-create-pass").hide();
            $(".my-pass-form .error-confirm-pass").hide();
            return true;
        }
    }
}

$(".my-pass-form").on("submit", function(e) {
    e.preventDefault();
    if (checkAll()) {
        if (checkPasswordsLength()) {
            startLoadPage();
            var old_pass = $(".my-pass-form .old-pass input").val();
            var new_pass =  $(".my-pass-form .new-pass input").val();
            var co_pass = $(".my-pass-form .confirm-pass input").val();
            $.ajax({
                type: "POST",
                url: "/check_admin_password/",
                data: {
                    old_password: old_pass,
                    new_password: new_pass,
                    confirm_password: co_pass,
                    csrfmiddlewaretoken: $("input[name=csrfmiddlewaretoken]").val()
                },
                success: function(data) {
                    if (data == "ok") {
                        endLoadPage();
                        $(".official-password-change input:nth-child(1)").val(old_pass);
                        $(".official-password-change input:nth-child(2)").val(new_pass);
                        $(".official-password-change input:nth-child(3)").val(co_pass);
                        document.querySelector(".official-password-change button").click();
                    } else if (data == "wrong_password") {
                        endLoadPage();
                        document.querySelector(".my-pass-form .old_pass input").focus();
                        $(".my-pass-form .error-old-pass").show();
                        $(".my-pass-form .error-old-pass").html("Wrong password");
                    }
                },
                error: function() {
                    alert("Serveur error");
                    endLoadPage();
                }
            });
        }
    }
});

var passwordCreateShowed = false;
var oldPasswordShowed = false;

$(".my-pass-form .new-pass input").on("input", checkCreatePassword);
$(".my-pass-form .confirm-pass input").on("input", confirmCreatePassword);
$(".my-pass-form .old-pass input").on("input", checkOldPassword);


$(".my-pass-form .btn-show-create-password").on("click", function() {
    if (passwordCreateShowed) {
        $(".my-pass-form .new-pass input").attr("type", "password");
        $(".my-pass-form .confirm-pass input").attr("type", "password");
        passwordCreateShowed = false;
        $(".my-pass-form #cr-pass").attr("class", "fa fa-eye-slash");
        $(".my-pass-form #cn-pass").attr("class", "fa fa-eye-slash");
        
    } else {
        $(".my-pass-form .new-pass input").attr("type", "text");
        $(".my-pass-form .confirm-pass input").attr("type", "text");
        passwordCreateShowed = true;
        $(".my-pass-form #cr-pass").attr("class", "fa fa-eye");
        $(".my-pass-form #cn-pass").attr("class", "fa fa-eye");
    }
});



$(".my-pass-form .btn-show-old-password").on("click", function() {
    if (oldPasswordShowed) {
        $(".my-pass-form .old-pass input").attr("type", "password");
        oldPasswordShowed = false;
        $(".my-pass-form #old-pass").attr("class", "fa fa-eye-slash");
        
    } else {
        $(".my-pass-form .old-pass input").attr("type", "text");
        oldPasswordShowed = true;
        $(".my-pass-form #old-pass").attr("class", "fa fa-eye");
    }
});



function displayLoadSearch(bool) {
    if (bool) {
        $(".load-search").show();
        $(".load-search").css("display", "flex");
    } else {
        $(".load-search").hide();
    }
}

function createInst(text) {
    $(".inst").remove();
    var data = "<p class='inst'>" + text + "</p>";
    $(".display-result").html(data);
}

function searchUser() {
    var value = $(this).val();
    if (value.length < 4) {
        displayLoadSearch(false);
        createInst("Search user's email and change its password if you want.");
    } else {
        displayLoadSearch(true);
        $(".inst").hide();
        $.ajax({
            type: "POST",
            url: "/search_users/",
            data: {
                email: value,
                csrfmiddlewaretoken: $("input[name=csrfmiddlewaretoken]").val()
            },
            success: function(data) {
                if (data == "null") {
                    $(".change-user-pass .main .display-result").html("<p class='inst'>Oouups, no result found!</p>");
                } else {
                    $(".change-user-pass .main .display-result").html(data);
                }
                displayLoadSearch(false);
            },
            error: function() {
                $(".change-user-pass .main .display-result").html("<p class='inst'>Server error or try your connexion.</p>");
                displayLoadSearch(false);
            }
        })
    }
}

var focusUserEmail = null;
var ch = document.querySelector(".field-change-user-pass");

function openChangePass(bool, email) {
    if (bool) {
        ch.classList.replace("hide", "show");
        $(".blur-pass").fadeIn(300);
        $(".field-change-user-pass .email").html(email);
    } else {
        ch.classList.replace("show", "hide");
        $(".blur-pass").fadeOut(300);
    }
}



$(".display-result").on("click", ".change-its-pass", function() {
    var email = $(this).attr("email");
    focusUserEmail = email;
    $(".user-pass-form div input").val("");
    $(".user-pass-form .error").hide();
    openChangePass(true, email);
});


$(".user-pass-form .btn-cancel-change").on("click", function() {
    if (!userPassChanging) {
        openChangePass(false, "No user selected");
    }
});

$(".blur-pass").on("click", function() {
    if (!userPassChanging) {
        openChangePass(false, "No user selected");
    }
});


$(".search input").on("input", searchUser);

function checkUserAll() {
    if (errorUserPassword) {
        document.querySelector(".user-pass-form .new-pass input").focus();
        return false;
    } else {
        return true;
    }
}

function checkUserCreatePassword() {
    var createPasswordValue = $(".user-pass-form .new-pass input").val();
    var confirmPasswordValue = $(".user-pass-form .confirm-pass input").val();
    if (confirmCreatePassword == "" && createPasswordValue == "") {
        $(".user-pass-form .error-create-pass").hide();
        $(".user-pass-form .error-confirm-pass").hide();
        errorUserPassword = true;
    }
    if (createPasswordValue.length < 8 && confirmPasswordValue == "") {
        $(".user-pass-form .error-create-pass").show();
        $(".user-pass-form .error-create-pass").html("Password must be at least 8 characters");
        errorUserPassword = true;
    } else {
        if (confirmPasswordValue != "" && createPasswordValue != "" && confirmPasswordValue != createPasswordValue) {
            $(".user-pass-form .error-create-pass").show();
            $(".user-pass-form .error-create-pass").html("Password doesn't match.");
            
            $(".user-pass-form .error-confirm-pass").show();
            $(".user-pass-form .error-confirm-pass").html("Password doesn't match.");
            errorUserPassword = true;
        } else {
            $(".user-pass-form .error-create-pass").hide();
            $(".user-pass-form .error-confirm-pass").hide();
            errorUserPassword = false;
        }
    }
};



function confirmUserCreatePassword() {
    var createPasswordValue = $(".user-pass-form .new-pass input").val();
    var confirmPasswordValue = $(".user-pass-form .confirm-pass input").val();
    if (confirmCreatePassword == "" && createPasswordValue == "") {
        $(".user-pass-form .error-create-pass").hide();
        errorUserPassword = true;
        $(".user-pass-form .error-confirm-pass").hide();
    }
    if (confirmPasswordValue.length < 8 && createPasswordValue == "") {
        $(".user-pass-form .error-confirm-pass").show();
        $(".user-pass-form .error-confirm-pass").html("Password must be at least 8 characters.");
        errorUserPassword = true;
    } else {
        if (confirmPasswordValue != "" && createPasswordValue != "" && confirmPasswordValue != createPasswordValue) {
            $(".user-pass-form .error-create-pass").show();
            $(".user-pass-form .error-create-pass").html("Password doesn't match.");
            
            $(".user-pass-form .error-confirm-pass").show();
            $(".user-pass-form .error-confirm-pass").html("Password doesn't much");
            errorUserPassword = true;
        } else {
            $(".user-pass-form .error-create-pass").hide();
            $(".user-pass-form .error-confirm-pass").hide();
            errorUserPassword = false;
        }
    }
};



function checkUserPassordsLength() {
    var crPass = $(".user-pass-form .new-pass input").val();
    var cnPass = $(".user-pass-form .confirm-pass input").val();
    if (cnPass.length < 8 || crPass.length < 8) {
        $(".user-pass-form .error-create-pass").show();
        $(".user-pass-form .error-create-pass").html("Password must be at least 8 characters.");
            
        $(".user-pass-form .error-confirm-pass").show();
        $(".user-pass-form .error-confirm-pass").html("Password must be at least 8 characters.");
        document.querySelector(".user-pass-form .new-pass input").focus();
        return false;
    } else {
        return true;
    }
}

function startChangePassword(bool) {
    if (bool) {
        $(".user-pass-form .btn-valid-change svg").show();
        $(".user-pass-form .btn-valid-change button").hide();
        userPassChanging = true;
        document.querySelector(".user-pass-form .new-pass input").disabled = true;
        document.querySelector(".user-pass-form .confirm-pass input").disabled = true; 
    } else {
        $(".user-pass-form .btn-valid-change svg").hide();
        $(".user-pass-form .btn-valid-change button").show();
        document.querySelector(".user-pass-form .new-pass input").disabled = false;
        document.querySelector(".user-pass-form .confirm-pass input").disabled = false;
        userPassChanging = false;
    }
};


$(".user-pass-form").on("submit", function(e) {
    e.preventDefault();
    if (checkUserAll()) {
        if (checkUserPassordsLength()) {
            startChangePassword(true);
            $.ajax({
                type: "POST",
                url: "/admin_change_user_password/",
                data: {
                    email: focusUserEmail,
                    new_password: $(".user-pass-form .new-pass input").val(),
                    confirm_password: $(".user-pass-form .confirm-pass input").val(),
                    csrfmiddlewaretoken: $("input[name=csrfmiddlewaretoken]").val()
                },
                success: function(data) {
                    if (data == "ok") {
                        $(".box-alert div").css("background", "#00C0FF");
                        $(".box-alert div p").html("Password changed successfully");
                        boxAlert.classList.replace("hide", "show");
                        setTimeout(function() {
                            boxAlert.classList.replace("show", "hide");
                        }, 4000);
                        openChangePass(false, "No user selected");
                    }
                    startChangePassword(false);
                },
                error: function() {
                    $(".box-alert div").css("background", "#FF0043");
                    $(".box-alert div p").html("Connexion error!");
                    boxAlert.classList.replace("hide", "show");
                    setTimeout(function() {
                        boxAlert.classList.replace("show", "hide");
                    }, 4000);
                    startChangePassword(false);
                }
            });
        }
    }
});

var passwordUserCreateShowed = false;

$(".user-pass-form .btn-show-create-password").on("click", function() {
    if (passwordUserCreateShowed) {
        $(".user-pass-form .new-pass input").attr("type", "password");
        $(".user-pass-form .confirm-pass input").attr("type", "password");
        passwordUserCreateShowed = false;
        $(".user-pass-form #cr-pass").attr("class", "fa fa-eye-slash");
        $(".user-pass-form #cn-pass").attr("class", "fa fa-eye-slash");
        
    } else {
        $(".user-pass-form .new-pass input").attr("type", "text");
        $(".user-pass-form .confirm-pass input").attr("type", "text");
        passwordUserCreateShowed = true;
        $(".user-pass-form #cr-pass").attr("class", "fa fa-eye");
        $(".user-pass-form #cn-pass").attr("class", "fa fa-eye");
    }
});


$(".user-pass-form .new-pass input").on("input", checkUserCreatePassword);
$(".user-pass-form .confirm-pass input").on("input", confirmUserCreatePassword);


$(".icon-cancel-user-pass").on("click", function() {
    document.querySelector(".change-user-pass").classList.replace("show", "hide");
});

$(".btn-change-user-pass").on("click", function() {
    document.querySelector(".change-user-pass").classList.replace("hide", "show");
});

