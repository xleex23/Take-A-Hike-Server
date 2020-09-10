const express = require('express');
const path = require('path');
const xss = require('xss');
const { requireAuth } = require('../middleware/jwt-auth');
const SaveService = require('../save/save-service');

const saveRouter = express.Router();
const jsonParser = express.json();

const serializeSave = save => ({
  id: save.id,
  trail_id: save.trail_id,
  user_id: save.user_id,
  date_saved: save.date_saved,
  name: xss(save.name),
  summary: xss(save.summary),
  difficulty: xss(save.difficulty),
  stars: save.stars,
  votes: save.votes,
  location: xss(save.location),
  url: xss(save.url),
  img: xss(save.img),
  length: save.length,
  ascent: save.ascent,
  longitude: save.longitude,
  latitude: save.latitude
});

saveRouter
//get all saved trails by user
  .route('/')
  .all(requireAuth)
  .get((req, res, next) => {
    const db = req.app.get('db');
    const user_id = req.user.id;

    SaveService.getAllSavedTrails(db, user_id)
      .then(save => res.status(200).json(save.map(serializeSave)))
      .cath(next);
  })
//posting saved trail
  .post(jsonParser, (req, res, next) => {
    const { trail_id, user_id, date_saved, name, summary, difficulty, stars, votes, location, url, img, length, ascent, longitude, latitude } = req.body

    const newTrail = { trail_id, user_id, date_saved, name, summary, difficulty, stars, votes, location, url, img, length, ascent, longitude, latitude }

    const db = req.app.get('db')

    if(!name) {
      return res.status(400).json({ error: 'Name is required' })
    }
    if(!summary) {
      return res.status(400).json({ error: 'Summary is required' })  
    }
    if(!location) {
      return res.status(400).json({ error: 'Location is required' })  
    }

    SaveService.insertSavedTrail(db, newTrail)
      .then(save => {
        res
          .status(201)
          .location(path.posix.join(req.originalUrl))
          .json(serializeSave(save))
      })
      .catch(next);
  });

saveRouter
  .use(requireAuth)
  .route('/:id')
  .delete((req, res, next) => {
    const db = req.app.get('db');
    const id = req.params.id;
    SaveService.deleteSavedTrail(db, id)
      .then(() => {
        res.status(204).end();
      })
      .catch(next);
  })