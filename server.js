const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const { MongoClient } = require('mongodb');

var db, collection;

require('dotenv').config();
const url = "mongodb+srv://chambersakeem:jQJ9OEEhMVTXYvmX@todo.y9u5gon.mongodb.net/?retryWrites=true&w=majority"

const dbName = "todolist";

app.listen(2830, () => {
  MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, (error, client) => {
    if (error) {
      throw error;
    }
    db = client.db(dbName);
    console.log("Connected to `" + dbName + "`!");
  });
});

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));

app.get('/', (req, res) => {
  db.collection('task').find().toArray((err, result) => {
    if (err) return console.log(err);
    const toDo = result;
    console.log(result)
    res.render('index.ejs', { tasks: toDo}); //tasks is an object that's passed in
  });
});

app.post('/tasks', (req, res) => {
  db.collection('task').insertOne({ task: req.body.tasks }, (err, result) => {
    if (err) return console.log(err);
    console.log('saved to database');
    res.redirect('/');
  });
});

app.put('/tasks', (req, res) => {
  db.collection('task')
    .update({ task: req.body.tasks }, {
    }, {
      sort: { _id: -1 },
      upsert: true
    }, (err, result) => {
      if (err) return res.send(err)
      res.send(result)
    })
})

// app.put('/messages/thumbDown', (req, res) => {
//   db.collection('task')
//   .findOneAndUpdate({name: req.body.name, msg: req.body.msg}, {
//     $set: {
//       thumbUp:req.body.thumbUp - 1
//     }
//   }, {
//     sort: {_id: -1},
//     upsert: true
//   }, (err, result) => {
//     if (err) return res.send(err)
//     res.send(result)
//   })
// })

app.delete('/tasks', (req, res) => {
  console.log(req.body.tasks)
  db.collection('task').deleteOne({ task: req.body.tasks }, (err, result) => {
    if (err) return res.send(500, err)
    res.redirect('/')
  })
})


