require('dotenv').config();

const app = require('./app');

const mongoose = require('mongoose');

const { PORT = 3000, DB_HOST, DB_TEST_HOST } = process.env;
// console.log('DB_HOST:\t', DB_HOST hello);
// console.log('DB_TEST_HOST:\t', DB_TEST_HOST);

mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(PORT, () => {
      // createFolderIsNotExist(TEMP_DIR);
      console.log('Database connection successful');
      console.log(`Server running. Use our API on port: ${PORT}`);
    });
  })
  .catch(error => {
    console.log(error.message);
    process.exit(1);
  });

// console.log('server is stated!!!!');
