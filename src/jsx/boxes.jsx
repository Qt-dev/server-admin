/**
* @jsx React.DOM
*/
var Box = React.createClass({
  getInitialState: function(){
    return {}
  },
  componentDidMount: function(){
    this.props.site.query('status',this.setState.bind(this));
  },
  render: function() {
    var contentBox = new contentSwitch[this.props.site.get('type')]({data: this.state.data});
    return (
      <div className="box">
        <h3>{this.props.site.get('name')}</h3>
        <BoxContent contentBox={contentBox} description={this.props.site.get('description')} />
        <BoxFooter link={this.props.site.config.url} />
      </div>
      );
  }
})

var BoxContent = React.createClass({
  render: function(){
    return (
      <div className="boxContent">
        <p>{this.props.description}</p>
        {this.props.contentBox}
      </div>)
  }
})

var BoxFooter = React.createClass({
  render: function(){
    return (
    <div className="boxFooter">
      <a className="bottomButton boxGotoLink" href={this.props.link}>Go</a>
      {this.props.buttons}
    </div>
    )
  }
})

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
                    <ul className="queue">{this.buildQueue()}</ul>
                  </div>;
      var history = <div>
                      <h4>History</h4>
                      <ul className="history">{this.buildHistory()}</ul>
                    </div>;
    }
    return (
      <div className="boxContent">
        {queue}
        {history}
      </div>)
  }
})

var SicbkeardContentBox = React.createClass({
  render: function() {
    if(this.props.data){
        var today = this.props.data.today.map(function(item){
          return <li className="today item"><span className="title">{item.show_name}</span> - <span className="season">S{item.season}E{item.episode}</span> - {item.airs}</li>
        })
        var soon = this.props.data.soon.map(function(item){
          return <li className="soon item"><span className="title">{item.show_name}</span> - <span className="season">S{item.season}E{item.episode}</span> - {item.airs}</li>
        })
      }
    return (
      <div className="boxContent">
        <h4>Today</h4>
        <ul className="item-list">{today}</ul>

        <h4>Soon</h4>
        <ul className="item-list">{soon}</ul>
      </div>
    );
  }
})


var contentSwitch = {
  'sabnzbd': SABContentBox,
  'sickbeard': SicbkeardContentBox
};