/**
* @jsx React.DOM
*/
var Content = React.createClass({
  /* TOOLS */
  buildBoxes: function(){
    if(this.state.sites){
      return this.state.sites.map(function(site){
        return <Box site={site} key={site.get('id')} />
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
    var boxes = this.buildBoxes()

    return (
      <div className="content">
        {boxes}
      </div>
      );
  }
});