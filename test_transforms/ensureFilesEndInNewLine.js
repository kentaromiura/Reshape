module.exports = function(what){
  var source = what.source,
    length = source.length

  if(source.charAt(length-1) != '\n'){
  what.source = what.source + '\n'
  }

  return what
}
