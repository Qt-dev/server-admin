/**
* @jsx React.DOM
*/
var SABContentBox = React.createClass({
  buildQueue: function() {
    return this.props.data.queue.map(function(item){
        return (<li>
                  <span className="title">{item.name} </span> 
                  <span className="percentage">{item.percentage}% </span>
                  <span className="eta">ETA:{item.eta}</span>
                </li>);
      });
  },
  buildHistory: function() {
    return this.props.data.history.map(function(item){
        return (<li>
                  <span className="title">{item.name} </span>
                  <span className="status">{item.status} </span>
                  <span className="failMessage">{item.fail_message}</span>
                </li>);
      });
  },
  render: function(){
    console.log('status',this.props);
    if(this.props.data){
      var queue = <div>
                    <h4>Queue</h4>
                    <ul className="item-list">{this.buildQueue()}</ul>
                  </div>;
      var history = <div>
                      <h4>History</h4>
                      <ul className="item-list">{this.buildHistory()}</ul>
                    </div>;
    }
    return (
      <div className="boxContent">
        {queue}
        {history}
      </div>)
  }
})

var SABButtons = (function(){
  var _pauseToggleButton = React.createClass({
    render: function(){
      if(this.props.paused){
        return <a className="bottomButton" href="#" onClick={this.props.callback} >Resume</a>
      } else {
        return <a className="bottomButton" href="#" onClick={this.props.callback} >Pause</a>
      }
    }
  })

  return React.createClass({
    handleClick: function(e){
      this.props.model.query['pauseToggle'](this.props.data.paused);
    },
    render: function() {
      return (
        <_pauseToggleButton paused={this.props.paused} callback={this.handleClick} />
      );
    }
  })
}());
