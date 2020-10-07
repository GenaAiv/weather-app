const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const bodyParser = require('body-parser');
const hbs = require('express-handlebars');
const path = require('path');
const weather = require('./routes/weather');

app.set('views', path.join(__dirname, '/views'));
app.engine('handlebars', hbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
app.use(express.static('views'));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/weather', weather);

//Put your endpoints here

app.get('/', (req, res) => {
	res.render('index');
});

app.listen(port, () => console.log('Server listening on port ' + port));
