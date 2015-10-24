module.exports = function(what){
  what.source = what.source.replace(/[\ \t]+\n/gm, '\n')
  return what
}
