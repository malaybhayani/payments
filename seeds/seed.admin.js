'use strict';

var moment       = require('moment');
var async = require('async');
var Model        = require('../models/user');

exports.seedData = (clearFirst = false) => {
    if(clearFirst)
    {
        Model.deleteMany({}, function() {});
    }
    async.eachSeries(data, function itrate(d, asynccb) {
        Model.find({'username' : d.username}).exec(function (err, collection) {
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
        username: "superadmin@admin.com",
        password: "123456",
        first_name:"Super",
        last_name: "Admin",
        role: "super_admin",
        created_at: now
    },
    {
        username: "admin@admin.com",
        password: "123456",
        first_name:"Admin",
        last_name: "Admin",
        role: "admin",
        created_at: now
    }
];