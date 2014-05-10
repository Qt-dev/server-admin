/**
* @jsx React.DOM
*/


var SABContentBox = React.createClass({
  
  render: function(){
    if(this.props.data){
      var queue = <div className="item-list">
                    <h4>Queue</h4>
                    <ul>{this.buildQueue()}</ul>
                  </div>;
      var history = <div className="item-list">
                      <h4>History</h4>
                      <ul>{this.buildHistory()}</ul>
                    </div>;
    }
    return (
      <div className="boxContent">
        {queue}
        {history}
      </div>)
  }
})

var CouchpotatoContentBox = React.createClass({
  buildActive: function() {
    return this.props.data.actives.map(function(item){
        return (<li key={item.id}>
                  <span className="title">{item.library.titles[0].title}({item.library.year}) </span>
                </li>);
      });
  },
  buildOthers: function() {
    return this.props.data.others.map(function(item){
        return (<li key={item.id}>
                  <span className="title">{item.library.titles[0].title}({item.library.year}) </span>
                </li>);
      });
  },
  render: function(){
    if(this.props.data){
      var actives = <div className="item-list">
                      <h4>Actives</h4>
                      <ul>{this.buildActive()}</ul>
                    </div>;
      var others = <div className="item-list">
                      <h4>Others</h4>
                      <ul>{this.buildOthers()}</ul>
                    </div>;
    }
    return (
      <div className="boxContent">
      {actives}
      {others}
      </div>
      )
  }
})

var CouchpotatoButtons = (function(){

  return React.createClass({
    render: function() {
      return  (
        <div className="customButtons">
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
    return(
      <ul className="statusBox">
      </ul>
      )
  }
})