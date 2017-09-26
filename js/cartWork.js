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
    clickOrder();
    if (checkValidationAndRequired($("#orderInfo"))) {
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
                ContentId: applicationData.Id
            },
            cache: false,
            success: function() {
                alert(cultureRes.thankYou);
                $("#cart").html("");
                $("#cart .cartItem").html("");
                $("#orderInfo input, #orderInfo textarea").val("");
                $("#container").removeClass("hidden");
                $("#orderInfo").addClass("hidden");
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
    $(".btn-order").on("click", function() {
        if ($("#cart").children().length > 0) {
            $("#orderInfo").removeClass("hidden");
            $(".cart").addClass("hidden");
            scrollTop();
        } else {
            alert(cultureRes.nothingOrdered);
        }
    });

    $(".placeAnOrder").on("click", function() {
        clickPlaceAnOrder();
    });
}