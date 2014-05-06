/**
* @jsx React.DOM
*/
var Sickbeard = (function(){
  var _boxContent = React.createClass({
    render: function(){
      if(this.props.data){
        var today = this.props.data.today.map(function(item){
          return <li className="today item"><span className="title">{item.show_name}</span> - <span className="season">S{item.season}E{item.episode}</span> - {item.airs}</li>
        })
        var soon = this.props.data.soon.map(function(item){
          return <li className="soon item"><span className="title">{item.show_name}</span> - <span className="season">S{item.season}E{item.episode}</span> - {item.airs}</li>
        })
      }
      return (<div className="boxContent">
          <h4>Today</h4>
          <ul className="item-list">{today}</ul>

          <h4>Soon</h4>
          <ul className="item-list">{soon}</ul>
        </div>)
    }
  })

  var _relaunchButton = React.createClass({
    handleClick: function(){
      this.props.callback();
    },
    render: function() {
      return (
        <a href="#" className="bottomButton" onClick={this.handleClick}>Relaunch Downloads</a>
      );
    }
  })



  return React.createClass({
    relaunchDownloads: function(){
      this.apiCaller.relaunchDownloads(this.refresh);
    },
    refresh: function() {
      this.apiCaller.getStatus(this.setState.bind(this));
    },
    getInitialState: function() {
      return {data: []};
    },
    componentWillMount: function(){
      var data = {
        url: this.props.data.content.url,
        apiKey: this.props.data.content.apiKey
      }
      this.apiCaller = new AJAXCaller[this.props.data.type](data);
      this.apiCaller.getStatus(this.setState.bind(this));
      // window.setInterval(this.refresh, 5000);
    },
    render: function(){
      var relaunchButton = <_relaunchButton callback={this.relaunchDownloads} />
      return (
        <div className="box">
          <h3 style={this.props.style}>{this.props.data.name}</h3>
          <_boxContent data={this.state.data.data} /> 
          <BoxFooter buttons={relaunchButton} link={this.props.data.content.url} />
        </div>
        );
    }
  })
}())