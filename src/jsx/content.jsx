/**
* @jsx React.DOM
*/
var Content = React.createClass({
  /* TOOLS */
  buildBoxes: function(){
    if(this.state.sites){
      var controller = this.props.controller
      return this.state.sites.map(function(site){
        return <Box site={site} key={site.get('id')} controller={controller} />
      })
    }
    return [];
  },
  updateCallback: function(){
    this.setState({sites: this.props.sites.models});
  },
  /* REACT METHODS */
  getInitialState: function() {
    return {sites: this.props.sites.models};
  },
  componentDidMount: function(){
    this.props.sites.on('add', this.updateCallback);
    this.props.sites.on('change', this.updateCallback);
  },
  render: function() {
    var boxes = this.buildBoxes();

    return (
      <div className="content">
        <AddSiteBox sites={this.props.sites} controller={this.props.controller} />
        {boxes}
      </div>
      );
  }
});