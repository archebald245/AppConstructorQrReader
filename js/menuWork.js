function createMenu() {
    if (applicationData.Menu != null) {
        var menu = getPositionMenu(applicationData.Menu.Position);
        var menuItems = applicationData.Menu.MenuItems;
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
        addListener();
        slideUp();
        showActivePageInMenu(applicationData.Pages[0].Id);
    }
    indexPage = applicationData.Pages[0].Id;
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
    $(".classPageLink").removeClass("activePage");
    $("#" + page + "").addClass("activePage");
}

function onClickButtonMenu() {
    openMenu();
}

function getPositionMenu(positionMenu) {
    switch (positionMenu) {
        case 'top-left':
            $('span.menu-icon').show().addClass('menu-icon-left');
            $('.classMenu').show().addClass('classMenuTop');
            $('.classDropdownList').addClass('classDropdownList-topMenu');
            $('#container').addClass('containerTop');
            return '.classDropdownList';

        case 'left-swipe':
            $('span.menu-icon').hide();
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
            $('span.menu-icon').show().addClass('menu-icon-left');
            $('.classMenu').show().addClass('classMenuBottom');
            $('.classDropdownList').addClass('classDropdownList-downMenu');
            $('#container').addClass('containerBottom');
            return '.classDropdownList';

        case 'top-right':
            $('span.menu-icon').show().addClass('menu-icon-right');
            $('.classMenu').show().addClass('classMenuTop');
            $('.classDropdownList').addClass('classDropdownList-topMenu');
            $('#container').addClass('containerTop');
            return '.classDropdownList';

        case 'right-swipe':
            $('span.menu-icon').hide()
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

        case 'bottom-righ':
            $('span.menu-icon').show().addClass('menu-icon-right');
            $('.classMenu').show().addClass('classMenuBottom');
            $('.classDropdownList').addClass('classDropdownList-downMenu');
            $('#container').addClass('containerBottom');
            return '.classDropdownList';

        case null:
            $('span.menu-icon').hide();
            $('.classMenu').hide();
            break;
    }
}