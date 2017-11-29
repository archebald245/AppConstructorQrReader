var dropinInstance;

function InitRestarauntPayment() {
    GetClientToken(InitRestarauntBraintree);
}

function InitRestarauntBraintree(token) {
    var client_token = token;
    var form = document.querySelector('#payment-form');

    braintree.dropin.create({
        authorization: client_token,
        container: '#bt-dropin',
        translations: {
            payingWith: cultureRes.payingWith,
            chooseAnotherWayToPay: cultureRes.chooseAnotherWayToPay,
            chooseAWayToPay: cultureRes.chooseAWayToPay,
            otherWaysToPay: cultureRes.otherWaysToPay,
            cardVerification: cultureRes.cardVerification,

            fieldEmptyForCvv: cultureRes.fieldEmptyForCvv,
            fieldEmptyForExpirationDate: cultureRes.fieldEmptyForExpirationDate,
            fieldEmptyForCardholderName: cultureRes.fieldEmptyForCardholderName,
            fieldEmptyForNumber: cultureRes.fieldEmptyForNumber,
            fieldInvalidForCvv: cultureRes.fieldInvalidForCvv,
            fieldInvalidForExpirationDate: cultureRes.fieldInvalidForExpirationDate,
            fieldInvalidForNumber: cultureRes.fieldInvalidForNumber,
            genericError: cultureRes.genericError,
            hostedFieldsFailedTokenizationError: cultureRes.hostedFieldsFailedTokenizationError,
            hostedFieldsTokenizationCvvVerificationFailedError: cultureRes.hostedFieldsTokenizationCvvVerificationFailedError,
            hostedFieldsTokenizationNetworkErrorError: cultureRes.hostedFieldsTokenizationNetworkErrorError,
            hostedFieldsFieldsInvalidError: cultureRes.hostedFieldsFieldsInvalidError,
            unsupportedCardTypeError: cultureRes.unsupportedCardTypeError,
            cvvThreeDigitLabelSubheading: cultureRes.cvvThreeDigitLabelSubheading,
            cardNumberLabel: cultureRes.cardNumberLabel,
            cvvLabel: cultureRes.cvvLabel,
            expirationDateLabel: cultureRes.expirationDateLabel,
            expirationDateLabelSubheading: cultureRes.expirationDateLabelSubheading,
            expirationDatePlaceholder: cultureRes.expirationDatePlaceholderexpirationDatePlaceholder,
            payWithCard: cultureRes.payWithCard,
            endingIn: cultureRes.endingIn,
            Card: cultureRes.Card,
            PayPal: cultureRes.PayPal
        },
        card: {
            overrides: {
                fields: {
                    number: {
                        placeholder: 'XXXX XXXX XXXX XXXX' // Update the number field placeholder
                    },
                    cvv: { placeholder: "XXX" }
                }
            }
        }
    }, function(createErr, instance) {
        dropinInstance = instance;
        form.addEventListener('submit', function(event) {
            event.preventDefault();
            if (checkValidationAndRequired($("#orderInfo"))) {
                instance.requestPaymentMethod(function(err, payload) {
                    if (err) {
                        //console.log('Error', err);
                        alert(err);
                        return;
                    }
                    $(".spinner-container").removeClass("hidden");
                    // Add the nonce to the form and submit
                    document.querySelector('#nonceRest').value = payload.nonce;

                    var name = $("#orderInfo").find(".nameOrder").val();
                    var phone = $("#orderInfo").find(".phoneOrder").val();
                    var email = $("#orderInfo").find(".emailOrder").val();
                    var comment = $("#orderInfo").find(".commentOrder").val();
                    var nonce = payload.nonce;

                    $.ajax({
                        type: "POST",
                        url: applicationData.UrlForUpdateApp + "/RestaurantMenu/CreateOrder",
                        data: {
                            OrderItems: collectionOrderItems,
                            Name: name,
                            Phone: phone,
                            Email: email,
                            Comment: comment,
                            ProjectId: applicationData.ProjectId,
                            ContentId: applicationData.Id,
                            Nonce: nonce
                        },
                        dataType: 'json',
                        success: function(data) {
                            $(".spinner-container").addClass("hidden");
                            $(".bt-drop-in-wrapper").addClass("hidden");
                            if (data.Success) {
                                alert(cultureRes.thankYou);
                                $("#cart").html("");
                                $(".totalPrice b").html("0");
                                $("#cart .cartItem").html("");
                                $("#orderInfo input, #orderInfo textarea").val("");
                                $("#container").removeClass("hidden");
                                $("#orderInfo, .cart").addClass("hidden");

                                scrollTop();
                                if ($('.classMenuTop').length > 0 || $('.classMenuBottom').length > 0) {
                                    $(".classMenu").removeClass("hidden");
                                }
                            } else {
                                alert(data.Message);
                            }

                        }
                    });
                });
            }
        });

        $(".placeAnOrder").unbind().on("click", function() {
            $("#payment-form button.button").click();
        });
    });
}

