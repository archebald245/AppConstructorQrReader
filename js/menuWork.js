function createMenu() {
    if (applicationData.IsTrackingLastPage == true) {
        if (getLastOpenPage() != null) {
            var isContains = false;
            indexPage = getLastOpenPage();
            for (var i = 0; i < applicationData.Pages.length; i++) {
                if (applicationData.Pages[i].Id == indexPage) {
                    isContains = true;
                }
            }
        } else {
            if (!isContains) {
                for (var i = 0; i < applicationData.Pages.length; i++) {
                    if (!!applicationData.Pages[i].IsStartPage) {
                        indexPage = applicationData.Pages[i].Id;
                        setLastOpenPage(indexPage);
                    }
                }
            }
        }
    } else {
        for (var i = 0; i < applicationData.Pages.length; i++) {
            if (!!applicationData.Pages[i].IsStartPage) {
                indexPage = applicationData.Pages[i].Id;
            }
        }
        if (indexPage == 0) {
            indexPage = applicationData.Pages[0].Id;
        }
    }
    if (applicationData.Menu != null) {
        var menu = getPositionMenu(applicationData.Menu.Position);
        var menuItems = applicationData.Menu.MenuItems;
        var div;
        $(menu).html("");
        var label;
        for (var i = 0; i < menuItems.length; i++) {
            //var img = applicationData.Menu.MenuItems[i].IconPath != "" ? $('<img>').attr({ src: applicationData.Menu.MenuItems[i].IconPath, class: "menu-item-icon" }) : "";
            var img = applicationData.Menu.MenuItems[i].IconPath != null ? "<img src='" + applicationData.Menu.MenuItems[i].IconPath + "' class='menu-item-icon';/>" : "<img src='' class='menu-item-icon menu-item-icon-hidden';/>";
            if (applicationData.Menu.MenuItems[i].IsExternal == true) {
                div = $('<a href=' + menuItems[i].Link + ' class="menu-item-href"><div class="classPageLink">' + img + '<label>' + menuItems[i].Title + '</label></div></a>');
            } else {
                div = $('<div class="classPageLink" id =' + menuItems[i].Link + ' onClick="clickPageOnDropdownMenu(' + menuItems[i].Link + ')">' + img + '<label>' + menuItems[i].Title + '</label></div>');
            }
            div.appendTo(menu);
        }
        var style = applicationData.Menu.Styles + "; display:block";
        var sandwichStyle = applicationData.Menu.SandwichColor;
        if (sandwichStyle == null) {
            sandwichStyle = "background-color:rgb(85, 83, 83)";
        }
        if (style == null) {
            style = "background-color:rgb(94, 94, 94); display:block";
        }
        var sandwichColor = sandwichStyle.split(":")[1];
        if (applicationData.Menu.Position != null) {
            if (applicationData.Menu.Position == "left-swipe" || applicationData.Menu.Position == "right-swipe") {
                $(".menu-icon div").attr("style", sandwichStyle);
                $(".classSwipeDropList").attr("style", style);
                $(".classSwipeDropList").css("color", sandwichColor);

                $(".classSwipeDropList>div").css({
                    'border-bottom': '1px solid ' + sandwichColor
                });

                if ($(".menu-triangle").hasClass("menu-left")) {
                    $(".menu-left").css({
                        'border-color': 'transparent transparent transparent ' + style.split(";")[0].split(":")[1]
                    });
                    $(".classSwiperMenu.left-menu").attr("style", style);
                }
                if ($(".menu-triangle").hasClass("menu-right")) {
                    $(".menu-right").css({
                        'border-color': 'transparent ' + style.split(";")[0].split(":")[1] + ' transparent transparent'
                    });
                    $(".classSwiperMenu.right-menu").attr("style", style);
                }
            } else {
                $(".menu-icon div").attr("style", sandwichStyle);
                $(".classMenu").attr("style", style);

                $(".classDropdownList").attr("style", style);
                $(".classDropdownList").css("color", sandwichColor);

                $(".classDropdownList>divб .classDropdownList a>div").css({
                    'border-bottom': '1px solid ' + sandwichColor
                });
                $(".classDropdownList").css({
                    'border-top': '2px solid ' + sandwichColor,
                    'max-height': $(document).height() / 1.5
                });
            }
        }
        addListener();
        slideUp();
        showActivePageInMenu(indexPage);
    }
}

function clickPageOnDropdownMenu(link) {
    slideUp();
    goToPage(link);
}

function addListener() {
    document.querySelector('body').addEventListener('click', slideUp, true);
}

function slideUp() {
    $(".classDropdownList").slideUp("fast");
}
$('.menu-icon').click(function() {
    $(".classDropdownList").slideToggle();
})

