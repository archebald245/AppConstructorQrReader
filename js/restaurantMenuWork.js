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
  if(moment().isAfter(FromHourModel) && moment().isBefore(ToHourModel)){
    return true;
  }else{
    return false;
  }
}
 function  GetClockTime() {
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
function GetDateTime(){
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
    if(day < 10) {day = "0" + day;}
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
                
            } else if(!isNewVersion) {
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
        var ThisRestaurantMenuBlock = $(this).siblings();
        var weekday = new Array(7);
        weekday[0] = "Sunday";
        weekday[1] = "Monday";
        weekday[2] = "Tuesday";
        weekday[3] = "Wednesday";
        weekday[4] = "Thursday";
        weekday[5] = "Friday";
        weekday[6] = "Saturday";
        var dayNow = weekday[new Date().getDay()];

        $(restaurant.RestaurantMenus).each(function() {
            $(selectMenu).append("<option value='" + this.Id + "'>" + this.Name + "</option>");
        });
        $(this).siblings(".custom-restaurant-menu-container").attr("id", "custom-restaurant-menu-container");

          $(restaurant.RestaurantMenus).each(function(index, thisRestarauntMenu){


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
                        }else  if (dataItem.IsChecked && dataItem.Day == "Date" && CheckRestarauntTimeForDate(dataItem.FromHour, dataItem.ToHour, GetDateTime())) {
                            renderRestaurantMenu(thisRestarauntMenu, ThisRestaurantMenuBlock.find("[name=restaurantMenuPosition]").attr("value"), ThisRestaurantMenuBlock.find("[name=responsiveModel]").attr("value"),
                                ThisRestaurantMenuBlock.find("[name=stateName]").attr("value"), ThisRestaurantMenuBlock.find("[name=statePrice]").attr("value"), ThisRestaurantMenuBlock.find("[name=stateDescription]").attr("value"),
                                ThisRestaurantMenuBlock.find("[name=stateButton]").attr("value"), ThisRestaurantMenuBlock.find("[name=stateImage]").attr("value"));
                                  $(".custom-restaurant-menu-container").removeClass("hidden");
                                    $(".select-menu").val(thisRestarauntMenu.Id);
                          }else{
                          $(".custom-restaurant-menu-container").addClass("hidden");
                            $(".select-menu").val(thisRestarauntMenu.Id);
                        }
                    });
                }

            } else {
                var networkState = navigator.connection.type;
                if (networkState == Connection.NONE) {
                    $("#custom-restaurant-menu-container").html("Sorry, is only available online!");
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
                            }else  if (dataItem.IsChecked && dataItem.Day == "Date" && CheckRestarauntTimeForDate(dataItem.FromHour, dataItem.ToHour, GetDateTime())) {
                                renderRestaurantMenu(thisRestarauntMenu, ThisRestaurantMenuBlock.find("[name=restaurantMenuPosition]").attr("value"), ThisRestaurantMenuBlock.find("[name=responsiveModel]").attr("value"),
                                    ThisRestaurantMenuBlock.find("[name=stateName]").attr("value"), ThisRestaurantMenuBlock.find("[name=statePrice]").attr("value"), ThisRestaurantMenuBlock.find("[name=stateDescription]").attr("value"),
                                    ThisRestaurantMenuBlock.find("[name=stateButton]").attr("value"), ThisRestaurantMenuBlock.find("[name=stateImage]").attr("value"));
                                      $(".custom-restaurant-menu-container").removeClass("hidden");
                                        $(".select-menu").val(thisRestarauntMenu.Id);
                              }else{
                              $(".custom-restaurant-menu-container").addClass("hidden");
                                $(".select-menu").val(thisRestarauntMenu.Id);
                            }
                        });
                    }
                }
            }
});
      if($(".custom-restaurant-menu-container").hasClass("hidden")){
        alert("No time for this rest!");
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
        weekday[0] = "Sunday";
        weekday[1] = "Monday";
        weekday[2] = "Tuesday";
        weekday[3] = "Wednesday";
        weekday[4] = "Thursday";
        weekday[5] = "Friday";
        weekday[6] = "Saturday";
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
                        }else  if (dataItem.IsChecked && dataItem.Day == "Date" && CheckRestarauntTimeForDate(dataItem.FromHour, dataItem.ToHour, GetDateTime())) {
                            renderRestaurantMenu(menu, ThisRestaurantMenuBlock.find("[name=restaurantMenuPosition]").attr("value"), ThisRestaurantMenuBlock.find("[name=responsiveModel]").attr("value"),
                                ThisRestaurantMenuBlock.find("[name=stateName]").attr("value"), ThisRestaurantMenuBlock.find("[name=statePrice]").attr("value"), ThisRestaurantMenuBlock.find("[name=stateDescription]").attr("value"),
                                ThisRestaurantMenuBlock.find("[name=stateButton]").attr("value"), ThisRestaurantMenuBlock.find("[name=stateImage]").attr("value"));
                                $(".custom-restaurant-menu-container").removeClass("hidden");
                          }else{
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
                            }else  if (dataItem.IsChecked && dataItem.Day == "Date" && CheckRestarauntTimeForDate(dataItem.FromHour, dataItem.ToHour, GetDateTime())) {
                                renderRestaurantMenu(menu, ThisRestaurantMenuBlock.find("[name=restaurantMenuPosition]").attr("value"), ThisRestaurantMenuBlock.find("[name=responsiveModel]").attr("value"),
                                    ThisRestaurantMenuBlock.find("[name=stateName]").attr("value"), ThisRestaurantMenuBlock.find("[name=statePrice]").attr("value"), ThisRestaurantMenuBlock.find("[name=stateDescription]").attr("value"),
                                    ThisRestaurantMenuBlock.find("[name=stateButton]").attr("value"), ThisRestaurantMenuBlock.find("[name=stateImage]").attr("value"));
                                    $(".custom-restaurant-menu-container").removeClass("hidden");
                              }
                        });
                    }
                }
            }
            if($(".custom-restaurant-menu-container").hasClass("hidden")){
              alert("No time for this rest!");
            }
        $(this).siblings(".custom-restaurant-menu-container").attr("id", "");
        addListenerToClickBuy();
        addListenerToClickOpenSingleItem();
    });
}
