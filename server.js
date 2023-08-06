const express = require('express');
const cors = require('cors');
const routes = require('./routes');
const sequelize = require("./config/connection");
const session = require('express-session')
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();
const PORT = 3001;

const sess = {
  secret: 'Arnie would be proud',
  cookie: {
    maxAge: 300000,
    httpOnly: true,
    secure: false,
    sameSite: 'strict',
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

app.use(cors({ origin: 'http://localhost:3000' }));

app.use(session(sess));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);


sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => {
      console.log(`App listening on port ${PORT}!`);
    });
});