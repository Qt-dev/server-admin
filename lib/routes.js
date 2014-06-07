var controllerFolder = '../app/controllers/'

var pages = require(controllerFolder + 'pages')
var sites = require(controllerFolder + 'sites');
var categories = require(controllerFolder + 'categories');

var router = require('express').Router();

/* GET home page. */
router.get('/', pages.index);
router.get('/sites', sites.index);
router.get('/categories', categories.index);
router.get('/categories/:id', categories.show)

module.exports = router;
