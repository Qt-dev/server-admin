/**
* @jsx React.DOM
*/
var Box = React.createClass({
  getInitialState: function(){
    return {}
  },
  componentDidMount: function(){
    this.refresh();
  },
  refresh: function(){
    this.props.site.query('status',this.setState.bind(this));
  },
  getColor: function(){
    var categoryId = this.props.site.get('category');
    var category = this.props.controller.getCategory(categoryId);
    return category.get('color');
  },
  render: function() {
    if(this.props.site.get('type')){
      var type = this.props.site.get('type');
      var contentBox = new contentSwitch[type]({data: this.state.data});
      var buttons = new buttonsCreator[type]({data: this.state.data, model: this.props.site, refresh: this.refresh});
      var statusBar = new statusBarCreator[type]({data: this.state.data});
    }

    var style = {
      backgroundColor: this.getColor()
    }

    return (
      <div className="box">
        <h3 className="boxHeader" style={style}>{this.props.site.get('name')}</h3>
        <BoxContent contentBox={contentBox} statusBar={statusBar} description={this.props.site.get('description')} />
        <BoxFooter buttons={buttons} link={this.props.site.config.url} />
      </div>
      );
  }
})

var BoxContent = React.createClass({
  render: function(){
    return (
      <div className="boxContent">
        <p className="boxDescription">{this.props.description}</p>
        {this.props.statusBar}
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
  'sickbeard': SickbeardContentBox,
  'transmission': TransmissionContentBox,
  'couchpotato': CouchpotatoContentBox
};

var buttonsCreator = {
  'sabnzbd': SABButtons,
  'sickbeard': SickbeardButtons,
  'transmission': TransmissionButtons,
  'couchpotato': CouchpotatoButtons
}

var statusBarCreator = {
  'sabnzbd': SABStatusBar,
  'sickbeard': SickbeardStatusBar,
  'transmission': TransmissionStatusBar,
  'couchpotato': CouchpotatoStatusBar
}