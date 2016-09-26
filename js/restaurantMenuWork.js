function addListenerToClickBuy() {
    $(".btn-restaurant-menu").on("click", function() {
        var itemId = $(this).closest(".shopItem").find("input[name='shopItemId']").attr("value");
        workToClickBuy(itemId);
        event.stopPropagation();
    });

}

function workToClickBuy(itemId) {
    var restaurantMenu = [];
    $(applicationData.Restaurants).each(function() {
        $(this.RestaurantMenus).each(function() {
            restaurantMenu.push(this);
        });
    });



    if ($("#cart").find("input[value='" + itemId + "']").length > 0) {
        var itemThis = $("#cart").find("input[value='" + itemId + "']").siblings("input[name='shopItemCount']");
        var itemCount = Number(itemThis.val());
        itemThis.val(itemCount + 1);
        $("#cart").find("input[value='" + itemId + "']").siblings(".cartItem-info").find(".shopItemCount-visible").html("");
        var newItemCount = Number(itemThis.val());
        $("#cart").find("input[value='" + itemId + "']").siblings(".cartItem-info").find(".shopItemCount-visible").append(newItemCount);

        $(restaurantMenu).each(function(index, itemMenu) {
            $(itemMenu.RestaurantMenuItems).each(function(i, e) {
                if (e.Id == itemId) {
                    $("#cart").find("input[value='" + itemId + "']").siblings(".cartItem-info").find(".shopItem-price").text(Number(e.Price) * newItemCount);
                      window.plugins.toast.showShortBottom("Item add to cart!");
                }
            });
        });
    } else {


        var restaurantId;
        $(restaurantMenu).each(function(index, itemMenu) {
            restaurantId = itemMenu.RestaurantId;
            $(itemMenu.RestaurantMenuItems).each(function(i, e) {
                if (e.Id == itemId) {
                    if ($("#cart").children().length > 0) {
                        if ($("[name=cartRestaurantId]").attr("value") != restaurantId) {
                            if (confirm("Your shopping cart already has order from previous restaurant. If you add and confirm current order the order from previous restaurant will be removed. Continue?")) {
                                $("#cart").children().remove();
                                $("[name=cartRestaurantId]").attr("value", restaurantId);
                                $("#cart").append("<div id='shopItem'></div>");
                                renderCartItem(e);
                                window.plugins.toast.showShortBottom("Item add to cart!");
                            } else {

                            }
                        }else{
                          $("[name=cartRestaurantId]").attr("value", restaurantId);
                          $("#cart").append("<div id='shopItem'></div>");
                          renderCartItem(e);
                          window.plugins.toast.showShortBottom("Item add to cart!");
                        }
                    } else {
                        $("[name=cartRestaurantId]").attr("value", restaurantId);
                        $("#cart").append("<div id='shopItem'></div>");
                        renderCartItem(e);
                        window.plugins.toast.showShortBottom("Item add to cart!");
                    }
                }

            });
    });


}
$("#shopItem").attr("id", "");
function totalPrice() {
    var totalPrice = 0;
    $("#cart").find(".shopItem-price").each(function() {
        totalPrice += Number($(this).text());
    });
    return totalPrice;
}
// var totalPrice = totalPrice();
$(".totalPrice b").html("");
$(".totalPrice b").append(totalPrice());
addListenerToClickDelete();

}

