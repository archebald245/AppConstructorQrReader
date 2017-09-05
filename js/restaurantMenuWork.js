function CheckRestarauntTime(FromHourModel, ToHourModel, NowHoursModel) {
    var FromDataArray = FromHourModel.split("T")[1].split(":");
    var ToDataArray = ToHourModel.split("T")[1].split(":");
    var NowDataArray = NowHoursModel.split("T")[1].split(":");
    var FromHour = Number(FromDataArray[0]);
    var FromMinuts = Number(FromDataArray[1]);
    var FromSeconds = Number(FromDataArray[2]);

    var ToHour = Number(ToDataArray[0]);
    var ToMinuts = Number(ToDataArray[1]);
    var ToSeconds = Number(ToDataArray[2]);

    var NowHour = Number(NowDataArray[0]);
    var NowMinuts = Number(NowDataArray[1]);
    var NowSeconds = Number(NowDataArray[2]);

    var timeCheker = false;
    if ((FromHour <= NowHour) && (NowHour <= ToHour)) {

        timeCheker = true;
    } else {
        timeCheker = false;
    }
    if (!timeCheker) {
        if ((FromMinuts <= NowMinuts) && (NowMinuts <= ToMinuts)) {
            timeCheker = true;
        } else {
            timeCheker = false;
        }
    }
    if (!timeCheker) {
        if ((FromSeconds <= NowSeconds) && (NowSeconds <= ToSeconds)) {
            timeCheker = true;
        } else {
            timeCheker = false;
        }
    }
    if (timeCheker) {
        return true;
    } else {
        return false;
    }
}

function CheckRestarauntTimeForDate(FromHourModel, ToHourModel, NowHoursModel) {
    if (moment().isAfter(FromHourModel) && moment().isBefore(ToHourModel)) {
        return true;
    } else {
        return false;
    }
}

function GetClockTime() {
    var now = new Date();
    var hour = now.getHours();
    var minute = now.getMinutes();
    var second = now.getSeconds();
    var ap = "12T";
    if (hour > 11) { ap = "24T"; }
    if (hour < 10) { hour = "0" + hour; }
    if (minute < 10) { minute = "0" + minute; }
    if (second < 10) { second = "0" + second; }
    var timeString = ap + hour + ':' + minute + ':' + second;
    return timeString;
}

function GetDateTime() {
    var now = new Date();
    var month = now.getMonth() + 1;
    var day = now.getDate();
    var hour = now.getHours();
    var minute = now.getMinutes();
    var second = now.getSeconds();
    var ap = "12T";
    if (hour > 11) { ap = "24T"; }
    if (hour < 10) { hour = "0" + hour; }
    if (minute < 10) { minute = "0" + minute; }
    if (second < 10) { second = "0" + second; }
    if (day < 10) { day = "0" + day; }
    var timeString = month + "-" + day + "-" + ap + hour + ':' + minute + ':' + second;
    return timeString;
}

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

        $("#cart").find("input[value='" + itemId + "']").closest(".cartItem").find(".shopItemCount-increase").click();
        window.plugins.toast.showShortBottom(cultureRes.itemAdded);
        //OLD VERSION
        //  $("#cart").find("input[value='" + itemId + "']").siblings(".cartItem-info").find(".shopItemCount-visible").html("");
        //  var newItemCount = Number(itemThis.val());
        //  $("#cart").find("input[value='" + itemId + "']").siblings(".cartItem-info").find(".shopItemCount-visible").append(newItemCount);

        //  $(restaurantMenu).each(function(index, itemMenu) {
        //      $(itemMenu.RestaurantMenuItems).each(function(i, e) {
        //          if (e.Id == itemId) {
        //              $("#cart").find("input[value='" + itemId + "']").siblings(".cartItem-info").find(".shopItem-price").text(Number(e.Price) * newItemCount);
        //              window.plugins.toast.showShortBottom(cultureRes.itemAdded);
        //          }
        //      });
        //  });
    } else {
        var restaurantId;
        $(restaurantMenu).each(function(index, itemMenu) {
            restaurantId = itemMenu.RestaurantId;
            $(itemMenu.RestaurantMenuItems).each(function(i, e) {
                if (e.Id == itemId) {
                    if ($("#cart").children().length > 0) {
                        if ($("[name=cartRestaurantId]").attr("value") != restaurantId) {
                            if (confirm(cultureRes.restConf)) {
                                $("#cart").children().remove();
                                $("[name=cartRestaurantId]").attr("value", restaurantId);
                                $("#cart").append("<div id='shopItem'></div>");
                                renderCartItem(e);
                                window.plugins.toast.showShortBottom(cultureRes.itemAdded);
                            } else {

                            }
                        } else {
                            $("[name=cartRestaurantId]").attr("value", restaurantId);
                            $("#cart").append("<div id='shopItem'></div>");
                            renderCartItem(e);
                            window.plugins.toast.showShortBottom(cultureRes.itemAdded);
                        }
                    } else {
                        $("[name=cartRestaurantId]").attr("value", restaurantId);
                        $("#cart").append("<div id='shopItem'></div>");
                        renderCartItem(e);
                        window.plugins.toast.showShortBottom(cultureRes.itemAdded);
                    }
                }

            });
        });


    }
    $("#shopItem").attr("id", "");

    $(".totalPrice b").html("");
    $(".totalPrice b").append(totalPrice() + " ГРН");
    addListenerToClickDelete();
    addListenerToChangeCount();
}

