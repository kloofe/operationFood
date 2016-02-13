Router.route('/', function () {
  this.render('submitrecipes');
});

// This format uses magic to render the 'items' template
Router.route('/items');