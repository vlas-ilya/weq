export function createMessage(message, sender) {
  return JSON.stringify({
    topic: message.topic,
    message: message.message,
    sender: sender.name
  });
}