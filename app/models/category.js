var Category = function(){
  var Schema = mongoose.Schema;
  var categorySchema = new Schema({
    idName: {type: String},
    title: {type: String},
    color: [mongoose.model('Color')]
  })
  var _model = mongoose.model('Category', categorySchema);
  return {
    schema: categorySchema,
    model: _model
  }
}()

module.exports = Category;