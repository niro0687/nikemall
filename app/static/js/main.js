

var homeBox = document.querySelector(".home-box");
var meBox = document.querySelector(".me-box");
var teamBox = document.querySelector(".team-box");
var taskBox = document.querySelector(".task-box");
var vipBox = document.querySelector(".vip-box");
var icon = document.querySelector(".header .logo i");
var linkCopied = "Link copied!"
var refCopied = "Referral code copied!"
var taskDone = "Task done and payment added successfully";
var rechargeCopied = "Recharge link copied!";
var a = 0;
var langCode = 0;
var langToSwitch = "en";
var availLang = ["en", "fr"];
var end = -370 * 4;
var rechargeForm = document.querySelector(".main-street .under-main .block-recharge");
var windowWidth = null;
var userAgent = null;
var screenWidth = null;
var screenHeight = null;
var idLastTitleHeader = ".header .text h1";
var mainInvitationCode = 0;

var isHomeFocus = true;
var isTaskFocus = false;
var isMeFocus = false;
var isTeamFocus = false;
var isVipFocus = false;

var numberTask = null;
var taskDone = null;
var perOrder = null;
var myEarnToday = null;

var recharge_code = "THP1qGXjTUy319nRo32vE9S7GhkvAYmBfA";
var websiteUnaivalable = "Website unaivalable";

var rechargeAmountValue = null;
var rechargeEmailValue = null;
var rechargeUsernameValue = null;
var rechargeAdressValue = null;
var rechargeDateValue = null;
var rechargeTimeValue = null;
var rechargeVipValue = null;

var apk = document.querySelector(".btn-download-apk .text a");

$(".btn-download-apk").on("click", function() {
    apk.click();
});

function checkTimeValue(t) {
    var sep = t.split(":");
    if (sep.length < 2) {
        $(".update-vip-form .error-rech.error-time").show();
        $(".update-vip-form .error-rech.error-time").html(useText[langCode]);
        return false;
    } else {
        if (sep.length > 3) {
            $(".update-vip-form .error-rech.error-time").show();
            $(".update-vip-form .error-rech.error-time").html(pleaseCheckText[langCode]);
            return false;
        } else {
            if (parseInt(sep[0]) > 23 || parseInt(sep[0]) < 0) {
                $(".update-vip-form .error-rech.error-time").show();
                $(".update-vip-form .error-rech.error-time").html(pleaseCheckHourText[langCode]);
                return false;
            } else if (parseInt(sep[1]) > 59 || parseInt(sep[1]) < 0) {
                $(".update-vip-form .error-rech.error-time").show();
                $(".update-vip-form .error-rech.error-time").html(pleaseCheckMinuteText[langCode]);
                return false;
            } else if (parseInt(sep[2]) > 59 || parseInt(sep[2]) < 0) {
                $(".update-vip-form .error-rech.error-time").show();
                $(".update-vip-form .error-rech.error-time").html(pleaseCheckSecondText[langCode]);
                return false;
            } else {
                return true;
            }
        }
    }
}
function resetRechargeFields() {
    $(".update-vip-form .each-field.qrcode-field input").val("");
    $(".update-vip-form .each-field.amount-field input").val("");
    $(".update-vip-form .each-field.vip-field input").val("");
    $(".update-vip-form .each-field.date-field input").val();
    $(".update-vip-form .each-field.time-field input").val("");
    $(".update-vip-form .each-field.email-field input").val("");
    $(".update-vip-form .each-field.username-field input").val("");
}
function checkRechargeValue() {
    rechargeAdressValue = $(".update-vip-form .each-field.qrcode-field input").val();
    rechargeAmountValue = parseFloat($(".update-vip-form .each-field.amount-field input").val());
    rechargeVipValue = parseInt($(".update-vip-form .each-field.vip-field input").val());
    rechargeDateValue = $(".update-vip-form .each-field.date-field input").val();
    rechargeTimeValue = $(".update-vip-form .each-field.time-field input").val();
    rechargeEmailValue = $(".update-vip-form .each-field.email-field input").val();
    rechargeUsernameValue = $(".update-vip-form .each-field.username-field input").val();
    
    if (rechargeAdressValue.length > 10 && rechargeAdressValue == recharge_code) {
        if (rechargeAmountValue > 0) {
            if (rechargeVipValue > 0 && rechargeVipValue < 11) {
                if (rechargeUsernameValue != "") {
                    if (rechargeUsernameValue.length > 3) {
                        test = rechargeUsernameValue.split(" ");
                        if (test.length > 1) {
                            $(".update-vip-form .error-rech.error-username").show();
                            $(".update-vip-form .error-rech.error-username").html(usernameDoesNotHaveSpaceText[langCode]);
                            return false;
                        } else {
                            if (rechargeDateValue != "") {
                                if (checkTimeValue(rechargeTimeValue)) {
                                    return true;
                                } else {
                                    return false;
                                }
                            } else {
                                $(".update-vip-form .error-rech.error-date").show();
                                $(".update-vip-form .error-rech.error-date").html(pleaseSetText[langCode]);
                                return false;
                            }
                        }
                    } else {
                        $(".update-vip-form .error-rech.error-username").show();
                        $(".update-vip-form .error-rech.error-username").html(usernameMustBeText[langCode]);
                        return false;
                    }
                } else {
                    if (rechargeDateValue != "") {
                        if (checkTimeValue(rechargeTimeValue)) {
                            return true;
                        } else {
                            return false;
                        }
                    } else {
                        $(".update-vip-form .error-rech.error-date").show();
                        $(".update-vip-form .error-rech.error-date").html(pleaseSetText[langCode]);
                        return false;
                    }
                }
                
            } else {
                $(".update-vip-form .error-rech.error-vip").show();
                $(".update-vip-form .error-rech.error-vip").html(chooseVipText[langCode]);
                return false;
            }
        } else {
            $(".update-vip-form .error-rech.error-value").show();
            $(".update-vip-form .error-rech.error-value").html(checkValueText[langCode]);
            return false;
        }
    } else {
        $(".update-vip-form .error-rech.error-adress").show();
        $(".update-vip-form .error-rech.error-adress").html(adressValueInvalidText[langCode]);
        return false;
    }
}

function adressValueChanged() {
    $(".update-vip-form .error-rech.error-adress").hide();
}
function amountValueChanged() {
    $(".update-vip-form .error-rech.error-value").hide();
}
function vipValueChanged() {
    $(".update-vip-form .error-rech.error-vip").hide();
}
function dateValueChanged() {
    $(".update-vip-form .error-rech.error-date").hide();
}
function timeValueChanged() {
    $(".update-vip-form .error-rech.error-time").hide();
}
function emailValueChanged() {
    $(".update-vip-form .error-rech.error-email").hide();
}
function usernameValueChanged() {
    $(".update-vip-form .error-rech.error-username").hide();
}


$(".update-vip-form .each-field.qrcode-field input").on("input", adressValueChanged);
$(".update-vip-form .each-field.amount-field input").on("input", amountValueChanged);
$(".update-vip-form .each-field.username-field input").on("input", usernameValueChanged);
$(".update-vip-form .each-field.email-field input").on("input", emailValueChanged);
$(".update-vip-form .each-field.time-field input").on("input", timeValueChanged);
$(".update-vip-form .each-field.date-field input").on("change", dateValueChanged);
$(".update-vip-form .each-field.vip-field input").on("input", vipValueChanged);



