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
      _request({url: "/sites", datatype: 'json'}, happyCallback, unhappyCallback);
    },
    request: function(config, happyCallback, unhappyCallback){
      _request(config, happyCallback, unhappyCallback);
    }
  };
}());