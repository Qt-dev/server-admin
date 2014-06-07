describe('The API controller', function(){
  describe('query route', function(){
    before(function(){
      testAPIMock = {
        query: function(req, res){
          return {ok: true}
        }
      }
      sinon.spy(testAPIMock, 'query');
      apiController = proxyquire('../app/controllers/apis',{ '../../lib/apis/sickbeard': testAPIMock });
    })

    it('should exist', function(){
      expect(apiController.query).to.exist;
    })
    it('should call the corresponding api file', function(){
      request.query = { app: 'sickbeard' }
      response.json = function(){}

      apiController.query(request,response)
      expect(testAPIMock.query.called).to.be.true
    })
  })
})