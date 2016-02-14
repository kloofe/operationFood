function randNum() {
	return parseInt((Math.random() * Recipes.find().count()), 10);
}

function halp() {
	randomRecipe.set(Recipes.find({"key": randNum()}));
}

function search(isVege, isVegan, isGlutenFree, isDairyFree) {
	var temp = true;
	return Recipes.find({vegetarian : {$in : [temp, isVege]}, vegan : {$in : [temp, isVegan]}, glutenFree : {$in : [temp, isGlutenFree]}, dairyFree : {$in : [temp, isDairyFree]}, key : {$lte : parseInt((Math.random() * Recipes.find().count()), 10)}});
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
		  console.log(search(true, false, false, false));
		  halp();
	  }
  });
  
  
    Template.recipe.helpers({
    steps: function (sobs) {
       if(sobs.steps != null) {
		   return sobs.steps;
	   }
	   else {
		   return 'Gotta go here: <a href="' + sobs.source + '">here.</a>';
	   }
    }
  });
  
  Template.index.events({
  	  "click .gimme": function(event) {
		var a, b, c, d;
		a = $("#veg").is(':checked');
		b = $("#vegan").is(':checked');
		c = $("#gluten").is(':checked');
		d = $("#dairy").is(':checked');
		console.log(a + " " + b + " " + c + " " + d  + " ");
		if(a || b || c || d) {
			var ahh = search(a, b, c, d);
			console.log(ahh);
			randomRecipe.set(ahh);
		}
		else {
		  halp();
	    }
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

