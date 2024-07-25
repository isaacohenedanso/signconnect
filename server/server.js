const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const cors = require("cors");

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = socketIo(server, {
	cors: {
		origin: "http://localhost:5173",
		methods: ["GET", "POST"],
	},
});

io.on("connection", (socket) => {
	console.log("New client connected");

	socket.on("chat message", ({ name, msg }) => {
		io.emit("chat message", { name, msg });
	});

	socket.on("disconnect", () => {
		console.log("Client disconnected");
	});
});

const PORT = 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
