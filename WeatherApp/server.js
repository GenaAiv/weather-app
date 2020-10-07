const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const bodyParser = require('body-parser');
const hbs = require('express-handlebars');
const path = require('path');
const mailRoute = require('./routes/mailRoute');
const weather = require('./routes/weather');

app.set('views', path.join(__dirname, './projects/weatherApp/views'));
app.engine('handlebars', hbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
app.register('.html', require('handlebars'));
app.use(express.static('projects/weatherApp/views'));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/weather', weather);
app.use('/send', mailRoute);

//Put your endpoints here

app.get('/', (req, res) => {
	res.render('index');
});

app.listen(port, () => console.log('Server listening on port ' + port));
