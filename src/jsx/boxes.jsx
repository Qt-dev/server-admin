/**
* @jsx React.DOM
*/
var Box = React.createClass({
  render: function() {
    return (
      <div className="box">
        <h3>{this.props.site.get('name')}</h3>
        <BoxContent description={this.props.site.get('description')} />
        <BoxFooter link={this.props.site.config.url} />
      </div>
      );
  }
})

var BoxContent = React.createClass({
  render: function(){
    return (
      <div className="boxContent">
        <p>{this.props.description}</p>
      </div>)
  }
})

var BoxFooter = React.createClass({
  render: function(){
    return (
    <div className="boxFooter">
      <a className="bottomButton boxGotoLink" href={this.props.link}>Go</a>
      {this.props.buttons}
      {this.props.statusBox}
    </div>
    )
  }
})


  
