var AJAX = (function(){
  var _request = function(data, complete, error){
    $.ajax({
      url: data.url,
      dataType: 'json',
      success: function(data) {
        complete({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        error(status, err.toString());
      }
    });
  }

  return {
    getData: function(happyCallback, unhappyCallback){
      _request({url: "data.json"}, happyCallback, unhappyCallback);
    }
  }
}())