$(".update-vip-form").on("submit", function(e) {
    e.preventDefault();
    if (checkRechargeValue()) {
        $(".update-vip-form .btn-submit-form-reg button").html(treatmentText[langCode]);
        loadRequest();
        $.ajax({
            type: "POST",
            url: "/update_vip/",
            data: {
                csrfmiddlewaretoken: $("input[name=csrfmiddlewaretoken]").val(),
                value: rechargeAmountValue,
                adress: rechargeAdressValue,
                username: rechargeUsernameValue,
                email: rechargeEmailValue,
                date: rechargeDateValue,
                time: rechargeTimeValue,
                vip: rechargeVipValue,
                user_token: $("input[name=user_token]").val()
            },
            success: function(data) {
                stopLoading();
                if (data == "ok") {
                    showAlert(requestSentText[langCode]);
                    $(".update-vip-form .btn-submit-form-reg button").html(sumbitWithText[langCode]);
                    resetRechargeFields();
                } else {
                    if (data == "field_error") {
                        showAlert(thereFieldNotFilledText[langCode]);
                        $(".update-vip-form .btn-submit-form-reg button").html(sumbitWithText[langCode]);
                    } else if (data == "network_adress_error") {
                        $(".update-vip-form .error-rech.error-adress").show();
                        $(".update-vip-form .error-rech.error-adress").html(adressValueInvalidText[langCode]);
                        $(".update-vip-form .btn-submit-form-reg button").html(sumbitWithText[langCode]);
                    } else if (data == "null_value") {
                        $(".update-vip-form .error-rech.error-value").show();
                        $(".update-vip-form .error-rech.error-value").html(checkValueText[langCode]);
                        $(".update-vip-form .btn-submit-form-reg button").html(sumbitWithText[langCode]);
                    } else if (data == "vip_error") {
                        $(".update-vip-form .error-rech.error-vip").show();
                        $(".update-vip-form .error-rech.error-vip").html(chooseVipText[langCode]);
                        $(".update-vip-form .btn-submit-form-reg button").html(sumbitWithText[langCode]);
                    } else if (data == "datetime_error") {
                        $(".update-vip-form .error-rech.error-date").show();
                        $(".update-vip-form .error-rech.error-date").html(pleaseCheckDateText[langCode]);
                        
                        $(".update-vip-form .error-rech.error-time").show();
                        $(".update-vip-form .error-rech.error-time").html(pleaseCheckText[langCode]);
                        $(".update-vip-form .btn-submit-form-reg button").html(sumbitWithText[langCode]);
                    }
                    else if (data == "missing_user_token") {
                        showAlert(requestForbiddenText[langCode]);
                        $(".update-vip-form .btn-submit-form-reg button").html(sumbitWithText[langCode]);
                    } else if (data == "error_user_token") {
                        showAlert(invalidUserTokenText[langCode]);
                        $(".update-vip-form .btn-submit-form-reg button").html(sumbitWithText[langCode]);
                    } else if (data.indexOf(websiteUnaivalable)) {
                        logoutUser();
                    } else {
                        showAlert(unknownErrorText[langCode]);
                    }
                }
            },
            error: function() {
                showAlert(serverErrorText[langCode]);
            }
        })
    };
});


// language
var unknownErrorText = ["Unknown error", "Erreur inconnue"];
var noTransText = ["No transaction 'til now.", "Aucune transaction jusqu'à maintenant."];
var usernameDoesNotHaveSpaceText = ["Username does not have a space.", "Le nom d'utilisateur n'a pas d'espace."];
var usernameMustBeText = ["Username must be at least 4 characters.", "Le nom d'utilisateur doit comporter au moins 4 caractères."];
var pleaseSetText = ["Please set date", "Veuillez définir la date"];
var chooseVipText = ["Choose vip level between VIP1 and VIP10.", "Choisissez le niveau VIP entre VIP1 et VIP10."];
var checkValueText = ["Check your value please", "Vérifiez votre valeur s'il vous plaît"];

var pleaseCheckHourText = ["Please, enter the correct hour", "Veuillez saisir la bonne heure"];
var pleaseCheckSecondText = ["Please, enter the correct second", "Veuillez saisir la bonne seconde"];
var pleaseCheckMinuteText = ["Please, enter the correct hour", "Veuillez saisir la bonne minute"];
var pleaseCheckDateText = ["Please, enter the correct date", "Veuillez saisir la bonne date"];

var pleaseCheckText = ["Please, check and enter the correct time", "Veuillez vérifier et saisir l'heure correcte"];
var useText = ["Use ':' to isolate the part of time", "Utiliser ':' pour isoler la partie du temps"];
var moreThanBalanceText = ["Please, set value equals or less than your balance", "Saisisez une valeur égale ou moins que votre balance."];
var maxValueText = ["Please, set value betwern $1.0 and $20.00", "Saisisez une valeur entre $1.0 à $20.00"];
var emptyValueText = ["Your balance is not enough for withdraw.", "Votre solde n'est pas assez pour le retrait."];
var wrongTransText = ["Wrong transaction password", "Mots de passe de transaction incorrecte."];
var chooseWithErrorText = ["Please, choose withdraw method before valid a withdraw", "Choisissez une methode de retrait avant d'effectuez un retrait"];

var thereFieldNotFilledText = ["There is a field which is not filled.", "Il y a un champ qui n'est pas rempli."];
var rechargeQrCodeText = ["Recharge QR code.", "Rechargez le code QR."];
var payementSentText = ["Task done and payment sent successfully. ", "Tâche terminée et paiement envoyé avec succès."];
var refCodeCopiedText = ["Referral code is copied.", "Le code de parrainage est copié."];
var linkCopiedText = ["Linked copied!", "Lien copié!"];
var rechargeLinkCopiedText = ["Recharge link copied!", "Lien de recharge copié"];
var availableText = ["Avalaible", "Disponible"];
var invitationCodeText = ["Invitation code", "Code d'invitation"];
var balanceAvailText = ["Balance available", "Solde disponible"];
var amountText = ["Amount", "Montant"];
var withdrawText = ["Withdraw", "Retrait"];
var chooseWithdrawMethodText = ["Choose withdraw method", "Choisissez la méthode de retrait"];
var vipLockedText = ["This VIP is locked", "Cette VIP est fermé"];
var vipUnlockedText = ["This VIP is unlocked", "Cette VIP est ouvert"];
var youCanDoText = ["You can do the task in it.", "Vous pouvez y faire la tâche."];
var unlockText = ["Click to unlock this VIP >>", "Cliquer pour debloquer cette VIP"];
var homeText = ["Home", "Accueil"];
var taskText = ["Task", "Tache"];
var vipText = ["VIP area", "Zone VIP"];
var meText = ["Me", "Moi"];
var teamText = ["Team", "Équipe"];
var requestSentText = ["Request sent", "Demande envoyée."];
var teamAText = ["Team A", "Équipe A"];
var teamBText = ["Team B", "Équipe B"];
var teamCText = ["Team C", "Équipe C"];
var ruleText = ["Rule", "Règle"];
var companyText = ["Company", "Entreprise"];
var teamRechargeText = ["Team recharge", "Recharge d'equipe"];
var teamWithdrawText = ["Team withdraw", "Retrait d'equipe"];
var newTeamText = ["New team", "Nouvel equipe"];
var numberOfFirstRechargeText = ["Number of first recharge", "Nombre de premier recharge"];
var numberOfFirstWithdrawText = ["Number of first withdraw", "Nombre de premier retrait"];
var chooseLangText = ["Choose your language", "Choisissez votre langue"];

