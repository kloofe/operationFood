Recipes = new Mongo.Collection("recipes");

if (Meteor.isClient) {
  // This code only runs on the client
  Template.submitrecipes.helpers({
    recipes: function () {
      return Recipes.find({});
    }
  });
  
  Template.submitrecipes.events({
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

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
