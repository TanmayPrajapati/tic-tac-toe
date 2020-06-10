const io = require("socket.io")(8000);

const members = new Map();

io.on("connection", (socket)=>{

	socket.on("addMember", name=>{
		members.set(socket.id, name)
	})

	socket.on("connectWithPlayer", id=>{

			socket.broadcast.emit("connected", {name : members.get(id), socketId: id })

	})

	socket.on("clicked_move" , data=>{

		socket.broadcast.emit("move", data);
	})

	socket.on("disconnect", ()=>{

		members.delete(socket.id);

	})


})

