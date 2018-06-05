module.exports = function (app, routes) {
    //app.post('/uploadImg',routes.uploadImg);
    app.get('/erp',routes.erp_home);
    app.get('/getopenid',routes.getopenid);
    app.post('/service/:sql',routes.servicedo);
};