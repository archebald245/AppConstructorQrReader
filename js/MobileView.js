'use strict';

//restaurant menu element
//

function filterMenu(restaurantsArr, arrIdMenu) {
    var restaurantCopy = JSON.parse(JSON.stringify(restaurantsArr));

    function returnUse(menu) {
        for (var i = 0; i < arrIdMenu.length; i++) {
            if (arrIdMenu[i] == menu.Id) {
                return true;
            }
        }
        return false;
    }

    function emptyRestaurants(restaurant) {
        return restaurant.RestaurantMenus.length > 0;
    }

    for (var i = 0; i < restaurantCopy.length; i++) {
        restaurantCopy[i].RestaurantMenus = restaurantCopy[i].RestaurantMenus.filter(returnUse);
    }
    restaurantCopy = restaurantCopy.filter(emptyRestaurants);
    return restaurantCopy;
}

function setUseRestaurantMenus(ids, use, restaurants) {

    $(ids).each(function(i, id) {
        setUseRestaurantMenu(id, use, restaurants);
    });
}

function setUseRestaurantMenu(id, use, restaurants) {
    $(restaurants).each(function() {
        $(this.RestaurantMenus).each(function() {
            if (this.Id == id) {
                this.UseOnPage = use;
            }
        });
    });
}

//
//restaurant menu element

