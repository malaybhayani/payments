'use strict';

var AdminSeeder         = require('./seed.admin');
var CategorySeeder       = require('./seed.category');
var SubcategorySeeder       = require('./seed.subcategory');

exports.seedData = (clearFirst = false) => {
    AdminSeeder.seedData(clearFirst);
    //CategorySeeder.seedData(clearFirst);
    //SubcategorySeeder.seedData(clearFirst);
}