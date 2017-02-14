'use strict';

var renderBooking = function renderBooking(thisInstitution, sortByService) {
  var Institution = React.createClass({
    displayName: 'Institution',

    componentDidMount: function componentDidMount() {
      addListenerToClickBookService();
    },
    render: function render() {
      var data = this.props.data;
      var CollectionOfElementsInstitution;
      var ArrayOfObjectServices = [];
      if (sortByService != true) {
        CollectionOfElementsInstitution = data.BookResources.map(function (item) {
          if (item.BookServiceProvides.length > 0) {
            return React.createElement(TimeLine, { data: item });
          }
        });
      } else {
        CollectionOfElementsInstitution = data.BookResources.map(function (resources) {
          return React.createElement(CollectionService, { data: resources.BookServiceProvides, isconfirm: resources.NeedConfirmation });
        });
      }
      return React.createElement(
        'div',
        null,
        React.createElement(
          'h1',
          null,
          'Institution - ',
          data.Name
        ),
        CollectionOfElementsInstitution,
        React.createElement('input', { type: 'hidden', className: 'value-sortByService', value: sortByService }),
        React.createElement('input', { type: 'hidden', className: 'value-currentInstitution', value: data.Id }),
        React.createElement(
          'button',
          { type: 'button', className: sortByService ? "btn-order-booking" : "hidden btn-order-booking" },
          'Order Booking'
        )
      );
    }
  });

  var TimeLine = React.createClass({
    displayName: 'TimeLine',


    render: function render() {
      var data = this.props.data;
      var image;
      if (data.ImagePath != null) {
        image = React.createElement('img', { src: data.ImagePath });
      } else {
        image = null;
      }
      return React.createElement(
        'div',
        { className: 'row-elementInstitution row-elementTimeLine' },
        image,
        React.createElement(
          'p',
          { className: 'name-elementInstitution' },
          'Name - ',
          data.Name
        ),
        React.createElement(
          'time',
          null,
          'Open Time - ',
          data.OpenTime
        ),
        React.createElement(
          'time',
          null,
          'Close Time - ',
          data.CloseTime
        ),
        React.createElement(
          'p',
          null,
          'Start book day - ',
          data.StartBookDay
        ),
        React.createElement(
          'p',
          null,
          'Step Minutes - ',
          data.StepMinutes
        ),
        React.createElement(
          'p',
          null,
          'Count Days For Book - ',
          data.CountDaysForBook
        ),
        React.createElement('input', { type: 'hidden', className: 'timeLineId', value: data.Id })
      );
    }
  });

  var Service = React.createClass({
    displayName: 'Service',

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
        'div',
        { className: 'row-elementInstitution' },
        image,
        React.createElement(
          'p',
          { className: 'name-elementInstitution' },
          'Name - ',
          data.Name
        ),
        React.createElement(
          'p',
          null,
          'Description - ',
          data.Description
        ),
        React.createElement(
          'time',
          null,
          'Open Time - ',
          data.Duration
        ),
        React.createElement(
          'button',
          { className: 'btn-bookThisService' },
          'Book'
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
      var collectionServiceForRender = data.map(function (service) {
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
// var renderBooking = function(thisInstitution, sortByService) {
//     var Institution =  React.createClass({
//       componentDidMount: function(){
//                 addListenerToClickBookService();
//                },
//           render: function() {
//             var data = this.props.data;
//             var CollectionOfElementsInstitution;
//             var ArrayOfObjectServices = [];
//                   if(sortByService != true){
//                     CollectionOfElementsInstitution = data.BookResources.map(function(item){
//                       if(item.BookServiceProvides.length > 0){
//                       return (
//                            <TimeLine data={item} /> 
//                       );
//                       }
//                     });
//                   }else{
//                   CollectionOfElementsInstitution =  data.BookResources.map(function(resources){
//                         return(
//                             <CollectionService data={resources.BookServiceProvides} isconfirm={resources.NeedConfirmation} />
//                         );
//                     }) ;
//                 }
//             return (
//                   <div>
//                     <h1>Institution - {data.Name}</h1>
//                     {CollectionOfElementsInstitution}
//                     <input type='hidden' className='value-sortByService' value={sortByService} />
//                     <input type='hidden' className='value-currentInstitution' value={data.Id} />
//                     <button  type="button" className={sortByService ? "btn-order-booking" : "hidden btn-order-booking"}>Order Booking</button>
//                 </div>
//                 );
//           }
//       });

// var TimeLine = React.createClass({

//   render: function() {
//     var data = this.props.data;
//     var image;
//     if(data.ImagePath != null){
//       image = <img src={data.ImagePath} />;
//     }else{
//       image = null;
//     }
//       return (
//           <div className='row-elementInstitution row-elementTimeLine'>
//               {image}
//               <p className='name-elementInstitution'>Name - {data.Name}</p>
//               <time>Open Time - {data.OpenTime}</time>
//               <time>Close Time - {data.CloseTime}</time>
//               <p>Start book day - {data.StartBookDay}</p>
//               <p>Step Minutes - {data.StepMinutes}</p>
//               <p>Count Days For Book - {data.CountDaysForBook}</p>
//               <input type='hidden' className='timeLineId' value={data.Id} />
//           </div>
//           );
//   }
// });

// var Service = React.createClass({
//   render: function() {
//     var data = this.props.data;
//     var isconfirm = this.props.isconfirm;
//     var image;
//     if(data.ImagePath != null){
//       image = <img src={data.ImagePath} />;
//     }else{
//       image = null;
//     }
//       return (
//           <div className='row-elementInstitution'>
//               {image}
//               <p className='name-elementInstitution'>Name - {data.Name}</p>
//               <p>Description - {data.Description}</p>
//               <time>Open Time - {data.Duration}</time>
//               <button className='btn-bookThisService'>Book</button>
//               <input type='hidden' className='serviceId' value={data.Id} />
//               <input type='hidden' className='serviceDuration' value={data.Duration} />
//               <input type="hidden" value={data.BookResourceId} className="thisTimeLineId" />
//               <input type="hidden" value={isconfirm} className="thisTimeLineIsConfirm" />
//               <input type="hidden" value={data.Name} className="servicesName" />
//           </div>
//           );
//   }
// });

// var CollectionService = React.createClass({
//   render: function() {
//     var data = this.props.data;
//     var isconfirm = this.props.isconfirm;
//     var collectionServiceForRender = data.map(function(service){
//         return(
//           <Service data={service} isconfirm={isconfirm} />
//         );
//     });
//       return (
//         <div>
//           {collectionServiceForRender}</div>
//           );
//   }
// });


// ReactDOM.render(<Institution data={thisInstitution}/>,document.getElementById("custom-container-booking"));
// }