function reactRender() {
    initCulture();

    function initMapPreview(locationArr, zoom, mapContainer) {
        var location = { lat: locationArr[0].lat, lng: locationArr[0].lng };
        var map = new google.maps.Map(document.getElementById(mapContainer), {
            zoom: zoom,
            center: location
        });

        var infowindow = new google.maps.InfoWindow();
        for (var i = 0; i < locationArr.length; i++) {
            if (locationArr[i].lat != 0 || locationArr[0].lng != 0) {
                location = { lat: locationArr[i].lat, lng: locationArr[i].lng }

                var marker = new google.maps.Marker({
                    position: location,
                    map: map
                });

                if (locationArr[i].title != "" || locationArr[i].description != "") {
                    google.maps.event.addListener(marker, 'click', (function(marker, i) {
                        return function() {
                            infowindow.setContent('<div>' +
                                '<h3>' + locationArr[i].title + '</h3>' +
                                '<p>' + locationArr[i].description + '</p>' +
                                '</div>');
                            infowindow.open(map, marker);
                            map.panTo(this.getPosition());
                            map.setZoom(16);
                        }
                    })(marker, i));
                }
            }
        }
    }


    function onYouTubeIframeAPIReady(element, id) {
        var player = new YT.Player(element, {
            height: 'auto',
            width: '100%',
            videoId: id,
            playerVars: { rel: 0 },
            events: {
                'onReady': onPlayerReady,
                'onStateChange': onPlayerStateChange
            }
        });
    }

    function onPlayerReady(event) {
        // event.target.playVideo();
    }

    function onPlayerStateChange(event) {}
    var isEvent = false;
    var isBooking = false;
    var isRestaurant = false;
    var Rows = React.createClass({
        displayName: 'Rows',

        getInitialState: function getInitialState() {
            return { data: [] };
        },
        componentWillMount: function componentWillMount() {
            for (var i = 0; i < applicationData.Pages.length; i++) {
                if (indexPage == applicationData.Pages[i].Id) {
                    applicationData.Pages[i].Rows.forEach(function(item) {
                        item.CellContents.forEach(function(element) {
                            if (element.ContentTypeId == 15) {
                                isRestaurant = true;
                            }
                            if (element.ContentTypeId == 16) {
                                isBooking = true;
                            }
                        });
                    });
                }
            }
        },
        componentDidMount: function componentDidMount() {
            for (var i = 0; i < applicationData.Pages.length; i++) {
                if (indexPage == applicationData.Pages[i].Id) {
                    this.setState({ data: applicationData.Pages[i].Rows });
                }
            }

            $(".fab, .backdrop").click(function() {
                if ($(".backdrop").is(":visible")) {
                    $(".backdrop").fadeOut(125);
                    $(".fab.child")
                        .stop()
                        .animate({
                            bottom: $("#masterfab").css("bottom"),
                            opacity: 0
                        }, 125, function() {
                            $(this).hide();
                        });
                } else {
                    $(".backdrop").fadeIn(125);
                    $(".fab.child").each(function() {
                        $(this)
                            .stop()
                            .show()
                            .animate({
                                bottom: (parseInt($("#masterfab").css("bottom")) + parseInt($("#masterfab").outerHeight()) + 50 * $(this).data("subitem") - $(".fab.child").outerHeight()) + "px",
                                opacity: 1
                            }, 125);
                    });
                }
            });
            $(".first").click(function() {
                if ($.jStorage.get('bookOrderWithStatusPending') == null) {
                    alert(cultureRes.haveNotOrders);
                    return false;
                } else {
                    $(".container-statusBooking").removeClass("hidden");
                    $("#container, .classMenu").addClass("hidden");
                    scrollTop();
                    var orderedArray = JSON.parse($.jStorage.get('bookOrderWithStatusPending'));
                    var arrayOfOrdersId = [];
                    orderedArray.forEach(function(e) {
                        arrayOfOrdersId.push(e.id);
                    });
                    $.ajax({
                        type: "POST",
                        url: applicationData.UrlForUpdateApp + "/Booking/GetConfirmBookOrder",
                        data: {
                            collectionOrderId: arrayOfOrdersId,
                            appId: $.jStorage.get('ApplicationId')
                        },
                        cache: false,
                        success: function(object) {
                            object = JSON.parse(object);
                            var collectionOrders = object.collectionOrders;

                            $(".status-list").html("");
                            for (var i = 0; i < orderedArray.length; i++) {
                                $(".status-list").append("<div id='bookStatusList'></div>");
                                renderBookingStatusList(orderedArray[i]);
                                //$(".status-list").append("<p>" + (collectionOrders[i].IsConfirmated ? cultureRes.confirmated : cultureRes.pending) + "</p> <p>" + orderedArray[i].nemesService + "</p>");
                                $("#bookStatusList").attr("id", "");
                            }
                        }
                    });
                }
            });

            for (var i = 0; i < applicationData.Pages.length; i++) {
                if (indexPage == applicationData.Pages[i].Id) {
                    this.setState({ data: applicationData.Pages[i].Rows });
                    applicationData.Pages[i].Rows.forEach(function(item) {
                        item.CellContents.forEach(function(element) {
                            if (element.ContentTypeId == 15) {
                                isRestaurant = true;
                            }
                            if (element.ContentTypeId == 16) {
                                isBooking = true;
                            }
                            if (element.ContentTypeId == 19) {
                                isEvent = true;
                            }
                        });
                    });
                }
            }
        },
        render: function render() {
            var rowModels = this.state.data.map(function(row) {
                return React.createElement(CellContainer, { data: row, key: row.Id });
            });
            var pageIsLocked = applicationData.Pages.filter(function(p) { return p.Id == indexPage })[0].IsLocked;
            if (applicationData.Menu.Position == "bottom-left" || applicationData.Menu.Position == "bottom-right") {
                if (isBooking == true && isRestaurant == true) {
                    return React.createElement(
                        'div',
                        null,
                        React.createElement('div', { className: 'backdrop' }),
                        React.createElement(
                            'div', { className: 'fab child cart-btn cart-backgroundImage', 'data-subitem': '2' },
                            React.createElement(
                                'span',
                                null
                            )
                        ),
                        React.createElement(
                            'div', { className: 'fab child first', 'data-subitem': '1' },
                            React.createElement(
                                'span',
                                null
                            )
                        ),
                        React.createElement(
                            'div', { className: 'fab bottom-menu', id: 'masterfab' },
                            React.createElement(
                                'span',
                                null
                            )
                        ),
                        React.createElement(
                            'div', { className: 'container-fluid' }, !pageIsLocked ? rowModels : React.createElement('span', null, cultureRes.lockedPage)
                        )
                    );
                } else if (isBooking == true) {
                    return React.createElement(
                        'div',
                        null,
                        React.createElement('div', { className: 'backdrop' }),
                        React.createElement(
                            'div', { className: 'fab child first', 'data-subitem': '1' },
                            React.createElement(
                                'span',
                                null
                            )
                        ),
                        React.createElement(
                            'div', { className: 'fab bottom-menu', id: 'masterfab' },
                            React.createElement(
                                'span',
                                null
                            )
                        ),
                        React.createElement(
                            'div', { className: 'container-fluid' }, !pageIsLocked ? rowModels : React.createElement('span', null, cultureRes.lockedPage)
                        )
                    );
                } else if (isRestaurant == true) {
                    return React.createElement(
                        'div',
                        null,
                        React.createElement('div', { className: 'cart-btn bottom-menu' }),
                        React.createElement(
                            'div', { className: 'container-fluid' }, !pageIsLocked ? rowModels : React.createElement('span', null, cultureRes.lockedPage)
                        )
                    );
                } else if (isEvent == true) {
                    return React.createElement(
                        'div',
                        null,
                        React.createElement('div', { className: 'event-btn bottom-menu' }),
                        React.createElement(
                            'div', { className: 'container-fluid' }, !pageIsLocked ? rowModels : React.createElement('span', null, cultureRes.lockedPage)
                        )
                    );
                } else {
                    return React.createElement(
                        'div',
                        null,
                        React.createElement(
                            'div', { className: 'container-fluid' }, !pageIsLocked ? rowModels : React.createElement('span', null, cultureRes.lockedPage)
                        )
                    );
                }
            } else {
                if (isBooking == true && isRestaurant == true) {
                    return React.createElement(
                        'div',
                        null,
                        React.createElement('div', { className: 'backdrop' }),
                        // React.createElement(
                        //     'div', { className: 'fab child', 'data-subitem': '1' },
                        //     React.createElement(
                        //         'span',
                        //         null,
                        //         'C'
                        //     )
                        // ),
                        React.createElement(
                            'div', { className: 'fab child cart-btn', 'data-subitem': '2' },
                            React.createElement(
                                'span',
                                null
                            )
                        ),
                        React.createElement(
                            'div', { className: 'fab child first', 'data-subitem': '1' },
                            React.createElement(
                                'span',
                                null
                            )
                        ),
                        React.createElement(
                            'div', { className: 'fab', id: 'masterfab' },
                            React.createElement(
                                'span',
                                null
                            )
                        ),
                        React.createElement(
                            'div', { className: 'container-fluid' }, !pageIsLocked ? rowModels : React.createElement('span', null, cultureRes.lockedPage)
                        )
                    );
                } else if (isBooking == true) {
                    return React.createElement(
                        'div',
                        null,
                        React.createElement('div', { className: 'backdrop' }),
                        // React.createElement(
                        //     'div', { className: 'fab child cart-btn', 'data-subitem': '2' },
                        //     React.createElement(
                        //         'span',
                        //         null,
                        //         'R'
                        //     )
                        // ),
                        React.createElement(
                            'div', { className: 'fab child first', 'data-subitem': '1' },
                            React.createElement(
                                'span',
                                null
                            )
                        ),
                        React.createElement(
                            'div', { className: 'fab', id: 'masterfab' },
                            React.createElement(
                                'span',
                                null
                            )
                        ),
                        React.createElement(
                            'div', { className: 'container-fluid' }, !pageIsLocked ? rowModels : React.createElement('span', null, cultureRes.lockedPage)
                        )
                    );
                } else if (isRestaurant == true) {

                    return React.createElement(
                        'div',
                        null,
                        React.createElement('div', { className: 'cart-btn' }, React.createElement(
                            'div', { className: 'cart-btn-counter hidden' })),
                        React.createElement(
                            'div', { className: 'container-fluid' }, !pageIsLocked ? rowModels : React.createElement('span', null, cultureRes.lockedPage)
                        )
                    );
                } else if (isEvent == true) {
                    return React.createElement(
                        'div',
                        null,
                        React.createElement('div', { className: 'event-btn' }),
                        React.createElement(
                            'div', { className: 'container-fluid' }, !pageIsLocked ? rowModels : React.createElement('span', null, cultureRes.lockedPage)
                        )
                    );
                } else {
                    return React.createElement(
                        'div',
                        null,
                        React.createElement(
                            'div', { className: 'container-fluid' }, !pageIsLocked ? rowModels : React.createElement('span', null, cultureRes.lockedPage)
                        )
                    );
                }
            }
        }
    });

    var CellContainer = React.createClass({
        displayName: 'CellContainer',

        componentDidMount: function componentDidMount() {
            var styleRow = this.props.data.Style;

            if (styleRow == undefined || styleRow == null) {
                styleRow = "";
            }
            $(React.findDOMNode(this)).attr("style", styleRow);
        },
        render: function render() {
            var cellModels = this.props.data.CellContents.map(function(cell) {
                return React.createElement(CellContent, { data: cell, key: cell.Id });
            });
            return React.createElement(
                'div', { className: 'row' },
                cellModels
            );
        }
    });

    var GalleryContainer = React.createClass({
        displayName: 'GalleryContainer',

        render: function render() {
            var icon = _.where(this.props.data, { IsGalleryIcon: true });
            var items = _.without(this.props.data, icon);
            if (icon.length > 0) {
                return React.createElement(
                    'div', { className: 'gallery-images-container' },
                    React.createElement(
                        'div', { className: 'icon-container' },
                        this.createIcon(this.props.data)
                    ),
                    React.createElement(
                        'div', { className: 'lightgallery-id' },
                        this.createItems(this.props.data)
                    )
                );
            } else {
                return React.createElement(
                    'div', { className: 'gallery-images-container' },
                    React.createElement(
                        'div', { className: 'shadow-container' },
                        this.createIcon(this.props.data)
                    ),
                    React.createElement(
                        'div', { className: 'lightgallery-id' },
                        this.createItems(this.props.data)
                    )
                );
            }
        },
        componentDidMount: function componentDidMount() {
            $(".lightgallery-id").lightGallery({
                controls: false,
                download: false
            });
        },
        createIcon: function createIcon(items) {
            var icon = _.where(items, { IsGalleryIcon: true });
            items = _.without(items, icon);
            if (icon.length > 0) {
                return React.createElement('img', { src: icon[0].Link, className: 'gallery-icon' });
            } else {
                return React.createElement('div', { className: 'gallery-icon gallery-shadow no-images' });
            }
        },
        createItems: function createItems(items) {
            var output = [];
            var icon = _.where(items, { IsGalleryIcon: true });
            items = _.where(items, { IsGalleryIcon: false });
            for (var i = 0; i < items.length; i++) {
                if (i == 0 && icon.length == 0) {
                    output.push(React.createElement(
                        'a', { href: items[i].Link, className: 'galleryHref', itemProp: 'contentUrl', 'data-size': '964x1024' },
                        React.createElement('img', { src: items[i].Link, className: 'gallery-image' })
                    ));
                } else {
                    output.push(React.createElement(
                        'a', { href: items[i].Link, className: 'galleryHref hidden', itemProp: 'contentUrl', 'data-size': '964x1024' },
                        React.createElement('img', { src: items[i].Link, className: 'gallery-image' })
                    ));
                }
            }
            return output;
        }
    });

    var YoutubeContainer = React.createClass({
        displayName: "YoutubeContainer",

        render: function render() {
            return React.createElement('div', { className: 'my-youtube' });
        },
        componentDidMount: function componentDidMount() {
            var reg = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/ ]{11})/i;
            var value = this.props.data;
            if (value.split('src="').length > 1) {
                value = value.split('src="');
                value = value[1].split('"');
            } else {
                value = value.split("src='");
                value = value[1].split("'");
            }
            var url = value[0];
            var id = url.match(reg);
            var player;
            onYouTubeIframeAPIReady(ReactDOM.findDOMNode(this), id[1]);
        }
    });

    var GoogleMapContainer = React.createClass({
        displayName: "GoogleMapContainer",
        componentDidMount: function() {
            var json = JSON.parse(Base64.decode(this.props.data.Json));
            var idMap = "map-container-" + this.props.data.Id;
            setTimeout(function() {
                    initMapPreview(json.mapData, +json.zoom, idMap);
                },
                1000);
        },
        render: function() {
            return React.createElement('div', { className: "map-container", id: "map-container-" + this.props.data.Id });
        }
    });

    var Hbox = React.createClass({
        displayName: 'Hbox',

        componentDidMount: function componentDidMount() {
            var data = this.props.data;
            var json = data;
            //$(ReactDOM.findDOMNode(this));
            var swiper = new Swiper('.swiper-container', {
                pagination: '.swiper-pagination',
                slidesPerView: json.quantity,
                paginationClickable: true,
                spaceBetween: 10
            });
        },
        render: function render() {
            var data = this.props.data;
            var json = data;
            var elementModels = json.elements.map(function(element) {
                element.Value = replaceData(element.Value);
                if (element.ContentTypeId == 2) {
                    return React.createElement(
                        'div', { className: 'swiper-slide' },
                        React.createElement('div', { className: 'link-item', dangerouslySetInnerHTML: { __html: element.Value } })
                    );
                }
                if (element.ContentTypeId == 3) {
                    return React.createElement(
                        'div', { className: 'swiper-slide' },
                        React.createElement('div', { className: 'image-item', dangerouslySetInnerHTML: { __html: element.Value } })
                    );
                }
                if (element.ContentTypeId == 4) {
                    return React.createElement(
                        'div', { className: 'swiper-slide' },
                        React.createElement('div', { className: 'image-link-item', dangerouslySetInnerHTML: { __html: element.Value } })
                    );
                }
                if (element.ContentTypeId == 5) {
                    return React.createElement(
                        'div', { className: 'swiper-slide' },
                        React.createElement('div', { className: 'text-item', dangerouslySetInnerHTML: { __html: element.Value } })
                    );
                }
                if (element.ContentTypeId == 6) {
                    return React.createElement(
                        'div', { className: 'swiper-slide' },
                        React.createElement('div', { className: 'botton-item', dangerouslySetInnerHTML: { __html: element.Value } })
                    );
                }
                if (element.ContentTypeId == 7) {
                    return React.createElement(
                        'div', { className: 'swiper-slide' },
                        React.createElement(YoutubeContainer, { data: element.Value })
                    );
                }
                if (element.ContentTypeId == 8) {
                    return React.createElement(
                        'div', { className: 'swiper-slide' },
                        React.createElement(GalleryContainer, { data: element.Resourceses })
                    );
                }
                if (element.ContentTypeId == 9) {
                    return React.createElement(
                        'div', { className: 'swiper-slide' },
                        React.createElement('div', { className: 'difficult-botton-item', dangerouslySetInnerHTML: { __html: element.Value } })
                    );
                }
            });

            return React.createElement(
                'div', { className: 'hBox-container swiper-container' },
                React.createElement(
                    'div', { className: 'swiper-wrapper' },
                    elementModels
                ),
                React.createElement('div', { className: 'swiper-pagination' })
            );
        }
    });

    var Vbox = React.createClass({
        displayName: 'Vbox',

        componentDidMount: function componentDidMount() {
            var data = this.props.data;
            var json = data;
            //$(ReactDOM.findDOMNode(this));
        },
        render: function render() {
            var data = this.props.data;
            var json = data;
            var elementModels = json.elements.map(function(element) {
                element.Value = replaceData(element.Value);
                if (element.ContentTypeId == 2) {
                    return React.createElement('div', { className: 'link-item', dangerouslySetInnerHTML: { __html: element.Value } });
                }
                if (element.ContentTypeId == 3) {
                    return React.createElement('div', { className: 'image-item', dangerouslySetInnerHTML: { __html: element.Value } });
                }
                if (element.ContentTypeId == 4) {
                    return React.createElement('div', { className: 'image-link-item', dangerouslySetInnerHTML: { __html: element.Value } });
                }
                if (element.ContentTypeId == 5) {
                    return React.createElement('div', { className: 'text-item', dangerouslySetInnerHTML: { __html: element.Value } });
                }
                if (element.ContentTypeId == 6) {
                    return React.createElement('div', { className: 'botton-item', dangerouslySetInnerHTML: { __html: element.Value } });
                }
                if (element.ContentTypeId == 7) {
                    return React.createElement(YoutubeContainer, { data: element.Value });
                }
                if (element.ContentTypeId == 8) {
                    return React.createElement(GalleryContainer, { data: element.Resourceses });
                }
                if (element.ContentTypeId == 9) {
                    return React.createElement('div', { className: 'difficult-botton-item', dangerouslySetInnerHTML: { __html: element.Value } });
                }
            });
            return React.createElement('div', { className: 'vBox' }, elementModels);
        }
    });

    var CellContent = React.createClass({
        displayName: 'CellContent',

        componentDidMount: function componentDidMount() {
            var deniedTools = applicationData.DeniedTools.replace(/"/g, "'").replace(/]/).split("[")[1].replace(/'/g, '').split(",");
            var styleCell = this.props.data.Style;

            if (styleCell == undefined || styleCell == null) {
                styleCell = "";
            }
            var data = this.props.data;
            var value = data.Value;
            var formId;
            var fieldId;
            if (data.ContentTypeId == 12 && this.checkDeniedTools(deniedTools, "form-item")) {
                formId = this.props.data.FormId;
                var objectForm = applicationData.Forms;
                var styleLabel = this.props.data.Value.split("|")[0];
                var styleSubmit = this.props.data.Value.split("|")[1];
                var textSubmitButton = this.props.data.Value.split("|")[2];
                $(ReactDOM.findDOMNode(this)).html("<form class='form-container' id='form-container'></form>");
                $(objectForm).each(function(i, element) {
                    if (element.Id == formId) {
                        renderForm(element);
                        $("#form-container").find(".formSubmit").attr("style", styleSubmit);
                        $("#form-container").find("label").attr("style", styleLabel);
                        $("#form-container").find(".formSubmit").text(textSubmitButton);
                        $("#form-container").attr("id", "");
                        if ($.jStorage.get('isLogin') && element.RegistrationForm) {
                            $(".form-container").find('input, button, textarea').prop("disabled", true);
                            $(".form-container").on("click", function() {
                                window.plugins.toast.showShortBottom(cultureRes.beforeLogout);
                            });
                        }
                        if (data.CountFormColumn == 2) {
                            $(".formBlock").addClass("formHalf");
                            $(".form-quantity-columns-select").val(2);
                        } else if (data.CountFormColumn == 3) {
                            $(".formBlock").addClass("formThird");
                            $(".form-quantity-columns-select").val(3);
                        }
                        if (data.LablePosition == "left") {
                            $(".label-container").addClass("label-form-left");
                            $(".form-item input, .form-item textarea").addClass("input-form");
                        } else if (data.LablePosition == "right") {
                            $(".label-container").addClass("label-form-right");
                            $(".form-item input, .form-item textarea").addClass("input-form");
                        } else if (data.LablePosition == "placeholder") {
                            addPlaceholder();
                        }
                        if (data.ButtonPosition == "left") {
                            $(".formSubmit").addClass("submit-form-left");
                        } else if (data.ButtonPosition == "right") {
                            $(".form-item").addClass("submit-form-right");
                            $(".form-item div").addClass("submit-form-right-text-left");
                        } else if (data.ButtonPosition == "allWidth") {
                            $(".formSubmit").addClass("submit-form-allWidth");
                        } else if (data.ButtonPosition == "center") {
                            $(".form-item").addClass("submit-form-center");
                            $(".form-item div").addClass("submit-form-right-text-left");
                        } else {
                            $(".formSubmit").addClass("submit-form-left");
                        }
                    }
                });
            }
            if (data.ContentTypeId == 15 && this.checkDeniedTools(deniedTools, "restaurant-menu-item")) {
                // $(ReactDOM.findDOMNode(this)).append("<div><select class='select-restaurant'></select><select class='select-menu'></select><div id='custom-restaurant-menu-container'></div></div>");
                var arrIdMenu = data.Value.split(',');
                var restaurantCollection = applicationData.Restaurants;
                // setUseRestaurantMenus(arrIdMenu, true,restaurantCollection);
                var restaurantsArr = filterMenu(restaurantCollection, arrIdMenu);
                var restaurants = [];
                var selectRest = $("<select class='select-restaurant'></select>");
                var selectMenu = $("<select class='select-menu'></select>");
                $(restaurantsArr).each(function() {
                    $(selectRest).append("<option value='" + this.Id + "'>" + this.Name + "</option>");
                });
                restaurants = _.uniq(restaurants);
                // $(restaurants).each(function(){
                //     $(selectRest).append("<option value='"+ this.Id +"'>"+this.Name+"</option>")
                // });
                var div = $("<div><hidden name='arrIdMenu' value=" + data.Value + "/></div>");
                var divContainer = "<div id='custom-restaurant-menu-container' class='custom-restaurant-menu-container'></div>";

                div = $(div).append($(selectRest)).append($(selectMenu)).append($(divContainer));
                $(ReactDOM.findDOMNode(this)).append($(div));
                var ThisRestaurantaurantMenuBlock = this;
                var weekday = new Array(7);
                weekday[0] = cultureRes.sunday;
                weekday[1] = cultureRes.monday;
                weekday[2] = cultureRes.tuesday;
                weekday[3] = cultureRes.wednesday;
                weekday[4] = cultureRes.thursday;
                weekday[5] = cultureRes.friday;
                weekday[6] = cultureRes.saturday;
                var dayNow = weekday[new Date().getDay()];
                //no working
                $(restaurantsArr).each(function(i, thisRestaurantaraunt) {
                    $(thisRestaurantaraunt.RestaurantMenus).each(function(index, thisRestaurantarauntMenu) {
                        var thisRestaurantaurantMenu = thisRestaurantarauntMenu;
                        if (thisRestaurantarauntMenu.IsOnline == false) {
                            if (thisRestaurantarauntMenu.UseDateTime == false) {
                                renderRestaurantMenu(thisRestaurantarauntMenu, data.LablePosition, data.StateShopItemResponsiveModel, data.StateShopItemName, data.StateShopItemPrice, data.StateShopItemDescription, data.StateShopItemButton, data.StateShopItemImage);
                                $(selectMenu).html("");
                                $(thisRestaurantaraunt.RestaurantMenus).each(function(count, option) {
                                    $(selectMenu).append("<option value='" + option.Id + "'>" + option.Name + "</option>");
                                });
                                $(".select-restaurant").val(thisRestaurantaraunt.Id);
                                $(".select-menu").val(thisRestaurantarauntMenu.Id);
                            } else {
                                $(thisRestaurantaurantMenu.DateTimeRestaurantMenu).each(function(indexData, dataItem) {
                                    if (dataItem.IsChecked && dataItem.Day == dayNow && ThisRestaurantaurantMenuBlock.checkRestarauntTime(dataItem.FromHour, dataItem.ToHour, ThisRestaurantaurantMenuBlock.getClockTime())) {
                                        renderRestaurantMenu(thisRestaurantaurantMenu, data.LablePosition, data.StateShopItemResponsiveModel, data.StateShopItemName, data.StateShopItemPrice, data.StateShopItemDescription, data.StateShopItemButton, data.StateShopItemImage);
                                        $(selectMenu).html("");
                                        $(thisRestaurantaraunt.RestaurantMenus).each(function(count, option) {
                                            $(selectMenu).append("<option value='" + option.Id + "'>" + option.Name + "</option>");
                                        });
                                        $(".select-restaurant").val(thisRestaurantaraunt.Id);
                                        $(".select-menu").val(thisRestaurantarauntMenu.Id);
                                    } else if (dataItem.IsChecked && dataItem.Day == cultureRes.date && ThisRestaurantaurantMenuBlock.checkRestarauntTimeForDate(dataItem.FromHour, dataItem.ToHour)) {
                                        renderRestaurantMenu(thisRestaurantaurantMenu, data.LablePosition, data.StateShopItemResponsiveModel, data.StateShopItemName, data.StateShopItemPrice, data.StateShopItemDescription, data.StateShopItemButton, data.StateShopItemImage);
                                        $(selectMenu).html("");
                                        $(thisRestaurantaraunt.RestaurantMenus).each(function(count, option) {
                                            $(selectMenu).append("<option value='" + option.Id + "'>" + option.Name + "</option>");
                                        });
                                        $(".select-restaurant").val(thisRestaurantaraunt.Id);
                                        $(".select-menu").val(thisRestaurantarauntMenu.Id);
                                    }
                                });
                            }
                        } else {
                            var networkState = navigator.connection.type;
                            if (networkState == Connection.NONE) {
                                $("#custom-restaurant-menu-container").html(cultureRes.sorryOnline);
                            } else {
                                if (thisRestaurantarauntMenu.UseDateTime == false) {
                                    renderRestaurantMenu(thisRestaurantarauntMenu, data.LablePosition, data.StateShopItemResponsiveModel, data.StateShopItemName, data.StateShopItemPrice, data.StateShopItemDescription, data.StateShopItemButton, data.StateShopItemImage);
                                    $(selectMenu).html("");
                                    $(thisRestaurantaraunt.RestaurantMenus).each(function(count, option) {
                                        $(selectMenu).append("<option value='" + option.Id + "'>" + option.Name + "</option>");
                                    });
                                    $(".select-restaurant").val(thisRestaurantaraunt.Id);
                                    $(".select-menu").val(thisRestaurantarauntMenu.Id);
                                } else {
                                    $(thisRestaurantaurantMenu.DateTimeRestaurantMenu).each(function(indexData, dataItem) {
                                        if (dataItem.IsChecked && dataItem.Day == dayNow && ThisRestaurantaurantMenuBlock.checkRestarauntTime(dataItem.FromHour, dataItem.ToHour, ThisRestaurantaurantMenuBlock.getClockTime())) {
                                            renderRestaurantMenu(thisRestaurantaurantMenu, data.LablePosition, data.StateShopItemResponsiveModel, data.StateShopItemName, data.StateShopItemPrice, data.StateShopItemDescription, data.StateShopItemButton, data.StateShopItemImage);
                                            $(selectMenu).html("");
                                            $(thisRestaurantaraunt.RestaurantMenus).each(function(count, option) {
                                                $(selectMenu).append("<option value='" + option.Id + "'>" + option.Name + "</option>");
                                            });
                                            $(".select-restaurant").val(thisRestaurantaraunt.Id);
                                            $(".select-menu").val(thisRestaurantarauntMenu.Id);
                                        } else if (dataItem.IsChecked && dataItem.Day == cultureRes.date && ThisRestaurantaurantMenuBlock.checkRestarauntTimeForDate(dataItem.FromHour, dataItem.ToHour)) {
                                            renderRestaurantMenu(thisRestaurantaurantMenu, data.LablePosition, data.StateShopItemResponsiveModel, data.StateShopItemName, data.StateShopItemPrice, data.StateShopItemDescription, data.StateShopItemButton, data.StateShopItemImage);
                                            $(selectMenu).html("");
                                            $(thisRestaurantaraunt.RestaurantMenus).each(function(count, option) {
                                                $(selectMenu).append("<option value='" + option.Id + "'>" + option.Name + "</option>");
                                            });
                                            $(".select-restaurant").val(thisRestaurantaraunt.Id);
                                            $(".select-menu").val(thisRestaurantarauntMenu.Id);
                                        }
                                    });
                                }
                            }
                        }
                    });
                });
                $("#custom-restaurant-menu-container").attr("id", "");
            }

            if (data.ContentTypeId == 13 && this.checkDeniedTools(deniedTools, "custom-form-item")) {
                fieldId = this.props.data.FieldId;
                formId = this.props.data.FormId;
                var styleLabel = this.props.data.Value;
                var objectForm = applicationData.Forms;
                $(ReactDOM.findDOMNode(this)).attr("id", "custom-form-container");
                $(objectForm).each(function(i, element) {
                    if (element.Id == formId) {
                        $(element.FormFields).each(function(i, field) {
                            if (field.Id == fieldId) {
                                var formToRender = {};
                                formToRender.FormFields = [];
                                formToRender.FormFields.push(field);
                                formToRender.Id = element.Id;
                                formToRender.Name = element.Name;
                                renderCustomForm(formToRender);
                                if ($.jStorage.get('isLogin') && element.RegistrationForm) {
                                    $(".custom-form-item").find('.form_' + element.Id).siblings().find("input, textarea, button").prop("disabled", true);
                                    $(".SubmitBtnIdForm.form-submit-item[name=" + element.Id + "]").find("button").prop("disabled", true);
                                }
                                if ($.jStorage.get('isLogin') && element.LoginForm) {
                                    $(".SubmitBtnIdForm.form-submit-item[name=" + element.Id + "]").find("button").removeClass("formSubmit").addClass("formLogout").text("Logout");
                                    submitFormListener();
                                }
                                $("#custom-form-container").find("label").attr("style", styleLabel);
                                $("#custom-form-container").attr("id", "");
                            }
                        });
                    }
                });
            }
            if (data.ContentTypeId == 16 && this.checkDeniedTools(deniedTools, "booking-item")) {
                $(ReactDOM.findDOMNode(this)).append("<div class='custom-container-booking' id='custom-container-booking'></div>");
                $(applicationData.Institutions).each(function() {
                    if (this.Id == data.BookingCurrentInstitution) {
                        renderBooking(this, data.BookingSortingByService);
                    }
                });
                $("#custom-container-booking").attr("id", "");
            }
            if (data.ContentTypeId == 17 && this.checkDeniedTools(deniedTools, "pdf-item")) {
                $(ReactDOM.findDOMNode(this)).find("span").click(function(e) {
                    var url = $(this).attr("data-locationpdf");

                    var options = {
                        openWith: {
                            enabled: true
                        }
                    }

                    function onShow() {
                        window.console.log('document shown');
                        //e.g. track document usage
                    }

                    if (device.platform === 'iOS') {
                        //ios
                        cordova.plugins.SitewaertsDocumentViewer.viewDocument(
                            url, 'application/pdf', options, onShow);

                    } else {
                        //android
                        window.resolveLocalFileSystemURL(url, function(fileEntry) {
                            window.resolveLocalFileSystemURL(cordova.file.externalDataDirectory, function(dirEntry) {
                                fileEntry.copyTo(dirEntry, 'file.pdf', function(newFileEntry) {
                                    cordova.plugins.fileOpener2.open(newFileEntry.nativeURL, 'application/pdf', {
                                        error: function(e) {
                                            if (e.message.indexOf("Activity not found: No Activity found to handle Intent") > -1) {
                                                window.plugins.toast.showShortBottom("Please, install some PDF reader.");
                                            }
                                            console.log('Error status: ' + e.status + ' - Error message: ' + e.message);
                                        },
                                        success: function() {
                                            console.log('file opened successfully');
                                        }
                                    });
                                });
                            });
                        });

                    }
                });
            }
            if (data.ContentTypeId == 19 && this.checkDeniedTools(deniedTools, "event-item")) {
                $(ReactDOM.findDOMNode(this)).append("<div id='event-container'></div>");

                $(applicationData.MainEvents).each(function() {
                    if (this.Id == data.Json.Id) {
                        renderEvent(this);
                    }
                });
                $("#event-container").attr("id", "");
            }

            if (data.ContentTypeId == 2 || data.ContentTypeId == 4 || data.ContentTypeId == 9) {
                $(ReactDOM.findDOMNode(this)).click(function(e) {
                    e.preventDefault();
                    window.open($(this).attr("href"), '_system')
                });
            }
            // $("body a").click(function(e) {
            //     e.preventDefault();
            //     window.open($(this).attr("href"), '_system')
            // });
            //$(React.findDOMNode(this)).attr("style", styleCell);
            $(ReactDOM.findDOMNode(this)).attr("style", styleCell);
        },
        checkRestarauntTime: function checkRestarauntTime(FromHourModel, ToHourModel, NowHoursModel) {
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
            if (FromHour <= NowHour && NowHour <= ToHour) {
                timeCheker = true;
            } else {
                timeCheker = false;
            }
            if (!timeCheker) {
                if (FromMinuts <= NowMinuts && NowMinuts <= ToMinuts) {
                    timeCheker = true;
                } else {
                    timeCheker = false;
                }
            }
            if (!timeCheker) {
                if (FromSeconds <= NowSeconds && NowSeconds <= ToSeconds) {
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
        },
        // checkRestarauntTimeForDate: function(FromHourModel, ToHourModel, NowHoursModel) {
        //                     var FromDataArray = FromHourModel.split("T")[1].split(":");
        //     var ToDataArray = ToHourModel.split("T")[1].split(":");
        //     var NowDataArray = NowHoursModel.split("T")[1].split(":");
        //
        //     var FromMonth =  Number((FromHourModel.split("T")[0]).split("-")[1]);
        //     var FromDay =  Number((FromHourModel.split("T")[0]).split("-")[2]);
        //     var FromHour = Number(FromDataArray[0]);
        //     var FromMinuts = Number(FromDataArray[1]);
        //     var FromSeconds = Number(FromDataArray[2]);
        //
        //     var ToMonth =  Number((ToHourModel.split("T")[0]).split("-")[1]);
        //     var ToDay =  Number((ToHourModel.split("T")[0]).split("-")[2]);
        //     var ToHour = Number(ToDataArray[0]);
        //     var ToMinuts = Number(ToDataArray[1]);
        //     var ToSeconds = Number(ToDataArray[2]);
        //
        //     var NowMonth = Number(NowHoursModel.split("-")[0]);
        //     var NowDay = Number(NowHoursModel.split("-")[1]);
        //     var NowHour = Number(NowDataArray[0]);
        //     var NowMinuts = Number(NowDataArray[1]);
        //     var NowSeconds = Number(NowDataArray[2]);
        //
        //
        //     if ((FromMonth < NowMonth) && (NowMonth < ToMonth)) {
        //                     return true;
        //     }else
        //     if((FromMonth == NowMonth) || (NowMonth == ToMonth))
        //     {
        //                     if((FromDay < NowDay) && (NowDay < ToDay)){
        //                     return true;
        //       }else   if((FromDay == NowDay) || (NowDay == ToDay)){
        //                     if ((FromHour < NowHour) && (NowHour < ToHour)) {
        //                     return true;
        //         }else if ((FromHour == NowHour) && (NowHour == ToHour)) {
        //                     if ((FromMinuts < NowMinuts) && (NowMinuts < ToMinuts)) {
        //                     return true;
        //           }else if ((FromMinuts == NowMinuts) && (NowMinuts == ToMinuts)) {
        //                     if ((FromMinuts < NowMinuts) && (NowMinuts < ToMinuts)) {
        //                     return true;
        //             }else   if ((FromMinuts == NowMinuts) && (NowMinuts == ToMinuts)) {
        //                     if ((FromSeconds < NowSeconds) && (NowSeconds < ToSeconds)) {
        //                     return true;
        //              }else  if ((FromSeconds == NowSeconds) && (NowSeconds == ToSeconds)) {
        //                     return true;
        //              }
        //             }
        //           }
        //         }
        //       }
        //     }
        //
        //     return false;
        // },
        checkRestarauntTimeForDate: function checkRestarauntTimeForDate(FromHourModel, ToHourModel) {
            if (moment().isAfter(FromHourModel) && moment().isBefore(ToHourModel)) {
                return true;
            } else {
                return false;
            }
        },
        getClockTime: function getClockTime() {
            var now = new Date();
            var hour = now.getHours();
            var minute = now.getMinutes();
            var second = now.getSeconds();
            var ap = "12T";
            if (hour > 11) {
                ap = "24T";
            }
            if (hour < 10) {
                hour = "0" + hour;
            }
            if (minute < 10) {
                minute = "0" + minute;
            }
            if (second < 10) {
                second = "0" + second;
            }
            var timeString = ap + hour + ':' + minute + ':' + second;
            return timeString;
        },
        // getDateTime: function(){
        //                     var now = new Date();
        //   var month = now.getMonth() + 1;
        //   var day = now.getDate();
        //   var hour = now.getHours();
        //   var minute = now.getMinutes();
        //   var second = now.getSeconds();
        //   var ap = "12T";
        //   if (hour > 11) { ap = "24T"; }
        //   if (hour < 10) { hour = "0" + hour; }
        //   if (minute < 10) { minute = "0" + minute; }
        //   if (second < 10) { second = "0" + second; }
        //   if(day < 10) {day = "0" + day;}
        //   var timeString = month + "-" + day + "-" + ap + hour + ':' + minute + ':' + second;
        //   return timeString;
        // },
        checkDeniedTools: function(allTool, thisTool) {
            var tool = allTool.filter(function(e) { return e == thisTool }).length < 1;
            return tool
        },
        checkInternetConnection: function() {
            var networkState = navigator.connection.type;
            if (networkState != Connection.NONE) {
                return true;
            } else if (networkState == Connection.NONE) {
                return false;
            }
        },
        render: function render() {
            var data = this.props.data;
            var deniedTools = applicationData.DeniedTools.replace(/"/g, "'").replace(/]/).split("[")[1].replace(/'/g, '').split(",");
            if (data.ContentTypeId == 3 && this.checkDeniedTools(deniedTools, "image-item")) {
                return React.createElement('div', { className: "cell-container col-xs-" + data.Colspan + " col-sm-" + data.Colspan + " col-md-" + data.Colspan + " col-lg-" + data.Colspan, dangerouslySetInnerHTML: { __html: data.Value } });
            } else if (data.ContentTypeId == 3) {
                return null
            }
            if (data.ContentTypeId == 4 && this.checkDeniedTools(deniedTools, "image-link-item")) {
                return React.createElement('div', { className: "cell-container col-xs-" + data.Colspan + " col-sm-" + data.Colspan + " col-md-" + data.Colspan + " col-lg-" + data.Colspan, dangerouslySetInnerHTML: { __html: data.Value } });
            } else if (data.ContentTypeId == 4) {
                return null
            }
            if (data.ContentTypeId == 5 && this.checkDeniedTools(deniedTools, "text-item")) {
                return React.createElement('div', { className: "cell-container col-xs-" + data.Colspan + " col-sm-" + data.Colspan + " col-md-" + data.Colspan + " col-lg-" + data.Colspan, dangerouslySetInnerHTML: { __html: data.Value } });
            } else if (data.ContentTypeId == 5) {
                return null
            }
            if (data.ContentTypeId == 6 && this.checkDeniedTools(deniedTools, "botton-item")) {
                return React.createElement('div', { className: "cell-container col-xs-" + data.Colspan + " col-sm-" + data.Colspan + " col-md-" + data.Colspan + " col-lg-" + data.Colspan, dangerouslySetInnerHTML: { __html: data.Value } });
            } else if (data.ContentTypeId == 6) {
                return null
            }
            if (data.ContentTypeId == 2 && this.checkDeniedTools(deniedTools, "link-item")) {
                return React.createElement('div', { className: "cell-container col-xs-" + data.Colspan + " col-sm-" + data.Colspan + " col-md-" + data.Colspan + " col-lg-" + data.Colspan, dangerouslySetInnerHTML: { __html: data.Value } });
            } else if (data.ContentTypeId == 2) {
                return null
            }
            if (data.ContentTypeId == 1) {
                return React.createElement('div', { className: "cell-container col-xs-" + data.Colspan + " col-sm-" + data.Colspan + " col-md-" + data.Colspan + " col-lg-" + data.Colspan, dangerouslySetInnerHTML: { __html: data.Value } });
            }
            if (data.ContentTypeId == 8 && this.checkDeniedTools(deniedTools, "gallery-item")) {
                return React.createElement(
                    'div', { className: "cell-container col-xs-" + data.Colspan + " col-sm-" + data.Colspan + " col-md-" + data.Colspan + " col-lg-" + data.Colspan, onClick: this.onClickCell },
                    React.createElement(GalleryContainer, { data: data.Resourceses })
                );
            } else if (data.ContentTypeId == 8) {
                return null
            }
            if (data.ContentTypeId == 9 && this.checkDeniedTools(deniedTools, "difficult-botton-item")) {
                return React.createElement('div', { className: "cell-container col-xs-" + data.Colspan + " col-sm-" + data.Colspan + " col-md-" + data.Colspan + " col-lg-" + data.Colspan, onClick: this.onClickCell, dangerouslySetInnerHTML: { __html: data.Value } });
            } else if (data.ContentTypeId == 9) {
                return null
            }
            if (data.ContentTypeId == 7 && this.checkDeniedTools(deniedTools, "youtube-item") && this.checkInternetConnection()) {
                return React.createElement(
                    'div', { className: "videoWrapper cell-container col-xs-" + data.Colspan + " col-sm-" + data.Colspan + " col-md-" + data.Colspan + " col-lg-" + data.Colspan, onClick: this.onClickCell },
                    React.createElement(YoutubeContainer, { data: data.Value })
                );
            } else if (data.ContentTypeId == 7) {
                return null
            }

            //ContentTypeId - 10 start
            if (data.ContentTypeId == 10 && this.checkDeniedTools(deniedTools, "hbox-container-item")) {
                return React.createElement(
                    'div', { className: "cell-container col-xs-" + data.Colspan + " col-sm-" + data.Colspan + " col-md-" + data.Colspan + " col-lg-" + data.Colspan },
                    React.createElement(Hbox, { data: data.Json })
                );
            } else if (data.ContentTypeId == 10) {
                return null
            }
            if (data.ContentTypeId == 11 && this.checkDeniedTools(deniedTools, "vbox-container-item")) {
                return React.createElement(
                    'div', { className: "cell-container col-xs-" + data.Colspan + " col-sm-" + data.Colspan + " col-md-" + data.Colspan + " col-lg-" + data.Colspan },
                    React.createElement(Vbox, { data: data.Json })
                );
            } else if (data.ContentTypeId == 11) {
                return null
            }
            if (data.ContentTypeId == 12 && this.checkDeniedTools(deniedTools, "form-item")) {
                return React.createElement('div', { className: "cell-container col-xs-" + data.Colspan + " col-sm-" + data.Colspan + " col-md-" + data.Colspan + " col-lg-" + data.Colspan, onClick: this.onClickCell, dangerouslySetInnerHTML: { __html: data.Value } });
            } else if (data.ContentTypeId == 12) {
                return null
            }
            if (data.ContentTypeId == 13 && this.checkDeniedTools(deniedTools, "custom-form-item")) {
                return React.createElement('div', { className: "cell-container col-xs-" + data.Colspan + " col-sm-" + data.Colspan + " col-md-" + data.Colspan + " col-lg-" + data.Colspan, onClick: this.onClickCell, dangerouslySetInnerHTML: { __html: data.Value } });
            } else if (data.ContentTypeId == 13) {
                return null
            }
            if (data.ContentTypeId == 14 && this.checkDeniedTools(deniedTools, "custom-form-item")) {
                return React.createElement('div', { className: "cell-container col-xs-" + data.Colspan + " col-sm-" + data.Colspan + " col-md-" + data.Colspan + " col-lg-" + data.Colspan, onClick: this.onClickCell, dangerouslySetInnerHTML: { __html: data.Value } });
            } else if (data.ContentTypeId == 14) {
                return null
            }
            if (data.ContentTypeId == 15 && this.checkDeniedTools(deniedTools, "restaurant-menu-item")) {
                return React.createElement('div', { className: "cell-container col-xs-" + data.Colspan + " col-sm-" + data.Colspan + " col-md-" + data.Colspan + " col-lg-" + data.Colspan, onClick: this.onClickCell });
            } else if (data.ContentTypeId == 15) {
                return null
            }
            if (data.ContentTypeId == 16 && this.checkDeniedTools(deniedTools, "booking-item")) {
                return React.createElement('div', { className: "cell-container col-xs-" + data.Colspan + " col-sm-" + data.Colspan + " col-md-" + data.Colspan + " col-lg-" + data.Colspan, onClick: this.onClickCell });
            } else if (data.ContentTypeId == 16) {
                return null
            }
            if (data.ContentTypeId == 17 && this.checkDeniedTools(deniedTools, "pdf-item")) {
                return React.createElement('div', { className: "cell-container col-xs-" + data.Colspan + " col-sm-" + data.Colspan + " col-md-" + data.Colspan + " col-lg-" + data.Colspan, dangerouslySetInnerHTML: { __html: data.Value } });
            } else if (data.ContentTypeId == 17) {
                return null
            }
            if (data.ContentTypeId == 18 && this.checkDeniedTools(deniedTools, "googlemap-item") && this.checkInternetConnection()) {
                return React.createElement(
                    'div', { className: "googlemap-item cell-container col-xs-" + data.Colspan + " col-sm-" + data.Colspan + " col-md-" + data.Colspan + " col-lg-" + data.Colspan, onClick: this.onClickCell },
                    React.createElement(GoogleMapContainer, { data: data })
                );
            } else if (data.ContentTypeId == 18) {
                return null
            }
            if (data.ContentTypeId == 19 && this.checkDeniedTools(deniedTools, "event-item")) {
                return React.createElement('div', { className: "cell-container col-xs-" + data.Colspan + " col-sm-" + data.Colspan + " col-md-" + data.Colspan + " col-lg-" + data.Colspan, onClick: this.onClickCell });
            } else if (data.ContentTypeId == 19) {
                return null
            }
        }
    });
    //ContentTypeId - 10 end
    ReactDOM.render(React.createElement(Rows, null), document.getElementById('container'));
}