'use strict';
//RENDER EVENT LIST
var renderEvent = function renderEvent(event) {
    var isRenderFavorite = false;
    var networkState = navigator.connection.type;
    if (networkState != Connection.NONE && $.jStorage.get('isLogin') != null) {
        isRenderFavorite = true;
    }

    var SingleEvent = React.createClass({
        render: function render() {
            var data = this.props.data;
            // var day = this.props.day;
            var startTime = moment(data.DateStart, 'YYYY/MM/DD hh:mm').format('hh:mm A');
            var image;
            var favorite = null;
            var isFavorite = -1;

            var img1 = new Image();
            img1.src = data.ImagePath;

            if (this.props.isRenderFavorite) {

                if ($.jStorage.get('FavoriteEvents') != null) {
                    isFavorite = $.jStorage.get('FavoriteEvents').indexOf(data.Id);
                }
                favorite = React.createElement(
                    'div', { className: isFavorite > -1 ? 'event-favorite event-favorite-active' : 'event-favorite' },
                    ""
                )
            }

            var imageTest;
            if (data.ImagePath != null) {

                var img1 = new Image();
                img1.src = data.ImagePath;

                imageTest = React.createElement('div', null,
                    React.createElement('img', { src: data.ImagePath }));
            } else {
                imageTest = null;
            }
            var image = React.createElement('div', { className: 'event-image-container' }, imageTest);

            return React.createElement(
                'div', { className: "event-data-container" },
                image,
                React.createElement(
                    'div', { className: 'event-data ' + data.FloorPlanUrl },
                    React.createElement(
                        'div', { className: 'event-name' },
                        data.Name
                    ),
                    React.createElement(
                        'div', { className: 'event-start-time' },
                        startTime
                    )
                ),
                favorite,
                React.createElement('input', { type: 'hidden', className: 'eventId', value: data.Id })
            );

        }
    });

    var DaySeparator = React.createClass({
        render: function render() {
            var day = this.props.data;
            return React.createElement('div', { className: 'event-day-container' }, day);
        }
    });

    var MainEvent = React.createClass({
        componentDidMount: function componentDidMount() {
            addListenerToClickEvent();
        },
        render: function render() {
            var data = this.props.data;
            var dayOfWeek = "";
            var eventCollectionForRender = [];
            for (var i = 0; i < data.Events.length; i++) {

                var event = React.createElement(SingleEvent, { data: data.Events[i], isRenderFavorite: this.props.isRenderFavorite });
                var eventDay = moment(data.Events[i].DateStart, 'YYYY/MM/DD hh:mm').format('dddd');

                if (dayOfWeek == "") {
                    var day = React.createElement('div', { className: 'event-day-container' }, eventDay);
                    eventCollectionForRender.push(day);
                    dayOfWeek = eventDay;
                }
                if (dayOfWeek != eventDay) {
                    var day = React.createElement('div', { className: 'event-day-container' }, eventDay);
                    eventCollectionForRender.push(day);
                    dayOfWeek = eventDay;
                }
                eventCollectionForRender.push(event);
            }

            return React.createElement('div', { className: 'main-event-container' },
                React.createElement(
                    'div', { className: "main-event-data" },
                    React.createElement(
                        'div', { className: "main-event-name" },
                        data.Name
                    ),
                    React.createElement(
                        'div', { className: "main-event-location" },
                        data.Location
                    ),
                    React.createElement(
                        'div', { className: "main-event-description" },
                        data.Description
                    )
                ),
                React.createElement(
                    'div', { className: "custom-container-event" },
                    eventCollectionForRender
                )
            );
        }
    });

    ReactDOM.render(React.createElement(MainEvent, { data: event, isRenderFavorite: isRenderFavorite }), document.getElementById("event-container"));
};

//RENDER EVENT PROFILE
var RenderEventProfile = function RenderEventProfile(event) {
    var isRenderFavorite = false;
    var networkState = navigator.connection.type;
    if (networkState != Connection.NONE && $.jStorage.get('isLogin') != null) {
        isRenderFavorite = true;
    }
    var Event = React.createClass({
        componentDidMount: function componentDidMount() {
            $(".event-favorite").unbind("click").on("click", function() {
                var id = $(this).parent().siblings(".eventId").val();
                UpdateFavorite(this, id);
            });
            $(".back-to-event-list").on("click", function() {
                $("#container").removeClass("hidden");
                $(".event-profile, .event-favorite-wrapper").addClass("hidden");
                window.scrollTo(0, scrollData);
            });
        },
        render: function render() {
            var data = this.props.data;

            var startTime = moment(data.DateStart, 'YYYY/MM/DD hh:mm').format('hh:mm A');
            var finishTime = moment(data.DateFinish, 'YYYY/MM/DD hh:mm').format('hh:mm A');

            var startDate = moment(data.DateStart, 'YYYY/MM/DD hh:mm').format('DD.MM.');
            var finishDate = moment(data.DateFinish, 'YYYY/MM/DD hh:mm').format('DD.MM.');

            var date = startDate === finishDate ? startDate : startDate + ' - ' + finishDate;

            var favorite = null;
            if (this.props.isRenderFavorite) {
                var isFavorite = -1;
                if ($.jStorage.get('FavoriteEvents') != null) {
                    isFavorite = $.jStorage.get('FavoriteEvents').indexOf(data.Id);
                }
                favorite = React.createElement(
                    'div', { className: isFavorite > -1 ? 'event-favorite event-favorite-active' : 'event-favorite' },
                    ""
                )
            }

            var image;
            if (data.ImagePath != null) {
                image = React.createElement('div', null,
                    React.createElement('img', { src: data.ImagePath }));
            } else {
                image = null;
            }

            var locationData;
            if (data.MapData != null) {
                locationData = React.createElement(
                    'div', { className: 'event-location' },
                    data.MapData
                );
            } else {
                locationData = null;
            }

            return React.createElement(
                'div', { className: "event-profile-container" },
                // React.createElement(
                //     'div', { className: 'back-to-event-list' },
                //     React.createElement('img', { src: "baseimages/backtoevents.png" })
                // ),
                React.createElement(
                    'div', { className: 'event-profile-header' },

                    React.createElement(
                        'span', { className: 'event-profile-name' },
                        data.Name
                    ), React.createElement(
                        'div', { className: 'back-to-event-list' }, null
                    )
                ),
                React.createElement(
                    'div', { className: 'event-image-profile' },
                    image,
                    favorite
                ),
                React.createElement(
                    'div', { className: 'event-time-container' },
                    React.createElement(
                        'div', { className: 'event-start-time' },
                        startTime + " - " + finishTime
                    ),
                    React.createElement(
                        'div', { className: 'event-start-date' },
                        date
                    ),
                    locationData
                ),
                React.createElement(
                    'div', { className: 'event-description' },
                    data.Description
                ),
                React.createElement('input', { type: 'hidden', className: 'eventId', value: data.Id })
            );
        }
    });
    ReactDOM.render(React.createElement(Event, { data: event, isRenderFavorite: isRenderFavorite }), document.getElementById("custom-hide-container"));
};

