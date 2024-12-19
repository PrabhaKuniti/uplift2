export const saveChat = (message) => {
    let chats = JSON.parse(localStorage.getItem('chatHistory')) || [];
    chats.push(message);
    localStorage.setItem('chatHistory', JSON.stringify(chats));
  };
  
  export const getChatHistory = () => {
    return JSON.parse(localStorage.getItem('chatHistory')) || [];
  };
  