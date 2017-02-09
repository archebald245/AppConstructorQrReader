function blockUi(){
     $.blockUI({ css: {
         border: 'none',
         padding: '15px',
         backgroundColor: '#000',
         '-webkit-border-radius': '10px',
         '-moz-border-radius': '10px',
         opacity: .5,
         color: '#fff'
    } });

}

function unBlockUi(){
    createCustomHideForms();
    bindChangeValForms();
    addListenerToClickBuy();
    addListenerToClickOpenSingleItem();
    bindListenerToClickBtn();
    addListenerToClickTimeLine();
    var pageStyles = applicationData.Pages[0].Style;
    if (pageStyles != undefined) {
        $("#container").attr("style", pageStyles);
    }
    changeRestaurant();
    changeMenu();
    $.unblockUI();

}
