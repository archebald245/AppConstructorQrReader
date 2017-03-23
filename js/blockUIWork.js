function blockUi() {
    $.blockUI({
        css: {
            border: 'none',
            padding: '15px',
            backgroundColor: '#000',
            '-webkit-border-radius': '10px',
            '-moz-border-radius': '10px',
            opacity: .5,
            color: '#fff'
        }
    });
}

function unBlockUi() {
    createCustomHideForms();
    bindChangeValForms();
    addListenerToClickBuy();
    addListenerToClickOpenSingleItem();
    bindListenerToClickBtn();
    addListenerToClickTimeLine();
    var pageStyles;
    var pageWithGeneralBg = applicationData.Pages.filter(function(page) { return page.BackgroundForApplication });
    if (pageWithGeneralBg.length > 0) {
        pageStyles = pageWithGeneralBg[0].Style;
    }
    var StartPage = applicationData.Pages.filter(function(p){return p.IsStartPage})[0];
    if (StartPage.BackgroundImagePath != null) {
        pageStyles = StartPage.Style;
    }
    $("#container").attr("style", pageStyles);
    changeRestaurant();
    changeMenu();
    $.unblockUI();
}