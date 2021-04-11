const express = require("express");
const GTD = require("../../models/mongoDB/GTD.js");
const Test = require("../../models/mongoDB/test.js");

const router = express.Router();

// Find all GTD data
router.get("/", (req, res) => {
     // res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
     var query1 = GTD.find({}).limit(20);
     query1.exec( function(err, GTD_list) {
          if(err) console.log(err.message);
          res.json(GTD_list);
     });

     // GTD.find({}, function(err, movie_list) {
     //      if(err) console.log(err.message);
     //      // console.log(movie_list);
     //      res.json(movie_list);
     // });

});

// find GTD data by query
router.get("/all", (req, res) =>{
     let condition = req.query;
     console.log(condition);
     var con = JSON.parse(JSON.stringify(condition));
     console.log(con);

     var query = GTD.find(con);
     // console.log(query);
     query.exec((err, result) =>{
          if(err) console.log(err.message);
          res.json(result);
     });
})

// find all GTD data by year
router.get("/year/:iyear", (req, res) =>{
     let iyear = req.params["iyear"];
     var query = GTD.find({iyear}).limit(20);
     query.exec((err, result) =>{
          if(err) console.log(err.message);
          res.json({result, count: result.length});
     });
})

// find all GTD data by month
router.get("/month/:imonth", (req, res) =>{
     let imonth = req.params["imonth"];
     var query = GTD.find({imonth}).limit(20);
     query.exec((err, result) =>{
          if(err) console.log(err.message);
          res.json(result);
     });
})

// find all GTD data by day (optional)
router.get("/day/:iday", (req, res) =>{
     let iday = req.params["iday"];
     var query = GTD.find({iday}).limit(20);
     query.exec((err, result) =>{
          if(err) console.log(err.message);
          res.json(result);
     });
})

// find all GTD data by day (optional)
router.get("/day/:iday", (req, res) =>{
     let iday = req.params["iday"];
     var query = GTD.find({iday}).limit(20);
     query.exec((err, result) =>{
          if(err) console.log(err.message);
          res.json(result);
     });
})

// find all GTD data by country_txt
// router.get("/country/:country_txt", (req, res) =>{
//      let country_txt = req.params["country_txt"];
//      var query = GTD.find({country_txt}).limit(20);
//      query.exec((err, result) =>{
//           if(err) console.log(err.message);
//           res.json(result);
//      });
// })

// find all GTD data by region_txt
router.get("/region/:region_txt", (req, res) =>{
     let region_txt = req.params["region_txt"];
     var query = GTD.find({region_txt}).limit(20); 
     query.exec((err, result) =>{
          if(err) console.log(err.message);
          res.json(result);
     });
})

// Aggregation killed every year per country(memory limit of 33554432 bytes)
router.get("/country", (req, res) =>{
     var query = GTD.aggregate([
          { "$match": { "iyear": {$gt: 2015} }},
          
          {"$group": {
               "_id": {year: "$iyear", country: "$country_txt"},
               totalKill: {"$sum": "$nkill"},
               totalWound: {"$sum": "$nwound"}
          }},
          // { "$sort": { year: -1 } },
     ]); 
     query.exec((err, result) =>{
          if(err) console.log(err.message);
          res.json(result);
     });
})

// http://localhost:5000/api/mongodb/type?type=attacktype1_txt(or targtype1_txt or weaptype1_txt or weapsubtype1_txt)
// Aggregation killed and wounded every attack type
router.get("/type", (req, res) =>{
     let type = req.query.type;
     console.log(type)
     var query = GTD.aggregate([
          // { "$match": { "iyear": {$gt: 2015} }},
          
          {"$group": {
               "_id": {type: "$" + type},
               // typeid : { $first: '$targtype1' },
               totalKill: {"$sum": "$nkill"},
               totalWound: {"$sum": "$nwound"},
               count: { $sum: 1}
          }},
          { "$sort": { count: -1 } },
          // {$count: "totalnumber"}
     ]); 
     query.exec((err, result) =>{
          if(err) console.log(err.message);
          res.json(result);
     });
})

router.post("/", (req, res) => {
     console.log(req.body);
     const name = req.body.name;
     const email = req.body.email;
     const newGTD = new GTD({
          eventid: req.body.eventid,
          iyear: req.body.iyear,
          imonth: req.body.imonth,
          iday: req.body.iday,
          country: req.body.country,
          country_txt: req.body.country_txt,
          region: req.body.region,
          region_txt: req.body.region_txt,
          provstate: req.body.provstate,
          city: req.body.city,
          latitude: req.body.latitude,
          longitude: req.body.longitude,
          location: req.body.location,
          attacktype1: req.body.attacktype1,
          attacktype1_txt: req.body.attacktype1_txt,
          targtype1: req.body.targtype1,
          targtype1_txt: req.body.targtype1_txt,
          gname: req.body.gname,
          weaptype1: req.body.weaptype1,
          weaptype1_txt: req.body.weaptype1_txt,
          weapsubtype1: req.body.weapsubtype1,
          weapsubtype1_txt: req.body.weapsubtype1_txt,
          nkill: req.body.nkill,
          nwound: req.body.nwound,
          related: req.body.related
        });
      
        newGTD
          .save()
          .then(() => res.status(201).json("Add Successfully"))
          .catch(error => res.status(409).json(error.message));
})


module.exports = router;