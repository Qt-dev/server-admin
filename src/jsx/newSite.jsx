/**
* @jsx React.DOM
*/

var AddSiteBox = React.createClass({
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
        <AddSiteButton toggleForm={this.toggleForm} text={this.state.text} />
        {form}
      </div>
    );
  }
})

var AddSiteButton = React.createClass({
  render: function() {
    return (
      <span onClick={this.props.toggleForm} className="newSiteButton">{this.props.text}</span>
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
