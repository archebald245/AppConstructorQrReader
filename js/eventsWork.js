var scrollData = 0;

function addListenerToClickEvent() {
    $(".event-image-container, .event-data").unbind("click").on("click", function() {
        var id = $(this).siblings(".eventId").val();
        // var events = $.jStorage.get('EventsData');
        var events = applicationData.MainEvents;
        events.forEach(function(item, index) {
            item.Events.forEach(function(item, index) {
                if (item.Id == id) {
                    scrollData = $("body").scrollTop();
                    $("#container").addClass("hidden");
                    $(".event-favorite-wrapper").addClass("hidden");
                    $("#custom-hide-container").removeClass("hidden");
                    RenderEventProfile(item);
                    return true;
                }
            });
        });
    });

    $(".event-favorite").unbind("click").on("click", function() {
        var id = $(this).siblings(".eventId").val();
        UpdateFavorite(this, id);
    });
}
//check event for favorite, save in local storage, add class
function UpdateFavorite(e, id) {
    var favorites = $.jStorage.get('FavoriteEvents');
    var userId = $.jStorage.get('isLogin');
    console.log("id- " + id + " :userId- " + userId);
    if (userId) {
        if (favorites != null) {
            var index = favorites.indexOf(+id);
            if (index > -1) {
                var networkState = navigator.connection.type;
                if (networkState != Connection.NONE) {
                    //With internet
                    //remove
                    $.ajax({
                        type: "delete",
                        url: applicationData.UrlForUpdateApp + "/api/FavoriteEvent",
                        data: JSON.stringify({
                            EventId: id,
                            UserId: userId
                        }),
                        cache: false,
                        contentType: "application/json",
                        datatype: 'json',
                        success: function(object) {
                            if (object) {
                                favorites.splice(index, 1);
                                $(e).removeClass("event-favorite-active");
                                $.jStorage.set('FavoriteEvents', favorites);
                                window.plugins.toast.showShortBottom(cultureRes.RemoveFavorite);
                            } else {
                                window.plugins.toast.showShortBottom(cultureRes.sorryError);
                            }
                        }
                    });
                } else { window.plugins.toast.showShortBottom(cultureRes.noInternet); }
            } else {
                //add to favorites
                var networkState = navigator.connection.type;
                if (networkState != Connection.NONE) {
                    //With internet
                    //AddEventToFavoritForUser
                    $.ajax({
                        type: "POST",
                        url: applicationData.UrlForUpdateApp + "/api/FavoriteEvent",
                        data: JSON.stringify({
                            EventId: id,
                            UserId: userId
                        }),
                        cache: false,
                        contentType: "application/json",
                        datatype: 'json',
                        success: function(object) {
                            console.log(object);
                            if (object) {
                                favorites.push(+id);
                                $(e).addClass("event-favorite-active");
                                $.jStorage.set('FavoriteEvents', favorites);
                                window.plugins.toast.showShortBottom(cultureRes.AddFavorite);
                            } else {
                                window.plugins.toast.showShortBottom(cultureRes.sorryError);
                            }
                        }
                    });
                } else { window.plugins.toast.showShortBottom(cultureRes.noInternet); }
            }
        } else {
            //add to favorites
            var arr = [];
            var networkState = navigator.connection.type;
            if (networkState != Connection.NONE) {
                //With internet
                //AddEventToFavoritForUser
                $.ajax({
                    type: "POST",
                    url: applicationData.UrlForUpdateApp + "/api/FavoriteEvent",
                    data: JSON.stringify({
                        EventId: id,
                        UserId: userId
                    }),
                    cache: false,
                    contentType: "application/json",
                    datatype: 'json',
                    success: function(object) {
                        console.log(object);
                        if (object) {
                            arr.push(+id);
                            $.jStorage.set('FavoriteEvents', arr);
                            $(e).addClass("event-favorite-active");
                            window.plugins.toast.showShortBottom(cultureRes.AddFavorite);
                        } else {
                            window.plugins.toast.showShortBottom(cultureRes.sorryError);
                        }
                    }
                });
            } else { window.plugins.toast.showShortBottom(cultureRes.noInternet); }
        }
    }
}

function GetEventsIds(evetns) {
    return evetns.map(function(event) { return event.Id; });
}