
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


// remove one at random
// Recipes.remove(Recipes.findOne()._id)

