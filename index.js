const express = require('express');
const methodOverride = require('method-override');
const {engine} = require('express-handlebars');

const {homeRouter} = require("./routers/home");


const app = express();

app.use(methodOverride('_method'))
app.use(express.urlencoded({
    extended: true,
}));
// app.use(express.json());


app.engine('.hbs', engine({
    extname: '.hbs',
    //helpers: handlebarsHelpers,
}));
app.use(express.static('public'));
app.set('view engine', '.hbs');


app.use('/', homeRouter);


app.listen(3000, 'localhost', () => {
    console.log('Listening on http://localhost:3000');
});

