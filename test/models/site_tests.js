describe('The Site model', function(){


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

  it('should have a findAll that returns an array of the sites', function(done){
    mongoose.model('Site').find({}, function(error, realSites){
      Site.findAll(function(error, sites){
        expect(error).to.equal(null);
        expect(sites instanceof Array).to.be.true;
        sites.forEach(function(site, index){
          expect(site.title).to.equal(realSites[index].title);
          expect(site.type).to.equal(realSites[index].type);
          expect(site.description).to.equal(realSites[index].description);
          expect(site.config.url).to.equal(realSites[index].config.url);
          expect(site.category).to.equal(category.idName);
        })
        done()
      })
    })
  })

  it('should have a filterData that filters the data so that it can be read on the frontend', function(done){
    expect(Site.filterData).to.exist;
    mongoose.model('Site').findOne({},function(error, site){
      var result = Site.filterData(site);
      expect(result.title).to.equal(site.title);
      expect(result.id).to.equal(site._id);
      expect(result.type).to.equal(site.type);
      expect(result.config).to.equal(site.config);
      expect(result.description).to.equal(site.description);
      var category = Category.filterData(site.category);
      expect(result.category).to.equal(category.idName);
      done(); 
    })
  })

  describe('validations', function(){
    beforeEach(function(done){
      mongoose.model('Site').remove(done);
    })
    it('should not allow us to create a site without a title', function(done){
      var params = {
        type: 'test-site',
        description: 'testing app',
        config: {url: 'http://test.com', apiKey: '111222'},
        category: category
      }
      mongoose.model('Site').create(params, function(error, site){
        expect(error).not.to.equal(null);
        done();
      })
    })
  })
})