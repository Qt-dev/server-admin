describe('The Category model', function(){
  before(function(done){
    // Color model initialization
    Color = require('../../app/models/color');

    // Category model initialization
    Category = require('../../app/models/category');
    
    // Color instantiation
    color = ""  
    mongoose.model('Color').create({title: 'black', hex: '#000'}, function(err, created){
      if(!err){
        color = created;
      }
      done();
    });
  })

  afterEach(function(){
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