// Function to parse the WhatsApp chat file
export function parseChatFile(file, blacklist) {
  try {
   // const fileContent = await file // Read the chat file as text
    const lines = file.split('\n'); // Split content by lines
    const formattedMessages = [];
    let idCounter = 1; // ID for each message

    lines.forEach(line => {
      const match = line.match(/\] ([^:]+): (.+)/); // Extract 'Person Name' and 'Message'
      if (match) {
        const personName = match[1];
        const message = match[2];

        let problematicWords = [];
        let categories = [];

        // Check the message against the blacklist categories
        for (const category in blacklist) {
          blacklist[category].forEach(phrase => {
            const regex = new RegExp(`\\b${phrase}\\b`, 'i'); // Match whole words, 'i' is a flag for case insensitive
            if (regex.test(message)) {
              if (!problematicWords.includes(phrase)) {
                problematicWords.push(phrase); // Add unique problematic words
              }
              if (!categories.includes(category)) {
                categories.push(category); // Add unique categories
              }
            }
          });
        }

        // Push message into formattedMessages
        if (problematicWords.length > 0) {
          formattedMessages.push({
            author: personName,
            content: message,
            problematicWords: problematicWords,
            categories: categories,
            score: idCounter,
            aiAnalyze:"hgfcvbnlkj",
            id: idCounter++
          });
        }
      }
    });

    return formattedMessages; // Return formatted messages
  } catch (error) {
    console.error('Error reading file:', error);
    throw error; // Re-throw error for caller to handle
  }
}

