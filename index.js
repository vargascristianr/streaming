'use strict'
//definicion de variables
var app = require('express')(),//app requiere express y lo ejecuta
	http = require('http').createServer(app), //se genera servidor http con la aplicacion app
	io = require('socket.io')(http),//socket io ejecuta la variable del servidor web
	port = process.env.PORT || 3000, //se genera la variable del puerto
	publicDir = `${__dirname}/public`//variable del directorio publico

	//la variable del servidor estaria escuchabdo el puerto y cuando lo hace manda un texto a la consla
http.listen(port, () => {
	//mostrar texto por la consola
	console.log('Iniciando Express y Socket.IO en localhost:%d', port)
})

app
//la aplicacion solicita dos rutas la del servidor y la del cliente
	//ruta para visualizar el streaming
	.get('/', (req, res) => {
		//como respuesta a la peticionse envia el archivo
		res.sendFile(`${publicDir}/cliente.html`)
	})
	//ruta para emitir el streaming
	.get('/streaming', (req, res) => {
		res.sendFile(`${publicDir}/servidor.html`)		
	})

//la variable io se conceta y recibe como parametro un socket
io.on('connection', (socket) => {
	socket.on('streaming', (image) => { //socket cuyo evento que recibe la imagen que envia el servidor
		io.emit('play stream', image) //socket cuyo evento que emite la imagen en el cliente
		//console.log(image)
	})	
})