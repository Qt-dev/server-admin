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
  getInitialState: function(e){
    return {type: 'others'};
  },
  handleSubmit: function(e){
    e.preventDefault();
    var formValue = $(e.target).serialize();
    // Make ajax request that triggers a refresh of the page
  },
  generateTypeOptions: function(types){
    var options = [];
    for(var type in types){
      options.push(<option value={types[type].title}>{types[type].title}</option>);
    }
    return options
  },
  generateConfig: function(types){
    var type = types[this.state.type];
    var fields = type.config.map(function(configField){
      return <input type="text" required name={configField} placeholder={configField} />
    })
    return(
      <div>
        {fields}
      </div>
      );
  },
  handleChangeType: function(e){
    this.setState({type: e.target.value});
  },
  render: function() {
    var types = {
      sabnzbd: {
        title: 'sabnzbd',
        category: 'downloader',
        config: ['url', 'apiKey']
      },
      transmission: {
        title: 'transmission',
        category: 'downloader',
        config: ['host', 'url', 'username','password']
      },
      sickbeard: {
        title: 'sickbeard',
        category: 'download-manager',
        config: ['url', 'apiKey']
      },
      couchpotato: {
        title: 'couchpotato',
        category: 'download-manager',
        config: ['url', 'apiKey']
      },
      others: {
        title: 'others',
        category: 'other',
        config: []
      }
    }
    var typeOptions = this.generateTypeOptions(types);
    var config = this.generateConfig(types);
    return (
      <form onSubmit={this.handleSubmit} className="newSiteForm" >
        <input type="text" name="title" placeholder="title" required />
        <select name="type" defaultValue="default" onChange={this.handleChangeType}>
          <option disabled value="default">Select a type</option>
          {typeOptions}
        </select>
        <input type="text" name="description" placeholder="description" />
        {config}
        <input type="submit" value="Create" />
      </form>
    );
  }
})
