const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const knex = require('knex');
const db = knex({
   client: 'pg',
   connection: {
      connectionString: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false }
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

   // res.send('OKAY');

   db.select()
      .table('nadalamenu').where('nadal_year', req.body.nadal_year)
      .then(data => {
         res.send(data[data.length - 1]);
      })
      .catch(error => {
         res.status(500).send(`Problems with Database: ${error}`);
      });

});

app.listen(process.env.PORT || 3003, () => {
   console.log(`app is running on port ${process.env.PORT}`);
});