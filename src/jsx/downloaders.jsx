/**
* @jsx React.DOM
*/
var Downloader = (function(){
  var _boxContent = React.createClass({
    /* REACT */
    render: function(){
      return (
        <div className="boxContent">
          <p>{this.props.description}< /p>
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
      this.props.toggleCallback(this.props.paused);
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
      togglePause: function(paused){
        if(paused){
          this.apiCaller.resume(this.refresh);
        } else {
          this.apiCaller.pause(this.refresh);
        }
      },
      refresh: function() {
        this.apiCaller.getStatus(this.setState.bind(this));
      },
      render: function() {
        if(typeof this.state.data.paused !== 'undefined'){
          var pausedButton = <_pauseToggleButton paused={this.state.data.paused} toggleCallback={this.togglePause} />
        }

        if(!(this.state.data.length)){
          var statusBox = <_statusBox data={this.state.data} />
        }

        return (
          <div className="box">
            <h3 style={this.props.style}>{this.props.data.name}</h3>
            <_boxContent type={this.props.data.type} description={this.props.data.content.description} />
            <BoxFooter buttons={pausedButton} link={this.props.data.content.link} statusBox={statusBox} />
          </div>
          );
      }
    });

    return _box;
}())