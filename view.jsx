/**
* @jsx React.DOM
*/
var Content = React.createClass({
  getInitialState: function() {
    return {data: []};
  },
  componentWillMount: function() {
    AJAX.getData(this.setState.bind(this), function(status, error){ console.log(status, error) });
  },
  render: function() {
    if(this.state.data.sites){
      var self = this;
      var boxes = this.state.data.sites.map(function(box){
        var style = {
          backgroundColor: self.state.data.categories[box.category].style,
          color: 'white'
        }

        return <Box name={box.name} description={box.description} style={style}></Box>;
      });
    }

    return (
      <div className="content">
        {boxes}
      </div>
      );
  }
})

var Box = React.createClass({
  render: function() {
    return (
      <div className="box">
        <h3 style={this.props.style}>{this.props.name}</h3>
        <p>{this.props.description}</p>
      </div>
      );
  }
})



React.renderComponent(
  <Content url="data.json" />,
  document.querySelector('body')
);