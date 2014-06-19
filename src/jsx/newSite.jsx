/**
* @jsx React.DOM
*/

var TYPES = {
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
        config: ['url']
      }
    }

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
  generateTypeOptions: function(){
    var options = [];
    for(var type in TYPES){
      options.push(<option value={TYPES[type].title}>{TYPES[type].title}</option>);
    }
    return options
  },
  generateConfig: function(){
    var type = TYPES[this.state.type];
    var fields = type.config.map(function(configField){
      var name = '[config]'+configField;
      return <input type="text" required name={name} placeholder={configField} />
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
    var typeOptions = this.generateTypeOptions();
    var config = this.generateConfig();
    return (
      <form onSubmit={this.props.handleSubmit} className="newSiteForm" >
        <input type="text" name="title" placeholder="title" required />
        <select name="type" required onChange={this.handleChangeType}>
          <option disabled value="">Select a type</option>
          {typeOptions}
        </select>
        <input type="text" name="description" placeholder="description" />
        {config}
        <input type="submit" value="Create" />
      </form>
    );
  }
})
