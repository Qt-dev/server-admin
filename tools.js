var AJAX = (function(){
  var _request = function(data, complete, error){
    $.ajax({
      url: data.url,
      datatype: data.datatype,
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
      _request({url: "data2.json", datatype: 'json'}, happyCallback, unhappyCallback);
    },
    getSABStatus: function(sab, happyCallback, unhappyCallback){
      var url = sab.link + "/api?mode=qstatus&output=json&apikey=63f498f611d49d9f32d688e2c6dd247d&callback=?"
      //_request({url:url, datatype: 'jsonp'}, happyCallback, unhappyCallback);
      $.getJSON(url)
        .complete(function(data, test){
          console.log(data.responseJSON)
          happyCallback({apidata: data.responseJSON})
        })
        .fail(unhappyCallback);
    }
  }
}())