function GetClientToken(InitBraintree) {
    $.ajax({
        type: "POST",
        url: applicationData.UrlForUpdateApp + "/CustomerBraintree/GetClientToken",
        data: { projectId: applicationData.ProjectId },
        cache: false,
        success: function(data) {
            $("#orderInfo").removeClass("hidden");
            $(".braintree-container").removeClass("hidden");
            $(".cart").addClass("hidden");
            if (data != "") {
                paymentMethodHandler();
                InitBraintree(data);
            } else {
                alert(cultureRes.sorryError);
                return false;
            }
            scrollTop();
        },
        error: function() {
            alert(cultureRes.sorryError);
        }
    });
}

function GetClientTokenForBooking(callback, dateVal, timeVal, needConfirmation, bookResourceId) {
    $.ajax({
        type: "POST",
        url: applicationData.UrlForUpdateApp + "/CustomerBraintree/GetClientToken",
        data: { projectId: applicationData.ProjectId },
        cache: false,
        success: function(data) {
            if (data !== "") {

                $(".dateTimePicker-container").addClass("hidden");
                $(".order-booking").removeClass("hidden");
                scrollTop();

                callback(dateVal, timeVal, needConfirmation, bookResourceId, data);
            } else {
                if (checkValidationAndRequired($(".order-booking"))) {
                    BookingOrderHandlers(dateVal, timeVal, needConfirmation, bookResourceId);
                }
            }
        },
        error: function() {
            alert(cultureRes.sorryError);
        }
    });

    //paymentMethodBookingHandler
    $("select#payMethod-booking").on("change", function() {
        var payMethod = $("select#payMethod-booking option:selected").val();
        if (payMethod === "card") {
            $(".bt-drop-in-wrapper-booking").removeClass("hidden");

            $(".btn-send-order-booking").unbind().on("click", function() {
                $("#payment-form-booking button.button").click();
            });

        } else if (payMethod === "cash") {

            $(".btn-send-order-booking").unbind().on("click", function() {
                if (checkValidationAndRequired($(".order-booking"))) {
                    BookingOrderHandlers(dateVal, timeVal, needConfirmation, bookResourceId);
                }
            });
            $(".bt-drop-in-wrapper-booking").addClass("hidden");
        }
    });
}

function destroyPayment() {
    dropinInstance.teardown(function(err) {
        if (err) { console.error('An error occurred during teardown:', err); }
    });
    $("#bt-dropin-booking").html("");
    $("#bt-dropin").html("");
}

function paymentMethodHandler() {
    $("select#payMethod").on("change", function() {
        var payMethod = $("select#payMethod option:selected").val();
        if (payMethod === "card") {
            $(".bt-drop-in-wrapper").removeClass("hidden");

            $(".placeAnOrder").unbind().on("click", function() {
                $("#payment-form button.button").click();
            });

        } else if (payMethod === "cash") {

            $(".placeAnOrder").unbind().on("click", function() {
                clickPlaceAnOrder();
            });
            $(".bt-drop-in-wrapper").addClass("hidden");
        }
    });
}

// function paymentMethodBookingHandler() {
//     $("select#payMethod-booking").on("change", function() {
//         var payMethod = $("select#payMethod-booking option:selected").val();
//         if (payMethod === "card") {
//             $(".bt-drop-in-wrapper-booking").removeClass("hidden");

//             $(".btn-send-order-booking").unbind().on("click", function() {
//                 $("#payment-form button.button").click();
//             });

//         } else if (payMethod === "cash") {

//             $(".btn-send-order-booking").unbind().on("click", function() {
//                 if (checkValidationAndRequired($(".order-booking"))) {
//                     BookingOrderHandlers(dateVal, timeVal, needConfirmation, bookResourceId);
//                 }
//             });
//             $(".bt-drop-in-wrapper-booking").addClass("hidden");
//         }
//     });
// }