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
    // blockUi();
    document.addEventListener("deviceready", onDeviceReady, false);
    $(".classDropdownList").addClass("classHide");

    document.querySelector("#vt-login").addEventListener("touchend", startLogin, false);

    deleteResourcesAll();
}

function onDeviceReady() {

    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fileSystem) {
        window.myFileSystem = fileSystem;
        if (!window.Promise) {
            window.Promise = Promise;
        }

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
    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Notification Area Start
    var push = PushNotification.init({
        android: {
            //senderID: 418915081706
            sound: true,
            vibrate: true
        },
        browser: {
            pushServiceURL: 'http://push.api.phonegap.com/v1/push'
        },
        ios: {
            alert: "true",
            badge: "true",
            sound: "true"
        },
        windows: {}
    });

    push.on('registration', function(data) {
        $.jStorage.set('notificationToken', data.registrationId);
    });

    // PushNotification.hasPermission(function(data) {

    //     if (data.isEnabled) {
    //         alert("is enabled");
    //     } else {
    //         alert("is disabled");
    //     }
    // });

    push.on('notification', function(data) {
        // data.message,
        // data.title,
        // data.count,
        // data.sound,
        // data.image,
        // data.additionalData
        window.plugins.toast.hide();

        window.plugins.toast.showWithOptions({
            message: data.message,
            duration: 7500,
            position: "top",
            addPixelsY: 50
        });

    });

    push.on('error', function(e) {
        // e.message
        // alert("Error " + e.message);
    });
    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Notification Area End
    if (device.platform === 'iOS') {
        StatusBar.hide();
    }
    checkApplicationId();

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
    tag.src = "js/iframe/iframe_api.js";
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
}

function onCheckJson() {
    if ($.jStorage.get('appData') != null) {

        applicationData = JSON.parse($.jStorage.get('appData'));
        var projectId = applicationData.ProjectId;
        var versionId = applicationData.Version;
        // createMenu();
        $(".my-youtube").attr("height", "auto");
        var pageStyles;
        // var pageWithGeneralBg = applicationData.Pages.filter(function(page) { return page.BackgroundForApplication });
        // if (pageWithGeneralBg.length > 0) {
        //     pageStyles = pageWithGeneralBg[0].Style;
        // }
        // if (applicationData.IsTrackingLastPage) {
        //     var idLastPage = getLastOpenPage();
        //     var lastPage = applicationData.Pages.filter(function(p) { return p.Id == idLastPage })[0]
        //     if (lastPage.BackgroundImagePath != null) {
        //         pageStyles = lastPage.Style;
        //     }
        // } else {
        //     var StartPage = applicationData.Pages.filter(function(p) { return p.IsStartPage })[0];
        //     if (StartPage.BackgroundImagePath != null) {
        //         pageStyles = StartPage.Style;
        //     }
        // }
        applicationData.Pages.forEach(function(element) {
            if (element.Id == indexPage) {
                pageStyles = element.Style;
            }
        }, this);

        var pageWithGeneralBg = applicationData.Pages.filter(function(page) { return page.BackgroundForApplication });
        if (pageWithGeneralBg.length > 0) {
            pageStyles = pageWithGeneralBg[0].Style;
        }
        $("#container").attr("style", pageStyles).removeClass("hidden");
        $(".login-wrapper").addClass("hidden");
    } else {

        applicationData = replaceData(applicationData);
        applicationData = JSON.parse(applicationData);

        checkUpdateRestaurantMenu(true);

        resources = searchResourcesAndReplacePatch(applicationData);
        downloadResources();
        initMenuYoutunbe();
        if (resources.length == 0) {
            var jsonString = JSON.stringify(applicationData);
            $.jStorage.set('appData', jsonString);
            // createMenu();
            $(".my-youtube").attr("height", "auto");
        }
    }
    var networkState = navigator.connection.type;
    if (networkState == Connection.NONE) {
        createMenu();
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
        var siteUrl = "http://appconstructor.tech";

        applicationData = JSON.parse($.jStorage.get('appData'));
        var projectId = applicationData.ProjectId;
        var versionId = applicationData.Id;
        var tokenToSend = $.jStorage.get('notificationToken');
        var deviceIdToSend = $.jStorage.get('ApplicationId');

        if (applicationData.UrlForUpdateApp != "" && applicationData.UrlForUpdateApp != null && typeof applicationData.UrlForUpdateApp != 'undefined') {
            siteUrl = applicationData.UrlForUpdateApp;
        }

        $.ajax({
            type: "POST",
            url: siteUrl + "/Constructor/GetContentById",
            data: {
                projectId: projectId,
                contentId: versionId,
                token: tokenToSend,
                deviceId: deviceIdToSend
            },
            cache: false,
            success: function(jsonObjectOfServer) {
                jsonObjectOfServer = JSON.parse(jsonObjectOfServer);
                $.jStorage.deleteKey('appData');
                $("#container").removeClass("hidden");
                scrollTop();
                applicationData = JSON.stringify(jsonObjectOfServer.Content);
                //checkUpdateRestaurantMenu(true); 
                onCheckJson();
            }
        });

    } else {
        onCheckJson();
    }
}

function initMenuYoutunbe() {
    if (resources.length == 0) {
        createMenu();
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
    createMenu();
    reactRender();
    initGallaryClick();
    submitFormListener();
    unBlockUi();
    $(".login-wrapper").addClass("hidden");
    $("#container").removeClass("hidden");
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

function checkApplicationId() {
    var siteUrl = "http://appconstructor.tech/";

    if (applicationData != null) {
        if (applicationData.UrlForUpdateApp != "" && applicationData.UrlForUpdateApp != null && typeof applicationData.UrlForUpdateApp != 'undefined') {
            siteUrl = applicationData.UrlForUpdateApp;
        }
    }
    if ($.jStorage.get('ApplicationId') == null) {
        $.ajax({
            type: "POST",
            url: siteUrl + "/UploadFiles/GetApplicationIdForMobileApp",
            cache: false,
            success: function(applicationId) {
                $.jStorage.set('ApplicationId', applicationId)
            }
        });
    }
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