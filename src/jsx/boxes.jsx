/**
* @jsx React.DOM
*/
var Box = React.createClass({
  render: function() {
    return (
      <div className="box">
        <h3 style={this.props.style}>{this.props.data.name}</h3>
        <BoxContent data={this.props.data.content} />
        <BoxButtonRow link={this.props.data.content.link} />
      </div>
      );
  }
})

var BoxContent = React.createClass({
  render: function(){
    return (
      <div className="boxContent">
        <p>{this.props.data.description}</p>
      </div>)
  }
})

var StatusLine = React.createClass({
  render: function(){
    return <li key={this.props.key}><span className="statusTitle">{this.props.key}</span>:<span className="statusValue">{this.props.value.toString()}</span></li>
  }
})

var BoxButtonRow = React.createClass({
  render: function(){
    if(this.props.buttons){
      var buttons = this.props.buttons
    }
    return (
    <div className="bottomButtonRow">
      <a className="bottomButton boxGotoLink" href={this.props.link}>Go</a>
      {buttons}
    </div>
    )
  }
})


  
