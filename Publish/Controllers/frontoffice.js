var express = require('express');
var router = express.Router();
const path = require('path');

var Song = require("../Models/Song.js");
var homeRoutes = ['/Home','/']
router.get(homeRoutes, function (req, res) {  

    Song.top('title',' DESC', 5,
   
        (rows)=>{      
            console.log(rows)

            res.render('home.mustache',  {
                rows: rows.map(obj => {
                    return { properties: Object.keys(obj).map(key => {
                        return {
                            name: key,
                            value: obj[key]
                        }
                    })
                }}),
                columns: Object.keys(new Song()).map(key => {
                    return { name: key }
                }),
            })
        }
    );

});
module.exports = router;
