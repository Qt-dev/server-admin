/**
* @jsx React.DOM
*/

var SickbeardContentBox = React.createClass({
  buildItem: function(item, type){
    return  (<li className="item" key={item.show_name + item.season + item.episode }>
              <span className="title">{item.show_name}</span>
              <span className="status">
                <span className="season">S{item.season}E{item.episode}</span>
                {item.airs}
              </span>
            </li>);
  },
  buildList: function(type){
      var buildItem = this.buildItem;
      var list = this.props.data.data[type].map(function(item){
        return buildItem(item);
      })
      return  (<div className="item-list">
                <h4>{type.charAt(0).toUpperCase() + type.slice(1)}</h4>
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

  var _refreshButton = React.createClass({
    render: function(){
      return <a className="bottomButton" href="#" onClick={this.props.callback} >Refresh</a>
    }
  })
  
  return React.createClass({
    handleRelaunch: function(){     
      e.preventDefault();
      this.props.model.query('relaunch',this.props.model.render);
    },
    handleRefresh: function(e){
      e.preventDefault();
      this.props.refresh();
    },
    render: function() {
      return (
        <div className="customButtons">
          <_relaunchButton callback={this.handleRelaunch} />
          <_refreshButton callback={this.handleRefresh} />
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
