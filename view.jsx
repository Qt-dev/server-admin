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
          content: {
            description: box.description,
            link: box.link
          }
        }
        return <Box data={data} key={box.id} style={style}></Box>;
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

var Box = React.createClass({
  getInitialState: function() {
    return {apidata: []};
  },
  componentWillMount: function() {
    AJAX.getSABStatus(this.props.data.content, this.setState.bind(this), function(status, error){ console.log(status, error) });
  },
  render: function() {
    if(this.state.apidata.length !== 0){
      var state = {
        status: this.state.apidata.state,
        paused: this.state.apidata.paused,
        speed: this.state.apidata.speed,
        timeleft: this.state.apidata.timeleft
      }
    }

    return (
      <div className="box">
        <h3 style={this.props.style}>{this.props.data.name}</h3>
        <BoxContent data={this.props.data.content} state={state}/>
      </div>
      );
  }
})

var BoxContent = React.createClass({
  render: function(){
    if(this.props.state){
      var state = []
      $.each(this.props.state, function(key,value){
          var text = key.toString() +' - '+ value.toString()
          console.log(text)
          state.push(<li>{text}</li>)
        })
    }
    
    return (
      <div className="boxContent">
        <p>{this.props.data.description}
          <ul>{state}</ul>
        </p>
        <a className="boxGotoLink" href={this.props.data.link}>Go</a>
      </div>)
  }
  
})



React.renderComponent(
  <Content url="data.json" />,
  document.querySelector('body')
);