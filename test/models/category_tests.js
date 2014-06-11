describe('The colors model', function(){
  before(function(){
    Color = require('../../app/models/color');
    Category = require('../../app/models/category');
  })
  it('should exist', function(){
    expect(Category).to.exist;
  })
  it('should have a model and a schema', function(){
    expect(Category.model).to.exist;
    expect(Category.schema).to.exist;
  })
})