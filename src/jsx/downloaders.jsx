/**
* @jsx React.DOM
*/
var Downloader = (function(){
  var _boxContent = React.createClass({
    /* REACT */
    render: function(){
      return (
        <div className="boxContent">
          <p>{this.props.data.description}
            <_statusBox data={this.props.data} />
          </p>
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
            state.push(<StatusLine key={key} value={value} />)
          })
      }
      return(
        <ul className="statusBox">
        {state}
        </ul>
        )
    }
  })


  var _pauseToggleButton = React.createClass({
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
        return <a className="bottomButton" href="#" onClick={this.handlePause} >Resume <i className="fa fa-play"></i></a>
      } else {
        return <a className="bottomButton" href="#" onClick={this.handlePause} >Pause <i className="fa fa-pause"></i></a>
      }
    }
  })

  var _box = React.createClass({

      getInitialState: function() {
        return {data: []};
      },
      componentWillMount: function(){
        var data = {
          link: this.props.data.content.link,
          api: this.props.data.content.api
        }
        this.apiCaller = new AJAXCaller[this.props.data.type](data);
        this.apiCaller.getStatus(this.setState.bind(this));
      },

      refresh: function() {
        this.apiCaller.getStatus(this.setState.bind(this));
      },
      togglePause: function() {
        var data = this.state.data;
        data.paused = !data.paused;
        this.setState({data: data});
      },
      render: function() {
        if(typeof this.state.data.paused !== 'undefined'){
          var pausedButton = <_pauseToggleButton paused={this.state.data.paused} refreshCallback={this.refresh} />
        }

        return (
          <div className="box">
            <h3 style={this.props.style}>{this.props.data.name}</h3>
            <_boxContent type={this.props.data.type} data={this.state.data} />
            <BoxButtonRow buttons={pausedButton} link={this.props.data.content.link} />
          </div>
          );
      }
    });

    return _box;
}())