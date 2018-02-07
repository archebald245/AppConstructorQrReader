"use strict";

function renderProjectList(projectList) {
    var userProjectList = React.createClass({
        displayName: "loginUserProjectList",

        getInitialState: function getInitialState() {
            return { data: projectList };
        },
        componentDidMount: function componentDidMount() {
            ProjectListEventListener();
        },
        render: function render() {
            var data = this.state.data;
            var projectListModel = this.state.data.map(function(item, index) {
                var image;
                if (item.ImagePath.length == 0) {
                    image = React.createElement('img', { src: 'baseimages/cartItem.png', className: 'projectNoImage user-project-img' });
                } else {
                    image = React.createElement('img', { src: item.ImagePath });
                }
                var projectListVersion = item.Versions.map(function(el) {
                    return React.createElement(
                        "option", { className: "project-version" + (el.IsLive ? ' version-islive' : ''), value: el.ContentId },
                        el.Version
                        // React.createElement("input", { type: "hidden", name: "project-version-contentId", value: el.ContentId })
                    );
                });
                return React.createElement(
                    "div", { key: index, className: "project-list-item" },
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
                            React.createElement(
                                "select", { className: "" },
                                projectListVersion
                            )

                        ),
                        React.createElement(
                            "button", { className: "take-application" },
                            "Download"
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