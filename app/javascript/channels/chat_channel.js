import consumer from "channels/consumer"

const form = document.querySelector(".message_form");
const room_div = document.getElementById("room_name");
const room_name = room_div.textContent.trim();
const message_received = document.getElementById("message_received");
const message_sended = document.getElementById("message_sended");

console.log(room_name);

if (room_name.length > 0) {
  console.log("Entrei na view do chat");

  const chatChannel = consumer.subscriptions.create({ channel: "ChatChannel", room: room_name }, {
    connected() {
      console.log("Conectei no chat");
    },

    disconnected() {
      console.log("Desconectado do ChatChannel");
    },

    received(data) {
      console.log("Mensagem recebida");
      console.log(data.message);
      message_received.textContent = data.message;
    }
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    console.log("Cliquei no form");

    const message = document.getElementById("message");
    const data = message.value;

    chatChannel.send({ message: data });

    let span = document.createElement("span");
      span.className = "bg-blue-600 text-white text-end max-w-45% px-4 py-2 font-semibold rounded-lg max-w-xs";
    span.innerText = data;
    message_sended.appendChild(span);
    message.value = "";
  });
}
