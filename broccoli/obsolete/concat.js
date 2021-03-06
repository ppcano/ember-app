var BroccoliWriter = require('broccoli-writer')
var walkSync = require('walk-sync')
var fs = require('fs')


// TODO: accept array of Trees or individuals
module.exports = Concat
Concat.prototype = Object.create(BroccoliWriter.prototype)
Concat.prototype.constructor = Concat

function Concat(inputTree, options) {
  if (!(this instanceof Concat)) return new Concat(inputTree, options)
  this.inputTree = inputTree
  this.output = options
}

Concat.prototype.write = function (readTree, destDir) {

  var output = destDir+'/'+this.output;
  return readTree(this.inputTree).then(function (srcDir) {

    var inputFiles = walkSync(srcDir)
    for (var i = 0; i < inputFiles.length; i++) {

      var inputFile = inputFiles[i]

      var destPath = destDir + '/' + inputFile
      var srcPath = srcDir + '/' + inputFile
      //console.log(srcPath);

      if (fs.lstatSync(srcPath).isFile()) { 
        var content = fs.readFileSync(srcPath)
        fs.appendFileSync(output, content)
      }
    }

  })

}
