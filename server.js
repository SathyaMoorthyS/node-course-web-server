const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname+'/views/partials')
hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear()
})
hbs.registerHelper('getCaptialised', (content) => {
    return content.toUpperCase();
})
app.set('view engine', 'hbs');

app.use((req, res, next)=>{
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url} ${req.ip}`
    console.log(log)
    fs.appendFile('server.log',log+'\n', (err)=> {
        if(err){
            console.log('Unable to print to server.log')
        }
    })
    next();
})

// app.use((req, res, next)=>{
//     res.render('maintenance.hbs')
// })

app.use(express.static(__dirname+'/public'));

app.get('/', (req, res) => {
     res.render('home.hbs', {
        pageTitle: 'Web Server',
        welcomeMessage: 'Welcome to Web Server Site'
    })
});
app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About'
    })
});
app.get('/bad', (req, res) => {
    res.send({
        errorMessage:'An error occured!'
    });
});

app.listen(3000, ()=> {
    console.log('App started at 3000')
})