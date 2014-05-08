/**
* @jsx React.DOM
*/
var Box = React.createClass({
  getInitialState: function(){
    return {}
  },
  componentDidMount: function(){
    this.props.site.query('status',this.setState.bind(this));
  },
  render: function() {
    var contentBox = new contentSwitch[this.props.site.get('type')]({data: this.state.data});
    var buttons = new buttonsCreator[this.props.site.get('type')]({data: this.state.data, model: this.props.site})
    return (
      <div className="box">
        <h3>{this.props.site.get('name')}</h3>
        <BoxContent contentBox={contentBox} description={this.props.site.get('description')} />
        <BoxFooter buttons={buttons} link={this.props.site.config.url} />
      </div>
      );
  }
})

var BoxContent = React.createClass({
  render: function(){
    return (
      <div className="boxContent">
        <p>{this.props.description}</p>
        {this.props.contentBox}
      </div>)
  }
})

var BoxFooter = React.createClass({
  render: function(){
    return (
    <div className="boxFooter">
      <a className="bottomButton boxGotoLink" href={this.props.link}>Go</a>
      {this.props.buttons}
    </div>
    )
  }
})



var contentSwitch = {
  'sabnzbd': SABContentBox,
  'sickbeard': SicbkeardContentBox
};

var buttonsCreator = {
  'sabnzbd': SABButtons,
  'sickbeard': SickbeardButtons
}