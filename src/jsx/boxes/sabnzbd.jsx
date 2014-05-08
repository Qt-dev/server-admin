/**
* @jsx React.DOM
*/
var SABContentBox = React.createClass({
  buildQueue: function() {
    return this.props.data.queue.map(function(item){
        return (<li key={item.id}>
                  <span className="title">{item.name} </span> 
                  <span className="percentage">{item.percentage}% </span>
                  <span className="eta">ETA:{item.eta}</span>
                </li>);
      });
  },
  buildHistory: function() {
    return this.props.data.history.map(function(item){
        return (<li key={item.id}>
                  <span className="title">{item.name} </span>
                  <span className="status">{item.status} </span>
                  <span className="failMessage">{item.fail_message}</span>
                </li>);
      });
  },
  render: function(){
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

  var _cleanButton = React.createClass({
    render: function(){
      return <a className="bottomButton" href="#" onClick={this.props.callback} >Clean History</a>
    }
  })

  return React.createClass({
    handlePauseToggle: function(e){
      this.props.model.query('pauseToggle',this.props.refresh,{paused: this.props.data.status.paused});
    },
    handleClean: function(e){
      this.props.model.query('clean',this.props.refresh);
    },
    render: function() {
      if(this.props.data){
        var paused = this.props.data.status.paused;
      }
      return  (
        <div className="customButtons">
          <_pauseToggleButton paused={paused} callback={this.handlePauseToggle} />
          <_cleanButton callback={this.handleClean} />
        </div>
        );
    }
  })
}());

var SABStatusBar = React.createClass({
  buildLine: function(key, value){
    return <li key={key}><span className="statusTitle">{key}:</span><span className="statusValue">{value.toString()}</span></li>
 
  },
  render: function(){
    if(this.props.data){
      var apidata = {
        status: this.props.data.status.status,
        speed: this.props.data.status.speed,
        timeleft: this.props.data.status.timeleft
      }
      var status = []
      for(var key in apidata){
        status.push(this.buildLine(key,apidata[key]));
      }
    }
    return(
      <ul className="statusBox">
      {status}
      </ul>
      )
  }
})