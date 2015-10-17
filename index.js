var clint = require('clint')(),
  glob = require('glob'),
  fs = require('fs'),
	options = {
		help: false,
    pattern: [],
    execute: [],
    last: []
	},
  jscodeshift = require('jscodeshift'),
  compose = function(vector){
    return vector.reduce(function(previous, current){      
        return function(param){
          return current(previous(param, jscodeshift), jscodeshift)
        }        
    }, function(){return arguments[0]})
  },
  requires = function(path){
    try {
      return require(path)
    } catch(e) {
      return function(){
        console.warn('this transform couldn\'t be loaded', path)
        return arguments[0]
      }
    }
  }

clint.command('--help', '-h', 'General usage information')
clint.command('--pattern', '-p', 'glob pattern to match')
clint.command('--execute', '-e', 'transforms to execute')
clint.command('--afterall', '-aa', 'function(s) to run when finished')

clint.on('command', function(name, value) {
  switch (name) {
    case '--help':
      options.help = true
      break
    case '--pattern':
      options.pattern.push(value)
      break
    case '--execute':
      options.execute.push(value)
      break
    case '--afterall':
      options.last.push(value)
      break
  }
})

clint.on('complete', function() {
  var execute;
  var afterAll;
  
  if (options.help || !options.pattern.length) {
    console.log(clint.help(2, " : "))
    console.log('Usage: reshape -p "./test/**/*.js"')
    process.exit(0)
  } else {
    execute = compose(options.execute.map(requires))    
    afterAll = compose(options.last.map(requires))
    
    options.pattern = [].concat.apply([], options.pattern.map(function(p){
      return fs.exists(p) ? p : glob.sync(p)
    }))
    
    var result = options.pattern.map(function(item,index,array){
          return execute(item)
    });
    
    afterAll(result, jscodeshift);
  }
})

clint.parse(process.argv.slice(2))