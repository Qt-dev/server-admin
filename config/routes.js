var controllerFolder = '../app/controllers/'

var pages = require(controllerFolder + 'pages')
var sites = require(controllerFolder + 'sites');
var categories = require(controllerFolder + 'categories');
var apis = require(controllerFolder + 'apis');

var router = require('express').Router();

/* GET home page. */
router.get('/', pages.index);
router.get('/sites', sites.index);
router.post('/sites', sites.create);
router.delete('/sites/:id', sites.delete);
router.get('/categories', categories.index);
router.get('/categories/:id', categories.show)
router.get('/apis/query', apis.query)

module.exports = router;