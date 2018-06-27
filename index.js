const express = require('express');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const pg = require('pg');
const jsonfile = require('jsonfile');

// Initialise postgres client
const configs = {
  user: 'acechua',
  host: '127.0.0.1',
  database: 'pokemons',
  port: 5432,
};

const pool = new pg.Pool(configs);

pool.on('error', err => console.log('idle client error', err.message, err.stack));


/**
 * ===================================
 * Configurations and set up
 * ===================================
 */

// Init express app
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));


// Set react-views to be the default view engine
const reactEngine = require('express-react-views').createEngine();
app.set('views', __dirname + '/views');
app.set('view engine', 'jsx');
app.engine('jsx', reactEngine);

/**
 * ===================================
 * Routes
 * ===================================
 */



// GET `/` should return HTML page showing all pokemons currently in database (specifically in the pokemon table within the database)
app.get('/', (req, response) => {
  // query database for all pokemon

  // respond with HTML page displaying all pokemon
  //
  const queryString = 'SELECT * from pokemon';

  pool.query(queryString, (err, result) => {
    if (err) {
      console.error('query error:', err.stack);
    } else {

      // redirect to home page
      response.render('home', result);

    }
  });
});



// GET `/new` should return HTML page showing a form to create a new pokemon - upon submit, it should send POST request to `/`
app.get('/new', (request, response) => {
  // respond with HTML page with form to create new pokemon
  response.render('new');
});

app.post('/', (req, response) => {
  let params = req.body;
  const id = parseInt(params.id, 10);
  const queryString = 'INSERT INTO pokemon (id, num, name, img, weight, height) VALUES($1, $2, $3, $4, $5, $6)';
  const values = [id, params.num, params.name, params.img, params.weight, params.height];

  pool.query(queryString, values, (err, res) => {
    if (err) {
      console.log('query error:', err.stack);
    } else {
      console.log('query result:', res.rows[0]);

      // redirect to home page
      response.redirect('/');
    }
  });
});



// GET `/:id/edit` (eg. `/2/edit`) should return HTML page showing a form pre-populated with that pokemon's data - upon submit, it should send PUT request to `/:id`
app.get('/:id/edit', (req, res) => {
  
  const id = parseInt(req.params.id, 10);

  const queryString = 'SELECT * FROM pokemon WHERE id = ' + id;

  pool.query(queryString, (err, result) => {
    if (err) {
      console.error('query error:', err.stack);
    } else {

      res.render('edit', result.rows[0]);

      // <div className="pokemon-attribute">
      //   candy:<input
      //     name="candy"
      //     type="text"
      //     defaultValue={this.props.pokemon.candy}
      //   />
      // </div>
      // <div className="pokemon-attribute">
      //   candy_count:<input
      //     name="candy_count"
      //     type="text"
      //     defaultValue={this.props.pokemon.candy_count}
      //   />
      // </div>
      // <div className="pokemon-attribute">
      //   egg:<input
      //     name="egg"
      //     type="text"
      //     defaultValue={this.props.pokemon.egg}
      //   />
      // </div>
      // <div className="pokemon-attribute">
      //   avg_spawns:<input
      //     name="avg_spawns"
      //     type="text"
      //     defaultValue={this.props.pokemon.avg_spawns}
      //   />
      // </div>
      // <div className="pokemon-attribute">
      //   spawn_time:<input
      //     name="spawn_time"
      //     type="text"
      //     defaultValue={this.props.pokemon.spawn_time}
      //   />
      // </div>

    }
  });
});

app.put('/:id', (req, res) => {

  const queryString = 'UPDATE pokemon SET id = $1, num = $2, name = $3, img = $4, height = $5, weight = $6 WHERE id = $1 RETURNING *';
  const values = [parseInt(req.body.id, 10), req.body.num, req.body.name, req.body.img, req.body.height, req.body.weight];

  pool.query(queryString, values, (err, result) => {
    if (err) {
      console.error('query error:', err.stack);
    } else {

      res.render('pokemon', result.rows[0]);

    }
  });

});



// The `/:id/edit` HTML page should also have a "Delete" button that when clicked, will send a DELETE request to `/:id` to delete the current pokemon
app.delete('/:id', (req, res) => {
  
  const id = parseInt(req.params.id, 10);
 
  const queryString1 = 'DELETE FROM pokemon WHERE id = ' + id + ' RETURNING *';

  pool.query(queryString1, (err1, result1) => {
    if (err1) {
      console.error('query error:', err1.stack);
    } else {

      console.log(result1.rows[0]);

      // res.render('home', result.rows);

      // <li className="pokemon-attribute">
      //   candy: {this.props.candy}
      // </li>
      // <li className="pokemon-attribute">
      //   candy_count: {this.props.candy_count}
      // </li>
      // <li className="pokemon-attribute">
      //   egg: {this.props.egg}
      // </li>
      // <li className="pokemon-attribute">
      //   avg_spawns: {this.props.avg_spawns}
      // </li>
      // <li className="pokemon-attribute">
      //   spawn_time: {this.props.spawn_time}
      // </li>

    }
  });

  const queryString2 = 'SELECT * FROM pokemon';

  pool.query(queryString2, (err2, result2) => {

    if (err2) {

      console.error('query error:', err2.stack);

    } else {

      res.render('home', result2);

    }
    
  });

});



// GET `/:id` (eg. `/2`) should return HTML page showing information about pokemon with primary ID 2 (read: primary ID, not `num` property)
app.get('/:id', (req, res) => {
  
  const id = parseInt(req.params.id, 10);

  const queryString = 'SELECT * FROM pokemon WHERE id = ' + id;

  pool.query(queryString, (err, result) => {
    if (err) {
      console.error('query error:', err.stack);
    } else {

      res.render('pokemon', result.rows[0]);

      // <li className="pokemon-attribute">
      //   candy: {this.props.candy}
      // </li>
      // <li className="pokemon-attribute">
      //   candy_count: {this.props.candy_count}
      // </li>
      // <li className="pokemon-attribute">
      //   egg: {this.props.egg}
      // </li>
      // <li className="pokemon-attribute">
      //   avg_spawns: {this.props.avg_spawns}
      // </li>
      // <li className="pokemon-attribute">
      //   spawn_time: {this.props.spawn_time}
      // </li>

    }
  });
});





/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));
