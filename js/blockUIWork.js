function blockUi(){
     $.blockUI({ css: {
            border: 'none',
            backgroundColor: '#06C1A1',
            width: '100%',
            height: '100%',
            top: '0',
            left: '0'
        },
        message:   '<img class="splach-ready" src="screen/android/screen-ldpi-portrait.png" />'
       });
}

function unBlockUi(){
    createCustomHideForms();
    bindChangeValForms();
    addListenerToClickBuy();
    addListenerToClickOpenSingleItem();
    bindListenerToClickBtn();
    var pageStyles = applicationData.Pages[0].Style;
    if (pageStyles != undefined) {
        $("#container").attr("style", pageStyles);
    }
    changeRestaurant();
    changeMenu();
    $.unblockUI();

}
