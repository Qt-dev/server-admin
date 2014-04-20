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
            link: box.link,
            api: box.API
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
    return {data: []};
  },
  componentWillMount: function() {
    //AJAX.getSABStatus(this.props.data.content, this.setState.bind(this), function(status, error){ console.log(status, error) });
  },
  render: function() {
    if(this.state.data.length !== 0){
      var state = {
        status: this.state.data.state,
        paused: this.state.data.paused,
        speed: this.state.data.speed,
        timeleft: this.state.data.timeleft
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
  getInitialState: function() {
    return {data: []};
  },
  componentWillMount: function(){
    console.log("props", this.props)
    var data = {
      link: this.props.data.link,
      api: this.props.data.api
    }
    this.sabnzbd = new SABNZBD(data)
    this.sabnzbd.getStatus(this.setState.bind(this));
  },
  render: function(){
    if(this.state.data.length !== 0){
      var apidata = {
        status: this.state.data.state,
        paused: this.state.data.paused,
        speed: this.state.data.speed,
        timeleft: this.state.data.timeleft
      }
      var state = []
      $.each(apidata, function(key,value){
          state.push(<li key={key}><span className="statusTitle">{key}</span>:<span className="statusValue">{value.toString()}</span></li>)
        })
    }
    
    if(this.paused){
      var pauseToggle = <a className="bottomButton" >Resume <i className="fa fa-play"></i></a>
    } else {
      var pauseToggle = <a className="bottomButton" >Pause <i className="fa fa-pause"></i></a>
    }
    return (
      <div className="boxContent">
        <p>{this.props.data.description}
          <ul className="status">{state}</ul>
        </p>
        <div className="bottomButtonRow">
          <a className="bottomButton boxGotoLink" href={this.props.data.link}>Go</a>
          {pauseToggle}
        </div>
      </div>)
  }
  
})



React.renderComponent(
  <Content url="data.json" />,
  document.querySelector('body')
);