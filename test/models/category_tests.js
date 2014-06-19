describe('The Category model', function(){

  beforeEach(function(){
    mongoose.model('Category').remove();
  })

  after(function(done){
    mongoose.model('Color').remove();
    mongoose.model('Category').remove();
    done();
  })


  it('should exist', function(){
    expect(Category).to.exist;
  })

  it('should have a model and a schema', function(){
    expect(Category.model).to.exist;
    expect(Category.schema).to.exist;
  })

  it('should have a findAll that returns an array of the categories', function(done){
    mongoose.model('Category').find({}, function(error, realCategories){
      Category.findAll(function(error, categories){
        expect(error).to.equal(null);
        expect(categories instanceof Array).to.be.true;
        categories.forEach(function(category, index){
          expect(category.title).to.equal(realCategories[index].title);
          expect(category.idName).to.equal(realCategories[index].idName);
          expect(category.color).to.equal(realCategories[index].color.hex);
        })
        done()
      })
    })
  })

  it('should have a find that returns a matching category', function(done){
    mongoose.model('Category').find({}, function(error, realCategories){
      Category.findAll(function(error, categories){
        expect(error).to.equal(null);
        expect(categories instanceof Array).to.be.true;
        categories.forEach(function(category, index){
          expect(category.title).to.equal(realCategories[index].title);
          expect(category.idName).to.equal(realCategories[index].idName);
          expect(category.color).to.equal(realCategories[index].color.hex);
        })
        done()
      })
    })
  })

  it('should have a filterData that filters the data so that it can be read on the frontend', function(done){
    expect(Category.filterData).to.exist;
    mongoose.model('Category').findOne({},function(error, category){
      var result = Category.filterData(category);
      expect(result.title).to.equal(category.title);
      expect(result.idName).to.equal(category.idName);
      expect(result.id).to.equal(category._id);
      expect(result.color).to.equal(category.color.hex);

      done(); 
    })
  })

  it('should allow us to create a Category with all the needed data', function(done){
    var params = {idName:'test', title:'test', color: color}
    mongoose.model('Category').create(params, function(error, category){
      expect(error).to.equal(null);
      expect(category.idName).to.equal('test');
      done();
    })
  })


  describe('validations', function(){
    beforeEach(function(done){
      mongoose.model('Category').remove(done);
    })

    it('should not allow us to create a Category without an idname', function(done){
      var params = {title: 'tester', color: color};
      mongoose.model('Category').create(params, function(error, category){
        expect(error).not.to.equal(null);
        done();
      })
    })

    it('should not allow us to create a Category without a color', function(done){
      var params = {idName: 'test', title: 'tester'};
      mongoose.model('Category').create(params, function(error, category){
        expect(error).not.to.equal(null);
        done();
      })
    })

    it('should not allow us to create a Category without a title', function(done){
      var params = {idName: 'test', color: color};
      mongoose.model('Category').create(params, function(error, category){
        expect(error).not.to.equal(null);
        done();
      })
    })

    it('should not allow us to create a Category with the same title twice', function(done){
      var params = {idName: 'test', title: 'test', color: color};
      mongoose.model('Category').create(params, function(error, category){
        expect(error).to.equal(null);
        params.idName = 'test2' // We change the idName just in case of uniqueness validation here too
        mongoose.model('Category').create(params, function(suberror, subcategory){
          expect(suberror).not.to.equal(null);
          done();
        })
      })
    })

    it('should not allow us to create a Category with the same idName twice', function(done){
      var params = {idName: 'test', title: 'test', color: color};
      mongoose.model('Category').create(params, function(error, category){
        expect(error).to.equal(null);
        params.title = 'test2' // We change the idName just in case of uniqueness validation here too
        mongoose.model('Category').create(params, function(suberror, subcategory){
          expect(suberror).not.to.equal(null);
          done();
        })
      })
    })
  })
})