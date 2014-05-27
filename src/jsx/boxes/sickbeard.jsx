/**
* @jsx React.DOM
*/

var SickbeardContentBox = React.createClass({
  buildItem: function(item, type){
    return {
      id: item.show_name + "-" + item.season + item.episode,
      title: item.show_name,
      status: "S" + item.season + "E" + item.episode + "(" + item.airs + ")"
    }
  },
  buildList: function(type){
      var buildItem = this.buildItem;
      var list = this.props.data.data[type].map(function(item){
        return buildItem(item);
      })
      return list;
  },
  render: function() {
    if(this.props.data){
        var todayList = <ItemList items={this.buildList('today')} title="today" />;
        var soonList = <ItemList items={this.buildList('soon')} title="soon" />;
      }
    return (
      <div className="contentLists">
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
  empty: true,
  render: function() {
    return (
      <div />
    );
  }
});
