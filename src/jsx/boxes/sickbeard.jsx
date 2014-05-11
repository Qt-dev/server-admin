/**
* @jsx React.DOM
*/

var SickbeardContentBox = React.createClass({
  buildItem: function(item, type){
    return  <li className="item" key={item.show_name + item.season + item.episode }>
              <span className="title">{item.show_name}</span>
              <span className="status">
                <span className="season">S{item.season}E{item.episode}</span>
                {item.airs}
              </span>
            </li>
  },
  buildList: function(type){
      var list = this.props.data.data[type].map(function(item){
        return  this.buildItem(item);
      })
      return  <div className="item-list">
                <h4>{return type.charAt(0).toUpperCase() + string.slice(1)}</h4>
                <ul>{list}</ul>
              </div>)
  },
  render: function() {
    if(this.props.data){
        var todayList = this.buildList('today');
        var soonList = this.buildList('soon');
      }
    return (
      <div className="boxContent">
        {todayList}
        {soonList}
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
