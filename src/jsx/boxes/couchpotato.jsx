/**
* @jsx React.DOM
*/

var CouchpotatoContentBox = React.createClass({
  buildActive: function() {
    return this.props.data.actives.map(function(item){
        return {
          id: item.id,
          title: item.library.titles[0].title + "(" + item.library.year + ")",
          status: ""
        };
      });
  },
  buildOthers: function() {
    return this.props.data.others.map(function(item){
        return {
          id: item.id,
          title: item.library.titles[0].title + "(" + item.library.year + ")",
          status: ""
        };
      });
  },
  render: function(){
    if(this.props.data){
      var actives = <ItemList items={this.buildActive()} title="Actives" />;
      var others = <ItemList items={this.buildOthers()} title="Others" />;
    }
    return (
      <div className="contentLists">
      {actives}
      {others}
      </div>
      )
  }
})

var CouchpotatoButtons = (function(){

  var _refreshButton = React.createClass({
    render: function(){
      return <a className="bottomButton" href="#" onClick={this.props.callback} >Refresh</a>
    }
  })

  return React.createClass({
    handleRefresh: function(e){
      e.preventDefault();
      this.props.refresh();
    },
    render: function() {
      return  (
        <div className="customButtons">
          <_refreshButton callback={this.handleRefresh} />
        </div>
        );
    }
  })
}());

var CouchpotatoStatusBar = React.createClass({
  buildLine: function(key, value){
    return <li key={key}><span className="statusTitle">{key}:</span><span className="statusValue">{value.toString()}</span></li>
 
  },
  render: function(){
    if(this.props.data){
      var apidata = {
        "Active Researches": this.props.data.status.actives,
        "Total Movies": this.props.data.status.total
      }
      var status = []
      for(var key in apidata){
        status.push(this.buildLine(key,apidata[key]));
      }
    }
    return(
      <div className="statusBox">
        <ul>
          {status}
        </ul>
      </div>
      )
  }
})