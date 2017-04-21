
/**
 * Module dependencies.
 */

var express = require('express');
//var routes = require('./routes');
//var user = require('./routes/user');
var http = require('http');
var path = require('path');

var app = express();

// set up handlebars view engine
var handlebars = require('express-handlebars').create({
    defaultLayout: 'main',
    helpers: {
        clientList: function (data) {
            var str = '';
            j = Math.max(Math.ceil(data.length / 2), 5);

            for (var i = 0; i < data.length; i++) {

                if (i % j == 0) {
                    if (i != 0) {
                        str += '</ul></td>';
                    };
                    str += '<td><ul style="font-family:Arial;font:8pt">';
                };
               
                str += '<li>' + data[i] + '</li>';
            };

            str += '</ul></td>';

            return str;
        }
    }
});
app.engine('handlebars', handlebars.engine);

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'handlebars');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());

app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
    app.use(express.errorHandler());
}

//app.get('/', routes.index);
//app.get('/users', user.list);



// context data
function getContextData() {
    return {
        home: {
            img: 'images/mia_kennedy.gif',
            imgover: 'images/mia_kennedy_o.gif',
        },
        coaching: {
            img: 'images/exec_coaching.gif',
            imgovr: 'images/exec_coaching_o.gif',
            content: {
                name: 'coaching',
                pdf: [
                    { name: 'Executive Coaching', path: 'pdfs/Exec coaching brochure.pdf' },
                    { name: 'Vision Day', path: 'pdfs/Vision day.pdf' },
                    { name: 'Resilience Day', path: 'pdfs/Resilience day.pdf' },
                ],
                client: [
                    'FCB Inferno',
                    'FCB International',
                    'FleishmanHillard',
                    'IAG Cargo',
                    'Mother',
                    'New Dawn Risk Group',
                    'Ogilvy',
                    'R/GA London',
                    'R/GA APAC',
                    'The Client Relationship Consultancy',
                    'Urban Leisure Group',
                    'Young Voices',
                ]
            }
        },
        training: {
            img: 'images/training.gif',
            imgovr: 'images/training_o.gif',
            content: {
                name: 'training',
                pdf: [
                    { name: 'Training', path: 'pdfs/Training brochure.pdf' },
                ],
                client: [
                    'ETUC',
                    'FCB International',
                    'FleishmanHillard',
                    'ITV',
                    'MediaCom North',
                    'New Dawn Risk Group',
                    'R/GA London',
                    'The Account Planning Group',
                    'The Institute of Practitioners in Advertising'
                ]
            }

        },
        facilitation: {
            img: 'images/facilitation.gif',
            imgovr: 'images/facilitation_o.gif',
            content: {
                name: 'facilitation',
                pdf: [
                    { name: 'Facilitation', path: 'pdfs/Facilitation brochure.pdf' },
                ],
                client: [
                    'Creston Insight',
                    'Engine',
                    'FCB International',
                    'Primesight',
                    'R/GA London'
                ]
            }

        },
        contact: {
            img: 'images/lets_talk.gif',
            imgovr: 'images/lets_talk_o.gif',
        }
    };
}



//set content type
/*
app.use(function (req, res, next) {
    res.header("Content-Type", "text/html; charset=iso-8859-1");
});
*/

//middleware to add navigation data to context

app.use(function (req, res, next) {
    if (!res.locals.partials) res.locals.partials = {};
    res.locals.partials.context = getContextData();
    next();
});

//get copyright year

app.use(function (req, res, next) {
    var date = new Date();
    res.locals.copyrightYear = date.getFullYear();
    next();
});


app.get('/test', function (req, res) {
    app.render('test')
});

require('./routes.js')(app);


// 404 catch all handler (middleware)
app.use(function (req, res, next) {
    res.status(404);
    res.render('404');
});

// 500 error handler (middleware)
app.use(function(err, req, res, next){
    console.error(err.stack);
    res.render('500');
});


http.createServer(app).listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});
