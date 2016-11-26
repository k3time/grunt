exports.defaultHandler = function(req, res){
	res.render('welcome', {title:'Welcome page'});
}
exports.chatHandler = function(req, res){
	res.render('chat', {title:'Speak good or remain silent'});
}
