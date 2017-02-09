function submitFormListener() {

    $(".form-container").find(".formSubmit").on("click", function() {
        var networkState = navigator.connection.type;
        if (networkState != Connection.NONE) {
            var check = true;
            var form = $(this).closest(".form-container");
            check = checkValidationAndRequired(form);
            if (check == false) {
                return;
            }
            var idForm = $(form).find(".formId").attr("id");
            var idProject = applicationData.ProjectId;
            $(".form-container").append("<input type='hidden' name='projectId' value='" + idProject + "'/><input type='hidden' name='formId' value='" + idForm + "'/>")

            var siteUrl = applicationData.UrlForUpdateApp;
            var formData = new FormData(form)
            $.post('' + siteUrl + '/Form/SaveFormData', $(form).serialize(), function() {
                alert("Thank you!");
                $(form).find(".formBlock").find("input, textarea").val("");
                $(form).find("input[type='checkbox']").removeAttr("checked");
            });
        } else {
            alert("Sorry, no internet connection!");
        }
    });
}

function createCustomHideForms() {
    var objectForm = applicationData.Forms;
    $(objectForm).each(function(i, form) {
        var idHideForm = "form_" + form.Id;
        $("#custom-hide-container").append("<form id='custom-form-hide-container'></form>");
        renderHideCustomForm(form);
        $("#custom-form-hide-container").attr("id", idHideForm);
    });
}
function bindChangeValForms() {
    var siteUrl = applicationData.UrlForUpdateApp;
    $($("#custom-hide-container").find("form")).each(function(i, elem) {
        var formId = $(elem).attr("id").split("_")[1];
        $(".form-submit-item").find(".formSubmit").each(function(i, button) {
            if (formId == $(button).parent().attr("name")) {
                $(button).on("click", function() {
                    var networkState = navigator.connection.type;
                    if (networkState != Connection.NONE) {
                        var check = checkValidationAndRequired(elem);
                        if (check != false) {
                            $.post('' + siteUrl + '/Form/SaveFormData', $(elem).serialize(), function() {
                                alert("Thank you!");
                                $(elem).find(".formBlock").find("input[type='number'], input[type='text'], textarea").val("");
                                $("." + $(elem).attr("id")).siblings(".formBlock").find("input[type='number'], input[type='text'], textarea").val("");
                                $(elem).find("input[type='checkbox']").removeAttr("checked");
                                $("." + $(elem).attr("id")).siblings(".formBlock").find("input[type='checkbox']").removeAttr("checked");
                            });
                        }
                    } else {
                        alert("Sorry, no internet connection!");
                    }
                });
            }
        });

        $(".form_" + formId).each(function(i, element) {
            var field = $(element).siblings(".formBlock").find("input, textarea, select");
            var fieldName = $(field).attr("name");
            if ($(element).find("button").length > 0) {
                $(element).find("button").unbind("click");
                $(element).find("button").on("click", function() {
                    var networkState = navigator.connection.type;
                    if (networkState != Connection.NONE) {
                        var check = checkValidationAndRequired(elem);
                        if (check != false) {
                            $.post('' + siteUrl + '/Form/SaveFormData', $(elem).serialize(), function() {
                                alert("Thank you!");
                                $(elem).find(".formBlock").find("input[type='number'], input[type='text'], textarea").val("");
                                $("." + $(elem).attr("id")).siblings(".formBlock").find("input[type='number'], input[type='text'], textarea").val("");

                                $(elem).find("input[type='checkbox']").removeAttr("checked");
                                $("." + $(elem).attr("id")).siblings(".formBlock").find("input[type='checkbox']").removeAttr("checked");
                            });
                        }
                    } else {
                        alert("Sorry, no internet connection!");
                    }
                })
            } else {
                $(field).unbind("change");
                $(field).on("change", function() {

                    if ($(elem).find("[name='" + fieldName + "']:radio").length > 0) {
                        $(elem).find("[name='" + fieldName + "']").val($(this).val());
                    } else if ($(elem).find("[name='" + fieldName + "']:checkbox").length > 0) {
                        $(elem).find("[name='" + $(this).attr("name") + "']").prop('checked', $(this).prop("checked"));
                    } else {
                        $(elem).find("[name='" + fieldName + "']").val(field.val());
                    }
                });
            }
        });
    });
}

function checkValidationAndRequired(form) {
    var check = true;
    $(form).find(".required").each(function(i, element) {
        if ($(element).val() == "") {
            check = false;
        }
    }, this);
    if (check == false) {
        alert("Please fill in all required fields!");
        return check;
    }
    if ($(form).find(".required-check").length > 0) {
        check = false;
        $(form).find(".required-check").each(function(i, element) {
            if ($(element).find("input").is(':checked')) {
                check = true;
            }
        });
        if (check == false) {
            alert("Please fill in all required fields!");
            return check;
        }
    }
    if ($(form).find(".phoneNumberElement").length > 0) {
        var phoneInput = $(form).find(".phoneNumberElement").find(".phoneNumber").val();
        var phoneValid = /^\+\d{4}\d{3}\d{4}$/;
        if ((!phoneInput.match(phoneValid)) && (!phoneInput != "")) {
            alert("Please enter valid phone number!");
            check = false;
            return check;
        }
    }
    if ($(form).find(".emailElement").length > 0) {
        var emailInput = $(form).find(".emailElement").find(".email").val().toLowerCase();
        var emailValid = /^[_A-Za-z0-9-]+(\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\.[A-Za-z0-9-]+)*(\.[A-Za-z]{2,8})$/;
        if ((!emailInput.match(emailValid)) && (emailInput != "")) {
            alert("Please enter valid email!");
            check = false;
            return check;
        }
    }
    return check;
}

function addPlaceholder() {
    $(".form-container, .custom-form-container").find("input[type='text'], input[type='number'], textarea").each(function () {
        if (($(this).attr("type") != "radio") || ($(this).attr("type") != "checkbox")) {
            var placeholder = $(this).siblings(".label-container").find("label").text();
            $(this).attr("placeholder", placeholder).addClass("placeholderOfLable");
            $(this).siblings(".label-container").addClass("hidden");
        }

    });
}