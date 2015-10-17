var fs = require('fs')
module.exports = function(actions){
	actions.forEach(function(commands){
		if (commands.delete) {
			console.log('pretending to delete original file ', commands.delete)
		}
		console.log('writing file ', commands.path)
		fs.writeFileSync(commands.path, commands.source)
	})
	return actions
}
