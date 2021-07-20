'use strict';

var moment       = require('moment');
var async = require('async');
var Model        = require('../models/subCategory');

exports.seedData = (clearFirst = false) => {
    if(clearFirst)
    {
        Model.deleteMany({}, function() {});
    }
    async.eachSeries(data, function itrate(d, asynccb) {
        Model.find({'name.en' : d.name.en}).exec(function (err, collection) {
            if (collection.length === 0) {
                Model.create(d);
            }
            asynccb(null);
        });
    }, function done(err) {
        
    });
    
}

var now = moment().toISOString();

var data = [
    {
        name: {
            en: "ICT",
            am: ""
        },
        created_at: now
    },
    {
        name: {
            en: "Trading",
            am: ""
        },
        created_at: now
    },
    {
        name: {
            en: "Manufacturing",
            am: ""
        },
        created_at: now
    },
    {
        name: {
            en: "Education",
            am: ""
        },
        created_at: now
    }
];