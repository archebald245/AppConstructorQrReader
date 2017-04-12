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
      if (data.RestaurantMenuImages.length == 0) {
    cartImg = React.createElement('img', { src:'baseimages/cartItem.png',className: 'restaurantMenuNoImages ' });
  } else {
    cartImg = React.createElement('img', { src: data.RestaurantMenuImages[0].Path });
  }

      return React.createElement(
        "div",
        { className: "cartItem" },
        React.createElement(
          "div",
          { className: "cartItem-img" },
        cartImg
        ),
        React.createElement(
          "div",
          { className: "cartItem-name" },
          data.ProdName
        ),
        React.createElement(
          "ul",
          { className: "cartItem-info" },
          React.createElement(
            "li",
            { className: "shopItemCount-visible" },
            "1"
          ),
          React.createElement(
            "li",
            { className: "shopItem-price" },
            data.Price
          ),
          React.createElement(
            "li",
            { className: "delete-cartItem" },
            ""
          )
        ),
        React.createElement("input", { type: "hidden", name: "shopItemId", value: data.Id }),
        React.createElement("input", { type: "hidden", name: "shopItemCount", value: "1" })
      );

      return shopCartItem;
    }
  });
  ReactDOM.render(React.createElement(cartShopItem, { data: cartItem }), document.getElementById("shopItem"));
}


