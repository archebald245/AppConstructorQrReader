'use strict';

function renderServiceOfThisInstitution(thisInstitution) {
    var Institution = React.createClass({
        displayName: cultureRes.inst,
        componentDidMount: function componentDidMount() {
            addListenerToClickBookService();
            $(".btn-bookThisService").on("click", function() {
                var itemId = $(this).parents(".row-elementInstitution.inst-profile").find(".serviceId").val();
                workToClickBook(itemId);
            });
        },
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
            var CollectionOfElementsInstitution = data.BookServiceProvides.map(function(service) {
                return React.createElement(Service, { data: service, isconfirm: data.NeedConfirmation });
            });
            return React.createElement(
                'div',
                null,
                React.createElement("div", { className: "resource-data" },
                    React.createElement("div", { className: "resource-name" }, data.Name),
                    React.createElement("div", { className: "resource-info" }, image,
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
                        )),
                    React.createElement("div", { className: "resource-desc" }, data.Description)
                ),
                CollectionOfElementsInstitution
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
                'div', { className: 'row-elementInstitution inst-profile' },
                React.createElement(
                    'div', { className: 'image-elementInstitution' },
                    image
                ),
                React.createElement(
                    'div', { className: 'content-elementInstitution' },
                    React.createElement(
                        'div', { className: 'name-elementInstitution' },
                        data.Name
                    ),
                    React.createElement(
                        'time', { className: 'dur-elementInstitution' },
                        cultureRes.durationTime,
                        data.Duration
                    ),
                    React.createElement(
                        'div', { className: 'desc-elementInstitution' },
                        data.Description
                    ),
                    React.createElement(
                        'div', { className: 'price-elementInstitution' },
                        data.Price + " " + data.Currency
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

    ReactDOM.render(React.createElement(Institution, { data: thisInstitution }), document.getElementById("bookingServices"));
}