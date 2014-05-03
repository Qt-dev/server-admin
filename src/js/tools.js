var AJAX = (function(){
  var _request = function(data, complete, error){
    $.ajax({
      url: data.url,
      datatype: data.datatype,
      data: data.data || null,
      success: function(data) {
        complete({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        error(status, err.toString());
      }
    });
  };

  return {
    getData: function(happyCallback, unhappyCallback){
      _request({url: "data.json", datatype: 'json'}, happyCallback, unhappyCallback);
    },
    request: function(config, happyCallback, unhappyCallback){
      _request(config, happyCallback, unhappyCallback);
    }
  };
}());




var SABNZBD = function(opts){
  this.link = opts.link;
  this.api = opts.api;
  this.paused = false;
  this.mode = {
    status: 'qstatus',
    pause: 'pause',
    resume: 'resume'
  };
};

SABNZBD.prototype = {
  // Tools
  buildURL: function(mode){
    return this.link + '/api?mode='+ this.mode[mode] +'&output=json&apikey='+ this.api;
  },
  getAPICall: function(url, callback){
    var inputData = {
        api: this.api,
        url: this.link
      };
    AJAX.request({url:url, datatype: 'json', data: inputData}, callback, this.unhappyCallback);
  },
  unhappyCallback: function(status, error){
    console.log(status, error);
  },
  addReadToCallback: function(callback){
    var newCallback = function(data){
      this.paused = data.data.paused;
      callback(data);
      console.log("API Response",data);
    };
    return newCallback;
  },
  // Interface
  getStatus: function(happyCallback){
    var url = '/sabnzbd/status';
    var callback = this.addReadToCallback(happyCallback);
    this.getAPICall(url, callback.bind(this));
  },
  pause: function(happyCallback){
    var url = '/sabnzbd/pause';
    var callback = this.addReadToCallback(happyCallback);
    this.getAPICall(url, callback.bind(this));
  },
  resume: function(happyCallback){
    var url = '/sabnzbd/resume';
    var callback = this.addReadToCallback(happyCallback);
    this.getAPICall(url, callback.bind(this));
  }
};

var AJAXCaller = {
  "sabnzbd": SABNZBD
};