var teamBenText = ["Team benefits", "Avantages de l'équipe."];
var congratText = ["Congratulation", "Félicitation"];
var totalTaskText = ["Total Task", "Tache total"];
var taskDoneText = ["Task done", "Tache fini"];
var perOrderText = ["Per order", "Par tache"];
var totalEarnTodayText = ["Total earn today", "Total gagne aujourd'hui"];
var doThisTaskText = ["Do this task", "Faire cette tache"];
var availTaskText = ["All tasks availables", "Les taches disponibles"];
var dailyTaskText = ["Daily task", "Tache par jour"];
var dailyEarnText = ["Daily earning", "Gagne chaque jour"];
var monthlyEarnText = ["Monthly earning", "Gagne par mois"];
var earningText = ["Earning", "Revenus"];
var todayText = ["Today", "Aujourd'hui"];
var yesterdayText = ["Yesterday", "Hier"];
var totalText = ["Total", "Totale"];
var totalRevText = ["Total earning", "Totale revenues"];
var thisMonthText = ["This month", "Cette mois"];
var lastMonthText = ["Last month", "Mois dernier"];
var logoutText = ["Logout", "Se déconnecter"];
var withdrawMethodText = ["Withdraw method", "Méthode de retrait"];
var transDetailText = ["Transaction detail", "Detail de transaction"];
var missionComText = ["Mission completed", "Mission accompli"];
var myProfileText = ["My profile", "Mon profile"];
var transPassText = ["Transaction password", "Mots de passe de transaction"];
var withdrawText = ["Withdraw", "Retrait"];
var rechargeMyAccountText = ["Recharge my account", "Recharger mon compte"];
var clickToJoinText = ["Click to join VIP", "Cliquer pour joindre le VIP"];
var allVipAvailText = ["All VIP availables", "Toute les VIP disponibles"];
var teamSizeText = ["Team size", "Taille de l'équipe"];
var referalLinkText = ["Referal link", "Lien de parrainage"];
var referalCodeText = ["Referal code", "Code de parrainage"];
var businessHallText = ["Business hall", "Salle d'affaire"];
var comNotifText = ["All Withdrawal histories", "Toutes les histoires de retrait."];
var languageText = ["Language", "Language"];
var noneText = ["None", "Aucun"];
var changeNowText = ["Change now", "Changer maintenant"];
var balanceText = ["Balance:", "Solde:"];
var reachedTaskText = ["Sorry, you have reached to maximum daily task", "Désolé, vous avez atteint le nombre maximum de tache tous les jours."];
var sumbitWithText = ["Submit", "Valider"];
var treatmentText = ["Processing...", "Traitement..."];
var paymentInTreatmentText = ["Withdraw in treatment", "Retrait en cours de traitement."];
var withdrawMethodValueErrorText = ["Value error. Try another one or check your adress. Value not found.", "Valeur erreur. Essayez une autre ou verifier votre adresse. Valeur pas trouvé."]
var yesterdayEarnText = ["Yesterday earning:", "Gagner hier:"];
var rechargeText = ["Recharge", "Recharge"];
var validWithSuccessText = ["Valid with successfully", "Valid avec succées"]
var requestDeniedText = ["Request denied", "Demande refusé"];
var enCourText = ["In progress", "En cours"];
var validationDateText = ["Validation date", "Date de validation"];
var rechargeCodeText = ["Recharge code", "Code de recharge"];
var transactionDateText = ["Transaction date", "Date de transaction"];
var emailText = ["Email", "Email"];
var usernameText = ["Username", "Nom d'utilisateur"];
var vipWonderText = ["VIP request", "Demande de VIP"];
var allTransactionText = ["All transaction", "Toutes transactions"];

var brefText = ["<li>Minimum of amount withdraw is $1</li><li>Make sure that you withdraw method is already set before withdraw.</li><li>Your request will be valid within 48 hours (if not, please contact the administrator)</li><li>You'll have a notification if your request is valid</li>","<li> Le minimum de retrait est de 1$ </li><li> Assurez-vous que la méthode de retrait est déjà définie avant de retirer un retrait. </li> <li> Votre demande sera valide dans les 48 heures (sinon, veuillez contacter l'administrateur) </li> <li> Vous aurez une notification si votre demande est valide </li>"];

var newWithdrawMethod = ["Net withdraw method", "Nouvelle méthode de retrait"];
var adressText = ["Adress", "Adresse"];
var fillOutFieldText = ["Please fill out these two fields below to add a new withdraw method.", "Veuillez remplir ces deux champs ci-dessous pour ajouter une nouvelle méthode de retrait."];
var saveThisMethodText = ["Save this method", "Enregistrez cette méthode"];
var setWithdrawMethodText = ["Set withdraw method", "Définir la méthode de retrait."];
var withSetText = ["You have more than one withdraw method set.<br>Note that, the all method set are never be modified. But if you want to modified one of them, you can add another one and choose it after as your withdraw method if want to withdraw your balance. Thank you.", "Vous avez plus d'un ensemble de méthodes de retrait. <br> Notez que l'ensemble de méthodes ne sont jamais modifiées. Mais si vous souhaitez en modifier un, vous pouvez en ajouter un autre et le choisir après comme méthode de retrait si vous souhaitez retirer votre solde. Merci."];
var makeSureText = ["Please, make sure that you deposit network is USDT-TRC20. Other network assets cannot be retrieved after depositing. Thank you", "Veuillez vous assurer que votre réseau de dépôt est USDT-TRC20. D'autres actifs réseau ne peuvent pas être récupérés après le dépôt. Merci"];

var noteThatText = ["Note that:", "Notez que:"];
var getYourPaycheckText = ["Get your paycheck.", "Obtenez votre salaire."];

var fillOutThreeFieldText = ["Fill out these 3 fields to get your paycheck", "Remplissez ces 3 champs pour obtenir votre salaire"];
var thisViPIsUnlockedText = ["This VIP is already unlocked", "Cette VIP est déja ouvert"];
var serverErrorText = ["Server error or try your connection", "Erreur de serveur ou verifier votre connection"];
var newWithdrawMethodSetText = ["A new Withdraw method has set with successfully", "Une nouvelle méthode de retrait a été définie avec succès"];
var maxWithdrawMethodText = ["You have reached the maximum value of withdraw method.", "Vous avez atteint la valeur maximale de la méthode de retrait."];
var requestForbiddenText = ["Request forbidden: Missing user token", "Demande interdite: jeton utilisateur manquant."];
var invalidUserTokenText = ["Request forbidden: Invalid user token.", "Demande interdite: jeton utilisateur non valide."];
var downloadApkText = ["Download application.", "Télécharger l'application."];
var fasterText = ["Download application to navigate easily and faster", "Télécharger l'application pour naviguer facilement et plus rapidement"];
var changeMyPasswordText = ["Change my password", "Changer mon mots de passe"];
var changeTransPassText = ["Change my transaction password", "Changer mon mots de passe de transation"];
var upgradeYourVipText = ["Upgrade your VIP", "Mettez à niveau votre VIP."];
var fillOutSomeText = ["Please, fill out some fields to identify your recharge and to update your VIP.", "Veuillez remplir certains champs pour identifier votre recharge et mettre à jour votre VIP."];
var networkNotAllowedText = ["The network what you choosen is not allowed.", "Le réseau que vous avez choisi n'est pas autorisé."];
var pleaseChooseNetworkText = ["Please, choose a network.", "Veuillez choisir un réseau."];
var adressValueInvalidText = ["Invalid adress value", "Valeur d'adresse non valide."];
var timeText = ["Time (ex: 12:23:18)", "Heure (xx: 12:23:18)"];
// end it
function switchLanguageTo(lang) {
    if (lang == 'en') {
        langCode = 0;
    } else if (lang == 'fr') {
        langCode = 1;
    }
    changeMainPage(langCode);
}

var chooseWithdrawBoxOpened = false;
var networkChoosen = null;
var adressChoosen = null;
var idChoosen = null;
var textLoading = "<p class='empty-data'>Loading...</p>";

$(".withdraw-form .password.ch-with-method").on("click", function() {
    if (chooseWithdrawBoxOpened) {
        $(".withdraw-form .password .choose-set-method").fadeOut(300);
        chooseWithdrawBoxOpened = false;
        
    } else {
        $(".withdraw-form .password .choose-set-method").fadeIn(300);
        $(".withdraw-form .password.ch-with-method .choose-set-method").html(textLoading);
        $.ajax({
            type: "GET",
            url: "/get_my_all_withdraw_methods/",
            success: function(data) {
                $(".withdraw-form .password.ch-with-method .choose-set-method").html(data);
            },
            error: function() {
                showAlert(serverErrorText[langCode]);
            }
        });
        chooseWithdrawBoxOpened = true;
    }
});


var network_allowed = ["TRC-20", "Orange Money", "Airtel Money", "Payeer", "MVola", "PayPal"];

var vip1Price = 20.00;
var vip2Price = 40.00;
var vip3Price = 60.00;
var vip4Price = 80.00;
var vip5Price = 100.00;
var vip6Price = 120.00;
var vip7Price = 140.00;
var vip8Price = 160.00;
var vip9Price = 180.00;
var vip10Price = 200.00;

var thereNoVipPriceText = ["There's no VIP which priced less than $20.", "Il n'y a pas de VIP qui évaluait moins de 20 $."];


