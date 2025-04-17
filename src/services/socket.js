import { io } from "socket.io-client";
const socket = io("http://35.196.79.227:8000", {
  path: "/socket",
  transports: ["websocket"],
  query: {user_id: 6}
});

socket.on("connect" , () => {
  console.log("Conectado com sucesso")
})

socket.on("new_order" , (data) => {
  console.log("Novo pedido: " , data.order_id)
})

socket.on("disconnect", () => {
  console.log("Desconectado")
})

export default socket;