function addListenerToClickDelete() {
    $(".delete-cartItem").unbind("click");
    $(".delete-cartItem").on("click", function() {
        $(this).closest(".cartItem").parent().remove();

        $(".totalPrice b").html("");
        $(".totalPrice b").append(totalPrice() + " ГРН"); //add currency
    });
}

function addListenerToChangeCount() {
    $(".shopItemCount-decrease, .shopItemCount-increase").unbind("click");
    $(".shopItemCount-decrease").on("click", function() {
        var counter = $(this).closest(".cartItem").find("input[name=shopItemCount]");
        var count = Number($(counter).val()) - 1;
        if (count < 1) {
            count = 1;
        }
        $(counter).val(count);

        updateCount(this, count);
    });

    $(".shopItemCount-increase").on("click", function() {
        var counter = $(this).closest(".cartItem").find("input[name=shopItemCount]");
        var count = Number($(counter).val()) + 1;
        $(counter).val(count);

        updateCount(this, count);
    });

}

function updateCount(e, count) {
    var newPrice = Number($(e).closest(".cartItem").find("input[name=shopItemPrice]").val()) * count;
    $(e).closest(".cartItem").find(".cartItem-count-total-price").html("");
    $(e).closest(".cartItem").find(".cartItem-count-total-price").append(newPrice + " ГРН");

    $(e).siblings(".shopItem-count").html("");
    $(e).siblings(".shopItem-count").append(count);

    $(".totalPrice b").html("");
    $(".totalPrice b").append(totalPrice() + " ГРН");
}

function totalPrice() {
    var totalPrice = 0;
    $("#cart").find(".cartItem").each(function(i, e) {
        var count = $(e).find("input[name=shopItemCount]").val();
        var price = $(e).find("input[name=shopItemPrice]").val();
        totalPrice += count * price;
    });
    return totalPrice;
}

function checkUpdateRestaurantMenu(isNewVersion) {
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
        },
        cache: false,
        success: function(object) {
            object = JSON.parse(object);
            if (object.IsUpdated == true) {
                applicationData.Restaurants = object.Restaurants;
                var storePath = window.myFileSystem.root.nativeURL + "Phonegap/";
                applicationData.Restaurants = resourcesOfRestaurantMenus(applicationData.Restaurants, storePath);
                var appJsonString = JSON.stringify(applicationData);
                $.jStorage.set('replaceImagePachJson', appJsonString);
                downloadResources();

            } else if (!isNewVersion) {
                reactRender();
                initGallaryClick();
                submitFormListener();
                unBlockUi()
            }


        },
        error: function(err) {
            reactRender();
            initGallaryClick();
            submitFormListener();
            unBlockUi()
                //console.log("error");
                //console.log(err);
        }
    });
}

function cartShopPrice() {
    $(".cartShop-price").each(function() {
        var price = $(this).text();
        if (price.indexOf('.') < 0) {
            var inIndex = price.indexOf(' ');
            price = price.substr(0, inIndex) + ".00" + price.substr(inIndex);
            $(this).text(price);
        }
    });
}

