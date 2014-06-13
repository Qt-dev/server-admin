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
  generateTypeOptions: function(types){
    return types.map(function(type){
                      return <option value={type}>{type}</option>;
                    });
  },
  generateCategoryOptions: function(categories){
    return categories.map(function(category){
                      return <option value={category}>{category}</option>;
                    });
  },
  render: function() {
    var types = ['Sabnzbd','Transmission','Sickbeard','Couchpotato']
    var categories = ['Downloader', 'Download Manager', 'Other']
    var typeOptions = this.generateTypeOptions(types);
    var categoryOptions = this.generateCategoryOptions(categories);
    return (
      <form onSubmit={this.handleSubmit} className="newSiteForm" >
        <input type="text" placeholder="title" required />
        <select type="type" defaultValue="default">
          <option disabled value="default">Select a type</option>
          {typeOptions}
        </select>
        <select type="category" defaultValue="default">
          <option disabled value="default">Select a category</option>
          {categoryOptions}
        </select>
        <input type="text" placeholder="description" />
      </form>
    );
  }
})
