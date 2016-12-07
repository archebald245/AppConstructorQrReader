function deleteResourcesAll(){//Call in Init function
  $("#clearJsStorage").click(function(){
    deleteResourcesImg();
      $.jStorage.deleteKey("appData");
      checkJsStorage();
      $(".Scan-spiner").addClass("hidden");
      $("#container, #custom-hide-container, .singleItem, #orderInfo, .cart").addClass("hidden");
  });
}
function startScan() {//Call in Init function

    cordova.plugins.barcodeScanner.scan(
        function (result) {
            var siteUrl =  "http://appconstructornew.newlinetechnologies.net";
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
                      $(".startScan-wrapper").addClass("hidden");
                        applicationData = JSON.stringify(jsonObjectOfServer.Content);
                        onCheckJson();
                        checkUpdateRestaurantMenu(true);
                        // $("#container").removeClass("hidden");
                      },
                      error: function(){
                        $(".startScan-wrapper").removeClass("hidden");
                      }
                  });
                }

        },
        function (error) {
            alert("Scanning failed: " + error);
            $(".startScan-wrapper").removeClass("hidden");
        }
    );

}
function checkJsStorage(){//Call in onDeviceReady function
  if($.jStorage.get('appData') == null){
    $(".startScan-wrapper").removeClass("hidden");
        $("#container, #custom-hide-container, .singleItem, #orderInfo, .cart").addClass("hidden");
  }else{
    checkConnection();
  }
}
function deleteResourcesImg(){
  deleteResources();
  $(resources).each(function(i, img){
    deleteImage(img);
  });
  $.jStorage.deleteKey('resources');
  $.jStorage.deleteKey('oldResources');
  resources = [];
  countFileDownload = 0;
  countFileDownloadFail = 0;

}