$(".each-field.amount-field input").on("input", function() {
    var value = $(this).val();
    var f = $(this).val();
    value = parseFloat(value);
    if (f.length >= 1) {
        if (value >= vip1Price && value < vip2Price) {
            $(".each-field.vip-field input").val("1");
            $(".error-rech.error-value").hide();
            $(".error-rech.error-vip").hide();
        } else if (value >= vip2Price && value < vip3Price) {
            $(".each-field.vip-field input").val("2");
            $(".error-rech.error-value").hide();
            $(".error-rech.error-vip").hide();
        } else if (value >= vip3Price && value < vip4Price) {
            $(".each-field.vip-field input").val("3");
            $(".error-rech.error-value").hide();
            $(".error-rech.error-vip").hide();
        } else if (value >= vip4Price && value < vip5Price) {
            $(".each-field.vip-field input").val("4");
            $(".error-rech.error-value").hide();
            $(".error-rech.error-vip").hide();
        } else if (value >= vip5Price && value < vip6Price) {
            $(".each-field.vip-field input").val("5");
            $(".error-rech.error-vip").hide();
            $(".error-rech.error-value").hide();
        } else if (value >= vip6Price && value < vip7Price) {
            $(".each-field.vip-field input").val("7");
            $(".error-rech.error-value").hide();
            $(".error-rech.error-vip").hide();
        } else if (value >= vip7Price && value < vip8Price) {
            $(".each-field.vip-field input").val("8");
            $(".error-rech.error-value").hide();
            $(".error-rech.error-vip").hide();
        } else if (value >= vip8Price && value < vip9Price) {
            $(".each-field.vip-field input").val("8");
            $(".error-rech.error-value").hide();
            $(".error-rech.error-vip").hide();
        } else if (value >= vip9Price && value < vip10Price) {
            $(".each-field.vip-field input").val("9");
            $(".error-rech.error-vip").hide();
            $(".error-rech.error-value").hide();
        } else if (value >= vip10Price) {
            $(".each-field.vip-field input").val("10");
            $(".error-rech.error-value").hide();
            $(".error-rech.error-vip").hide();
        } else {
            $(".error-rech.error-value").show();
            $(".error-rech.error-value").html(thereNoVipPriceText[langCode]);
            $(".each-field.vip-field").val("");
        }
    } else {
        $(".error-rech.error-vip").hide();
        $(".error-rech.error-value").hide();
        $(".each-field.vip-field input").val("");
    }
});

$(".each-field.vip-field input").on("input", function() {
    var vipValue = $(this).val();
    var v = $(this).val();
    vipValue = parseInt(vipValue);
    
    if (v.length >= 1) {
        if (vipValue == 1) {
            $(".each-field.amount-field input").val(vip1Price);
            $(".error-rech.error-vip").hide();
            $(".error-rech.error-value").hide();
        } else if (vipValue == 2) {
            $(".each-field.amount-field input").val(vip2Price);
            $(".error-rech.error-vip").hide();
            $(".error-rech.error-value").hide();
        } else if (vipValue == 3) {
            $(".each-field.amount-field input").val(vip3Price);
            $(".error-rech.error-vip").hide();
            $(".error-rech.error-value").hide();
        } else if (vipValue == 4) {
            $(".each-field.amount-field input").val(vip4Price);
            $(".error-rech.error-vip").hide();
            $(".error-rech.error-value").hide();
        } else if (vipValue == 5) {
            $(".each-field.amount-field input").val(vip5Price);
            $(".error-rech.error-vip").hide();
            $(".error-rech.error-value").hide();
        } else if (vipValue == 6) {
            $(".each-field.amount-field input").val(vip6Price);
            $(".error-rech.error-vip").hide();
            $(".error-rech.error-value").hide();
        } else if (vipValue == 7) {
            $(".each-field.amount-field input").val(vip7Price);
            $(".error.rech.error-vip").hide();
            $(".error-rech.error-value").hide();
        } else if (vipValue == 8) {
            $(".each-field.amount-field input").val(vip8Price);
            $(".error-rech.error-vip").hide();
            $(".error-rech.error-value").hide();
        } else if (vipValue == 9) {
            $(".each-field.amount-field input").val(vip9Price);
            $(".error-rech.error-vip").hide();
            $(".error-rech.error-value").hide();
        } else if (vipValue == 10) {
            $(".each-field.amount-field input").val(vip10Price);
            $(".error-rech.error-vip").hide();
            $(".error-rech.error-value").hide();
        } else {
            $(".error-rech.error-vip").show();
            $(".error-rech.error-vip").html(chooseVipText[langCode]);
        }
    } else {
        $(".error-rech.error-vip").hide();
        $(".error-rech.error-value").hide();
        $(".each-field.amount-field input").val("");
    }
});

function checkSetWithdrawMethod() {
    var n_value = $(".set-withdraw-method-form .field.network .text select").val();
    var a_value = $(".set-withdraw-method-form .field.adress .text input").val();
    if (n_value == "none" || network_allowed.indexOf(n_value) == -1) {
        $(".set-withdraw-method-form .error-set.error-network").show();
        $(".set-withdraw-method-form .error-set.error-network").html(pleaseChooseNetworkText[langCode]);
        return false;
    } else {
        if (a_value != "" && a_value.length > 10) {
            return true;
        } else {
            $(".set-withdraw-method-form .error-set.error-adress").show();
            $(".set-withdraw-method-form .error-set.error-adress").html(adressValueInvalidText[langCode]);
            return false;
        }
    }
}

$(".set-withdraw-method-form").on("submit", function(e) {
    e.preventDefault();
    var network_value = $(".set-withdraw-method-form .field.network .text select").val();
    var adress_value = $(".set-withdraw-method-form .field.adress .text input").val();
    if (checkSetWithdrawMethod()) {
        loadRequest();
        $(".btn-submit-set-withdraw-method button").html(treatmentText[langCode]);
        $.ajax({
            type: "POST",
            url: "/set_withdraw_method/",
            data: {
                network: network_value,
                adress: adress_value,
                csrfmiddlewaretoken: $("input[name=csrfmiddlewaretoken]").val(),
                user_token: $("input[name=user_token]").val()
            },
            success: function(data) {
                stopLoading();
                if (data == "ok") {
                    $(".set-withdraw-method-form .field.network .text select").val("none");
                    $(".set-withdraw-method-form .field.adress .text input").val("");
                    showAlert(newWithdrawMethodSetText[langCode]);
                    $(".btn-submit-set-withdraw-method button").html(saveThisMethodText[langCode]);
                } else {
                    if (data == "network_denied") {
                        $(".set-withdraw-method-form .error-set.error-network").show();
                        $(".set-withdraw-method-form .error-set.error-network").html(networkNotAllowedText[langCode]);
                        $(".btn-submit-set-withdraw-method button").html(saveThisMethodText[langCode]);
                    } if (data == "max_withdraw_method") {
                        showAlert(maxWithdrawMethodText[langCode]);
                        $(".set-withdraw-method-form .field.network .text select").val("none");
                        $(".set-withdraw-method-form .field.network .text input").val("");
                        $(".btn-submit-set-withdraw-method button").html(saveThisMethodText[langCode]);
                    }
                    else if (data == "missing_user_token") {
                        showAlert(requestForbiddenText[langCode]);
                        $(".btn-submit-set-withdraw-method button").html(saveThisMethodText[langCode]);
                    } else if (data == "error_user_token") {
                        showAlert(invalidUserTokenText[langCode]);
                        $(".btn-submit-set-withdraw-method button").html(saveThisMethodText[langCode]);
                    } else if (data.indexOf(websiteUnaivalable)) {
                        logoutUser();
                    } else {
                        showAlert(unknownErrorText[langCode]);
                    }
                }
            }
        })
    }
});


$(".withdraw-form .password.ch-with-method").on("click", ".choose-set-method .each", function() {
    var methodId = $(this).attr("id");
    var network = $("#" + methodId + " p:nth-child(1)").html();
    var adress = $("#" + methodId + " p:nth-child(2)").html();
    
    var text = "<strong>" + network +  "</strong> (" + adress + ")";
    $(".withdraw-form .password.ch-with-method .text p:nth-child(2)").html(text);
    networkChoosen = network;
    adressChoosen = adress;
    idChoosen = methodId;
});

