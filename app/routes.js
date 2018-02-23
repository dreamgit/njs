module.exports = function(app, passport) {

	app.get('/', function(req, res) {
		res.render(app.get('templates_dir'), {
			page: 'index',
			user: req.user
		});
	});

	app.get('/login', isLoggedInAccess, function(req, res) {
		res.render(app.get('templates_dir'), {
			page: 'login',
			message: req.flash('loginMessage'),
			user: req.user
		});
	});

	app.post('/login', passport.authenticate('local-login', {
		successRedirect: '/profile',
		failureRedirect: '/login',
		failureFlash: true
	}));

	app.get('/signup', isLoggedInAccess, function(req, res) {
		res.render(app.get('templates_dir'), {
			page: 'signup',
			message: req.flash('signupMessage'),
			user: req.user
		});
	});

	app.post('/signup', passport.authenticate('local-signup', {
		successRedirect: '/profile',
		failureRedirect: '/signup',
		failureFlash: true
	}));

	app.get('/profile', isLoggedIn, function(req, res) {
		res.render(app.get('templates_dir'), {
			page: 'profile',
			user: req.user
		});
	});

	app.get('/chat', isLoggedIn, function(req, res) {
		res.render(app.get('templates_dir'), {
			page: 'chat',
			user: req.user
		});
	});

	app.get('/roulette', isLoggedIn, function(req, res) {
		res.render(app.get('templates_dir'), {
			page: 'roulette',
			user: req.user
		});
	});

	app.get('/logout', function(req, res) {
		req.logout();
		res.redirect('/');
	});

	app.use(function(req, res) {
		res.status(404);
		res.render(app.get('templates_dir'), {
			page: '404',
			user: req.user
		});
	});

	app.use(function(err, req, res, next) {
		console.error(err.stack);
		res.status(500);
		res.render(app.get('templates_dir'), {
			page: '500',
			user: req.user
		});
	});
};

function isLoggedIn(req, res, next) {

	if (req.isAuthenticated()) {
		return next();
	}

	res.redirect('/login');
}

function isLoggedInAccess(req, res, next) {
	if (req.isAuthenticated()) {
		res.redirect('/profile');
	} else {
		return next();
	}
}
