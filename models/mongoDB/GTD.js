const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const GTDSchema = mongoose.Schema({
     eventid: Number,
     iyear: Number,
     imonth: Number,
     iday: Number,
     country: Number,
     country_txt: String,
     region: Number,
     region_txt: String,
     provstate: String,
     city: String,
     latitude: Number,
     longitude: Number,
     location: String,
     attacktype1: Number,
     attacktype1_txt: String,
     targtype1: Number,
     targtype1_txt: String,
     gname: String,
     weaptype1: Number,
     weaptype1_txt: String,
     weapsubtype1: Number,
     weapsubtype1_txt: String,
     nkill: Number,
     nwound: Number,
     related: Number
});


module.exports = mongoose.model("gtddatas", GTDSchema, "gtddatas");