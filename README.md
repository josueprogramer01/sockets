# Chat en Tiempo Real con Node.js y WebSockets

Este proyecto implementa un sistema de chat en tiempo real entre dos usuarios utilizando **Node.js**, **WebSockets**, y una interfaz web sencilla. Es ideal para aprender los fundamentos de la comunicación en tiempo real y servir como base para proyectos más complejos.

## Características

- Comunicación bidireccional entre cliente y servidor usando WebSockets.
- Envío de mensajes en tiempo real entre dos usuarios identificados por sus IDs.
- Reconexión automática en caso de pérdida de conexión.
- Interfaz web con Bootstrap para enviar y recibir mensajes.

## Requisitos Previos

Asegúrate de tener instalado lo siguiente:

- [Node.js](https://nodejs.org/) (versión 14 o superior)
- Navegador web moderno (como Chrome o Firefox)

## Instalación

1. Clona este repositorio:

   ```bash
   git clone https://github.com/tu-usuario/chat-tiempo-real.git
   ```

2. Navega al directorio del proyecto:

   ```bash
   cd chat-tiempo-real
   ```

3. Instala las dependencias:

   ```bash
   npm install
   ```

4. Inicia el servidor:

   ```bash
   node server.js
   ```

5. Abre el navegador y accede a la aplicación en:

   ```
   http://localhost:3000
   ```

## Uso

1. Al abrir la aplicación, se te pedirá ingresar tu **ID único**. Este ID identifica a cada usuario en el sistema.
2. Ingresa el ID del destinatario con quien deseas chatear.
3. Escribe un mensaje en el campo de texto y presiona **Enviar**.
4. Los mensajes enviados y recibidos aparecerán en el área de texto.

## Estructura del Proyecto

```
chat-tiempo-real/
├── public/
│   ├── index.html         # Interfaz de usuario
│   ├── js/
│   │   └── funciones.js   # Lógica del cliente para WebSockets
├── server.js              # Servidor Node.js con WebSocket
├── package.json           # Dependencias y configuración del proyecto
└── README.md              # Documentación del proyecto
```

## Tecnologías Utilizadas

- **Node.js**: Plataforma de backend.
- **Express**: Servidor HTTP para servir archivos estáticos.
- **WebSocket**: Comunicación en tiempo real.
- **Bootstrap**: Diseño responsivo y estilizado de la interfaz.

## Próximas Mejoras

- Persistencia de mensajes con una base de datos (MongoDB, MySQL, etc.).
- Autenticación de usuarios.
- Lista de usuarios conectados en tiempo real.
- Cifrado de mensajes para mayor seguridad.

## Contribuciones

¡Las contribuciones son bienvenidas! Si tienes ideas o mejoras, abre un **Issue** o envía un **Pull Request**.

## Licencia

Este proyecto está bajo la [Licencia MIT](https://opensource.org/licenses/MIT). Siéntete libre de usarlo, modificarlo y compartirlo.

---

### Contacto

Si tienes preguntas o sugerencias, no dudes en contactarme:

- **Autor**: [Josue Alvarez Rodriguez](mailto:arj1931126@gmail.com)
