const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const knex = require('knex');
const db = knex({
   client: 'pg',
   connection: {
      connectionString: process.env.DATABASE_URL,
      ssl: true
   }
   // connection: {
   //    host: '127.0.0.1',
   //    user: 'ivan',
   //    password: 'zcbxvnXDFGB',
   //    database: 'sookla'
   // }
});

const app = express();

app.use(cors());
app.use(bodyParser.json());

// app.options('*', cors());
// app.use(function (req, res, next) {
//    res.header("Access-Control-Allow-Origin", "*");
//    res.header("Access-Control-Allow-Credentials", true);
//    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
//    res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');
//    next();
// });

// cors({origin: 'https://tllp-sookla.herokuapp.com'})

app.get('/', (req, res) => {
   res.send('Server working just fine')
});

app.post('/saveDataToDatabase', (req, res) => {

   ///// Destructuring req.body /////
   console.log(req.body);

   const { nadal_year,
      mondaybreakfast,
      mondayvitamin,
      mondaylunch,
      mondayoode,
      tuesdaybreakfast,
      tuesdayvitamin,
      tuesdaylunch,
      tuesdayoode,
      wednesdaybreakfast,
      wednesdayvitamin,
      wednesdaylunch,
      wednesdayoode,
      thursdaybreakfast,
      thursdayvitamin,
      thursdaylunch,
      thursdayoode,
      fridaybreakfast,
      fridayvitamin,
      fridaylunch,
      fridayoode,
      created_in } = req.body;

   ///// ===================== /////

   db('nadalamenu')
      .returning('*')
      .insert({
         nadal_year: nadal_year,
         mondaybreakfast: mondaybreakfast,
         mondayvitamin: mondayvitamin,
         mondaylunch: mondaylunch,
         mondayoode: mondayoode,
         tuesdaybreakfast: tuesdaybreakfast,
         tuesdayvitamin: tuesdayvitamin,
         tuesdaylunch: tuesdaylunch,
         tuesdayoode: tuesdayoode,
         wednesdaybreakfast: wednesdaybreakfast,
         wednesdayvitamin: wednesdayvitamin,
         wednesdaylunch: wednesdaylunch,
         wednesdayoode: wednesdayoode,
         thursdaybreakfast: thursdaybreakfast,
         thursdayvitamin: thursdayvitamin,
         thursdaylunch: thursdaylunch,
         thursdayoode: thursdayoode,
         fridaybreakfast: fridaybreakfast,
         fridayvitamin: fridayvitamin,
         fridaylunch: fridaylunch,
         fridayoode: fridayoode,
         created_in: created_in
      })
      .catch(err => {
         console.log(err);
      })

});

app.post('/getDataFromDatabase', (req, res) => {
   console.log(req.body);

   res.send('OKAY')

   // console.log('THIS WAS PUT INTO REQUEST', req.body.nadal_year);
   // db.select().table('nadalamenu').where('nadal_year', req.body.nadal_year).then(data => {
   //    res.send(data[data.length - 1]);
   // });

});

app.listen(process.env.PORT || 3003, () => {
   console.log(`app is running on port ${process.env.PORT}`);
});