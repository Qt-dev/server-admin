/**
* @jsx React.DOM
*/
var Category = React.createClass({
  getInitialState: function() {
    return {data: []};
  },
  componentWillMount: function() {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  render: function() {
    console.log(this.state.data)
    if(this.state.data.sites){
      var boxes = this.state.data.sites.map(function(box){
        return <Box name={box.name} description={box.description}></Box>;
      })
    }
    
    return (
      <div className="category">
      <h2>{this.props.title}</h2> 
        {boxes}
      </div>
    );
  }
});

var Box = React.createClass({
  render: function() {
    return (
      <div className="box">
        <h3>{this.props.name}</h3>
        <p>{this.props.description}</p>
      </div>
      );
  }
})


React.renderComponent(
  <Category url="data.json" />,
  document.querySelector('body')
);