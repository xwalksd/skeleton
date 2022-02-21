const express = require('express');
const pokemonService = require('./lib/PokemonService');

let app = express();

// set up handlebars view engine
let handlebars = require('express-handlebars')
	.create({ defaultLayout:'main' });
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

app.set('port', process.env.PORT || 3000);

app.use(express.static(__dirname + '/public'));


app.get('/', function(req, res) {
	if(!req.query.type){
		var pokemon = pokemonService.getAllPokemon();
	}
	else{
		var pokemon = pokemonService.getAllPokemon().filter(pokemon => pokemon.type.includes(req.query.type));
	}
	
	res.render('home', {
		pokemon: pokemon
	});
});

app.get('/api/cards', function(req,res){
	
	if(!req.query.type){
		var pokemon = pokemonService.getAllPokemon();
		res.send(pokemon);
	}
	else{
		var pokemon = pokemonService.getAllPokemon().filter(pokemon => pokemon.type.includes(req.query.type));
		res.send(pokemon);
	}
	
});

app.get('/api/cards/trade', function(req,res){
	if(!req.query.type){
		var pokemon = pokemonService.getAllPokemon().filter(pokemon => pokemon.willTrade == true);
		res.send(pokemon);
	}
	else{
		var pokemon = pokemonService.getAllPokemon().filter(pokemon => pokemon.willTrade == true && pokemon.type.includes(req.query.type));
		res.send(pokemon);
	}
});

app.get('/api/cards/sell', function(req,res){
	if(!req.query.type){
		var pokemon = pokemonService.getAllPokemon().filter(pokemon => pokemon.price != null);
		res.send(pokemon);
	}
	else{
		var pokemon = pokemonService.getAllPokemon().filter(pokemon => pokemon.price != null && pokemon.type.includes(req.query.type));
		res.send(pokemon);
	}
	
});

// 404 catch-all handler (middleware)
app.use(function(req, res, next){
	res.status(404);
	res.render('404');
});

// 500 error handler (middleware)
app.use(function(err, req, res, next){
	console.error(err.stack);
	res.status(500);
	res.render('500');
});

app.listen(app.get('port'), function(){
  console.log( 'Express started on http://localhost:' +
    app.get('port') + '; press Ctrl-C to terminate.' );
});
