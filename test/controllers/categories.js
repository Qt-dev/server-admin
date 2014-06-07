var categoriesController = require('../../app/controllers/categories');

describe('The Categories controller', function(){
  describe('the index route', function(){
    it('should exist', function(){
      expect(categoriesController.index).to.exist;
    })
    it('should render a json array', function(){
      response.json = sinon.spy();
      categoriesController.index(request, response);

      expect(response.json.called).to.be.true;
      expect(response.json.args[0][0] instanceof Array).to.be.true
    })
  })
  describe('the show route', function(){
    it('should exist', function(){
      expect(categoriesController.show).to.exist;
    })
    it('should render a json object', function(){
      request.params = { id: 0 }
      response.json = sinon.spy();
      categoriesController.show(request, response);

      expect(response.json.called).to.be.true;
      expect(response.json.args[0][0] instanceof Array).to.be.false
    })
  })
})