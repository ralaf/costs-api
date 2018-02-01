module.exports = function (app, passport) {

    // =====================================
    // HOME PAGE (with login links) ========
    // =====================================
    app.get('/', function (req, res, next) {
        res.status(200).json({message: 'success'});
        next();
    });

    app.post('/login', function (req, res, next) {
        passport.authenticate('local-login', function (err, user, info) {
            console.log(err, info);
            res.status(info.status).json({message: info.message});
        })(req, res, next);
    });


    // process the login form
    // app.post('/login', passport.authenticate('local-login', {
    //     failWithError: true
    //     // successRedirect : '/profile', // redirect to the secure profile section
    //     // failureRedirect : '/login', // redirect back to the signup page if there is an error
    //     // failureFlash : true // allow flash messages
    // }), function (req, res, next) {
    //
    // }, function (err, req, res, next) {
    //
    //
    //     res.json(err);
    //     next();
    // });

    // process the signup form
    app.post('/signup', function (req, res, next) {
        passport.authenticate('local-signup', function (err, user, info) {
            if (err) {
                res.status(err.status).json(err);
            }else{
                res.status(200).json({message: 'success'});
            }
        })(req, res, next);
    });
    // =====================================
    // PROFILE SECTION =====================
    // =====================================
    // we will want this protected so you have to be logged in to visit
    // we will use route middleware to verify this (the isLoggedIn function)
    app.get('/profile', isLoggedIn, function (req, res, next) {
        res.status(200).json({message: 'success'});
        next();
    });

    // =====================================
    // LOGOUT ==============================
    // =====================================
    app.get('/logout', function (req, res, next) {

    });
};

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}
