var sidebar = require('../helpers/sidebar'),
Models = require('../models');

var saveImage = function(req, res) {
  // search for an image with the same filename by performing a find:
  Models.Image.findById(
    req.params.image_id
  , function(err, image) {
    if (image) {
      console.log("image exists: " + image.id);
    } else {
      // create a new Image model, populate its details:
      var newImg = new Models.Image({
        title: req.body.title,
        description: req.body.description
      });
      // and save the new Image
      newImg.save(function(err, image) {
        res.redirect('/images/' + image.id);
      });
    }
  });
};

module.exports = {
  index: function(req, res) {
    // declare our empty viewModel variable object:
    var viewModel = {
      image: {},
      comments: []
    };
    // find the image by searching the filename matching the url
    parameter:
      Models.Image.findById(    
            req.params.image_id
        ,
        function(err, image) {
          if (err) {
            throw err;
          }
          if (image) {
            // if the image was found, increment its views counter
            image.views = image.views + 1;
            // save the image object to the viewModel:
            viewModel.image = image;
            // save the model (since it has been updated):
            image.save();
            // find any comments with the same image_id as the image:
            Models.Comment.find({
                image_id: image._id
              }, {}, {
                sort: {
                  'timestamp': 1
                }
              },
              function(err, comments) {
                // save the comments collection to the viewModel:
                viewModel.comments = comments;
                // build the sidebar sending along the viewModel:
                sidebar(viewModel, function(viewModel) {
                  // render the page view with its viewModel:
                  res.render('image', viewModel);
                });
              }
            );
          } else {
            // if no image was found, simply go back to the homepage:
            res.redirect('/');
          }
        });
  },
  create: function(req, res) {
    saveImage(req, res);
  },
  like: function(req, res) {
    res.json({
      likes: 1
    });
  },
  comment: function(req, res) {
    res.send('The image:comment POST controller');
  }
};
