module.exports = function(what){
  what.source = what.source.replace(/\t/gm, '  ')
  return what
}
