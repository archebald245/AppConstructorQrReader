'use strict';

var renderBooking = function renderBooking(thisInstitution, sortByService) {
    var Institution = React.createClass({
        displayName: cultureRes.displayInst,
        componentDidMount: function componentDidMount() {
            addListenerToClickBookService();
            $(".btn-bookThisService").on("click", function() {
                var itemId = $(this).parents(".row-elementInstitution").find(".serviceId").val();
                workToClickBook(itemId);
            });
            if (sortByService) {
                $(".fab").addClass("fab-moved");
            }

        },
        render: function render() {
            var data = this.props.data;
            var CollectionOfElementsInstitution;
            var ArrayOfObjectServices = [];
            if (sortByService != true) {
                CollectionOfElementsInstitution = data.BookResources.map(function(item) {
                    if (item.BookServiceProvides.length > 0) {
                        return React.createElement(TimeLine, { data: item });
                    }
                });
            } else {
                CollectionOfElementsInstitution = data.BookResources.map(function(resources) {
                    return React.createElement(CollectionService, { data: resources.BookServiceProvides, isconfirm: resources.NeedConfirmation });
                });
            }
            return React.createElement(
                'div',
                null,
                React.createElement(
                    'h1',
                    null, cultureRes.displayInstTwo,
                    data.Name
                ),
                CollectionOfElementsInstitution,
                React.createElement('input', { type: 'hidden', className: 'value-sortByService', value: sortByService }),
                React.createElement('input', { type: 'hidden', className: 'value-currentInstitution', value: data.Id }),
                React.createElement(
                    'button', { type: 'button', className: sortByService ? "btn-order-booking" : "hidden btn-order-booking" }, cultureRes.orderBook
                )
            );
        }
    });

    var TimeLine = React.createClass({
        displayName: cultureRes.timeLine,


        render: function render() {
            var data = this.props.data;

            var oTime = this.props.data.OpenTime.split("T")[1];
            oTime = oTime.substring(0, oTime.lastIndexOf(":"));

            var cTime = this.props.data.CloseTime.split("T")[1];
            cTime = cTime.substring(0, cTime.lastIndexOf(":"));

            var image;
            if (data.ImagePath != null) {
                image = React.createElement('img', { src: data.ImagePath });
            } else {
                image = null;
            }
            return React.createElement(
                'div', { className: 'row-elementInstitution row-elementTimeLine' },
                image,
                React.createElement(
                    'p', { className: 'name-elementInstitution' },
                    data.Name
                ),
                data.UseDayTime ? data.DayForBookResource.map(function(day) {
                    return React.createElement(
                        'div', { className: 'time-elementTimeLine' },
                        React.createElement(
                            'time',
                            null, cultureRes.openTime,
                            day.Day,
                            ' - ',
                            day.OpenTime.split("T")[1]
                        ),
                        React.createElement(
                            'time',
                            null, cultureRes.closeTime,
                            day.Day,
                            ' - ',
                            day.CloseTime.split("T")[1]
                        )
                    );
                }) : React.createElement(
                    'div', { className: 'time-elementTimeLine' },
                    React.createElement(
                        'time',
                        null, cultureRes.openTime,
                        oTime + " - " + cTime
                    )
                ),
                React.createElement(
                    'div', { className: 'sDay-elementTimeLine' }, cultureRes.startBookDay,
                    data.StartBookDay
                ),
                React.createElement(
                    'div', { className: 'cDay-elementTimeLine' }, cultureRes.countDay,
                    data.CountDaysForBook
                ),
                React.createElement('input', { type: 'hidden', className: 'timeLineId', value: data.Id })
            );
        }
    });

    var Service = React.createClass({
        displayName: cultureRes.service,
        render: function render() {
            var data = this.props.data;
            var isconfirm = this.props.isconfirm;
            var image;
            if (data.ImagePath != null) {
                image = React.createElement('img', { src: data.ImagePath });
            } else {
                image = null;
            }
            return React.createElement(
                'div', { className: 'row-elementInstitution' },

                React.createElement('div', { className: 'image-elementInstitution' }, image),
                React.createElement('div', { className: 'content-elementInstitution' },
                    React.createElement(
                        'div', { className: 'name-elementInstitution' },
                        cultureRes.displayName,
                        data.Name
                    ),
                    React.createElement(
                        'div', { className: 'dur-elementInstitution' },
                        cultureRes.durationTime,
                        data.Duration
                    ),
                    React.createElement(
                        'div', { className: 'desc-elementInstitution' },
                        cultureRes.description,
                        data.Description
                    ),
                    React.createElement(
                        'div', { className: 'price-elementInstitution' },
                        data.Price != null ? data.Price : "" + " " + data.Currency != null ? data.Price : ""
                    ),
                    React.createElement(
                        'button', { className: 'btn-bookThisService' },
                        cultureRes.book
                    )
                ),


                React.createElement('input', { type: 'hidden', className: 'serviceId', value: data.Id }),
                React.createElement('input', { type: 'hidden', className: 'serviceDuration', value: data.Duration }),
                React.createElement('input', { type: 'hidden', value: data.BookResourceId, className: 'thisTimeLineId' }),
                React.createElement('input', { type: 'hidden', value: isconfirm, className: 'thisTimeLineIsConfirm' }),
                React.createElement('input', { type: 'hidden', value: data.Name, className: 'servicesName' })
            );
        }
    });

    var CollectionService = React.createClass({
        displayName: 'CollectionService',

        render: function render() {
            var data = this.props.data;
            var isconfirm = this.props.isconfirm;
            var collectionServiceForRender = data.map(function(service) {
                return React.createElement(Service, { data: service, isconfirm: isconfirm });
            });
            return React.createElement(
                'div',
                null,
                collectionServiceForRender
            );
        }
    });

    ReactDOM.render(React.createElement(Institution, { data: thisInstitution }), document.getElementById("custom-container-booking"));
};