function changeMainPage(code) {
    if (userAgent.indexOf("Android") == -1 || userAgent.indexOf("iPhone") == -1 || userAgent.indexOf("iPad") == -1) {
        $(".black-computer").fadeOut(300);
    }
    var allVipHome = document.querySelectorAll(".vip-unlocked");
    for (let i = 0; i < allVipHome.length; i++) {
        allVipHome[i].innerText = unlockText[code];
    }
    $(".vip-locked").html(youCanDoText[code]);
    $(".title-unlocked").html(vipUnlockedText[code]);
    var titleLockedHome = document.querySelectorAll(".title-locked");
    for (let i = 0; i < allVipHome.length; i++) {
        titleLockedHome[i].innerText = vipLockedText[code];
    }
    var titleVip = document.querySelectorAll(".to-join");
    for (let i = 0; i < titleVip.length; i++) {
        titleVip[i].innerText = clickToJoinText[code] + titleVip[i].id + " >>";
    }
    $(".btn-submit-with button").html(sumbitWithText[code]);
    $(".update-vip-form .each-field.qrcode-field input").attr("placeholder", rechargeCodeText[code]);
    $(".update-vip-form .each-field.amount-field input").attr("placeholder", amountText[code]);
    $(".update-vip-form .each-field.username-field input").attr("placeholder", usernameText[code]);
    $(".update-vip-form .each-field.time-field input").attr("placeholder", timeText[code]);

    $(".btn-submit-form-reg button").html(sumbitWithText[code]);
    $(".btn-change-pass a").html(changeMyPasswordText[code]);
    $(".btn-change-trans-pass a").html(changeTransPassText[code]);
    $(".apk .text p").html(downloadApkText[code]);
    $(".apk .text h5").html(fasterText[code]);
    $(".box-fields .my-amount").html(balanceAvailText[code]);
    $(".box-fields form .email input").attr("placeholder", amountText[code]);
    $(".box-fields form .password input").attr("placeholder", transPassText[code]);
    $(".box-fields form .password .text p:nth-child(1)").html(chooseWithdrawMethodText[code]);
    $(".box-fields form .password .text p:nth-child(2)").html(noneText[code]);
    $(".total-amount .yesterday p:nth-child(1)").html(yesterdayEarnText[code]);
    $(".total-amount .bal p:nth-child(1)").html(balanceText[code]);
    $(".company-box .text-with h1").html(companyText[code]);
    $(".rule-box .text-with h1").html(ruleText[code]);
    $(".body-with .bref").html(noteThatText[code]);
    $(".body-with .advice").html(getYourPaycheckText[code]);
    $(".body-with .des-advice").html(fillOutThreeFieldText[code]);
    $(".no-trans").html(noTransText[code]);
    if (isHomeFocus == false) {
        let text = "";
        if (isTaskFocus) {
            text = taskText[code];
        } else if (isTeamFocus) {
            text = teamText[code];
        } else if (isMeFocus) {
            text = myProfileText[code];
        } else if (isVipFocus) {
            text = vipText[code];
        }
        $(idLastTitleHeader).html(text);
    }
    $(".main-block-recharge h3").html(upgradeYourVipText[code]);
    $(".main-block-recharge .l-des").html(fillOutSomeText[code]);
    
    $(".body-recharge .little-text").html(makeSureText[code]);
    
    $(".body-withdraw-method h3").html(setWithdrawMethodText[code]);
    $(".body-withdraw-method .with-set").html(withSetText[code]);
    $(".body-withdraw-method form h4").html(newWithdrawMethod[code]);
    $(".body-withdraw-method form .pls").html(fillOutFieldText[code]);
    $(".body-withdraw-method form .adress input").attr("placeholder", adressText[code]);
    $(".body-withdraw-method form .btn-submit-set-withdraw-method button").html(saveThisMethodText[code]);
    
    
    $(".body-with .all ol").html(brefText[code]);
    
    $(".body-transaction-detail h3").html(allTransactionText[code]);
    $(".body-transaction-detail .each-trans .method-title.with-tt").html(withdrawText[code]);
    
    $(".body-transaction-detail .each-trans .method-title.rech-tt").html(rechargeText[code]);
    
    
    var withdrawMethodValue = ": <strong>" + $('.body-transaction-detail .each-trans .with-method.wtt').attr('val') + "</strong>";
    $(".body-transaction-detail .each-trans .with-method.wtt").html(withdrawMethodText[code] + withdrawMethodValue);
    
    
    var validationDateValue = ": <strong>" + $('.body-transaction-detail .each-trans .valid-datetime').attr('val') + "</strong>";
    $(".body-transaction-detail .each-trans .valid-datetime").html(validationDateText[code] + validationDateValue);


    var rechargeCodeValue = ": <strong>" + $('.body-transaction-detail .each-trans .with-method.rtt').attr('val') + "</strong>";
    $(".body-transaction-detail .each-trans .with-method.rtt").html(rechargeCodeText[code] + rechargeCodeValue);
    
    
    var transactionDateValue = ": <strong>" + $('.body-transaction-detail .each-trans .trans-datetime').attr('val') + "</strong>";
    $(".body-transaction-detail .each-trans .trans-datetime").html(transactionDateText[code] + transactionDateValue);
    
    var usernameValue = ": <strong>" + $('.body-transaction-detail .each-trans .username').attr('val') + "</strong>";
    $(".body-transaction-detail .each-trans .username").html(usernameText[code] + usernameValue);
    
    var emailValue = ": <strong>" + $('.body-transaction-detail .each-trans .email').attr('val') + "</strong>";
    $(".body-transaction-detail .each-trans .email").html(emailText[code] + emailValue);
    
    var vipWonderValue = ": <strong>" + $('.body-transaction-detail .each-trans .vip-demande').attr('val') + "</strong>";
    $(".body-transaction-detail .each-trans .vip-demande").html(vipWonderText[code] + vipWonderValue);
    
    $(".body-transaction-detail .each-trans .is-valid .valid").html(validWithSuccessText[code]);
    $(".body-transaction-detail .each-trans .is-valid .cours").html(enCourText[code]);
    $(".body-transaction-detail .each-trans .is-valid .error").html(requestDeniedText[code]);
    
    $(".btn-submit-recharge p").html(rechargeMyAccountText[code]);
    $(".recharge-box .body-recharge h2").html(rechargeQrCodeText[code]);
    $(".body-language .valid-change button").html(changeNowText[code]);
    $(".body-language .each-lang .text p:nth-child(2)").html(availableText[code]);
    $(".language-box .text h1").html(languageText[code]);
    $(".body-language .tt").html(chooseLangText[code]);
    $(".data .invite-code").html(invitationCodeText[code] + ": " + mainInvitationCode);
    $("h4.ref-link").html(referalLinkText[code]);
    $("h4.ref-code").html(referalCodeText[code]);
    $("p.title-company").html(companyText[code]);
    $("p.title-rule").html(ruleText[code]);
    $(".team-a h3").html(teamAText[code]);
    $(".team-b h3").html(teamBText[code]);
    $(".team-c h3").html(teamCText[code]);
    $(".total-amount h3").html(totalRevText[code]);
    $("h4.earn").html(earningText[code]);
    $(".title-new-team").html(newTeamText[code]);
    $(".title-team-withdraw").html(teamWithdrawText[code]);
    $(".title-team-recharge").html(teamRechargeText[code]);
    $(".title-number-of-first-recharge").html(numberOfFirstRechargeText[code]);
    $(".title-number-of-first-withdraw").html(numberOfFirstWithdrawText[code]);
    $(".already-joined").html(vipUnlockedText[code]);
    $(".team-ben").html(teamBenText[code]);
    $(".title-team-size").html(teamSizeText[code]);
    $(".title-com-notif").html(comNotifText[code]);
    $(".title-business-hall").html(businessHallText[code]);
    $(".detail .one:nth-child(1) .each:nth-child(1) p:nth-child(2)").html(dailyTaskText[code]);
    $(".detail .one:nth-child(1) .each:nth-child(2) p:nth-child(2)").html(perOrderText[code]);

    $(".detail .one:nth-child(2) .each:nth-child(1) p:nth-child(2)").html(dailyEarnText[code]);
    $(".detail .one:nth-child(2) .each:nth-child(2) p:nth-child(2)").html(monthlyEarnText[code]);

    $(".vip-box h3").html(allVipAvailText[code]);

    $(".today").html(todayText[code]);
    $(".yesterday-text").html(yesterdayText[code]);
    $(".this-month").html(thisMonthText[code]);
    $(".last-month").html(lastMonthText[code]);
    $(".total").html(totalText[code]);
    $(".mission-completed").html(missionComText[code]);

    $(".task-box h3").html(availTaskText[code]);

    $(".detail .my-number-task p:nth-child(2)").html(totalTaskText[code]);
    $(".detail .count p:nth-child(2)").html(taskDoneText[code]);
    $(".detail .win-per-order p:nth-child(2)").html(perOrderText[code]);
    $(".total-earn-today p:nth-child(2)").html(totalEarnTodayText[code]);

    $(".data .congrat").html(congratText[code]);
    $(".btn-do-task p").html(doThisTaskText[code]);
    $(".nav .btn-home p").html(homeText[code]);
    $(".nav .btn-task p").html(taskText[code]);
    $(".nav .btn-me p").html(meText[code]);
    $(".nav .btn-team p").html(teamText[code]);
    $(".transaction-detail-box h1").html(transDetailText[code]);
    $(".btn-open-withdraw .text p").html(withdrawText[code]);
    $(".btn-open-transaction-detail .text p").html(transDetailText[code]);
    $(".logout a").html(logoutText[code]);
    $(".btn-open-withdraw-method .text p").html(withdrawMethodText[code]);
    $(".withdraw-method-box h1").html(withdrawMethodText[code]);
    $(".withdraw-box h1").html(withdrawText[code]);
    $(".language-box").fadeOut(200);

}

