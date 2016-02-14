function randNum() {
	return parseInt((Math.random() * Recipes.find().count()), 10);
}

function halp() {
	randomRecipe.set(Recipes.find({"key": randNum()}));
}

/* need a search function */
if (Meteor.isClient) {	
var randomRecipe = new ReactiveVar()
  // This code only runs on the client
	Meteor.subscribe("recipes");
    Template.submitrecipes.helpers({
    recipes: function () {
      return Recipes.find({});
    }
  });
  
  Template.nomrecipe.helpers({
	  show: function() {
		return randomRecipe.get();
	}
  });
  
  Template.nomrecipe.events({
	  "click .gimme": function(event) {
		  halp();
	  }
  });
  
  Template.index.events({
  	  "click .gimme": function(event) {
		  halp();
	  }
  });
 
Template.nomrecipe.onRendered(function () {
	halp();
	console.log("quesitonmark?");
	
});
 
  Template.submitrecipes.events({
	  // I need to make my button....
	  /*
	  "submit .halp": function(event) {
		  //var recipe = chooseRandom();
	  }*/
	  
	  
		"submit .new-recipe": function(event) {
			event.preventDefault();
			
			// recipe name
			var recName = event.target.elements["name"].value;
			var ingredients = event.target.elements["ingredients"].value;
			
			Recipes.insert({
				name: recName,
				ingredients: ingredients
			});
		}
	});
}

// remove one at random
// Recipes.remove(Recipes.findOne()._id)

