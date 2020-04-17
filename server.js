console.log('Server-side code running');
const express = require('express');
const app = express();
app.set('view engine', 'ejs')
const MongoClient = require("mongodb").MongoClient;
var objectID = require('mongodb').ObjectID

const bodyParser= require('body-parser')
const url = "mongodb://localhost:27017/GrowingTogether";
const err = console.error();
const methodOverride = require('method-override')



app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))


MongoClient.connect(url, { useUnifiedTopology: true }, (err, client) => {
  if (err) {
    return console.log(err);
  }
  console.log('Connected to Database')
    db = client.db("GrowingTogether");
  // start the express web server listening on 8080
  app.listen(8081, () => {
    console.log("listening on 8081");
  });
});

app.get('/home', (req, res) => {
    res.sendFile(__dirname + '/public/home.html');
  });

  app.post('/addCustomer', (req, res) => {
    db.collection("customer").insertOne(req.body)
      .then(result => {
        console.log(result);
        res.redirect('/customers')
      })
      .catch(error => console.error(error))
  })

app.get('/customers', (req, res) => {
    db.collection('customer').find().toArray()
      .then(results => {
        res.render('customers.ejs', { customer: results })
      })
      .catch(/* ... */)
  })

  app.get('/staff', (req, res) => {
    db.collection('staff').find().toArray()
      .then(results => {
        res.render('staff.ejs', { staff: results })
      })
      .catch(/* ... */)
  })

  app.get('/products', (req, res) => {
    db.collection('product').find().toArray()
      .then(results => {
        res.render('product.ejs', { product: results })
      })
      .catch(/* ... */)
  })

  app.get('/departments', (req, res) => {
    db.collection('department').find().toArray()
      .then(results => {
        res.render('department.ejs', { department: results })
      })
      .catch(/* ... */)
  })

  app.get('/address', (req, res) => {
    db.collection('address').find().toArray()
      .then(results => {
        res.render('address.ejs', { address: results })
      })
      .catch(/* ... */)
  })

  app.get('/policy', (req, res) => {
    db.collection('policy').find().toArray()
      .then(results => {
        res.render('policy.ejs', { policy: results })
      })
      .catch(/* ... */)
  })

  app.get('/edit/:id', (req,res) =>{
      var id = req.params.id
      db.collection('customer').find({'_id':objectID(id)}).toArray()
      .then(results => {
        res.render('ucustomer.ejs',{customer: results})
      })
      .catch(/* ... */)
})

  app.put('/update/:id',(req,res) =>{
    var id = req.params.id
    var myobj = { "_id": objectID(id)};
    var newvalues = {$set: req.body};
    db.collection("customer").updateOne(myobj, newvalues,function(err, result) {
      if (err) throw err;
      console.log("1 document Updated in customer collection");
      res.status(200);
      res.redirect("/customers");
      });
  })

app.delete('/delete/:id',(req,res) =>{
  var id = req.params.id
  var myobj = { "_id": objectID(id) };
  db.collection("customer").deleteOne(myobj, function(err, result) {
    if (err) throw err;
    console.log("1 document deleted in customer collection");
    res.status(200);
    res.redirect("/customers");
    });
})
