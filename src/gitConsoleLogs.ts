import type { ReleaseSummary } from "./gitLogReader.types";

// Using destructuring remove this history property
export const consoleLogReleaseSummary = ({history, ...releaseSummary}: ReleaseSummary): string => {
    // Emoji map for conventional commit types
    const emojiMap: Record<string, string> = {
      total: '📊',
      major: '🚀',
      minor: '✨',
      patch: '🐛',
      chore: '🛠️',
    };
  
    // Loop through keys and construct the string
    const output = Object.entries(releaseSummary)
      .map(([key, value]) => {
        const emoji = emojiMap[key] || 'ℹ️'; // Default emoji
        return `${emoji} ${key.charAt(0).toUpperCase() + key.slice(1)}: ${value}`;
      })
      .join('\n');
  
    // Log the output
    console.log(output);
    
    return output;
  };