function addListenerToClickOpenSingleItem() {
    $(".shopItem").on("click", function() {
        $("#container").addClass("hidden");
        $(".classMenu").addClass("hidden");
        $(".classSwipeDropList").addClass("hidden");
        $(".singleItem").removeClass("hidden");
        scrollTop();
        var id = $(this).find("[name='shopItemId']").val();
        var menus = [];
        $(applicationData.Restaurants).each(function() {
            $(this.RestaurantMenus).each(function() {
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
        var ThisRestaurantMenuBlock = $(this).siblings();
        var weekday = new Array(7);
        weekday[0] = cultureRes.sunday;
        weekday[1] = cultureRes.monday;
        weekday[2] = cultureRes.tuesday;
        weekday[3] = cultureRes.wednesday;
        weekday[4] = cultureRes.thursday;
        weekday[5] = cultureRes.friday;
        weekday[6] = cultureRes.saturday;
        var dayNow = weekday[new Date().getDay()];

        $(restaurant.RestaurantMenus).each(function() {
            $(selectMenu).append("<option value='" + this.Id + "'>" + this.Name + "</option>");
        });
        $(this).siblings(".custom-restaurant-menu-container").attr("id", "custom-restaurant-menu-container");

        $(restaurant.RestaurantMenus).each(function(index, thisRestarauntMenu) {


            if (thisRestarauntMenu.IsOnline == false) {

                if (thisRestarauntMenu.UseDateTime == false) {
                    renderRestaurantMenu(thisRestarauntMenu, ThisRestaurantMenuBlock.find("[name=restaurantMenuPosition]").attr("value"), ThisRestaurantMenuBlock.find("[name=responsiveModel]").attr("value"),
                        ThisRestaurantMenuBlock.find("[name=stateName]").attr("value"), ThisRestaurantMenuBlock.find("[name=statePrice]").attr("value"), ThisRestaurantMenuBlock.find("[name=stateDescription]").attr("value"),
                        ThisRestaurantMenuBlock.find("[name=stateButton]").attr("value"), ThisRestaurantMenuBlock.find("[name=stateImage]").attr("value"));
                    $(".custom-restaurant-menu-container").removeClass("hidden");
                    $(".select-menu").val(thisRestarauntMenu.Id);
                } else {
                    $(thisRestarauntMenu.DateTimeRestaurantMenu).each(function(indexData, dataItem) {
                        if (dataItem.IsChecked && dataItem.Day == dayNow && CheckRestarauntTime(dataItem.FromHour, dataItem.ToHour, GetClockTime())) {
                            renderRestaurantMenu(thisRestarauntMenu, ThisRestaurantMenuBlock.find("[name=restaurantMenuPosition]").attr("value"), ThisRestaurantMenuBlock.find("[name=responsiveModel]").attr("value"),
                                ThisRestaurantMenuBlock.find("[name=stateName]").attr("value"), ThisRestaurantMenuBlock.find("[name=statePrice]").attr("value"), ThisRestaurantMenuBlock.find("[name=stateDescription]").attr("value"),
                                ThisRestaurantMenuBlock.find("[name=stateButton]").attr("value"), ThisRestaurantMenuBlock.find("[name=stateImage]").attr("value"));
                            $(".custom-restaurant-menu-container").removeClass("hidden");
                            $(".select-menu").val(thisRestarauntMenu.Id);
                        } else if (dataItem.IsChecked && dataItem.Day == cultureRes.date && CheckRestarauntTimeForDate(dataItem.FromHour, dataItem.ToHour, GetDateTime())) {
                            renderRestaurantMenu(thisRestarauntMenu, ThisRestaurantMenuBlock.find("[name=restaurantMenuPosition]").attr("value"), ThisRestaurantMenuBlock.find("[name=responsiveModel]").attr("value"),
                                ThisRestaurantMenuBlock.find("[name=stateName]").attr("value"), ThisRestaurantMenuBlock.find("[name=statePrice]").attr("value"), ThisRestaurantMenuBlock.find("[name=stateDescription]").attr("value"),
                                ThisRestaurantMenuBlock.find("[name=stateButton]").attr("value"), ThisRestaurantMenuBlock.find("[name=stateImage]").attr("value"));
                            $(".custom-restaurant-menu-container").removeClass("hidden");
                            $(".select-menu").val(thisRestarauntMenu.Id);
                        } else {
                            $(".custom-restaurant-menu-container").addClass("hidden");
                            $(".select-menu").val(thisRestarauntMenu.Id);
                        }
                    });
                }

            } else {
                var networkState = navigator.connection.type;
                if (networkState == Connection.NONE) {
                    $("#custom-restaurant-menu-container").html(cultureRes.sorryOnline);
                } else {
                    if (thisRestarauntMenu.UseDateTime == false) {
                        renderRestaurantMenu(thisRestarauntMenu, ThisRestaurantMenuBlock.find("[name=restaurantMenuPosition]").attr("value"), ThisRestaurantMenuBlock.find("[name=responsiveModel]").attr("value"),
                            ThisRestaurantMenuBlock.find("[name=stateName]").attr("value"), ThisRestaurantMenuBlock.find("[name=statePrice]").attr("value"), ThisRestaurantMenuBlock.find("[name=stateDescription]").attr("value"),
                            ThisRestaurantMenuBlock.find("[name=stateButton]").attr("value"), ThisRestaurantMenuBlock.find("[name=stateImage]").attr("value"));
                        $(".select-menu").val(thisRestarauntMenu.Id);
                    } else {
                        $(thisRestaurantMenu.DateTimeRestaurantMenu).each(function(indexData, dataItem) {
                            if (dataItem.IsChecked && dataItem.Day == dayNow && CheckRestarauntTime(dataItem.FromHour, dataItem.ToHour, GetClockTime())) {
                                renderRestaurantMenu(thisRestarauntMenu, ThisRestaurantMenuBlock.find("[name=restaurantMenuPosition]").attr("value"), ThisRestaurantMenuBlock.find("[name=responsiveModel]").attr("value"),
                                    ThisRestaurantMenuBlock.find("[name=stateName]").attr("value"), ThisRestaurantMenuBlock.find("[name=statePrice]").attr("value"), ThisRestaurantMenuBlock.find("[name=stateDescription]").attr("value"),
                                    ThisRestaurantMenuBlock.find("[name=stateButton]").attr("value"), ThisRestaurantMenuBlock.find("[name=stateImage]").attr("value"));
                                $(".select-menu").val(thisRestarauntMenu.Id);
                            } else if (dataItem.IsChecked && dataItem.Day == cultureRes.date && CheckRestarauntTimeForDate(dataItem.FromHour, dataItem.ToHour, GetDateTime())) {
                                renderRestaurantMenu(thisRestarauntMenu, ThisRestaurantMenuBlock.find("[name=restaurantMenuPosition]").attr("value"), ThisRestaurantMenuBlock.find("[name=responsiveModel]").attr("value"),
                                    ThisRestaurantMenuBlock.find("[name=stateName]").attr("value"), ThisRestaurantMenuBlock.find("[name=statePrice]").attr("value"), ThisRestaurantMenuBlock.find("[name=stateDescription]").attr("value"),
                                    ThisRestaurantMenuBlock.find("[name=stateButton]").attr("value"), ThisRestaurantMenuBlock.find("[name=stateImage]").attr("value"));
                                $(".custom-restaurant-menu-container").removeClass("hidden");
                                $(".select-menu").val(thisRestarauntMenu.Id);
                            } else {
                                $(".custom-restaurant-menu-container").addClass("hidden");
                                $(".select-menu").val(thisRestarauntMenu.Id);
                            }
                        });
                    }
                }
            }
        });
        if ($(".custom-restaurant-menu-container").hasClass("hidden")) {
            alert(cultureRes.noTime);
        }
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
        var ThisRestaurantMenuBlock = $(this).siblings();
        var weekday = new Array(7);
        weekday[0] = cultureRes.sunday;
        weekday[1] = cultureRes.monday;
        weekday[2] = cultureRes.tuesday;
        weekday[3] = cultureRes.wednesday;
        weekday[4] = cultureRes.thursday;
        weekday[5] = cultureRes.friday;
        weekday[6] = cultureRes.saturday;
        var dayNow = weekday[new Date().getDay()];

        $(this).siblings(".custom-restaurant-menu-container").attr("id", "custom-restaurant-menu-container");
        if (menu.IsOnline == false) {
            if (menu.UseDateTime == false) {
                renderRestaurantMenu(menu, ThisRestaurantMenuBlock.find("[name=restaurantMenuPosition]").attr("value"), ThisRestaurantMenuBlock.find("[name=responsiveModel]").attr("value"),
                    ThisRestaurantMenuBlock.find("[name=stateName]").attr("value"), ThisRestaurantMenuBlock.find("[name=statePrice]").attr("value"), ThisRestaurantMenuBlock.find("[name=stateDescription]").attr("value"),
                    ThisRestaurantMenuBlock.find("[name=stateButton]").attr("value"), ThisRestaurantMenuBlock.find("[name=stateImage]").attr("value"));
                $(".custom-restaurant-menu-container").removeClass("hidden");
            } else {
                $(menu.DateTimeRestaurantMenu).each(function(indexData, dataItem) {
                    if (dataItem.IsChecked && dataItem.Day == dayNow && CheckRestarauntTime(dataItem.FromHour, dataItem.ToHour, GetClockTime())) {
                        renderRestaurantMenu(menu, ThisRestaurantMenuBlock.find("[name=restaurantMenuPosition]").attr("value"), ThisRestaurantMenuBlock.find("[name=responsiveModel]").attr("value"),
                            ThisRestaurantMenuBlock.find("[name=stateName]").attr("value"), ThisRestaurantMenuBlock.find("[name=statePrice]").attr("value"), ThisRestaurantMenuBlock.find("[name=stateDescription]").attr("value"),
                            ThisRestaurantMenuBlock.find("[name=stateButton]").attr("value"), ThisRestaurantMenuBlock.find("[name=stateImage]").attr("value"));
                        $(".custom-restaurant-menu-container").removeClass("hidden");
                    } else if (dataItem.IsChecked && dataItem.Day == "Date" && CheckRestarauntTimeForDate(dataItem.FromHour, dataItem.ToHour, GetDateTime())) {
                        renderRestaurantMenu(menu, ThisRestaurantMenuBlock.find("[name=restaurantMenuPosition]").attr("value"), ThisRestaurantMenuBlock.find("[name=responsiveModel]").attr("value"),
                            ThisRestaurantMenuBlock.find("[name=stateName]").attr("value"), ThisRestaurantMenuBlock.find("[name=statePrice]").attr("value"), ThisRestaurantMenuBlock.find("[name=stateDescription]").attr("value"),
                            ThisRestaurantMenuBlock.find("[name=stateButton]").attr("value"), ThisRestaurantMenuBlock.find("[name=stateImage]").attr("value"));
                        $(".custom-restaurant-menu-container").removeClass("hidden");
                    } else {
                        $(".custom-restaurant-menu-container").addClass("hidden");
                    }
                });
            }
        } else {
            var networkState = navigator.connection.type;
            if (networkState == Connection.NONE) {
                $(".custom-restaurant-menu-container").addClass("hidden");
                alert("Sorry, not time!");
            } else {
                if (menu.UseDateTime == false) {
                    renderRestaurantMenu(menu, ThisRestaurantMenuBlock.find("[name=restaurantMenuPosition]").attr("value"), ThisRestaurantMenuBlock.find("[name=responsiveModel]").attr("value"),
                        ThisRestaurantMenuBlock.find("[name=stateName]").attr("value"), ThisRestaurantMenuBlock.find("[name=statePrice]").attr("value"), ThisRestaurantMenuBlock.find("[name=stateDescription]").attr("value"),
                        ThisRestaurantMenuBlock.find("[name=stateButton]").attr("value"), ThisRestaurantMenuBlock.find("[name=stateImage]").attr("value"));
                } else {
                    $(menu.DateTimeRestaurantMenu).each(function(indexData, dataItem) {
                        if (dataItem.IsChecked && dataItem.Day == dayNow && CheckRestarauntTime(dataItem.FromHour, dataItem.ToHour, GetClockTime())) {
                            renderRestaurantMenu(menu, ThisRestaurantMenuBlock.find("[name=restaurantMenuPosition]").attr("value"), ThisRestaurantMenuBlock.find("[name=responsiveModel]").attr("value"),
                                ThisRestaurantMenuBlock.find("[name=stateName]").attr("value"), ThisRestaurantMenuBlock.find("[name=statePrice]").attr("value"), ThisRestaurantMenuBlock.find("[name=stateDescription]").attr("value"),
                                ThisRestaurantMenuBlock.find("[name=stateButton]").attr("value"), ThisRestaurantMenuBlock.find("[name=stateImage]").attr("value"));
                        } else if (dataItem.IsChecked && dataItem.Day == cultureRes.date && CheckRestarauntTimeForDate(dataItem.FromHour, dataItem.ToHour, GetDateTime())) {
                            renderRestaurantMenu(menu, ThisRestaurantMenuBlock.find("[name=restaurantMenuPosition]").attr("value"), ThisRestaurantMenuBlock.find("[name=responsiveModel]").attr("value"),
                                ThisRestaurantMenuBlock.find("[name=stateName]").attr("value"), ThisRestaurantMenuBlock.find("[name=statePrice]").attr("value"), ThisRestaurantMenuBlock.find("[name=stateDescription]").attr("value"),
                                ThisRestaurantMenuBlock.find("[name=stateButton]").attr("value"), ThisRestaurantMenuBlock.find("[name=stateImage]").attr("value"));
                            $(".custom-restaurant-menu-container").removeClass("hidden");
                        }
                    });
                }
            }
        }
        if ($(".custom-restaurant-menu-container").hasClass("hidden")) {
            alert(cultureRes.noTime);
        }
        $(this).siblings(".custom-restaurant-menu-container").attr("id", "");
        addListenerToClickBuy();
        addListenerToClickOpenSingleItem();
    });
}