
// create web server
var express = require('express');
var router = express.Router();

// get comments model
var Comment = require('../models/comment');

// GET /comments
router.get('/', function(req, res, next) {
    // use mongoose to get all comments in the database
    Comment.find(function(err, comments) {
        if (err) {
            console.log(err);
            res.end(err);
        } else {
            // load the comments view
            res.render('comments/index', {
                comments: comments
            });
        }
    });
});

// GET /comments/add
router.get('/add', function(req, res, next) {
    // load the add view
    res.render('comments/add');
});

// POST /comments/add
router.post('/add', function(req, res, next) {
    // save a new comment using our model
    Comment.create({
        name: req.body.name,
        email: req.body.email,
        comment: req.body.comment
    }, function(err, Comment) {
        if (err) {
            console.log(err);
            res.end(err);
        } else {
            // load the comments view
            res.redirect('/comments');
        }
    });
});

// GET /comments/delete/abc123
router.get('/delete/:_id', function(req, res, next) {
    // get the id parameter from the end of the url
    var _id = req.params._id;

    // delete the document with this _id
    Comment.remove({
        _id: _id
    }, function(err) {
        if (err) {
            console.log(err);
            res.end(err);
        } else {
            // refresh the comments list
            res.redirect('/comments');
        }
    });
});

// make this public
module.exports = router;