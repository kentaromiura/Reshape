var path = require('path')
module.exports = function(actions){
	actions.rename = {}
	var basename = path.basename(actions.path)
	actions.rename[basename] = (
		'reshaped' + basename.charAt(0).toUpperCase() + basename.slice(1)
	) 
	actions.path = actions.path.replace(basename, actions.rename[basename])
	return actions
}