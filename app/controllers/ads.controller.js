const Ad = require('../models/ads.model.js');


exports.create = (req, res) => {
  // Validate request
  if (!req.body.content) {
    return res.status(400).send({
      message: "Note content can not be empty"
    });
  }

  const ad = new Ad({
    title: req.body.title || "Untitled Ads",
    content: req.body.content,
    URLImage: req.body.URLImage
  });

  // Save Ads in the database
  ad.save()
    .then(data => {
      res.send(data);
    }).catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Ad."
      });
    });
};


exports.findAll = (req, res) => {
  Ad.find()
    .then(ads => {
      res.send(ads);
    }).catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving ads."
      });
    });
};


exports.findOne = (req, res) => {
  Ad.findById(req.params.adId)
    .then(ad => {
      if (!ad) {
        return res.status(404).send({
          message: "Ads not found with id " + req.params.adId
        });
      }
      res.send(ad);
    }).catch(err => {
      if (err.kind === 'ObjectId') {
        return res.status(404).send({
          message: "Ads not found with id " + req.params.adId
        });
      }
      return res.status(500).send({
        message: "Error retrieving ads with id " + req.params.adId
      });
    });
};


exports.update = (req, res) => {
  // Validate Request
  if (!req.body.content) {
    return res.status(400).send({
      message: "Ads content can not be empty"
    });
  }

  // Find ads and update it with the request body
  Ad.findByIdAndUpdate(req.params.adId, {
    title: req.body.title || "Untitled Ads",
    content: req.body.content
  }, { new: true })
    .then(ad => {
      if (!ad) {
        return res.status(404).send({
          message: "Ads not found with id " + req.params.adId
        });
      }
      res.send(note);
    }).catch(err => {
      if (err.kind === 'ObjectId') {
        return res.status(404).send({
          message: "Ads not found with id " + req.params.adId
        });
      }
      return res.status(500).send({
        message: "Error updating ads with id " + req.params.adId
      });
    });
};


exports.delete = (req, res) => {
  Ad.findByIdAndRemove(req.params.adId)
    .then(ad => {
        if(!ad) {
            return res.status(404).send({
                message: "Ads not found with id " + req.params.adId
            });
        }
        res.send({message: "Ads deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Ads not found with id " + req.params.adId
            });                
        }
        return res.status(500).send({
            message: "Could not delete note with id " + req.params.noteId
        });
    });
};
