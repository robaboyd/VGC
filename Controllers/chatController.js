const passport = require('passport');
const db = require('../Models');
// we need passport for req.user easy way to get user id

module.exports = {
  create: (req, res) => {
    db.chat.create({
      gameID: req.body.gameId,
      messages: [],
      user1: req.body.user1,
      user2: req.body.user2,
      read: false
    }).then((data) => {
      res.send(data);
    });
  },
  getChat: (req, res) => {
    db.chat.findById({
      _id: req.params.id,
    }).then((chat) => {
      res.send(chat);
    });
  },
  getChatByUser2: (req, res) => {
    db.chat.findOne({
      user2: req.params.username,
    }).then((chat) => {
      res.send(chat);
    });
  },
  add: (req, res) => {
    console.log(req.body);
    db.chat.findOneAndUpdate({
      _id: req.body.chatId,
    },
    { $push: { messages: req.body } }).then((done) => {
      res.send(done);
    }).catch((err) => {
      console.log(err);
    });
  },
  update: (req, res )=>{
    console.log("message" + req.body);
    db.chat.findOneAndUpdate({
      _id: req.body.chatId
    },
    {$push: {messages: req.body._id}}).then(done => {
      res.send(done);
    })
  }
};
