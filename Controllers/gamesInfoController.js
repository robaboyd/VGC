
const passport = require('passport'); // eslint-disable-line
const db = require('../Models');

module.exports = {
  add: (req, res) => {
    db.gamesInfo.create({
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
    db.gamesInfo.find({
    }).then((data) => {
      res.send(data);
    });
  },
  remove: (req, res) => {
    db.gamesInfo.find({
      gameIndex: req.body.index,
    }).remove().then((done) => {
      res.send(done);
    });
  },

};