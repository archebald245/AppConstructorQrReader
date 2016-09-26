"use strict";
function renderSingleShopItem(singleItem) {
    var singleShopItem = React.createClass({
        displayName: "singleShopItem",

        getInitialState: function getInitialState() {
            return { data: singleItem };
        },
        componentDidMount: function componentDidMount() {
            var swiper = new Swiper('.swiper-container', {
                loop: true,
            });
            cartShopPrice();
            $(".singleShop-btn").on("click", function() {
                var itemId = $("[name=singleItemId]").val();
                workToClickBuy(itemId);
            });
        },
        render: function render() {
            var data = this.state.data;
            var sliderItem = data.RestaurantMenuImages.map(function(item) {
                return React.createElement(
                    "div",
                    { className: "swiper-slide" },
                    React.createElement("img", { src: item.Path })
                );
            });
            return React.createElement(
                "div",
                { className: "singleShop-item" },
                React.createElement(
                    "div",
                    { className: "singleShop-wrapper" },
                    React.createElement(
                        "h4",
                        null,
                        data.ProdName
                    ),
                    React.createElement(
                        "div",
                        { className: "swiper-container" },
                        React.createElement(
                            "div",
                            { className: "swiper-wrapper" },
                            sliderItem
                        )
                    ),
                    React.createElement(
                        "p",
                        { className: "singleShop-category" },
                        data.Category
                    ),
                    React.createElement(
                        "p",
                        { className: "singleShop-price" },
                        React.createElement(
                            "span",
                            { className: "img-dollar-singleItem" },
                            null
                        ),
                        data.Price
                    ),
                    React.createElement(
                        "div",
                        { className: "singleShop-description" },
                        React.createElement(
                            "h5",
                            null,
                            "Description:"
                        ),
                        React.createElement(
                            "p",
                            null,
                            data.Description
                        ),
                        React.createElement(
                            'input',
                            { type: 'hidden', name: "singleItemId", value: data.Id }
                        )
                    )
                ),
                React.createElement(
                    "button",
                    { className: "singleShop-btn" },
                    "+ Add to Cart"
                )
            );
        }
    });
    ReactDOM.render(React.createElement(singleShopItem, { data: singleItem }), document.getElementById("singleItem"));
}


// function renderSingleShopItem(singleItem){
//   var singleShopItem = React.createClass({
//     getInitialState: function () {
//       return { data: singleItem };
//     },
//     componentDidMount: function(){
// var swiper = new Swiper('.swiper-container',{
//   loop: true,
// });
//       cartShopPrice();
//     },
//     render: function() {
//       var data = this.state.data;
//       var sliderItem = data.RestaurantMenuImages.map(function(item){
//         return(
//         <div className="swiper-slide"><img src={item.Path} /></div>
//             );
//       });
//       return(
//
// <div className="singleShop-item">
//     <div className="singleShop-wrapper">
//         <h4>{data.ProdName}</h4>
//         <div className="swiper-container">
//           <div className="swiper-wrapper">
//             {sliderItem}
//           </div>
//         </div>
//         <p className="singleShop-category">{data.Category}</p>
//         <p className="singleShop-price">{data.Price}</p>
//         <div className="singleShop-description"><h5>Description:</h5><p>{data.Description}</p></div>
// </div>
// <button className="singleShop-btn">+ Add to Cart</button>
// </div>
//       );
//     }
// });
// ReactDOM.render(<singleShopItem data={singleItem} />,document.getElementById("singleItem"));
// }
