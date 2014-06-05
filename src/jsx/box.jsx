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
      var statusBar = new statusCreator[type]({data: this.state.data});
    }

    var style = {
      backgroundColor: this.getColor()
    }

    return (
      <div className="box">
        <div className="boxHeader" style={style}>
          <h3>{this.props.site.get('name')}</h3>
          <a href={this.props.site.config.url}><i className="siteLink fa fa-external-link"></i></a>
        </div>
        <BoxContent contentBox={contentBox} statusBar={statusBar} description={this.props.site.get('description')} />
        <BoxFooter buttons={buttons} link={this.props.site.config.url} />
      </div>
      );
  }
})

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

var ItemList = React.createClass({
  getInitialState: function(){
    return {
      style: {
        display: "none"
      },
      closed: true,
      iconClass: "fa fa-angle-down"
    }
  },
  toggleList: function(){
    if(this.state.closed){
      this.openList();
    } else {
      this.closeList();
    }
  },
  openList: function(){
    this.setState({
      style: {
        display: "inline"
      },
      closed: false,
      iconClass: "fa fa-angle-up"
    })
  },
  closeList: function(){
    this.setState({
      style: {
        display: "none"
      },
      closed: true,
      iconClass: "fa fa-angle-down"
    })
  },
  buildList: function(){
    var list = this.props.items.map(function(item){
      return (
              <li className="item" key={item.id}>
                <span className="title">{item.title}</span>
                <span className="status">{item.status}</span>
              </li>
              )
    })
                
    return list;
  },
  render: function(){
    return (
      <div className="itemList row">
        <h4 onTouchEnd={this.toggleList} onClick={this.toggleList} >{this.props.title}({this.props.items.length}) <i className={this.state.iconClass}></i></h4>
        <ul style={this.state.style}>{this.buildList()}</ul>
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

var statusCreator = {
  'sabnzbd': SABStatusBar,
  'sickbeard': SickbeardStatusBar,
  'transmission': TransmissionStatusBar,
  'couchpotato': CouchpotatoStatusBar
}