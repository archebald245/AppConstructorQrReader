function deleteResourcesAll() { //Call in Init function
    $("#clearJsStorage").click(function() {
        deleteResourcesImg();

        var siteUrl = applicationData.UrlForUpdateApp;
        var ProjectId = applicationData.ProjectId;
        var deviceId = $.jStorage.get('ApplicationId');
        $.ajax({
            type: "POST",
            url: siteUrl + "/PushNotification/UnsubscribePushNotification",
            data: {
                projectId: ProjectId,
                deviceId: deviceId
            },
            cache: false,
            success: function() {},
            error: function() {}
        });

        $.jStorage.deleteKey("appData");
        checkJsStorage();
        $(".project-list-wrapper").removeClass("hidden");
        $(".Scan-spiner").addClass("hidden");
        $("#container").attr("style", "");
        $("#container, #custom-hide-container, .singleItem, #orderInfo, .cart, .container-statusBooking, .bookingServices-container, .container-selectFreeBookTime, .dateTimePicker-container, .order-booking").addClass("hidden");
    });
}

function startScan() { //Call in Init function

}

function startLogin() {
    event.preventDefault();
    var networkState = navigator.connection.type;
    if (networkState != Connection.NONE) {
        $(".login-wrapper").addClass('hidden');
        var form = $(".login-wrapper form#login-form");
        // var check = checkValidationAndRequired(form);
        // if (check) {
        $(".login-spiner").removeClass("hidden");
        var siteUrl = "http://appconstructornew.newlinetechnologies.net/";
        $.post('' + siteUrl + '/api/LoginViewTool', $(form).serialize(), function(data, statusText, xhr) {
            $(".login-spiner").addClass("hidden");

            if (data.IsLogin) {
                var login = $("#login-data").val();
                $(".viewtool-login span.login-data").html(login);
                $.jStorage.set('ViewToolLogin', login);
                $.jStorage.set('AuthToken', data.Token);
                $.jStorage.set('ProjectList', data.ProjectList);
                renderProjectList(data.ProjectList)
                $(".project-list-wrapper").removeClass('hidden');
            } else {
                alert(data.ErrorMessage);
                $("#password-data").val("");
                $(".login-wrapper").removeClass('hidden');
                return false;
            }
        });
        // }
    }
}

function checkJsStorage() { //Call in onDeviceReady function
    if ($.jStorage.get('appData') == null) {
        if ($.jStorage.get('ViewToolLogin') == null) {
            $(".login-wrapper").removeClass("hidden");
        } else {
            $(".viewtool-login span.login-data").html($.jStorage.get('ViewToolLogin'));
            renderProjectList($.jStorage.get('ProjectList'));
            $(".project-list-wrapper").removeClass("hidden");
        }
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

function ProjectListEventListener() {

    $(".take-application").unbind("click").on("click", function() {
        var projectId = $(this).parents(".project-list-item").find("[name='projectId']").val();
        var content = $(this).parents(".project-list-item").find("select option:selected").val();
        GetApplicationData(projectId, content);
    });
    $(".logout").unbind("click").on("click", function() {
        ViewToolLogout()
    });
    $(".viewtool-update").unbind("click").on("click", function() {
        UpdateProjectList();
    });
}

function GetApplicationData(project, content) {
    $(".spinner-container").removeClass("hidden");
    var siteUrl = "http://appconstructornew.newlinetechnologies.net/";
    var tokenToSend = $.jStorage.get('notificationToken');
    var deviceIdToSend = $.jStorage.get('ApplicationId');
    $.ajax({
        type: "POST",
        url: siteUrl + "/Constructor/GetContentById",
        data: {
            projectId: project,
            contentId: content,
            token: tokenToSend,
            deviceId: deviceIdToSend
        },
        cache: false,
        success: function(jsonObjectOfServer) {
            $(".spinner-container, .project-list-wrapper").addClass("hidden");
            jsonObjectOfServer = JSON.parse(jsonObjectOfServer);
            scrollTop();
            applicationData = JSON.stringify(jsonObjectOfServer.Content);
            // $.jStorage.set('ApplicationId', jsonObjectOfServer.ApplicationId);
            onCheckJson();
        },
        error: function() {
            $(".spinner-container").addClass("hidden");
        }
    });
}

function ViewToolLogout() {
    $.jStorage.set("ViewToolLogin", null);
    $.jStorage.set("AuthToken", null);
    $.jStorage.set("ProjectList", null);

    $("#login-data").val("");
    $("#password-data").val("");
    $("#project-list-wrapper").addClass("hidden");
    $(".login-wrapper").removeClass("hidden");
    $(".viewtool-login span.login-data").html('');
}

function UpdateProjectList() {
    $(".login-spiner").removeClass("hidden");
    var self = this;
    var authtoken = $.jStorage.get('AuthToken')
    var siteUrl = "http://appconstructornew.newlinetechnologies.net/";
    $.ajax({
        type: "POST",
        url: siteUrl + "/api/UpdateProjectList",
        headers: {
            "Authorization": "Bearer " + authtoken
        },
        cache: false,
        success: function(data, statusText, xhr) {
            $(".login-spiner").addClass("hidden");
            //Unauthorized
            if (xhr.status === 401) {
                if (authtoken != "") {
                    RefreshToken(self);
                }

                return false;
            }
            if (data.IsLogin) {
                $.jStorage.set('ProjectList', data.ProjectList);
                renderProjectList(data.ProjectList);
            } else {
                alert(data.ErrorMessage);
                return false;
            }
        },
        error: function(data, statusText, xhr) {
            $(".login-spiner").addClass("hidden");
        }
    });
}

function RefreshToken(callback) {
    var authtoken = $.jStorage.get('AuthToken');
    var siteUrl = "http://appconstructornew.newlinetechnologies.net/";
    $.ajax({
        type: "GET",
        url: siteUrl + "/api/RefreshToken",
        headers: {
            "Authorization": "Bearer " + authtoken
        },
        cache: false,
        success: function(data, statusText, xhr) {
            $(".login-spiner").addClass("hidden");
            //badrequest
            if (xhr.status === 200) {
                window.plugins.toast.showShortBottom(data);
                return false;
            }
            $.jStorage.set('AuthToken', data);
            callback();
        },
        error: function(data, statusText, xhr) {
            $(".login-spiner").addClass("hidden");
        }
    });
}