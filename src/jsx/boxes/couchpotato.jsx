/**
* @jsx React.DOM
*/
var CouchpotatoContentBox = React.createClass({

  render: function(){
    return (
      <div className="boxContent">
      </div>)
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