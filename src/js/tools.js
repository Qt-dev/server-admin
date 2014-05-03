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
};

SABNZBD.prototype = {
  // Tools
  unhappyCallback: function(status, error){
    console.log(status, error);
  },
  buildURL: function(mode){
    return 'sabnzbd/'+mode;
  },
  addReaderToCallback: function(callback){
    var newCallback = function(data){
      this.paused = data.data.paused;
      callback(data);
      console.log("API Response",data);
    };
    return newCallback;
  },
  getAPICall: function(url, callback){
    AJAX.request({
        url:url,
        datatype: 'json',
        data: {api: this.api, url: this.link}
      }, callback, this.unhappyCallback);
  },
  // Main method - 'The switch'
  sendRequest: function(mode, happyCallback){
    var url = this.buildURL(mode);
    var callback = this.addReaderToCallback(happyCallback);
    this.getAPICall(url, callback.bind(this));
  },
  // Interface
  getStatus: function(happyCallback){
    this.sendRequest('status', happyCallback);
  },
  pause: function(happyCallback){
    this.sendRequest('pause', happyCallback);
  },
  resume: function(happyCallback){
    this.sendRequest('resume', happyCallback);
  }
};

var AJAXCaller = {
  "sabnzbd": SABNZBD
};
