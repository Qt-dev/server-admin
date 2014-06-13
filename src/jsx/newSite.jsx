/**
* @jsx React.DOM
*/

var AddSiteButton = React.createClass({
  getInitialState: function(){
    return {
      text: 'Add a site',
      open: false
    }
  },
  toggleForm: function(){
    if(this.state.open){
      this.setState({open: false, text: 'Add a site'})
    } else {
      this.setState({open: true, text: 'Close form'})
    }
  },
  render: function() {
    return (
      <div className="newSite">
        <span onClick={this.toggleForm} className="newSiteButton">{this.state.text}</span>
      </div>
    );
  }
})

