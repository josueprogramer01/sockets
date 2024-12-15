// importamos las librerías requeridas
const path = require("path");
const express = require("express");
const cors = require("cors");
const app = express();
const server = require("http").Server(app);
const WebSocketServer = require("websocket").server;

// Creamos el servidor de sockets y lo incorporamos al servidor de la aplicación
const wsServer = new WebSocketServer({
  httpServer: server,
  autoAcceptConnections: false,
});

// Especificamos el puerto en una varibale port, incorporamos cors, express
// y la ruta a los archivo estáticos (la carpeta public)

app.set("port", 3000);
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "./public")));

function originIsAllowed(origin) {
  // Para evitar cualquier conexión no permitida, validamos que
  // provenga de el cliente adecuado, en este caso del mismo servidor.
  if (origin === "http://localhost:3000") {
    return true;
  }
  return false;
}

const connections = new Map();

wsServer.on("request", (request) => {
  if (!originIsAllowed(request.origin)) {
    // Sólo se aceptan request de origenes permitidos
    request.reject();
    console.log(
      new Date() + " Conexión del origen " + request.origin + " rechazada."
    );
    return;
  }

  const connection = request.accept(null, request.origin);
  let userId;
  // const userId = Date.now().toString();
  // connections.set(userId, connection);

  // console.log("Sujeto con el id: ", userId, " en línea.");

  connection.on("message", (message) => {
    const data = JSON.parse(message.utf8Data);

    // Registrar al usuario
    if (data.type === "register") {
      userId = data.userId;
      connections.set(userId, connection);
      console.log(`Usuario registrado: ${userId}`);
      return;
    }

    // Enviar mensaje a un destinatario
    if (data.type === "message" && data.to) {
      const recipientConnection = connections.get(data.to);
      if (recipientConnection) {
        recipientConnection.sendUTF(
          JSON.stringify({ from: userId, message: data.message })
        );
      } else {
        connection.sendUTF(JSON.stringify({ error: "Usuario no disponible" }));
      }
    }
  });

  connection.on("close", () => {
    if (userId) {
      connections.delete(userId);
      console.log(`Usuario desconectado: ${userId}`);
    }
  });
});

// Iniciamos el servidor en el puerto establecido por la variable port (3000)
server.listen(app.get("port"), () => {
  console.log("Servidor iniciado en el puerto: " + app.get("port"));
});
