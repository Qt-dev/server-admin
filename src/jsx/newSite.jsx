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
    if(this.state.open){
      var form = <NewSiteForm />
    }
    return (
      <div className="newSite">
        <span onClick={this.toggleForm} className="newSiteButton">{this.state.text}</span>
        {form}
      </div>
    );
  }
})

var NewSiteForm = React.createClass({
  handleSubmit: function(e){
    console.log('submitted',e);
  },
  render: function() {
    return (
      <form onSubmit={this.handleSubmit} className="newSiteForm" >
        <input type="text" placeholder="title" />
      </form>
    );
  }
})
