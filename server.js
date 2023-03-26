require('dotenv').config();

const app = require('./app');

const mongoose = require('mongoose');
//******** */
const dataConvert = require('./convertNewsDate');
//******** */

const { PORT = 3000, DB_HOST, MONGO_URI } = process.env;
// console.log('DB_HOST:\t', DB_HOST);
// console.log('DB_TEST_HOST:\t', DB_TEST_HOST);

mongoose
  .connect(MONGO_URI)
  .then(() => {
    app.listen(PORT, () => {
      // createFolderIsNotExist(TEMP_DIR);
      console.log('Database connection successful');
      console.log(`Server running. Use our API on port: ${PORT}`);
      // dataConvert(); // convert date from string to Date
    });
  })
  .catch(error => {
    console.log(error.message);
    process.exit(1);
  });

// console.log('server is stated!!!!');
