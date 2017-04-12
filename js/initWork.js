var url;
var store;
var fileNameImage;
var indexPage = 0;
var applicationData;
var countFileDownload = 0;
var countFileDownloadFail = 0;
var swipeMenuInGallary = false;
var jsonStringify;

initYoutube();

function init() {
    blockUi();
    document.addEventListener("deviceready", onDeviceReady, false);
    $(".classDropdownList").addClass("classHide");

document.querySelector("#startScan").addEventListener("touchend", startScan, false);

    
    deleteResourcesAll();
}

function onDeviceReady() {

    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fileSystem) {
        window.myFileSystem = fileSystem;
        fileSystem.root.getDirectory("Phonegap", { create: true, exclusive: false }, onGetDirectorySuccess, onGetDirectoryFail);
        checkJsStorage();
        store = fileSystem.root.nativeURL + "Phonegap/";
    });
    appStart();
    $("#dateTimePicker-date").dateDropper({
        dropBorder: "1px solid #939393",
        dropPrimaryColor: "#939393",
        dropWidth: "250",
        format: "m/d/Y l"
    });
    $("#dateTimePicker-time").timeDropper({
        primaryColor: "#939393",
        borderColor: "#939393",
        format: "HH:mm",
        setCurrentTime: "false"
    });
    StatusBar.hide();
    // navigator.splashscreen.show();
    $('[data-toggle="tooltip"]').tooltip();
    if ('ontouchstart' in document.documentElement) { 
         $('body').css('cursor', 'pointer');
    }
}

function onGetDirectorySuccess(dir) {
    console.log("Created dir " + dir.name);
}

function onGetDirectoryFail(error) {
    console.log("Error creating directory " + error.code);
}

function appStart() {
    console.log("add" + store)
    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fileSystem) {});
}

function initYoutube() {
    var tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
}

function onCheckJson() {
    if ($.jStorage.get('appData') != null) {

        applicationData = JSON.parse($.jStorage.get('appData'));
        var projectId = applicationData.ProjectId;
        var versionId = applicationData.Version;
        createMenu(applicationData);
        $(".my-youtube").attr("height", "auto");
        var pageStyles;
        var pageWithGeneralBg = applicationData.Pages.filter(function(page) { return page.BackgroundForApplication });
        if (pageWithGeneralBg.length > 0) {
            pageStyles = pageWithGeneralBg[0].Style;
        }
        if(applicationData.IsTrackingLastPage){
            var idLastPage = getLastOpenPage();
            var lastPage = applicationData.Pages.filter(function(p){return p.Id == idLastPage})[0]
            if (lastPage.BackgroundImagePath != null) {
                pageStyles = lastPage.Style;
            }
        }else{
            var StartPage = applicationData.Pages.filter(function(p){return p.IsStartPage})[0];
            if (StartPage.BackgroundImagePath != null) {
                pageStyles = StartPage.Style;
            }
        }
   
        $("#container").attr("style", pageStyles);
    } else {

        applicationData = replaceData(applicationData);
        applicationData = JSON.parse(applicationData);

        resources = searchResourcesAndReplacePatch(applicationData);
        downloadResources();
        initMenuYoutunbe();
        if (resources.length == 0) {
            var jsonString = JSON.stringify(applicationData);
            $.jStorage.set('appData', jsonString);
            createMenu(applicationData);
            $(".my-youtube").attr("height", "auto");
        }
    }
    var networkState = navigator.connection.type;
    if (networkState == Connection.NONE) {
        reactRender();
        initGallaryClick();
        submitFormListener();
        unBlockUi()
    }
    $("#clearJsStorage").removeClass("hidden");
}

function checkConnection() {
    var networkState = navigator.connection.type;
    if (networkState != Connection.NONE) {
        var siteUrl = "http://appconstructor.newline.tech"

        applicationData = JSON.parse($.jStorage.get('appData'));
        var projectId = applicationData.ProjectId;
        var versionId = applicationData.Id;

        if (applicationData.UrlForUpdateApp != "" && applicationData.UrlForUpdateApp != null && typeof applicationData.UrlForUpdateApp != 'undefined') {
            siteUrl = applicationData.UrlForUpdateApp;
        }

        $.ajax({
            type: "POST",
            url: siteUrl + "/Constructor/GetContentById",
            data: { projectId: projectId, contentId: versionId },
            cache: false,
            success: function(jsonObjectOfServer) {
                jsonObjectOfServer = JSON.parse(jsonObjectOfServer);
                $.jStorage.deleteKey('appData');
                $("#container").removeClass("hidden");
                scrollTop();
                applicationData = JSON.stringify(jsonObjectOfServer.Content);
                checkUpdateRestaurantMenu(true);
                onCheckJson();
            }
        });

    } else {
        onCheckJson();
    }
}

function initMenuYoutunbe() {
    createMenu();
    if (resources.length == 0) {
        reactRender();
        submitFormListener();
        unBlockUi()
    }
    $(".my-youtube").attr("height", "auto");
}

function callback() {
    applicationData = JSON.parse($.jStorage.get('replaceImagePachJson'));
    var jsonString = JSON.stringify(applicationData);
    $.jStorage.set('appData', jsonString);
    deleteResources();
    reactRender();
    initGallaryClick();
    submitFormListener();
    unBlockUi();
}

function replaceData(element) {
    element = element.replace(/&lt;/g, '<');
    element = element.replace(/&gt;/g, '>');
    element = element.replace(/\n/g, '');
    element = element.replace(/\t/g, '');
    element = element.replace(/\b/g, '');
    element = element.replace(/\r/g, '');
    element = element.replace(/\v/g, '');
    element = element.replace(/\f/g, '');
    return element;
}

function initGallaryClick() {
    $(".gallery-icon").unbind("click");
    $(".gallery-icon").on("click", function() {
        $(this).parent().siblings().find("a")[0].click();
    });
}


function doOnOrientationChange() {
    switch (window.orientation) {
        case -90:
        case 90:
            if (applicationData.Restaurants.length > 0) {
                restarauntMenuModelItems();
            }
            break;
        default:
            if (applicationData.Restaurants.length > 0) {
                restarauntMenuModelItems();
            }
            break;
    }
}

window.addEventListener('orientationchange', doOnOrientationChange);