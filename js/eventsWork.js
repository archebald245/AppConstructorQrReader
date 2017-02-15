function goToPage(index) {
    indexPage = index;
    showActivePageInMenu(index);
    $("#container").empty();
    slideUp();
    $("html, body").animate({ scrollTop: -$(document).height() }, "fast");
    reactRender();

    $("a:not(.galleryHref)").each(function(i, e) {
        var hrefVal = $(e).attr("href");
        $(e).click(function() {
            window.open(hrefVal, '_system');
        });
    });
    $(".my-youtube").attr("height", "auto");

    var pageStyles = "";

    applicationData.Pages.forEach(function(element) {
        if (element.Id == index && element.Style != null && element.Style != "") {
            pageStyles = element.Style;
        }
    }, this);

    $("#container").attr("style", pageStyles);
    submitFormListener();
    initGallaryClick();
    bindChangeValForms();
    addListenerToClickBuy();
    addListenerToClickOpenSingleItem();
    addListenerToClickTimeLine();
    $(".cart-btn").on("click", function() {
        $("#container").addClass("hidden");
        $(".classMenu").addClass("hidden");
        $(".cart").removeClass("hidden");
        scrollTop();
    });

    changeRestaurant();
    changeMenu();
}

function scrollTop() {
    $("html, body").animate({ scrollTop: -$(document).height() }, "fast");
}