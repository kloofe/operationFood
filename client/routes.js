Router.route('/', function () {
  this.render('index');
});

// This format uses magic to render the 'items' template
Router.route('/nomrecipe');