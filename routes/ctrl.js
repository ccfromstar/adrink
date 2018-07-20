module.exports = function (app, routes) {
	//front
    //app.get('/',routes.checkuserLogin);
    app.get('/',routes.index);

    /*
    app.get('/option1',routes.checkuserLogin);
    app.get('/option1',routes.option1);

    app.get('/booking',routes.checkuserLogin);
    app.get('/booking',routes.booking_front);

    app.get('/option2',routes.checkuserLogin);
    app.get('/option2',routes.option2);

    app.get('/reg',routes.checkuserLogin);
    app.get('/reg',routes.reg);

    app.get('/bookingsuccess',routes.checkuserLogin);
    app.get('/bookingsuccess',routes.bookingsuccess);*/

    //app.post('/uploadImg',routes.uploadImg);
    
    //app.get('/view_news',routes.erp_view_news);

    app.get('/erp',routes.erp_home);

    app.get('/getopenid',routes.getopenid);
    app.post('/service/:sql',routes.servicedo);
    app.get('/erp/role',routes.erp_role);
    app.get('/erp/view_news',routes.erp_view_news);
    app.get('/erp/view_product',routes.erp_view_product);

    app.get('/news',routes.news);
    app.post('/news/:sql',routes.newsdo);

    app.get('/product',routes.product);
    app.post('/product/:sql',routes.productdo);

    app.get('/erp/view_booking',routes.booking);
    app.post('/erp/booking/:sql',routes.bookingdo);

    app.get('/erp/view_user',routes.view_user);
    //app.post('/erp/user/:sql',routes.userdo);

    app.get('/erp/view_tj',routes.view_tj);
    //app.post('/erp/tj/:sql',routes.tjdo);

    app.get('/_upload',routes._upload);
    app.get('/_uploadsuccess',routes._uploadsuccess);
    app.post('/_uploaddo',routes._uploaddo);
    app.post('/uploadImg',routes.uploadImg);
};