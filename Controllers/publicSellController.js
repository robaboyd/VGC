
const passport = require('passport'); // eslint-disable-line
const db = require('../Models');

module.exports = {
  add: (req, res) => {
    db.publicSell.create({
      userID: req.user,
      gameID: req.body.id,
      name: req.body.name,
      url: req.body.url,
      gameIndex: req.body.index,
    }).then((data) => {
      res.send(data);
    });
  },
  getPublicSell: (req, res) => {
    db.publicSell.find({
    }).then((data) => {
      res.send(data);
    });
  },
  findGame: (req, res) => {
    console.log("id " + req.params.id)
    db.publicSell.findOne({
      _id: req.params.id,
    }).then((results) => {
      res.send(results);
    });
  },
  remove: (req, res) => {
    console.log(req.body);
    db.publicSell.find({
      gameIndex: req.body.index,
    }).remove((done) => {
      res.send(done);
    });
  },
};
