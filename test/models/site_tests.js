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

  it('should allow us to create a Site with all the needed data', function(done){
    var params = {
      title: 'test',
      type: 'test-site',
      description: 'testing app',
      config: {url: 'http://test.com', apiKey: '111222'},
      category: category
    }
    mongoose.model('Site').create(params, function(error, site){
      expect(error).to.equal(null);
      expect(site.title).to.equal(params.title);
      expect(site.type).to.equal(params.type);
      expect(site.description).to.equal(params.description);
      expect(site.config).to.equal(params.config);
      expect(site.category).to.equal(params.category);

      done();
    })
  })

  it('should have a findAll that returns an array of the sites')

  describe('validations', function(){
    beforeEach(function(done){
      mongoose.model('Site').remove(done);
    })
  })
})