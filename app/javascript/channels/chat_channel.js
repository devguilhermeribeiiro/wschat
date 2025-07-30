import consumer from "channels/consumer"

const form = document.querySelector(".message_form");
const room_div = document.getElementById("room_name");
const room_name = room_div.textContent.trim();

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
      console.log(data);
      
      const current_user = document.getElementById("current_user");
      const message_received = document.getElementById("message_received");

      if (data.sender != current_user.textContent) {
	let span = createTag(
	  "span", 
	  data.message,
	  "bg-green-600 text-white font-semibold px-4 py-2 rounded-lg max-w-xs"
	);
        
	message_received.appendChild(span);
      }
    }
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    console.log("Cliquei no form");

    const current_user = document.getElementById("current_user");
    const message = document.getElementById("message");
    const data = message.value;
    const message_sended = document.getElementById("message_sended");

    chatChannel.send({ sender: current_user.textContent, message: data });

    let span = createTag(
      "span", 
      data, 
      "bg-blue-600 text-white text-end max-w-45% px-4 py-2 font-semibold rounded-lg max-w-xs"
    );

    message_sended.appendChild(span);
    message.value = "";
  });
}

function createTag(tagName, content, classesNames) {
  let tag = document.createElement(tagName);
  tag.className = classesNames;
  tag.innerText = content;

  return tag;
}
