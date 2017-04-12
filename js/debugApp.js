function deleteResourcesAll() { //Call in Init function
    $("#clearJsStorage").click(function() {
        deleteResourcesImg();
        $.jStorage.deleteKey("appData");
        $.jStorage.deleteKey('ApplicationId');
        checkJsStorage();
        $(".Scan-spiner").addClass("hidden");
        $("#container").attr("style", "");
        $("#container, #custom-hide-container, .singleItem, #orderInfo, .cart, .container-statusBooking, .bookingServices-container, .container-selectFreeBookTime, .dateTimePicker-container, .order-booking").addClass("hidden");
    });
}

function startScan() { //Call in Init function

    cordova.plugins.barcodeScanner.scan(
        function(result) {
            var siteUrl = "http://appconstructor.newline.tech";
            if (!result.cancelled) {
                $(".Scan-spiner").removeClass("hidden");
                var ProjectId = result.text.split("-")[0];
                var VersionName = result.text.split("-")[1];
                $.ajax({
                    type: "POST",
                    url: siteUrl + "/Constructor/GetContentById",
                    data: { projectId: ProjectId, contentId: VersionName },
                    cache: false,
                    success: function(jsonObjectOfServer) {
                        jsonObjectOfServer = JSON.parse(jsonObjectOfServer);
                        scrollTop();
                        applicationData = JSON.stringify(jsonObjectOfServer.Content);
                        $.jStorage.set('ApplicationId', jsonObjectOfServer.ApplicationId);
                        onCheckJson();

                        // checkUpdateRestaurantMenu(true);
                    },
                    error: function() {
                        $(".startScan-wrapper").removeClass("hidden");
                    }
                });
            }

        },
        function(error) {
            alert("Scanning failed: " + error);
            $(".startScan-wrapper").removeClass("hidden");
        }
    );

}

function checkJsStorage() { //Call in onDeviceReady function
    if ($.jStorage.get('appData') == null) {
        $(".startScan-wrapper").removeClass("hidden");
        $("#container, #custom-hide-container, .singleItem, #orderInfo, .cart, .container-statusBooking, .bookingServices-container, .container-selectFreeBookTime, .dateTimePicker-container, .order-booking").addClass("hidden");
    } else {
        checkConnection();
    }
}

function deleteResourcesImg() {
    deleteResources();
    $(resources).each(function(i, img) {
        deleteImage(img);
    });
    $.jStorage.deleteKey('resources');
    $.jStorage.deleteKey('oldResources');
    resources = [];
    countFileDownload = 0;
    countFileDownloadFail = 0;

}