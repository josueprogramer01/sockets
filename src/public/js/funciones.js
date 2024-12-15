// // Se invoca cuando se oprime el botón Enviar
// function enviarTexto(event) {
//     event.preventDefault();
//     const message = event.target.texto.value;
//     const recipientId = document.getElementById("recipient").value;
//     if (message && recipientId) {
//       doSend(message, recipientId);
//     }
//     event.target.texto.value = ""; // Limpiar campo de texto
//   }

// // La función init se ejecuta cuando termina de cargarse la página
// function init() {
//     // Conexión con el servidor de websocket
//     wsConnect();
// }

// // Invoca esta función para conectar con el servidor de WebSocket
// function wsConnect() {
//     // Connect to WebSocket 
//     websocket= new WebSocket("ws://localhost:3000");

//     // Asignación de callbacks
//     websocket.onopen = function (evt) {
//         onOpen(evt)
//     };websocket.onclose = function (evt) {
//         onClose(evt)
//     };websocket.onmessage = function (evt) {
//         onMessage(evt)
//     };websocket.onerror = function (evt) {
//         onError(evt)
//     };
// }

// // Se ejecuta cuando se establece la conexión Websocket con el servidor
// function onOpen(evt) {
//     // Habilitamos el botón Enviar
//     document.getElementById("enviar").disabled= false;
//     // Enviamos el saludo inicial al servidor
//     doSend("Hola");
// }

// // Se ejecuta cuando la conexión con el servidor se cierra
// function onClose(evt) {

//     // Deshabilitamos el boton
//     document.getElementById("enviar").disabled= true;

//     // Intenta reconectarse cada 2 segundos
//     setTimeout(function () {
//         wsConnect()
//     }, 2000);
// }

// // Se invoca cuando se recibe un mensaje del servidor
// function onMessage(evt) {
//     const data = JSON.parse(evt.data);
//     const area = document.getElementById("mensajes");
//     if (data.from) {
//       area.innerHTML += `De ${data.from}: ${data.message}\n`;
//     } else {
//       area.innerHTML += `Servidor: ${data.message}\n`;
//     }
//   }

// // Se invoca cuando se presenta un error en el WebSocket
// function onError(evt) {console.log("ERROR: " +evt.data);
// }

// // Envía un mensaje al servidor (y se imprime en la consola)
// function doSend(message, recipientId) {
//     const data = {
//         to: recipientId, 
//         message: message,
//       };
//       websocket.send(JSON.stringify(data));
// }

// function broadcastUserList() {
//     const userList = Array.from(connections.keys());
//     connections.forEach((conn) => {
//       conn.sendUTF(JSON.stringify({ type: "userList", users: userList }));
//     });
//   }
  
//   connection.on("open", broadcastUserList);
//   connection.on("close", broadcastUserList);


// // Se invoca la función init cuando la página termina de cargarse
// window.addEventListener("load",init, false);


let websocket;
let userId = prompt("Introduce tu ID único:");

function init() {
  websocket = new WebSocket("ws://localhost:3000");

  websocket.onopen = () => {
    // Registramos el usuario
    websocket.send(JSON.stringify({ type: "register", userId }));
    console.log("Conexión establecida");
  };

  websocket.onmessage = (evt) => {
    const data = JSON.parse(evt.data);

    if (data.message) {
      const mensajes = document.getElementById("mensajes");
      mensajes.value += `De ${data.from}: ${data.message}\n`;
    }

    if (data.error) {
      alert(data.error);
    }
  };

  websocket.onclose = () => {
    console.log("Conexión cerrada");
  };

  websocket.onerror = (err) => {
    console.error("Error: ", err);
  };
}

function enviarTexto(event) {
  event.preventDefault();
  const texto = document.getElementById("texto").value;
  const recipientId = document.getElementById("recipient").value;

  if (texto && recipientId) {
    websocket.send(JSON.stringify({ type: "message", to: recipientId, message: texto }));
    const mensajes = document.getElementById("mensajes");
    mensajes.value += `Para ${recipientId}: ${texto}\n`;
    document.getElementById("texto").value = "";
  } else {
    alert("Por favor, ingresa el ID del destinatario y un mensaje.");
  }
}

window.addEventListener("load", init);
