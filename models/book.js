
module.exports = function(mongoose) {
  const bookSchema = new mongoose.Schema({
    title: {
      type: String,
      required: true,
    },
    comments: {
      type: [String],
      required: true,
    },
  }, {
    versionKey: false, // You should be aware of the outcome after set to false
  });

  return mongoose.model('Book', bookSchema);
};
