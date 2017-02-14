"use strict";

function renderRestaurantMenu(menuCollection, position, responsiveModel, stateName, statePrice, stateDescription, stateButton, stateImage) {

    var RestaurantMenuBlock = React.createClass({
        displayName: "RestaurantMenuBlock",
        getInitialState: function getInitialState() {
            return { data: menuCollection };
        },
        componentDidMount: function componentDidMount() {
            if (stateName == false) {
                $("[value=restaurantMenuId_" + this.state.data.Id + "]").siblings(".shopItem-row").find(".item-shop-title").addClass("hidden");
            } else {
                $("[value=restaurantMenuId_" + this.state.data.Id + "]").siblings(".shopItem-row").find(".item-shop-title").removeClass("hidden");
            }
            if (statePrice == false) {
                $("[value=restaurantMenuId_" + this.state.data.Id + "]").siblings(".shopItem-row").find(".cartShop-price").addClass("hidden");
            } else {
                $("[value=restaurantMenuId_" + this.state.data.Id + "]").siblings(".shopItem-row").find(".cartShop-price").removeClass("hidden");
            }
            if (stateDescription == false) {
                $("[value=restaurantMenuId_" + this.state.data.Id + "]").siblings(".shopItem-row").find(".content-column-shopItem p").addClass("hidden");
            } else {
                $("[value=restaurantMenuId_" + this.state.data.Id + "]").siblings(".shopItem-row").find(".content-column-shopItem p").removeClass("hidden");
            }
            if (stateButton == false) {
                $("[value=restaurantMenuId_" + this.state.data.Id + "]").siblings(".shopItem-row").find(".btn-restaurant-menu").addClass("hidden");
            } else {
                $("[value=restaurantMenuId_" + this.state.data.Id + "]").siblings(".shopItem-row").find(".btn-restaurant-menu").removeClass("hidden");
            }
            if (stateImage == false) {
                $("[value=restaurantMenuId_" + this.state.data.Id + "]").siblings(".shopItem-row").find(".img-column-shopItem").addClass("hidden");
            } else {
                $("[value=restaurantMenuId_" + this.state.data.Id + "]").siblings(".shopItem-row").find(".img-column-shopItem").removeClass("hidden");
            }
            if (responsiveModel == true) {
                restarauntMenuModelItems();
            }
        },
        render: function render() {
            var RestaurantMenuItemModels = this.state.data.RestaurantMenuItems.map(function(item) {
                var image;
                if (item.RestaurantMenuImages.length == 0) {
                    //image = React.createElement('span', { className: 'restaurantMenuNoImages item-shop-img' });
                    image = React.createElement('img', { src: 'baseimages/cartItem.png', className: 'restaurantMenuNoImages item-shop-img' });
                } else {
                    image = React.createElement('img', { src: item.RestaurantMenuImages[0].Path });
                }

                if (position == 1) {

                    return React.createElement(
                        "div", { className: "shopItem-row shopItem" },
                        React.createElement(
                            "div", { className: "img-column-shopItem" },
                            image
                        ),
                        React.createElement(
                            "div", { className: "content-column-shopItem" },
                            React.createElement(
                                "h4", { className: "item-shop-title" },
                                item.ProdName
                            ),
                            React.createElement(
                                "p",
                                null,
                                item.Description
                            ),
                            " ",
                            React.createElement(
                                "button", { type: "button", className: "btn-restaurant-menu" },
                                "Add"
                            ),
                            React.createElement(
                                "div", { className: "cartShop-price" },
                                item.Price
                            ),
                            React.createElement(
                                "input", { type: "hidden", name: "shopItemId", value: item.Id }
                            )
                        ),
                        " "
                    );

                } else if (position == 2) {

                    return React.createElement(
                        "div", { className: "shopItem-row shopItem" },
                        React.createElement(
                            "div", { className: "img-column-shopItem" },
                            React.createElement("img", { src: iimage, className: "item-shop-img" }),
                            React.createElement(
                                "div", { className: "cartShop-price priceUnderImg" },
                                item.Price
                            )
                        ),
                        React.createElement(
                            "div", { className: "content-column-shopItem" },
                            React.createElement(
                                "h4", { className: "item-shop-title" },
                                item.ProdName
                            ),
                            React.createElement(
                                "p",
                                null,
                                item.ShortDescription
                            ),
                            React.createElement(
                                "button", { type: "button", className: "btn-restaurant-menu" },
                                "Add"
                            ),
                            React.createElement(
                                "input", { type: "hidden", name: "shopItemId", value: item.Id }
                            )
                        )
                    );
                } else if (position == 3) {
                    return React.createElement(
                        "div", { className: "shopItem-row shopItem" },
                        React.createElement(
                            "div", { className: "img-column-shopItem" },
                            React.createElement("img", { src: image, className: "item-shop-img" })
                        ),
                        React.createElement(
                            "div", { className: "content-column-shopItem shopMiddle-content" },
                            React.createElement(
                                "h4", { className: "item-shop-title" },
                                item.ProdName
                            ),
                            React.createElement(
                                "p",
                                null,
                                item.ShortDescription
                            )
                        ),
                        React.createElement(
                            "div", { className: "btn-shop-column" },
                            React.createElement(
                                "div", { className: "cartShop-price" },
                                item.Price
                            ),
                            React.createElement(
                                "button", { type: "button", className: "btn-restaurant-menu" },
                                "Add"
                            ),
                            React.createElement(
                                "input", { type: "hidden", name: "shopItemId", value: item.Id }
                            )

                        )
                    );
                }
            });

            return React.createElement(
                "div", { className: "custom-restaurant-menu-item" },
                React.createElement(
                    "label",
                    null,
                    " ",
                    this.state.data.Name,
                    " "
                ),
                React.createElement("input", { type: "hidden", name: "restaurantMenuId", value: this.state.data.Id }),
                React.createElement("input", { type: "hidden", name: "restaurantMenuPosition", value: position }),
                React.createElement("input", { type: "hidden", name: "responsiveModel", value: responsiveModel }),
                React.createElement("input", { type: "hidden", name: "stateName", value: stateName }),
                React.createElement("input", { type: "hidden", name: "statePrice", value: statePrice }),
                React.createElement("input", { type: "hidden", name: "stateDescription", value: stateDescription }),
                React.createElement("input", { type: "hidden", name: "stateButton", value: stateButton }),
                React.createElement("input", { type: "hidden", name: "stateImage", value: stateImage }),
                RestaurantMenuItemModels

            );
        }
    });

    ReactDOM.render(React.createElement(RestaurantMenuBlock, { data: menuCollection }), document.getElementById("custom-restaurant-menu-container"));
}