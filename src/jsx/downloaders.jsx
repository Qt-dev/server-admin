/**
* @jsx React.DOM
*/
var Downloader = (function(){
  var _boxContent = React.createClass({
    render: function(){
      return (
        <div className="boxContent">
          <h4>Queue</h4>
          <ul className="queue">{this.props.queue}< /ul>

          <h4>History</h4>
          <ul className="history">{this.props.history}< /ul>
        </div>)
    }
  })

  var _statusLine = React.createClass({
    render: function(){
      if(this.props.data.length !==0){
        var apidata = {
          status: this.props.data.status,
          speed: this.props.data.speed,
          timeleft: this.props.data.timeleft
        }
        var status = []
        $.each(apidata, function(key,value){
            status.push(<StatusLine key={key} value={value} />)
          })
      }
      return(
        <ul className="statusBox">
        {status}
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
    handleClick: function(e){
      this.props.callback(this.props.paused);
    },
    render: function(){
      if(this.props.paused){
        return <a className="bottomButton" href="#" onClick={this.handleClick} >Resume <i className="fa fa-play"></i></a>
      } else {
        return <a className="bottomButton" href="#" onClick={this.handleClick} >Pause <i className="fa fa-pause"></i></a>
      }
    }
  })

  var _cleanButton = React.createClass({
    handleClick: function(){
      this.props.callback();
    },
    render: function(){
      return <a className="bottomButton" href="#" onClick={this.handleClick} >Clean History</a>
    }
  })

  var _box = React.createClass({
      /* Callbacks */
      togglePause: function(paused){
        if(paused){
          this.apiCaller.resume(this.refresh);
        } else {
          this.apiCaller.pause(this.refresh);
        }
      },
      cleanHistory: function(){
        this.apiCaller.cleanHistory(this.refresh);
      },

      /* Tools */
      refresh: function() {
        this.apiCaller.getStatus(this.setState.bind(this));
      },
      buildQueue: function() {
        var queue = this.state.data.queue.map(function(item){
            return (<li>
                      <span className="title">{item.name}</span> 
                      <span className="percentage">{item.percentage}%</span>
                      <span className="eta">ETA:{item.eta}</span>
                    </li>);
          });
        return queue;
      },
      buildHistory: function() {
        var history = this.state.data.history.map(function(item){
            return (<li>
                      <span className="title">{item.name}</span>
                      <span className="status">{item.status}</span>
                      <span className="failMessage">{item.fail_message}</span>
                    </li>);
          });
        return history;
      },

      /* REACT */
      getInitialState: function() {
        return {data: []};
      },
      componentWillMount: function(){
        var data = {
          url: this.props.data.content.url,
          apiKey: this.props.data.content.apiKey
        }
        this.apiCaller = new AJAXCaller[this.props.data.type](data);
        this.apiCaller.getStatus(this.setState.bind(this));
        window.setInterval(this.refresh, 5000);
      },
      render: function() {
        var cleanButton = <_cleanButton callback={this.cleanHistory} />;

        if(typeof this.state.data.status !== 'undefined'){
          var pausedButton = <_pauseToggleButton paused={this.state.data.status.paused} callback={this.togglePause} />
        }

        if(this.state.data.length !== 0){
          var statusBox = <_statusLine data={this.state.data.status} />
          var queue = this.buildQueue();
          var history = this.buildHistory();
        }

        return (
          <div className="box">
            <h3 style={this.props.style}>{this.props.data.name}</h3>
            <_boxContent queue={queue} history={history} type={this.props.data.type} description={this.props.data.content.description} />
            <BoxFooter buttons={[pausedButton, cleanButton]} link={this.props.data.content.url} statusBox={statusBox} />
          </div>
          );
      }
    });

    return _box;
}())