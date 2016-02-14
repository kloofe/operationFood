function httpGet(theUrl)
{
	var result = HTTP.call('GET', theUrl, {headers: { "X-Mashape-Key": "3Du1rvTxpWmshZlzeFXQHI0m1Rbxp170fiNjsnyMFTg9IMY6s1" }});
	return result;

}

function processRecipeJSON(o) {
	var obj = JSON.parse(o.content);
	var ingredients = new Array();
	var index = 0;
	
	for (var i in obj.extendedIngredients) {
		ingredients[index] = obj.extendedIngredients[i].originalString;
		index++;
	}
	var rand = Recipes.find().count();
	return Recipes.insert({
		key: rand,
		name: obj.title,
		vegetarian: obj.vegetarian,
		vegan: obj.vegan,
		glutenFree: obj.glutenFree,
		dairyFree: obj.dairyFree,
		img: obj.image,
		prepTime: obj.preparationMinutes,
		cookingTime: obj.cookingMinutes,
		servings: obj.servings,
		ingredients: ingredients,
		steps: obj.text,
		source: obj.sourceUrl
	});

}

function processAllRecipes(o) {
	var obj = JSON.parse(o.content);
	for(var i in obj.results) {
		var id = obj.results[i].id;
		var url = "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/" + id + "/information";
		var response = httpGet(url);
		processRecipeJSON(response);
	}
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
  	  while(Recipes.findOne() != null) {
		  Recipes.remove(Recipes.findOne()._id);
	  }
  	/*
	var urls = ["http://allrecipes.com/recipe/13988/marrakesh-vegetable-curry/",
				"http://www.recipe.com/spaghetti-carbonara/",
				"http://www.food.com/recipe/dz-skillet-burger-16147",
				"http://allrecipes.com/recipe/57428/chicken-piccata-with-artichoke-hearts/",
				"http://allrecipes.com/recipe/165190/spicy-vegan-potato-curry/",
				"http://allrecipes.com/recipe/12960/moroccan-lentil-soup/",
				"http://allrecipes.com/recipe/24712/ginger-veggie-stir-fry/",
				"http://allrecipes.com/recipe/180325/easy-flat-iron-steak-in-wine-sauce/",
				"http://allrecipes.com/recipe/136525/sexy-shrimp-scampi/",
				"http://allrecipes.com/recipe/241601/sesame-chicken-for-slow-cooker/"];
	
	for (var i = 0; i < urls.length; i++) {
		console.log("is this running...");
		//var theURL = "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/extract?forceExtraction=true&url=";
		var response = httpGet(theURL + encodeURIComponent(urls[i]));
		processJSON(response);
	}
	*/
	var theUrl = "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/search?limitLicense=false&number=50&offset=0&query=<required>&type=main+course";
	var response = httpGet(theUrl);
	processAllRecipes(response);
	
	
}
