const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const {
  routerNotices,
  routerFriends,
  routerNews,
  pets,
  routerAuth,
  routerUser,
} = require('./routes/api');

const app = express();

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use('/api/auth', routerAuth);

app.use('/api/notices', routerNotices);
app.use('/api/user', routerUser);
app.use('/api/friends', routerFriends);
app.use('/api/news', routerNews);
app.use('/api/pets', pets);

// app.use('/api/breed', ctrl.breed);
// app.use('/api/location', ctrl.location);

app.use((req, res) => {
  console.log('!!!!! APP (req, res) !!!!!!');
  res.status(404); // .json({ message: "Not found", data: null });
  res.json({ messages: 'ERRR JSONS' });
});

app.use((err, req, res, next) => {
  console.log('!!!!! (err, req, resp, next) ');
  console.log('err data:\t', err.data);
  // console.log('res.message: ', res.message);
  if (!err.status) err.status = 500;
  const errEvent = { code: err.status, message: err.message };

  if (err.data) errEvent.data = err.data;

  res.status(err.status).json(errEvent);
});

module.exports = app;
