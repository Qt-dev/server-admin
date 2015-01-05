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
  delete: function() {
    var site = this.props.site;
    var sites = this.props.controller.sites;
    var refreshCallback = this.props.refreshCallback;
    site.destroy({
      success: function(model, response){
        sites.remove(site);
        refreshCallback();
      },
      error: function(model, response){
        console.log("ERROR");
        console.log("response: ", response);
      }
    })
  },
  render: function() {
    var type = this.props.site.get('type')
    if(type && (type != "others")){
      var type = this.props.site.get('type');
      var contentBox = new contentSwitch[type]({data: this.state.data});
      var buttons = new buttonsCreator[type]({data: this.state.data, model: this.props.site, refresh: this.refresh});
      var statusBar = new statusCreator[type]({data: this.state.data});
    }

    var style = {
      backgroundColor: this.getColor()
    }

    this.klass = "box "+ this.props.site.get('id');

    return (
      <div className={this.klass} style={style}>
        <BoxHeader name={this.props.site.get('title')} refreshCallback={this.refresh} deleteCallback={this.delete} link={this.props.site.config.url} style={style} />
        <BoxContent boxKey={this.props.key} contentBox={contentBox} statusBar={statusBar} description={this.props.site.get('description')} />
        <BoxFooter buttons={buttons} link={this.props.site.config.url} />
      </div>
      );
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

var statusCreator = {
  'sabnzbd': SABStatusBar,
  'sickbeard': SickbeardStatusBar,
  'transmission': TransmissionStatusBar,
  'couchpotato': CouchpotatoStatusBar
}