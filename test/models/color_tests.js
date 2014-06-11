describe('The colors model', function(){
  before(function(){
    Color = require('../../app/models/color');
  })
  afterEach(function(){
    Color.model.find().remove();
  })
  it('should exist', function(){
    expect(Color).to.exist;
  })
  it('should have a model and a schema', function(){
    expect(Color.model).to.exist;
    expect(Color.schema).to.exist;
  })
  it('should allow us to create a Color with hex and title', function(done){
    var params = {title: 'white', hex: '#FFF'}
    mongoose.model('Color').create(params, function(error, color){
      expect(error).to.equal(null);
      expect(color.title).to.equal('white');
      expect(color.hex).to.equal('#FFF');
      done();
    });
  })
  describe('validations', function(){
    it('should not allow us to create a Color with no title', function(done){
      var params = {hex: '#000'};
      mongoose.model('Color').create(params, function(error, color){
        expect(error).not.to.equal(null);
        done();
      });
    })
    it('should not allow us to create a Color with no hex', function(done){
      var params = {title: 'black'};
      mongoose.model('Color').create(params, function(error, color){
        expect(error).not.to.equal(null);
        done();
      });
    })
    it('should not allow us to create 2 Colors with the same title', function(done){
      var params = {title: 'blue', hex:'#F00'};
      mongoose.model('Color').create(params, function(error, color){
        expect(error).to.equal(null);
        mongoose.model('Color').create(params, function(suberror, subcolor){
          expect(suberror).not.to.equal(null);
          done();
        });
      });
    })
  })
})