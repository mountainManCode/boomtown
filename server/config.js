module.exports = app => {
  app.set('PGUSER', process.env.PGUSER || 'boomtowndb');
  app.set('PGPASSWORD', process.env.PGPASSWORD || 'boomtowndb');
  app.set('PGDATABASE', process.env.PGDATABASE || 'boomtowndb');
  app.set('PGHOST', process.env.PGHOST || 'localhost');
  app.set('PGPORT', process.env.PGPORT || '5432');
  app.set('PGCONNECTION', process.env.DATABASE_URL);
  //Express Configs
  app.set('PORT', process.env.PORT || '3001');

  //FIREBASE CONFIG
  app.set('FIREBASE_CONFIG', {
    apiKey: 'AIzaSyBGChQYckyz46Ih-8nTpaMiP9qDyDDfxWw',
    authDomain: 'boomtown-mmc9.firebaseapp.com',
    databaseURL: 'https://boomtown-mmc9.firebaseio.com',
    projectId: 'boomtown-mmc9',
    storageBucket: 'boomtown-mmc9.appspot.com',
    messagingSenderId: '350770359974'
  });
};
