function InitRestarauntPayment() {
    GetClientToken(InitRestarauntBraintree);
}

function InitRestarauntBraintree(token) {
    var client_token = token;
    var form = document.querySelector('#payment-form');

    braintree.dropin.create({
        authorization: client_token,
        container: '#bt-dropin'
    }, function(createErr, instance) {
        form.addEventListener('submit', function(event) {
            event.preventDefault();
            if (checkValidationAndRequired($("#orderInfo"))) {
                instance.requestPaymentMethod(function(err, payload) {
                    if (err) {
                        //console.log('Error', err);
                        alert(err);
                        return;
                    }

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
                            $(".bt-dropin").html("");
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
            $(".bt-drop-in-wrapper").removeClass("hidden");
            $(".cart").addClass("hidden");
            InitBraintree(data);

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
}