function addListenerToClickDelete() {
    $(".delete-cartItem").unbind("click");
    $(".delete-cartItem").on("click", function() {
        $(this).closest(".cartItem").parent().remove();

        // var totalPrice = totalPrice();
        $(".totalPrice b").html("");
        $(".totalPrice b").append(totalPrice());
    });
}
function totalPrice() {
    var totalPrice = 0;
    $("#cart").find(".shopItem-price").each(function() {
        totalPrice += Number($(this).text());
    });
    return totalPrice;
}
function checkUpdateRestaurantMenu() {
    var collectionRestaurantMenu = [];
    $(applicationData.Restaurants).each(function(i, elem) {
        $(elem.RestaurantMenus).each(function() {
            collectionRestaurantMenu.push({
                Id: this.Id,
                Version: this.Version
            });
        });

    })
    $.ajax({
        type: "POST",
        url: applicationData.UrlForUpdateApp + "/RestaurantMenu/CheckUpdateRestaurantMenu",
        data: {
            model: collectionRestaurantMenu
        }, cache: false,
        success: function(object) {
            object = JSON.parse(object);
            if (object.IsUpdated == true) {
                applicationData.Restaurants = object.Restaurants;
                var storePath = window.myFileSystem.root.nativeURL + "Phonegap/";
                applicationData.Restaurants = resourcesOfRestaurantMenus(applicationData.Restaurants, storePath);
                var appJsonString = JSON.stringify(applicationData);
                $.jStorage.set('replaceImagePachJson', appJsonString);
                downloadResources();
            } else {
                reactRender();
            }

            initGallaryClick();
            submitFormListener();
            unBlockUi()
        },
        error: function(err) {
            reactRender();
            initGallaryClick();
            submitFormListener();
            unBlockUi()
            console.log("error");
            console.log(err);
        }
    });
}
function cartShopPrice() {
    $(".cartShop-price").each(function() {
        var price = $(this).text();
        if (price.indexOf('.') < 0) {
            $(this).text(price + ".00");
        }
    });
}
function addListenerToClickOpenSingleItem() {
    $(".shopItem").on("click", function() {
        $("#container").addClass("hidden");
        $(".classMenu").addClass("hidden");
        $(".classSwipeDropList").addClass("hidden");
        $(".singleItem").removeClass("hidden");
        var id = $(this).find("[name='shopItemId']").val();
        var menus = [];
        $(applicationData.Restaurants).each(function(){
           $(this.RestaurantMenus).each(function(){
               menus.push(this);
           });
        });
        $(menus).each(function(index, item) {
            $(item.RestaurantMenuItems).each(function() {
                if (this.Id == id) {
                    renderSingleShopItem(this);
                }
            });
        });

    });
}
function restarauntMenuModelItems() {
    if ($("#container").width() >= 1000 || $("#container").width() >= 810) {
        $(".shopItem-row").attr("style", "");
        $(".shopItem-row").css({
            "float": "left",
            "width": "30%",
            "marginLeft": "2%",
            "marginBottom": "15px",
            "border": "1px solid #939393",
            "padding": "3px"
        });
    } else if ($("#container").width() >= 809 || $("#container").width() >= 650) {
        $(".shopItem-row").attr("style", "");
        $(".shopItem-row").css({
            "float": "left",
            "width": "45%",
            "marginLeft": "1%",
            "marginBottom": "15px",
            "border": "1px solid #939393",
            "padding": "3px"
        });
    } else if ($("#container").width() <= 650) {
        $(".shopItem-row").attr("style", "");
    }
}

function changeRestaurant() {
    $(".select-restaurant").on("change", function() {
        var idRest = $(this).val();
        var arrIdMenu = $(this).siblings("[name=arrIdMenu]").attr("value").split(',');
        var restaurantCollection = applicationData.Restaurants;
        // setUseRestaurantMenus(arrIdMenu, true,restaurantCollection);
        var restaurantsArr = filterMenu(restaurantCollection, arrIdMenu);
        var selectMenu = $(this).siblings(".select-menu");
        $(selectMenu).children().remove();

        var restaurant;
        $(restaurantsArr).each(function() {
            if (idRest == this.Id) {
                restaurant = this;
            }
        });
        $(restaurant.RestaurantMenus).each(function() {
            $(selectMenu).append("<option value='" + this.Id + "'>" + this.Name + "</option>");
        });
        $(this).siblings(".custom-restaurant-menu-container").attr("id", "custom-restaurant-menu-container");

        renderRestaurantMenu(restaurant.RestaurantMenus[0], $(this).siblings().find("[name=restaurantMenuPosition]").attr("value"), $(this).siblings().find("[name=responsiveModel]").attr("value"),
            $(this).siblings().find("[name=stateName]").attr("value"), $(this).siblings().find("[name=statePrice]").attr("value"), $(this).siblings().find("[name=stateDescription]").attr("value"),
            $(this).siblings().find("[name=stateButton]").attr("value"), $(this).siblings().find("[name=stateImage]").attr("value"));

        $(this).siblings(".custom-restaurant-menu-container").attr("id", "");
        addListenerToClickBuy();
        addListenerToClickOpenSingleItem();
    });
}

function changeMenu() {
    $(".select-menu").on("change", function() {
        var idMenu = $(this).val();
        var menu;
        $(applicationData.Restaurants).each(function() {
            $(this.RestaurantMenus).each(function() {
                if (this.Id == idMenu) {
                    menu = this;
                }
            });
        });
        $(this).siblings(".custom-restaurant-menu-container").attr("id", "custom-restaurant-menu-container");

        renderRestaurantMenu(menu, $(this).siblings().find("[name=restaurantMenuPosition]").attr("value"), $(this).siblings().find("[name=responsiveModel]").attr("value"),
            $(this).siblings().find("[name=stateName]").attr("value"), $(this).siblings().find("[name=statePrice]").attr("value"),
            $(this).siblings().find("[name=stateDescription]").attr("value"),
            $(this).siblings().find("[name=stateButton]").attr("value"), $(this).siblings().find("[name=stateImage]").attr("value"));

        $(this).siblings(".custom-restaurant-menu-container").attr("id", "");
        addListenerToClickBuy();
        addListenerToClickOpenSingleItem();
    });
}
