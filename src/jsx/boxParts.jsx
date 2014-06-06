/**
* @jsx React.DOM
*/
var BoxContent = React.createClass({
  render: function(){
    var lines = [];
    lines.push(this.props.description);
    if(this.props.statusBar && !(this.props.statusBar.empty)){
      lines.push(this.props.statusBar);
    }

    var content = lines.map(function(line){
      return (
        <div className="row">
          {line}
        </div>
        )
    })

    return (
      <div className="boxContent">
        {content}
        {this.props.contentBox}
      </div>)
  }
})

var BoxFooter = React.createClass({
  render: function(){
    return (
    <div className="boxFooter">
      {this.props.buttons}
    </div>
    )
  }
})

var BoxHeader = React.createClass({
  render: function() {
    return (
      <div className="boxHeader" style={this.props.style}>
        <h3>{this.props.name}</h3>
        <a href={this.props.link} target="_blank"><i className="siteLink fa fa-external-link"></i></a>
      </div>
    );
  }
})