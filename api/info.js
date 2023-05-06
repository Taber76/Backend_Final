const parseArgs = require('minimist')(process.argv)
const numCPUs = require('os').cpus().length

module.exports.infoTemplate = () => {

  let tabla = '<table border="1">'
  tabla += '<tr><th>Descripcion</th><th>Valor</th></tr>'
  for (const key in parseArgs) { if (key !== '_') { tabla += `<tr><td>Argumento</td><td>${key}: ${parseArgs[key]}</td></tr>` } }
  tabla += `<tr><td>Sistema operativo</td><td>${process.platform}</td></tr>`
  tabla += `<tr><td>Version de node.js</td><td>${process.versions.node}</td></tr>`
  tabla += `<tr><td>Memoria reservada</td><td>${(process.memoryUsage().heapTotal / (1024 * 1024 )).toFixed(2)} MB</td></tr>`
  tabla += `<tr><td>Process id</td><td>${process.pid}</td></tr>`
  tabla += `<tr><td>Numero de procesadores</td><td>${numCPUs}</td></tr>`
  tabla += `<tr><td>Path de ejecucion</td><td>${parseArgs._[2]}</td></tr>`
  tabla += `<tr><td>Carpeta del proyecto</td><td>${parseArgs._[1]}</td></tr>`
  tabla += '</table>'

  return tabla
}