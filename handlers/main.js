
exports.home = function (req, res) {
    res.render('home');
};

exports.coaching = function (req, res) {
    res.locals.partials.context.coaching.img = res.locals.partials.context.coaching.imgovr; 
    res.render('coaching', res.locals.partials.context.coaching.content);
};

exports.training = function (req, res) {
    res.locals.partials.context.training.img = res.locals.partials.context.training.imgovr;
    res.render('training', res.locals.partials.context.training.content);
};

exports.facilitation = function (req, res) {
    res.locals.partials.context.facilitation.img = res.locals.partials.context.facilitation.imgovr;
    res.render('facilitation', res.locals.partials.context.facilitation.content);
};

exports.contact = function (req, res) {
    res.locals.partials.context.contact.img = res.locals.partials.context.contact.imgovr;
    res.render('contact');

};