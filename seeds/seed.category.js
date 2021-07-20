'use strict';

var moment       = require('moment');
var async = require('async');
var Model        = require('../models/category');
var SubcategoryModel        = require('../models/subCategory');

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
            async.eachSeries(data.subCategories, function itrate(sc, asynccb) {
                SubcategoryModel.find({'name.en' : sc.name.en}).exec(function (err, collection) {
                    if (collection.length === 0) {
                        SubcategoryModel.create(d);
                    }
                    asynccb(null);
                });
            }, function done(err) {
                
            });
            asynccb(null);
        });
    }, function done(err) {
        
    });
    
}

var now = moment().toISOString();

var data = [
    {
        name: {
            en: "Improved seeds",
            am: ""
        },
        created_at: now,
        subCategories: [{
            name: {
                en: "Oil Seeds",
                am: ""
            },
            created_at: now
            },
            {
                name: {
                    en: "Cotton",
                    am: ""
                },
                created_at: now
            }
        ]
    },
    {
        name: {
            en: "Land",
            am: ""
        },
        created_at: now,
        subCategories: [{
            name: {
                en: "Manufacturing",
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
            }
        ]
    },
    {
        name: {
            en: "Water",
            am: ""
        },
        created_at: now
    },
    {
        name: {
            en: "Irrigation",
            am: ""
        },
        created_at: now
    }
];