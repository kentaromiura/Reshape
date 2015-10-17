var fs = require('fs')
module.exports = function(path){
  var error;
  var source = ''
  try {
    source += fs.readFileSync(path)  
  } catch (e){
    error = e
  }
  
  var result = {
    path: path,
    source: source
  }
  
  if (error) result.error = error
  
  return result 
}