const { addToDo, getAllToDos, editToDo, getOneToDo, deleteToDo } = require('../controllers/ToDos');
const { signUp, login } = require('../controllers/auth');
const passportService = require('../services/passport.js');
const passport = require('passport');

const requireAuth = passport.authenticate('jwt', { session: false });
const requireLogin = passport.authenticate('local', { session: false });

module.exports = app => {

  app.post('/login', requireLogin, login);

  app.post('/signup', signUp);

  app.get('/todos', requireAuth, (req, res) => {
    getAllToDos()
      .then(results => res.json(results))
      .catch(e => res.sendStatus(500))
  });

  app.get('/todos/:id', requireAuth, (req, res) => {
    getOneToDo(req.params.id)
      .then(results => res.json(results))
      .catch(e => res.sendStatus(500))
  });

  app.put('/todos/:id', requireAuth, (req, res) => {
    editToDo(req.params.id, req.body)
      .then(results => res.json(results))
      .catch(e => res.sendStatus(500));
  });

  app.post('/todos', requireAuth, (req, res) => {
    addToDo(req.body)
      .then(results => res.json(results))
      .catch(e => res.sendStatus(500));
  });

  app.delete('/todos/:id', requireAuth, (req, res) => {
    deleteToDo(req.params.id)
      .then(results => res.json(results))
      .catch(e => res.sendStatus(500));
  });
}