function openMenu() {
    if ($(".classDropdownList").is(":hidden")) {
        $(".classDropdownList").slideDown("fast");
    } else {
        $(".classDropdownList").slideUp("fast");
    }
}

function showActivePageInMenu(page) {
    var activeColor = applicationData.Menu.Styles;
    var borderColor = applicationData.Menu.SandwichColor;
    if (borderColor == null) {
        borderColor = "background-color:rgb(85, 83, 83)";
    }
    if (activeColor == null) {
        activeColor = "background-color:rgb(94, 94, 94)"
    }
    borderColor = borderColor.split(":")[1];
    $(".classPageLink.activePage").attr('style', activeColor);
    $(".classPageLink.activePage").css({
        'border-bottom': '1px solid ' + borderColor
    });

    $(".classPageLink").removeClass("activePage");

    var colors = activeColor.replace(/[^\d,]/g, '').split(',');
    activeColor = "background-color:rgb(";
    colors.forEach(function(item, index) {
        item = Math.round(item * 0.8);
        if (index < 2) {
            activeColor += item + ", ";
        } else {
            activeColor += item + ") ";
        }
    });

    $("#" + page + "").addClass("activePage");
    $(".classPageLink.activePage").attr("style", activeColor);
    $(".classPageLink.activePage").css({
        'border-bottom': '1px solid ' + borderColor
    });
}

function onClickButtonMenu() {
    openMenu();
}

function getPositionMenu(positionMenu) {
    switch (positionMenu) {
        case 'top-left':
            $('div.menu-icon').show().addClass('menu-icon-left');
            $('.classMenu').show().addClass('classMenuTop');
            $('.classDropdownList').addClass('classDropdownList-topMenu');
            $('#container').addClass('containerTop');
            return '.classDropdownList';

        case 'left-swipe':
            $('div.menu-icon').hide();
            $('.classMenu').hide();
            $('.classSwipeDropList').addClass('side-menu-left');
            $('.menu-triangle').addClass('menu-left');
            $('.classSwiperMenu').addClass('left-menu');
            $("body").swipe({
                swipe: function(event, direction, distance, duration, fingerCount, fingerData) {
                    if (swipeMenuInGallary == false) {
                        if (direction == "right") {
                            $(".classSwipeDropList").animate({
                                width: "70%"
                            }, { queue: false }, 1500);
                        } else if (direction == "left") {
                            $(".classSwipeDropList").animate({
                                width: "0px"
                            }, { queue: false }, 1500);
                        }
                    }
                },
                allowPageScroll: "vertical"
            });
            $("body").on("click", function() {
                $(".classSwipeDropList").animate({
                    width: "0px"
                }, { queue: false }, 1500);
            });
            return '.classSwipeDropList';

        case 'bottom-left':
            $('div.menu-icon').show().addClass('menu-icon-left');
            $('.classMenu').show().addClass('classMenuBottom');
            $('.classDropdownList').addClass('classDropdownList-downMenu');
            $('#container').addClass('containerBottom');
            return '.classDropdownList';

        case 'top-right':
            $('div.menu-icon').show().addClass('menu-icon-right');
            $('.classMenu').show().addClass('classMenuTop');
            $('.classDropdownList').addClass('classDropdownList-topMenu');
            $('#container').addClass('containerTop');
            return '.classDropdownList';

        case 'right-swipe':
            $('div.menu-icon').hide()
            $('.classMenu').hide();
            $('.classSwipeDropList').addClass('side-menu-right');
            $('.menu-triangle').addClass('menu-right');
            $('.classSwiperMenu').addClass('right-menu');
            $("body").swipe({
                swipe: function(event, direction, distance, duration, fingerCount, fingerData) {
                    if (swipeMenuInGallary == false) {
                        if (direction == "right") {
                            $(".classSwipeDropList").animate({
                                width: "0px"
                            }, { queue: false }, 1500);
                        } else if (direction == "left") {
                            $(".classSwipeDropList").animate({
                                    width: "70%"
                                }, { queue: false },
                                1500);
                        }
                    }
                },
                allowPageScroll: "vertical"
            });
            $("body").on("click", function() {
                $(".classSwipeDropList").animate({
                    width: "0px"
                }, { queue: false }, 1500);
            });
            return '.classSwipeDropList';

        case 'bottom-right':
            $('div.menu-icon').show().addClass('menu-icon-right');
            $('.classMenu').show().addClass('classMenuBottom');
            $('.classDropdownList').addClass('classDropdownList-downMenu');
            $('#container').addClass('containerBottom');
            return '.classDropdownList';

        case null:
            $('div.menu-icon').hide();
            $('.classMenu').hide();
            break;
    }
}