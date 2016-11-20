exports.defaultHandler = function(req, res){
	res.render('welcome', {title:'Welcome page'});
}
exports.addHandler = function(req, res){
	res.render('add', {title:'Add technology'});
}
exports.noActionHandler = function(req, res){
	res.send('Sorry, no DB connected this time.');
}