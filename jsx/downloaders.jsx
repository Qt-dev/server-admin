/**
* @jsx React.DOM
*/
var Downloader = (function(){
  var _boxContent = React.createClass({
    /* TOOLS */
    refresh: function(){
      this.apiCaller.getStatus(this.setState.bind(this));
    },
    togglePause: function(){
      var data = this.state.data;
      data.paused = !data.paused;
      this.setState(data);
    },
    /* REACT */
    getInitialState: function() {
      return {data: []};
    },
    componentWillMount: function(){
      var data = {
        link: this.props.data.link,
        api: this.props.data.api
      }
      this.type = this.props.type;
      this.apiCaller = new AJAXCaller[this.type](data);


      this.apiCaller.getStatus(this.setState.bind(this));
    },
    render: function(){
      return (
        <div className="boxContent">
          <p>{this.props.data.description}
            <_statusBox data={this.state.data} />
          </p>
          <_boxButtonRow link={this.props.data.link} refreshCallback={this.refresh} paused={this.state.data.paused} apiCaller={this.apiCaller}/>
        </div>)
    }
    
  })

  var _statusBox = React.createClass({
    getInitialState: function(){
      return {data: this.props.data};
    },
    render: function(){
      if(this.props.data.length !==0){
        var apidata = {
          status: this.props.data.state,
          paused: this.props.data.paused,
          speed: this.props.data.speed,
          timeleft: this.props.data.timeleft
        }
        var state = []
        $.each(apidata, function(key,value){
            state.push(<_statusLine key={key} value={value} />)
          })
      }
      return(
        <ul className="statusBox">
        {state}
        </ul>
        )
    }
  })

  var _statusLine = React.createClass({
    render: function(){
      return <li key={this.props.key}><span className="statusTitle">{this.props.key}</span>:<span className="statusValue">{this.props.value.toString()}</span></li>
    }
  })

  var _boxButtonRow = React.createClass({
    getInitialState: function(){
      return {
        paused: this.props.paused
      }
    },
    handlePause: function(e){
      if(this.props.paused){
        this.props.apiCaller.resume(this.props.refreshCallback)
      } else {
        this.props.apiCaller.pause(this.props.refreshCallback)
      }
    },
    render: function(){
      if(this.props.paused){
        var pauseToggleButton = <a className="bottomButton" href="#" onClick={this.handlePause} >Resume <i className="fa fa-play"></i></a>
      } else {
        var pauseToggleButton = <a className="bottomButton" href="#" onClick={this.handlePause} >Pause <i className="fa fa-pause"></i></a>
      }

      return (
      <div className="bottomButtonRow">
        <a className="bottomButton boxGotoLink" href={this.props.link}>Go</a>
        {pauseToggleButton}
      </div>
      )
    }
  })


  return React.createClass({
    render: function() {
      return (
        <div className="box">
          <h3 style={this.props.style}>{this.props.data.name}</h3>
          <_boxContent type={this.props.data.type} data={this.props.data.content} />
        </div>
        );
    }
  })
}())
