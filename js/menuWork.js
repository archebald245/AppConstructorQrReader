function createMenu() {
    for (var i = 0; i < applicationData.Pages.length; i++) {
        if (!!applicationData.Pages[i].IsStartPage) {
            indexPage = applicationData.Pages[i].Id;
        }
    }
    if (indexPage == 0) {
        indexPage = applicationData.Pages[0].Id;
    }
    if (applicationData.Menu != null) {
        var menu = getPositionMenu(applicationData.Menu.Position);
        var menuItems = applicationData.Menu.MenuItems;
        var style = applicationData.Menu.Styles + "; display:block";
        var sandwichStyle = applicationData.Menu.SandwichColor;
        var sandwichColor = sandwichStyle.split(":")[1];
        var div;

        $(menu).html("");
        var label;
        for (var i = 0; i < menuItems.length; i++) {
            if (applicationData.Menu.MenuItems[i].IsExternal == true) {
                div = $('<a href=' + menuItems[i].Link + ' class="menu-item-href"><div class="classPageLink"><label>' + menuItems[i].Title + '</label></div></a>');
            } else {
                div = $('<div class="classPageLink" id =' + menuItems[i].Link + ' onClick="clickPageOnDropdownMenu(' + menuItems[i].Link + ')"><label>' + menuItems[i].Title + '</label></div>');
            }
            div.appendTo(menu);
        }
        if (applicationData.Menu.Position == "left-swipe" || applicationData.Menu.Position == "right-swipe") {
            $(".menu-icon div").attr("style", sandwichStyle);
            $(".classSwipeDropList").attr("style", style);
            $(".classSwipeDropList").css("color", sandwichColor);

            $(".classSwipeDropList>div").css({
                'border-bottom': '1px solid ' + sandwichColor
            });
        } else {
            $(".menu-icon div").attr("style", sandwichStyle);
            $(".classMenu").attr("style", style);

            $(".classDropdownList").attr("style", style);
            $(".classDropdownList").css("color", sandwichColor);

            $(".classDropdownList>div").css({
                'border-bottom': '1px solid ' + sandwichColor
            });
            $(".classDropdownList").css({
                'border-top': '2px solid ' + sandwichColor
            });
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
    var borderColor = applicationData.Menu.SandwichColor.split(":")[1];
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