import local from 'passport-local';
import models from '../models';

const LocalStrategy = local.Strategy;
const { User } = models;

const myLocalConfig = async (passport) => {
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user);
    });
  });


  passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
  }, async (email, password, done) => {
    User.findOne({ where: { email } })
      .then((user) => {
        if (user === null) {
          return done(null, false, {
            message: 'Incorrect username.',
          });
        }
        if (!user.password === password) {
          return done(null, false, {
            message: 'Incorrect password.',
          });
        }
        return done(null, user);
      })
      .catch(err => done(err));

    // if (response === null) {
    //   return done(null, false, {
    //     message: 'Incorrect username.'
    //   });
    // }
    // if (!users.password === password) {
    //   return done(null, false, {
    //     message: 'Incorrect password.'
    //   });
    // }
    // return done(null, users);
  }));
};

export default myLocalConfig;