function logoutUser() {
    document.querySelector(".logout a").click();
}
$(".logout").on("click", function() {
    logoutUser();
});

$(".btn-change-trans-pass").on("click", function() {
    document.querySelector(".btn-change-trans-pass a").click();
});

$(".btn-change-pass").on("click", function() {
    document.querySelector(".btn-change-pass a").click();
});


$(".each-lang").on("click", function () {
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

$(".valid-change").on("click", function () {
    switchLanguageTo(langToSwitch);
});


$(window).on("load", function () {
    windowWidth = window.innerWidth;
    userAgent = navigator.userAgent;
    screenWidth = screen.width;
    $(".page-loading").fadeOut(150);
    screenHeight = screen.height;
    var homeBoxWidth = $(".home-box").css("width");
    var h = homeBoxWidth.split("px");
    h = parseFloat(h);
    if (h < 400) {
        end = -300 * 4;
    }
    mainInvitationCode = $(".data .invite-code").attr("inv");
    
    var taskBoxWidth = $(".body .task-box").css("width");
    var valTaskBoxWidth = taskBoxWidth.split("px");
    valTaskBoxWidth = parseFloat(taskBoxWidth);
    var eachTaskWidth = (valTaskBoxWidth * 43) / 100;
    var rest = valTaskBoxWidth - (eachTaskWidth * 2);
    var margin = rest / 3;
    
    $(".tasks .each-task").css("width", eachTaskWidth + "px");
    $(".tasks .each-task").css("margin-left", margin + "px");
    $(".tasks .each-task").css("margin-right", "0px");
    $(".tasks .each-task .image").width("width", eachTaskWidth + "px");
    $(".tasks .each-task .image").width("height", eachTaskWidth + "px");
    
    numberTask = $(".task-box .detail .my-number-task p:nth-child(1)").html();
    numberTask = parseInt(numberTask);
    taskDone = $(".task-box .detail .count p:nth-child(1)").html();
    taskDone = parseInt(taskDone);
    perOrder = $(".task-box .detail .win-per-order p:nth-child(1)").attr("money");
    perOrder = parseFloat(perOrder);
    myEarnToday = $(".task-box .total-earn-today p:nth-child(1)").attr("money");
    myEarnToday = parseFloat(myEarnToday);

    if (userAgent.indexOf("Android") != -1 || userAgent.indexOf("iPhone") != -1 || userAgent.indexOf("iPad") != -1) {
        // 
    } else {
        $(".main-street").css("height", screenHeight - 100 + "px");
        var companyLeft = 460;
        var withdrawHeight = 400;
        var rechargeHeight = 410;
        var restScreen = screenWidth - 20 - companyLeft;
        var dbBox = restScreen / 2;
        var one = dbBox - 30;
        var two = dbBox + 30;
        var mainHeight = $(".main-street").css("height");
        mainHeight = mainHeight.split("px");
        mainHeight = parseFloat(mainHeight[0]);
        var ruleHeight = mainHeight - 20 - 410;
        var withdrawTop = 10 + ruleHeight + 10;
        var withdrawLeft = 440 + 30 + two;
        
        setTimeout(function () {
            $(".main-street").animate({ "left": "10px" }, 200);
        }, 1500);
        setTimeout(function () {
            $(".recharge-box").css("width", two + "px");
            $(".recharge-box").css("left", companyLeft + "px");
            $(".recharge-box").fadeIn(300);
            $(".recharge-box").css("height", rechargeHeight + "px");
            $(".recharge-box").css("background", "#171717");
        }, 2000);
        setTimeout(function () {
            $(".rule-box").css("width", two + "px");
            $(".rule-box").css("left", companyLeft + "px");
            $(".rule-box").fadeIn(300);
            $(".rule-box").css("height", ruleHeight + "px");
            $(".rule-box").css("top", "430px");
            $(".rule-box").css("bottom", "20px");
            $(".rule-box").css("background", "#171717");
        }, 2200);

        setTimeout(function () {
            $(".company-box").css("width", one + "px");
            $(".company-box").css("left", withdrawLeft + "px");
            $(".company-box").fadeIn(300);
            $(".company-box").css("height", ruleHeight + "px");
            $(".company-box").css("background", "#171717");
        }, 2400);

        setTimeout(function () {
            $(".withdraw-box").css("width", one + "px");
            $(".withdraw-box").css("left", withdrawLeft + "px");
            $(".withdraw-box").fadeIn(300);
            $(".withdraw-box").css("height", rechargeHeight + "px");
            $(".withdraw-box").css("top", withdrawTop + "px");
            $(".withdraw-box").css("background", "#171717");
            $(".withdraw-box").css("bottom", "20px");
        }, 2600);
    }
    setTimeout(function() {
        document.querySelector(".blur-every").classList.replace("f", "to-5");
    }, 3000)
    setTimeout(function() {
        document.querySelector(".blur-every").classList.replace("to-5", "to-3");
    }, 4500)
    setTimeout(function() {
        document.querySelector(".blur-every").classList.replace("to-3", "to-1");
    }, 6000)
    setTimeout(function() {
        document.querySelector(".blur-every").classList.replace("to-1", "to-0");
    }, 7500);
    setTimeout(function() {
        $(".blur-every").hide();
    }, 7500);
    
});



$(".message").fadeOut(0);
setInterval(function () {
    if (a == end) {
        a = 0
    } else {
        var j = $(".home-box").css("width");
        var x = j.split("px");
        x = parseFloat(x)
        if (x < 400) {
            a = a - 300;
        } else {
            a = a - 370;
        }
    }

    $(".slide-pic .first").css("margin-left", a + "px");
}, 3000);


$(".btn-copy-recharge").on("click", function () {
    showAlert(rechargeLinkCopiedText[langCode]);
    var copyRech = document.querySelector(".body-recharge .link input");
    copyRech.select();
    document.execCommand("copy");
    window.getSelection().removeAllRanges();
});

$(".btn-do-task").on("click", function () {
    $(this).html("<p>...</p>");
    var id = $(this).attr("id");
    id = "#" + id;

    if (numberTask == taskDone) {
        $(id).html("<p>" + doThisTaskText[langCode] + "</p>");
        showAlert(reachedTaskText[langCode]);
    } else {
        loadRequest();
        $.get("/do_task/", function(data) {
            if (data == "ok") {
                stopLoading();
                $(id).html("<p>" + doThisTaskText[langCode] + "</p>");
                showAlert(payementSentText[langCode]);
                taskDone = taskDone + 1;
                myEarnToday = myEarnToday + perOrder;
                $(".task-box .detail .count p:nth-child(1)").html(taskDone);
                $(".task-box .total-earn-today p:nth-child(1)").attr("money", myEarnToday);
                $(".task-box .total-earn-today p:nth-child(1)").html("$" + myEarnToday);
                
            } else if (data.indexOf(websiteUnaivalable)) {
                logoutUser();
                
            } else {
                stopLoading();
                $(id).html("<p>" + doThisTaskText[langCode] + "</p>");
                showAlert(reachedTaskText[langCode]);
            }
        });
    }
});

function checkWithdrawInput() {
    var amount_value = $(".withdraw-form .email input").val();
    var intAmountValue = parseFloat(amount_value);
    var transPassword = $(".withdraw-form .password input").val();
    var withMethod = $(".withdraw-form .password .text p:nth-child(2)").html();
    var elAmount = document.querySelector(".withdraw-form .email input");
    var elTrans = document.querySelector(".withdraw-form .password input");
    if (amount_value > 1) {
        if (transPassword.length > 5) {
            if (withMethod.length > 20 && (withMethod != "None" || withMethod != "Aucun")) {
                return true;
            } else {
                $(".withdraw-form .error-with.error-method").show();
                $(".withdraw-form .error-with.error-method").html(chooseWithErrorText[langCode]);
                return false;
            }
        } else {
            elTrans.focus();
            $(".withdraw-form .error-with.error-trans").show();
            return false;
        }
    } else {
        elAmount.focus();
        $(".withdraw-form .error-with.error-amount").show();
        $(".withdraw-form .error-with.error-amount").html(maxValueText[langCode]);
        return false;
    }
}


$(".withdraw-form").on("submit", function(e) {
    e.preventDefault();
    if (checkWithdrawInput()) {
        loadRequest();
        $(".withdraw-form .btn-submit-with button").html(treatmentText[langCode]);
        $(".withdraw-form .btn-submit-with button").css("color", "#DFDFDF");
        $.ajax({
            type: "POST",
            url: "/get_withdraw/",
            data: {
                transaction_password: $(".withdraw-form .password input").val(),
                value: $(".withdraw-form .email input").val(),
                withdraw_method: idChoosen,
                csrfmiddlewaretoken: $("input[name=csrfmiddlewaretoken]").val(),
                user_token: $("input[name=user_token]").val()
            },
            success: function(data) {
                stopLoading();
                if (data == "empty_balance") {
                    $(".withdraw-form .error-with.error-amount").show();
                    $(".withdraw-form .error-with.error-amount").html(emptyValueText[langCode]);
                    $(".withdraw-form .btn-submit-with button").html(sumbitWithText[langCode]);
                    $(".withdraw-form .btn-submit-with button").css("color", "white");
                    
                } else if (data == "wrong_pass") {
                    $(".withdraw-form .error-with.error-trans").show();
                    $(".withdraw-form .error-with.error-trans").html(wrongTransText[langCode]);
                    $(".withdraw-form .btn-submit-with button").html(sumbitWithText[langCode]);
                    $(".withdraw-form .btn-submit-with button").css("color", "white");
                    
                } else if (data == "max_value" || data == "min_value") {
                    $(".withdraw-form .error-with.error-amount").show();
                    $(".withdraw-form .error-with.error-amount").html(maxValueText[langCode]);
                    $(".withdraw-form .btn-submit-with button").html(sumbitWithText[langCode]);
                    $(".withdraw-form .btn-submit-with button").css("color", "white");
                    
                } else if (data == "more_than_balance") {
                    $(".withdraw-form .error-with.error-amount").show();
                    $(".withdraw-form .error-with.error-amount").html(moreThanBalanceText[langCode]);
                    $(".withdraw-form .btn-submit-with button").html(sumbitWithText[langCode]);
                    $(".withdraw-form .btn-submit-with button").css("color", "white");
                } else if (data == "no_method_selected") {
                    $(".withdraw-form .error-with.error-method").show();
                    $(".withdraw-form .error-with.error-method").html(chooseWithErrorText[langCode]);
                    $(".withdraw-form .btn-submit-with button").html(sumbitWithText[langCode]);
                    $(".withdraw-form .btn-submit-with button").css("color", "white");
                } else if (data == "ok") {
                    showAlert(paymentInTreatmentText[langCode]);
                    $(".withdraw-form .btn-submit-with button").html(sumbitWithText[langCode]);
                    $(".withdraw-form .btn-submit-with button").css("color", "white");
                    
                    $(".withdraw-form .password input").val("");
                    $(".withdraw-form .email input").val("");
                    $(".withdraw-form .password .text p:nth-child(2)").html(noneText);
                } else if (data == "value_error") {
                    $(".withdraw-form .error-with.error-method").show();
                    $(".withdraw-form .error-with.error-method").html(withdrawMethodValueErrorText[langCode]);
                    $(".withdraw-form .btn-submit-with button").html(sumbitWithText[langCode]);
                    $(".withdraw-form .btn-submit-with button").css("color", "white");
                } else if (data == "missing_user_token") {
                    showAlert(requestForbiddenText[langCode]);
                    $(".withdraw-form .btn-submit-with button").html(sumbitWithText[langCode]);
                    $(".withdraw-form .btn-submit-with button").css("color", "white");
                    
                } else if (data == "error_user_token") {
                    showAlert(invalidUserTokenText[langCode]);
                    $(".withdraw-form .btn-submit-with button").html(sumbitWithText[langCode]);
                    $(".withdraw-form .btn-submit-with button").css("color", "white");
                    
                } else if (data.indexOf("logout_user")) {
                    logoutUser();
                } else {
                    showAlert(unknownErrorText[langCode]);
                }
            }
        })
    }
})

var allBooleanValues = ["true", "t", "f", "false", "no", "n", "vraie", "faux", "v"];
var trueBoolean = ["true", "v", "vraie", "vrai", "t"];
var falseBoolean = ["false", "f", "no", "n", "faux"];

function getBooleanOf(value) {
    if (value != "") {
        if (allBooleanValues.indexOf(value) != -1) {
            if (trueBoolean.indexOf(value) != -1) {
                return true;
            } else {
                return false;
            }
        } else {
            return null;
        }
    } else {
        return null;
    }
};

function showAlert(text) {
    $(".message p").html(text);
    $(".message").fadeIn(300);
    setTimeout(function () {
        $(".message").fadeOut(300);
    }, 5000);
}

function loadRequest() {
    $(".loading").fadeIn(200);
    $(".loading").css("display", "flex");
}

function stopLoading() {
    $(".loading").fadeOut(200);
}

function activeHome() {
    $(".nav .each.btn-home i").addClass("active");
    $(".nav .each.btn-home p").addClass("active");

    $(".nav .each.btn-task i").removeClass("active");
    $(".nav .each.btn-task p").removeClass("active");

    $(".nav .each.btn-vip i").removeClass("active");
    $(".nav .each.btn-vip p").removeClass("active");

    $(".nav .each.btn-team i").removeClass("active");
    $(".nav .each.btn-team p").removeClass("active");

    $(".nav .each.btn-me i").removeClass("active");
    $(".nav .each.btn-me p").removeClass("active");

    $(".header .logo i").hide();
    $(".header .logo img").show();

    isMeFocus = false;
    isHomeFocus = true;
    isTaskFocus = false;
    isVipFocus = false;
    isTeamFocus = false;
}

function activeMe() {
    $(".nav .each.btn-home i").removeClass("active");
    $(".nav .each.btn-home p").removeClass("active");

    $(".nav .each.btn-task i").removeClass("active");
    $(".nav .each.btn-task p").removeClass("active");

    $(".nav .each.btn-vip i").removeClass("active");
    $(".nav .each.btn-vip p").removeClass("active");

    $(".nav .each.btn-team i").removeClass("active");
    $(".nav .each.btn-team p").removeClass("active");

    $(".nav .each.btn-me i").addClass("active");
    $(".nav .each.btn-me p").addClass("active");

    $(".header .logo i").show();
    $(".header .logo img").hide();
    icon.setAttribute("class", "far fa-user");

    isMeFocus = true;
    isHomeFocus = false;
    isTaskFocus = false;
    isVipFocus = false;
    isTeamFocus = false;
}

function activeTeam() {
    $(".nav .each.btn-home i").removeClass("active");
    $(".nav .each.btn-home p").removeClass("active");

    $(".nav .each.btn-task i").removeClass("active");
    $(".nav .each.btn-task p").removeClass("active");

    $(".nav .each.btn-vip i").removeClass("active");
    $(".nav .each.btn-vip p").removeClass("active");

    $(".nav .each.btn-team i").addClass("active");
    $(".nav .each.btn-team p").addClass("active");

    $(".nav .each.btn-me i").removeClass("active");
    $(".nav .each.btn-me p").removeClass("active");

    $(".header .logo i").show();
    $(".header .logo img").hide();
    icon.setAttribute("class", "far fa-heart");

    isMeFocus = false;
    isHomeFocus = false;
    isTaskFocus = false;
    isVipFocus = false;
    isTeamFocus = true;
}

function activeVip() {
    $(".nav .each.btn-home i").removeClass("active");
    $(".nav .each.btn-home p").removeClass("active");

    $(".nav .each.btn-task i").removeClass("active");
    $(".nav .each.btn-task p").removeClass("active");

    $(".nav .each.btn-vip i").addClass("active");
    $(".nav .each.btn-vip p").addClass("active");

    $(".nav .each.btn-team i").removeClass("active");
    $(".nav .each.btn-team p").removeClass("active");

    $(".nav .each.btn-me i").removeClass("active");
    $(".nav .each.btn-me p").removeClass("active");

    $(".header .logo i").show();
    $(".header .logo img").hide();
    icon.setAttribute("class", "fa fa-gem");

    isMeFocus = false;
    isHomeFocus = false;
    isTaskFocus = false;
    isVipFocus = true;
    isTeamFocus = false;
}

function activeTask() {
    $(".nav .each.btn-home i").removeClass("active");
    $(".nav .each.btn-home p").removeClass("active");

    $(".nav .each.btn-task i").addClass("active");
    $(".nav .each.btn-task p").addClass("active");

    $(".nav .each.btn-vip i").removeClass("active");
    $(".nav .each.btn-vip p").removeClass("active");

    $(".nav .each.btn-team i").removeClass("active");
    $(".nav .each.btn-team p").removeClass("active");

    $(".nav .each.btn-me i").removeClass("active");
    $(".nav .each.btn-me p").removeClass("active");

    $(".header .logo i").show();
    $(".header .logo img").hide();
    icon.setAttribute("class", "fa fa-flag");

    isMeFocus = false;
    isHomeFocus = false;
    isTaskFocus = true;
    isVipFocus = false;
    isTeamFocus = false;
}


$(".btn-home").on("click", function () {
    activeHome();
    homeBox.classList.replace("deactive", "active");
    meBox.classList.replace("active", "deactive");
    taskBox.classList.replace("active", "deactive");
    teamBox.classList.replace("active", "deactive");
    vipBox.classList.replace("active", "deactive");
    $(".header .text h1").html("nike-mall");
});

$(".btn-team").on("click", function () {
    homeBox.classList.replace("active", "deactive");
    meBox.classList.replace("active", "deactive");
    taskBox.classList.replace("active", "deactive");
    teamBox.classList.replace("deactive", "active");
    vipBox.classList.replace("active", "deactive");
    activeTeam();
    $(".header .text h1").html(teamText[langCode]);
});

$(".btn-me").on("click", function () {
    homeBox.classList.replace("active", "deactive");
    meBox.classList.replace("deactive", "active");
    taskBox.classList.replace("active", "deactive");
    teamBox.classList.replace("active", "deactive");
    vipBox.classList.replace("active", "deactive");
    activeMe();
    $(".header .text h1").html(myProfileText[langCode]);
});

$(".btn-task").on("click", function () {
    homeBox.classList.replace("active", "deactive");
    meBox.classList.replace("active", "deactive");
    taskBox.classList.replace("deactive", "active");
    teamBox.classList.replace("active", "deactive");
    activeTask();
    $(".header .text h1").html(taskText[langCode]);
    vipBox.classList.replace("active", "deactive");
});

$(".can-do").on("click", function() {
    homeBox.classList.replace("active", "deactive");
    meBox.classList.replace("active", "deactive");
    taskBox.classList.replace("deactive", "active");
    teamBox.classList.replace("active", "deactive");
    activeTask();
    $(".header .text h1").html(taskText[langCode]);
    vipBox.classList.replace("active", "deactive");
});

$(".btn-vip").on("click", function () {
    homeBox.classList.replace("active", "deactive");
    meBox.classList.replace("active", "deactive");
    taskBox.classList.replace("active", "deactive");
    teamBox.classList.replace("active", "deactive");
    vipBox.classList.replace("deactive", "active");
    activeVip();
    $(".header .text h1").html("VIP area");
});

$(".btn-open-withdraw").on("click", function () {
    $(".withdraw-box").fadeIn(300);
});

$(".close-with").on("click", function () {
    $(".withdraw-box").fadeOut(300);
});

$(".btn-open-recharge").on("click", function () {
    $(".recharge-box").fadeIn(300);
});

$(".close-recharge").on("click", function () {
    $(".recharge-box").fadeOut(300);
});

$(".btn-open-rule").on("click", function () {
    $(".rule-box").fadeIn(300);
});

$(".close-rule").on("click", function () {
    $(".rule-box").fadeOut(300);
});


$(".btn-open-company").on("click", function () {
    $(".company-box").fadeIn(300);
});

$(".close-company").on("click", function () {
    $(".company-box").fadeOut(300);
});

$(".btn-open-withdraw-method").on("click", function () {
    $(".withdraw-method-box").fadeIn(300);
});

$(".close-withdraw-method").on("click", function () {
    if (userAgent.indexOf("Android") == -1 || userAgent.indexOf("iPhone") != -1 || userAgent.indexOf("iPad") != -1) {
        $(".black-computer").fadeOut(200);
    }
    $(".withdraw-method-box").fadeOut(300);
});


$(".btn-open-transaction-detail").on("click", function () {
    if (userAgent.indexOf("Android") == -1 && userAgent.indexOf("iPhone") == -1 && userAgent.indexOf("iPad") == -1) {
        $(".transaction-detail-box").css("top", "30px");
        $(".transaction-detail-box").css("bottom", "30px");
        $(".transaction-detail-box").css("z-index", "8");
        $(".black-computer").fadeIn(200);
    }
    $(".transaction-detail-box").fadeIn(300);
});

$(".btn-open-withdraw-method").on("click", function () {
    if (userAgent.indexOf("Android") == -1 && userAgent.indexOf("iPhone") != -1 && userAgent.indexOf("iPad") != -1) {
        $(".withdraw-method-box").css("top", "70px");
        $(".withdraw-method-box").css("bottom", "70px");
        $(".withdraw-method-box").css("z-index", "8");
        $(".black-computer").fadeIn(200);
    }
    $(".withdraw-method-box").fadeIn(300);
});


$(".close-transaction-detail").on("click", function () {
    if (userAgent.indexOf("Android") == -1 || userAgent.indexOf("iPhone") == -1 || userAgent.indexOf("iPad") == -1) {
        $(".black-computer").fadeOut(200);
    }
    $(".transaction-detail-box").fadeOut(300);
});

$(".btn-open-language").on("click", function () {
    if (userAgent.indexOf("Android") == -1 && userAgent.indexOf("iPhone") == -1 && userAgent.indexOf("iPad") == -1) {
        $(".language-box").css("top", "80px");
        $(".language-box").css("bottom", "80px");
        $(".language-box").css("z-index", "8");
        $(".black-computer").fadeIn(200);
    }
    $(".language-box").fadeIn(300);
});

$(".close-language").on("click", function () {
    if (userAgent.indexOf("Android") == -1 || userAgent.indexOf("iPhone") == -1 || userAgent.indexOf("iPad") == -1) {
        $(".black-computer").fadeOut(200);
    }
    $(".language-box").fadeOut(300);
});


$(".btn-submit-recharge").on("click", function () {
    rechargeForm.classList.replace("hide", "show");
    if (userAgent.indexOf("Android") != -1 || userAgent.indexOf("iPhone") != -1 || userAgent.indexOf("iPad") != -1) {
        $(".recharge-box").fadeOut(200);
    }
    var qrvalue = $(".body-recharge .link input").val();
    $(".black-recharge").fadeIn(400);
    $(".main-block-recharge form div input.qrcode-field").val(qrvalue);
    $(".main-block-recharge form div input.vip-field").val("");
});

$(".black-recharge").on("click", function () {
    rechargeForm.classList.replace("show", "hide");
    $(".black-recharge").fadeOut(400);
});


$(".vip-box .each-vip").on("click", function () {
    var vipWonder = $(this).attr("vip");
    vipWonder = parseInt(vipWonder);
    var unclokedValue = $(this).attr("unlocked");
    var unlocked = getBooleanOf(unclokedValue);
    if (unlocked) {
        showAlert(thisViPIsUnlockedText[langCode]);
    } else {
        $(".black-recharge").fadeIn(400);
        rechargeForm.classList.replace("hide", "show");
        var qrvalue = $(".body-recharge .link input").val();
        $(".main-block-recharge form div input.qrcode-field").val(qrvalue);
        $(".main-block-recharge form div input.vip-field").val(vipWonder);
    }
});