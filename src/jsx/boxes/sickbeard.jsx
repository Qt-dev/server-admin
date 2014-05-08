/**
* @jsx React.DOM
*/

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

var SickbeardButtons = (function(){
  var _relaunchButton = React.createClass({
    render: function() {
      return (
        <a href="#" className="bottomButton" onClick={this.props.callback}>Relaunch Downloads</a>
      );
    }
  })
  return React.createClass({
    handleRelaunch: function(){
      this.props.model.query('relaunch')
    },
    render: function() {
      return (
        <_relaunchButton callback={this.handleRelaunch} />
      );
    }
  })
}());


