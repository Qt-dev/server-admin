describe('The Site model', function(){

  beforeEach(function(){
  })

  after(function(done){
    mongoose.model('Color').remove();
    mongoose.model('Category').remove();
    done();
  })


  it('should exist', function(){
    expect(Site).to.exist;
  })

  it('should have a model and a schema', function(){
    expect(Site.model).to.exist;
    expect(Site.schema).to.exist;
  })

  it('should have a findAll that returns an array of the sites')

  it('should allow us to create a Site with all the needed data')


  describe('validations', function(){
    beforeEach(function(done){
      mongoose.model('Site').remove(done);
    })
  })
})