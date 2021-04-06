const express = require("express");
const GTD = require("../../models/mongoDB/GTD.js");
const Test = require("../../models/mongoDB/test.js");

const router = express.Router();


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

router.get("/test", (req, res) => {
     console.log("ssdsadsadas")
     // try{
     //      const result = Test.find({});
     //      console.log(result);
     //      res.json(result)
     // }
     // catch(err){
     //      res.status(500).send("server error");
     // }
     Test.find({}, function(err, movie_list) {
          if(err) console.log(err.message);
          console.log(movie_list);
          res.json(movie_list);
     });
});

router.post("/test", (req, res) => {
     console.log(req.body);
     const name = req.body.name;
     const email = req.body.email;
     const newTest = new Test({
          email,
          name
        });
      
        newTest
          .save()
          .then(() => res.status(201).json("Add Successfully"))
          .catch(error => res.status(409).json(error.message));
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