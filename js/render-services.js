'use strict';

function renderServiceOfThisInstitution(thisInstitution) {
    var Institution = React.createClass({
        displayName: cultureRes.inst,

        componentDidMount: function componentDidMount() {
            addListenerToClickBookService();
        },
        render: function render() {
            var data = this.props.data;
            var CollectionOfElementsInstitution = data.BookServiceProvides.map(function(service) {
                return React.createElement(Service, { data: service, isconfirm: data.NeedConfirmation });
            });
            return React.createElement(
                'div',
                null,
                React.createElement(
                    'h1',
                    null,
                    cultureRes.instDisplay,
                    data.Name
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
                'div', { className: 'row-elementInstitution' },
                image,
                React.createElement(
                    'p', { className: 'name-elementInstitution' },
                    cultureRes.displayName,
                    data.Name
                ),
                React.createElement(
                    'p',
                    null,
                    cultureRes.description,
                    data.Description
                ),
                React.createElement(
                    'time',
                    null,
                    'cultureRes.durationTime',
                    data.Duration
                ),
                React.createElement(
                    'button', { className: 'btn-bookThisService' },
                    cultureRes.book
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