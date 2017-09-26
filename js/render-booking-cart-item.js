"use strict";

function renderBookingCartItem(cartItem) {
    var bookCartShopItem = React.createClass({
        displayName: "cartShopItem",

        getInitialState: function getInitialState() {
            return { data: cartItem };
        },
        componentDidMount: function componentDidMount() {
            addListenerToClickBookService();
        },
        render: function render() {
            var data = this.state.data;
            return React.createElement(
                "div", { className: "bookingCartItem" },
                React.createElement(
                    "div", { className: "bookingCartItem-data" },
                    React.createElement(
                        "div", { className: "bookingCartItem-name" },
                        cultureRes.resource + " - " + data.Name
                    ),
                    React.createElement(
                        "div", { className: "bookingCartItem-name" },
                        cultureRes.service + " - " + data.selectedService
                    ),
                    React.createElement(
                        "div", { className: "bookingCartItem-duration" },
                        cultureRes.durationTime, data.Duration
                    ),
                    React.createElement(
                        "div", { className: "bookingCartItem-Currency" },
                        data.Price != null ? data.Price : "", " ", data.Currency != null ? data.Currency : ""
                    )
                ),
                React.createElement(
                    "div", { className: "cartItem-delete" }
                ),
                React.createElement('input', { type: 'hidden', className: 'cart-service-itemId', value: data.Id })
            );
        }
    });
    ReactDOM.render(React.createElement(bookCartShopItem, { data: cartItem }), document.getElementById("bookShopItem"));
}

function renderBookingStatusList(listItem) {
    var bookStatusList = React.createClass({
        displayName: "statuslist",
        componentDidMount: function componentDidMount() {
            $("#bookStatusList").attr("id", "");
        },
        getInitialState: function getInitialState() {
            return { data: listItem };
        },
        render: function render() {
            var data = this.state.data;
            var date = data.serviceObject.StringFromTime.split(" ");
            return React.createElement(
                "div", { className: "status-list-container" },
                React.createElement(
                    "div", { className: "status-list-date" },
                    React.createElement(
                        "div", { className: "status-list-date-time" },
                        React.createElement("span", { className: "status-list-data" }, date[1])
                    ),
                    React.createElement(
                        "div", { className: "status-list-date-day" },
                        React.createElement("span", { className: "status-list-data" }, date[0])
                    )
                ),
                React.createElement(
                    "div", { className: "status-list-info" },
                    React.createElement(
                        "p", null, cultureRes.resource + " - ",
                        React.createElement("span", { className: "status-list-data" }, data.resourceName)
                    ),
                    React.createElement(
                        "p", null, cultureRes.service + " - ",
                        React.createElement("span", { className: "status-list-data" }, data.nemesService)
                    ),
                    React.createElement(
                        "p", null, cultureRes.durationTime, React.createElement("span", { className: "status-list-data" }, data.serviceObject.Duration)
                    )
                ),
                React.createElement(
                    "div", { className: "status-list-status" },
                    React.createElement(
                        "div", null, "Статус: ", React.createElement("span", { className: "status-list-data" }, data.status)
                    )
                )
            )
        }
    });
    ReactDOM.render(React.createElement(bookStatusList, { data: listItem }), document.getElementById("bookStatusList"));
}