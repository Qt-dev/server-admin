/**
* @jsx React.DOM
*/
var Content = React.createClass({
  /* TOOLS */
  buildBoxes: function(data){
    var categories = data.categories
    if(data.sites){
      var boxes = data.sites.map(function(box){
        var style = {
          backgroundColor: categories[box.category].style,
          color: 'white'
        }
        var data = {
          name: box.name,
          type: box.type,
          content: {
            description: box.description,
            url: box.url,
            apiKey: box.apiKey
          }
        }
        
        if(box.type == 'sabnzbd'){
          return <Downloader data={data} key={box.id} style={style}></Downloader>
        } else if(box.type === 'sickbeard') {
          return <Sickbeard data={data} key={box.id} style={style} />
        } else {
          return <Box data={data} key={box.id} style={style}></Box>
        }
      });
    }
    return boxes
  },
  /* REACT METHODS */
  getInitialState: function() {
    return {data: []};
  },
  componentWillMount: function() {
    AJAX.getData(this.setState.bind(this), function(status, error){ console.log(status, error) });
  },
  render: function() {
    var boxes = this.buildBoxes(this.state.data)

    return (
      <div className="content">
        {boxes}
      </div>
      );
  }
})





window.onload = function(){
  React.renderComponent(
    <Content url="data.json" />,
    document.querySelector('body')
);
}