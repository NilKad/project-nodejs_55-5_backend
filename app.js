const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const { errorHandler } = require('./helpers');
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
app.use('/api/breeds', routerBreeds);

// app.use('/api/location', ctrl.location);

app.use((req, res) => {
  console.log('!!!!! APP (req, res) !!!!!!');
  res.status(404); // .json({ message: "Not found", data: null });
  res.json({ messages: 'ERRR JSONS' });
});

app.use(errorHandler);

module.exports = app;
