module.exports = (app) => {
  const ads = require('../controllers/ads.controller.js');

  // Create a new ads.
  app.post('/ads', ads.create);

  // Retrieve all ads.
  app.get('/ads', ads.findAll);

  // Retrieve a single ads with adId.
  app.get('/ads/:adId', ads.findOne);

  // Update a ads with adId
  app.put('/ads/:adId', ads.update);

  // Delete a ads with adId
  app.delete('/ads/:adId', ads.delete);
}