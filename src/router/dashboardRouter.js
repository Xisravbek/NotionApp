const express = require('express')

const router = express.Router();
const isLogin = require("../middleware/checkAuth");
const dashboardCtrl = require('../controller/dashboardCtrl');

router.get('/dashboard', isLogin, dashboardCtrl.dashboard);
router.post('/dashboard/update/:id',  isLogin, dashboardCtrl.updateNotion )
router.get('/dashboard/add', isLogin , dashboardCtrl.addPage);
router.post('/dashboard/add', isLogin , dashboardCtrl.createNotion);
router.get('/dashboard/item/:id', isLogin , dashboardCtrl.viewNotion)
router.get('/dashboard/search' , isLogin , dashboardCtrl.searchPage)
router.post('/dashboard/search' , isLogin , dashboardCtrl.searchResultPage);
router.get('/dashboard/delete/:id', isLogin, dashboardCtrl.deleteNotion)

module.exports = router;