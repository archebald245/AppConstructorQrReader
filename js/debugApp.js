function deleteResourcesAll(){//Call in Init function
  $("#clearJsStorage").click(function(){
    deleteResourcesImg();
      $.jStorage.deleteKey("appData");
      checkJsStorage();
      $(".Scan-spiner").addClass("hidden");
  });
}
function startScan() {//Call in Init function

    cordova.plugins.barcodeScanner.scan(
        function (result) {
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
                      $(".startScan-wrapper").addClass("hidden");
                        data = JSON.stringify(jsonObjectOfServer.Content);
                          onCheckJson();
                          checkUpdateRestaurantMenu();
                          $("#clearJsStorage").removeClass("hidden");
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
  }else{
    checkConnection();
  }
}
function deleteResourcesImg(){
  $(resources).each(function(i, img){
    deleteImage(img);

  });
}
