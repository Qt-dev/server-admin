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
  this.url    = opts.url;
  this.apiKey = opts.apiKey;
  this.paused = false;
};

SABNZBD.prototype = {
  // Tools
  unhappyCallback: function(status, error){
    console.log(status, error);
  },
  buildURL: function(){
    return 'sabnzbd/query';
  },
  addReaderToCallback: function(callback){
    var newCallback = function(data){
      this.paused = data.data.paused;
      callback(data);
      console.log("API Response",data);
    };
    return newCallback;
  },
  getAPICall: function(url, mode, callback){
    AJAX.request({
        url:url,
        datatype: 'json',
        data: {key: this.apiKey, url: this.url, action: mode}
      }, callback, this.unhappyCallback);
  },
  // Main method - 'The switch'
  sendRequest: function(mode, happyCallback){
    var url = this.buildURL();
    var callback = this.addReaderToCallback(happyCallback);
    this.getAPICall(url, mode, callback.bind(this));
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
  },
  cleanHistory: function(happyCallback){
    this.sendRequest('clean', happyCallback);
  }
};

var AJAXCaller = {
  "sabnzbd": SABNZBD
};
