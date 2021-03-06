describe('The pages controller', function(){
  describe('The index route', function(){
    it('should have an index route', function(){
      expect(pagesController.index).to.exist;
    })
    it('should render the index page', function(){
      response.render = sinon.spy();
      pagesController.index(request, response);
      expect(response.render.called).to.be.true;
      expect(response.render.args[0][0]).to.equal('index');
    })
  })
})