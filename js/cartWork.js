var collectionOrderItems;

function clickOrder() {
    var orderItems = $("#cart").find(".cartItem");
    collectionOrderItems = [];
    $(orderItems).each(function() {
        var id = $(this).find("[name=shopItemId]").val();
        var count = $(this).find("[name=shopItemCount]").val();
        $(applicationData.Restaurants).each(function() {
            $(this.RestaurantMenus).each(function() {
                $(this.RestaurantMenuItems).each(function() {
                    if (this.Id == id) {
                        var item = JSON.parse(JSON.stringify(this));
                        item.Count = count;
                        item.RestaurantMenuImages = null;
                        collectionOrderItems.push(item);
                    }
                });
            });
        });

    });
}

function clickPlaceAnOrder() {
    if (checkValidationAndRequired($("#orderInfo"))) {
        $(".spinner-container").removeClass("hidden");

        var name = $("#orderInfo").find(".nameOrder").val();
        var phone = $("#orderInfo").find(".phoneOrder").val();
        var email = $("#orderInfo").find(".emailOrder").val();
        var comment = $("#orderInfo").find(".commentOrder").val();

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
                Nonce: ""
            },
            cache: false,
            success: function() {
                $(".spinner-container").addClass("hidden");
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
            },
            error: function() {
                alert(cultureRes.sorryError);
            }
        });
    }
}

function bindListenerToClickBtn() {
    //to menu
    $(".back-to-container, .go-to-menu-btn, .go-to-menu").on("click", function() {
        $("#container").removeClass("hidden");
        $(".classMenu").removeClass("hidden");
        $(".classSwipeDropList").removeClass("hidden");
        $(".cart").addClass("hidden");
        $(".singleItem").addClass("hidden");
        $("#orderInfo").addClass("hidden");
        scrollTop();
    });
    //to cart
    $(".to-cart, .cart-btn").on("click", function() {
        $("#container").addClass("hidden");
        $(".classMenu").addClass("hidden");
        $(".classSwipeDropList").addClass("hidden");
        $(".cart").removeClass("hidden");
        $(".singleItem").addClass("hidden");
        window.scrollTo(0, 0);
    });
    //to cart from order page
    $(".back-to-cart").on("click", function() {
        $("#orderInfo").addClass("hidden");
        $(".singleItem").addClass("hidden");
        $(".cart").removeClass("hidden");
        scrollTop();
    });
    //to order
    $(".btn-order").unbind("click");
    $(".btn-order").on("click", function() {
        if ($("#cart").children().length > 0) {

            var restAmount = TotalRestAmount();
            var restMenuId = $("input[name='restaurantMenuId']").val();
            var isRestUsePayment = false;

            applicationData.Restaurants.forEach(function(el) {
                var rest = el;
                el.RestaurantMenus.forEach(function(e) {
                    if (e.Id == restMenuId) {
                        isRestUsePayment = rest.UseCustomerPayment;
                    }
                });
            });

            if (isRestUsePayment && restAmount >= 1) {
                $("#restAmount").val(restAmount);
                var curr = $(".totalPrice b").html().split(" ")[1];
                $(".rest-amount-count").html(restAmount + " " + curr);

                InitRestarauntPayment();
            } else {
                //RestOrderHandlers();
                $("#orderInfo").removeClass("hidden");
                $(".cart,.payment-method-container").addClass("hidden");
                scrollTop();


                $("#restAmount").val(restAmount);
                var curr = $(".totalPrice b").html().split(" ")[1];
                $(".rest-amount-count").html(restAmount + " " + curr);

                $(".placeAnOrder").unbind().on("click", function() {
                    clickPlaceAnOrder();
                });
            }
        } else {
            alert(cultureRes.nothingOrdered);
        }
    });

    // $(".placeAnOrder").on("click", function() {
    //     $("#payment-form").submit();

    //     clickPlaceAnOrder();
    // });
}

function TotalRestAmount() {
    clickOrder();
    var total = 0;
    collectionOrderItems.forEach(function(element) {
        if (element.Price !== "") {
            total = total + (parseInt(element.Price) * parseInt(element.Count));
        }
    });
    return total;
}