//RENDER FAVORITE EVENT
var renderFavorite = function renderFavorite() {
    var eventIds = $.jStorage.get('FavoriteEvents');
    var events = [];
    applicationData.MainEvents.forEach(function(mainEvent) {
        mainEvent.Events.forEach(function(event) {
            if (eventIds.indexOf(event.Id) > -1) {
                events.push(event);
            }
        });
    });

    var isRenderFavorite = false;
    var networkState = navigator.connection.type;
    if (networkState != Connection.NONE && $.jStorage.get('isLogin') != null) {
        isRenderFavorite = true;
    }
    var SingleEvent = React.createClass({
        componentDidMount: function componentDidMount() {
            addListenerToClickEvent();
        },
        render: function render() {
            var data = this.props.data;
            var startTime = moment(data.DateStart, 'YYYY/MM/DD hh:mm').format('hh:mm A');
            var image;
            var favorite = null;
            var isFavorite = -1;
            if (isRenderFavorite) {
                if ($.jStorage.get('FavoriteEvents') != null) {
                    isFavorite = $.jStorage.get('FavoriteEvents').indexOf(data.Id);
                }
                favorite = React.createElement(
                    'div', { className: isFavorite > -1 ? 'event-favorite event-favorite-active' : 'event-favorite' },
                    ""
                )
            }
            var imageTest;
            if (data.ImagePath != null) {

                var img1 = new Image();
                img1.src = data.ImagePath;

                imageTest = React.createElement('div', null,
                    React.createElement('img', { src: data.ImagePath }));
            } else {
                imageTest = null;
            }

            var image = React.createElement('div', { className: 'event-image-container' }, imageTest);
            return React.createElement(
                'div', { className: "event-data-container" },
                image,
                React.createElement(
                    'div', { className: 'event-data ' + data.FloorPlanUrl },
                    React.createElement(
                        'div', { className: 'event-name' },
                        data.Name
                    ),
                    React.createElement(
                        'div', { className: 'event-start-time' },
                        startTime
                    )
                ),
                favorite,
                React.createElement('input', { type: 'hidden', className: 'eventId', value: data.Id })
            );
        }
    });

    var Events = React.createClass({
        componentDidMount: function componentDidMount() {
            $(".back-to-event-list").on("click", function() {
                $("#container").removeClass("hidden");
                $(".event-profile, .event-favorite-wrapper").addClass("hidden");
                window.scrollTo(0, scrollData);
            });
        },

        render: function render() {

            var data = this.props.data;
            var dayOfWeek = "";
            var eventCollectionForRender = [];
            for (var i = 0; i < data.length; i++) {

                var event = React.createElement(SingleEvent, { data: data[i] });
                var eventDay = moment(data[i].DateStart, 'YYYY/MM/DD hh:mm').format('dddd');

                if (dayOfWeek == "") {
                    var day = React.createElement('div', { className: 'event-day-container' }, eventDay);
                    eventCollectionForRender.push(day);
                    dayOfWeek = eventDay;
                }
                if (dayOfWeek != eventDay) {
                    var day = React.createElement('div', { className: 'event-day-container' }, eventDay);
                    eventCollectionForRender.push(day);
                    dayOfWeek = eventDay;
                }
                eventCollectionForRender.push(event);
            }
            return React.createElement(
                'div', { className: "custom-container-event" },
                React.createElement(
                    'div', { className: 'event-list-header' },
                    React.createElement(
                        'span', { className: 'event-favorite-label' },
                        cultureRes.favoriteEvents
                    ), React.createElement(
                        'div', { className: 'back-to-event-list' }, null
                    )
                ),
                eventCollectionForRender
            );
        }
    });

    ReactDOM.render(React.createElement(Events, { data: events }), document.getElementById("event-favorite-wrapper"));
};