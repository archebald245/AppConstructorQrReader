"use strict";

function renderProjectList(projectList) {
    var userProjectList = React.createClass({
        displayName: "loginUserProjectList",

        getInitialState: function getInitialState() {
            return { data: projectList };
        },
        render: function render() {
            var data = this.state.data;
            var projectListModel = this.state.data.map(function(item) {
                var image;
                if (item.ImagePath.length == 0) {
                    //image = React.createElement('span', { className: 'restaurantMenuNoImages item-shop-img' });
                    image = React.createElement('img', { src: 'baseimages/cartItem.png', className: 'projectNoImage user-project-img' });
                } else {
                    image = React.createElement('img', { src: item.ImagePath });
                }
                var projectListVersion = item.Versions.map(function(el) {
                    return React.createElement(
                        "div", { className: "project-list-version" },
                        React.createElement(
                            "span", { className: "project-list-item-img" },
                            el
                        ),
                        React.createElement("input", { type: "hidden", name: "project-version", value: el })
                    );
                });
                return React.createElement(
                    "div", { className: "project-list-item" },
                    React.createElement(
                        "div", { className: "project-list-item-img" },
                        image
                    ),
                    React.createElement(
                        "div", { className: "project-list-item-data" },
                        React.createElement(
                            "div", { className: "project-list-item-name" },
                            item.Name
                        ), React.createElement(
                            "div", { className: "project-list-item-version" },
                            projectListVersion
                        )
                    ),
                    React.createElement("input", { type: "hidden", name: "projectId", value: item.ProjectId })
                );
            });
            return React.createElement(
                "div", { className: "project-container" },
                projectListModel
            );
        }
    });
    ReactDOM.render(React.createElement(userProjectList, { data: projectList }), document.getElementById("loginUserProjects"));
}