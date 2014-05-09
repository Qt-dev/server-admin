/**
* @jsx React.DOM
*/

var SicbkeardContentBox = React.createClass({
  render: function() {
    if(this.props.data){
        var today = this.props.data.data.today.map(function(item){
          return  <li className="today item" key={item.show_name + item.season + item.episode }>
                    <span className="title">{item.show_name}</span>
                    <span className="status">
                      <span className="season">S{item.season}E{item.episode}</span>
                      {item.airs}
                    </span>
                  </li>
        })
        var soon = this.props.data.data.soon.map(function(item){
          return  <li className="soon item" key={item.show_name + item.season + item.episode }>
                    <span className="title">{item.show_name} </span>
                    <span className="status">
                      <span className="season">S{item.season}E{item.episode} </span>
                      {item.airs}
                    </span>
                  </li>
        })
      }
    return (
      <div className="boxContent">
        <div className="item-list">
          <h4>Today</h4>
          <ul>{today}</ul>
        </div>

        <div className="item-list">
          <h4>Soon</h4>
          <ul>{soon}</ul>
        </div>
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
      e.preventDefault();
      this.props.model.query('relaunch',this.props.model.render);
    },
    render: function() {
      return (
        <div className="customButtons">
          <_relaunchButton callback={this.handleRelaunch} />
        </div>
      );
    }
  })
}());

var SickbeardStatusBar = React.createClass({ // Not used yet
  render: function() {
    return (
      <div />
    );
  }
});
