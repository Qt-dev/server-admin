/**
* @jsx React.DOM
*/

var TransmissionContentBox = React.createClass({
  render: function() {
    if(this.props.data){
      var statusText = { 
          0: 'STOPPED',
          1: 'CHECK_WAIT',
          2: 'CHECK',
          3: 'DOWNLOAD_WAIT',
          4: 'DOWNLOAD',
          5: 'SEED_WAIT',
          6: 'SEED',
          7: 'ISOLATED' 
        };
      console.log(this.props);
      var others = this.props.data.others.map(function(item){
        var status = statusText[item.status];
        return  <li className="item" key={item.id}>
                  <span className="title"><a href={item.magnetLink}>{item.name}</a></span>
                  <span className="status">
                    {status} ({(item.percentDone * 100).toFixed(2)}%)
                  </span>
                </li>
      })
      var ongoing = this.props.data.ongoing.map(function(item){
        var status = statusText[item.status];
        return  <li className="item" key={item.id}>
                  <span className="title"><a href={item.magnetLink}>{item.name}</a></span>
                  <span className="status">
                    {status} ({(item.percentDone * 100).toFixed(2)}%)
                  </span>
                </li>
      })
    }
    return (
      <div className="boxContent">
        <div className="item-list">
          <h4>Ongoing</h4>
          <ul>{ongoing}</ul>
        </div>
        <div className="item-list">
          <h4>Others</h4>
          <ul>{others}</ul>
        </div>
      </div>
    );
  }
})

var TransmissionButtons = (function(){
  
  return React.createClass({
    
    render: function() {
      return (
        <div className="customButtons">
        </div>
      );
    }
  })
}());

var TransmissionStatusBar = React.createClass({ // Not used yet
  render: function() {
    return (
      <div />
    );
  }
});
