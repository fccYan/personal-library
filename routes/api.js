/*
*
*
*       Complete the API routing below
*
*
*/

'use strict';

const expect = require('chai').expect;

module.exports = function(app, mongoose) {
  const Book = require('../models/book')(mongoose);
  app.route('/api/books')
      .get(function(req, res) {
        Book.find().then((books)=> {
          books = books.map((book) => {
            return {_id: book._id, title: book.title, commentcount: book.comments.length};
          });
          res.json(books);
        }).catch((err)=> {
          throw err;
        });
      // response will be array of book objects
      // json res format: [{"_id": bookid, "title": book_title, "commentcount": num_of_comments },...]
      })

      .post(function(req, res) {
        const title = req.body.title;
        expect(title).to.not.be.undefined;
        new Book({title: req.body.title}).save()
            .then((book)=> {
              res.json(book);
            })
            .catch((err) => {
              throw err;
            });
      // response will contain new book object including atleast _id and title
      })

      .delete(function(req, res, next) {
        Book.deleteMany({}, (err) => {
          if (err) {
            console.error(err);
            return next(err);
          }
          res.status(200).send('complete delete successful');
        });
      // if successful response will be 'complete delete successful'
      });


  app.route('/api/books/:id')
      .get(function(req, res) {
        const bookid = req.params.id;
        expect(bookid).to.not.be.undefined;
        Book.findOne({_id: bookid}, (err, data) => {
          if (err) {
            console.error(err);
            return next(err);
          }
          res.json(data);
        });

      // json res format: {"_id": bookid, "title": book_title, "comments": [comment,comment,...]}
      })

      .post(function(req, res, next) {
        const bookid = req.params.id;
        const comment = req.body.comment;
        expect(bookid).to.not.be.undefined;
        Book.findOneAndUpdate({_id: bookid}, {$push: {comments: comment}}, {new: true}, (err, data) => {
          if (err) {
            console.error(err);
            return next(err);
          }
          res.json(data);
        });
      // json res format same as .get
      })

      .delete(function(req, res) {
        const bookid = req.params.id;
        expect(bookid).to.not.be.undefined;
        Book.findOneAndDelete({_id: bookid}, (err, data) => {
          if (err) {
            console.error(err);
            return next(err);
          }
          res.send('delete successful');
        });
      // if successful response will be 'delete successful'
      });
};
