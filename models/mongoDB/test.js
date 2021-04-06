const mongoose = require("mongoose");

const TestSchema = mongoose.Schema({
     email: String,
     name: String,
});

module.exports = mongoose.model("Test", TestSchema);

// const mongoose = require("mongoose");

// const authorSchema = mongoose.Schema({
//   name: String,
//   email: String
// });

// module.exports = mongoose.model("AuthorInfo", authorSchema);