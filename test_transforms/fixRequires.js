var path = require('path')
module.exports = function(actions, jscodeshift){
	var toReplace = actions.reduce(function(p, c){
		Object.keys(c.rename).forEach(function(key){
			p.from.push('./' + key.replace('.js', ''))
			p.to.push('./'+ c.rename[key].replace('.js', ''))
		})
		return p
	}, {
		from: [],
		to: []
	})
	
	actions = actions.map(function(file){
		var ast = jscodeshift(file.source)
		ast.find(jscodeshift.CallExpression, {
			callee:{
				name: 'require'
			}
		}).forEach(function(require){
			var oldVal = require.value.arguments[0].value
			var index = toReplace.from.indexOf(oldVal);
			if(index != -1){				
				require.value.arguments[0] = jscodeshift.literal(toReplace.to[index])
			}
		})
		file.source = ast.toSource()
		return file
	})
	return actions
};
