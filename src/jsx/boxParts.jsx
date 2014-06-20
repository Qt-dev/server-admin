/**
* @jsx React.DOM
*/
var BoxContent = React.createClass({
  render: function(){
    var lines = [];
    lines.push(this.props.description);
    var bar = this.props.statusBar;
    if(bar && bar.props.empty ){
      lines.push(bar);
    }
    var boxKey = this.props.boxKey;
    var content = lines.map(function(line, index){
      return (
        <div key={"box-" + boxKey + "-line-" + index} className="row">
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
  refresh: function(e){
    e.preventDefault();
    this.props.refreshCallback();
  },
  delete: function(e){
    e.preventDefault();
    console.log(e);
  },
  render: function() {
    return (
      <div className="boxHeader" style={this.props.style}>
        <a href="#" onClick={this.delete}><i className="delete fa fa-times"></i></a>
        <a href="#" onClick={this.refresh}><i className="refresh fa fa-refresh"></i></a>
        <h3>{this.props.name}</h3>
        <a href={this.props.link} target="_blank"><i className="siteLink fa fa-external-link"></i></a>
      </div>
    );
  }
})