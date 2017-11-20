"use strict";

function renderCartItem(cartItem) {
    var cartShopItem = React.createClass({
        displayName: "cartShopItem",

        getInitialState: function getInitialState() {
            return { data: cartItem };
        },
        render: function render() {
            var data = this.state.data;
            var cartImg;
            var restId = $("[name=cartRestaurantId]").val();
            var curr;
            applicationData.Restaurants.forEach(function(element) {
                if (element.Id = restId) {
                    element.RestaurantMenus.forEach(function(el) {
                        if (el.Id == data.RestaurantMenuId) {
                            curr = el.Currency;
                        }
                    });
                }
            }, this);
            if (data.RestaurantMenuImages.length == 0) {
                cartImg = React.createElement('img', { src: 'baseimages/cartItem.png', className: 'restaurantMenuNoImages ' });
            } else {
                cartImg = React.createElement('img', { src: data.RestaurantMenuImages[0].Path });
            }

            return React.createElement(
                "div", { className: "cartItem" },
                React.createElement(
                    "div", { className: "cartItem-img" },
                    cartImg
                ),

                React.createElement("div", { className: "cartItem-main-container" },
                    React.createElement(
                        "div", { className: "cartItem-name" },
                        React.createElement(
                            "div", { className: "cartItem-name-title" },
                            data.ProdName
                        ),
                        React.createElement(
                            "div", { className: "cartItem-name-price" },
                            "Цена: " + data.Price + " " + curr
                        )
                    ),

                    React.createElement("div", { className: "cartItem-count-container" },
                        React.createElement("div", { className: "cartItem-count-total-price" }, data.Price + " " + curr),
                        React.createElement(
                            "div", { className: "cartItem-info" },
                            React.createElement(
                                "div", { className: "shopItemCount-decrease" },
                                "-"
                            ),
                            React.createElement(
                                "div", { className: "shopItem-count" },
                                "1"
                            ),
                            React.createElement(
                                "div", { className: "shopItemCount-increase" },
                                "+"
                            )
                        )
                    )
                ),

                React.createElement("div", { className: "delete-cartItem" }, ""),
                React.createElement("input", { type: "hidden", name: "shopItemId", value: data.Id }),
                React.createElement("input", { type: "hidden", name: "shopItemPrice", value: data.Price }),
                React.createElement("input", { type: "hidden", name: "shopItemCount", value: "1" })
            );

            return shopCartItem;
        }
    });
    ReactDOM.render(React.createElement(cartShopItem, { data: cartItem }), document.getElementById("shopItem"));
}