
export function toggleMessageTiming(msg) {
    setTimeout(() => {
      msg.value = '';
    }, 3000);
  }
  