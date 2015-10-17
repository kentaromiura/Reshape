module.exports = function(actions){
	actions.delete = actions.path
	actions.path = actions.path.replace('input', 'output')
	return actions
}