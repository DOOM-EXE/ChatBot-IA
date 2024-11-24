(async function () {
  const directLineSecret = "vAwPUqaLhIY.tEDnsvWYoUMi1TSHQuQN7FbxJZ2nD_Og_uk2wC_DVWo"; // Clave secreta

  const res = await fetch("https://directline.botframework.com/v3/directline/tokens/generate", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${directLineSecret}`,
    },
  });

  const { token } = await res.json();

  const styleOptions = {
    botAvatarInitials: "Bot",
    userAvatarInitials: "Yo", 
    hideUploadButton: true,
  };
  

  const store = window.WebChat.createStore({}, ({ dispatch }) => (next) => (action) => {
    if (action.type === "DIRECT_LINE/INCOMING_ACTIVITY") {
      const activity = action.payload.activity;

      // Intercepta el mensaje de bienvenida predeterminado
      if (activity.type === "message" && activity.text === "Hello and Welcome") {
        action.payload.activity.text = "¡Hola! ¿En qué puedo ayudarte hoy?";
      }
    }

    return next(action);
  });

  window.WebChat.renderWebChat(
    {
      directLine: window.WebChat.createDirectLine({ token }),
      styleOptions,
      store, 
    },
    document.getElementById("webchat")
  );

  const chatbotButton = document.getElementById("chatbot-button");
  const chatbotContainer = document.getElementById("chatbot-container");
  const closeChatbotButton = document.getElementById("close-chatbot");

  chatbotButton.addEventListener("click", () => {
    chatbotContainer.classList.toggle("hidden"); 
    
  });

  closeChatbotButton.addEventListener("click", () => {
    chatbotContainer.classList.add("hidden");
  });


})();
