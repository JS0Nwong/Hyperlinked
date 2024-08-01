const supportedLanguages = [
  "javascript",
  "python",
  "django",
  "html",
  "css",
  "json",
  "xml",
  "markdown",
  "graphql",
  "latex",
  "kotlin",
  "java",
  "php",
  "ruby",
  "c",
  "cpp",
  "csharp",
  "shell",
  "sql",
  "rust",
  "swift",
  "typescript",
  "yaml",
];

const detectCodeLike = (text) => {
  if (!text.includes("```")) {
    return [{ type: "text", content: text }];
  }

  const codeBlockRegex = /```(\w+)?\n([\s\S]*?)```/g;
  let result = [];
  let lastIndex = 0;

  text.replace(codeBlockRegex, (match, language, code, index) => {
    // Capture text before the code block
    if (index > lastIndex) {
      result.push({ type: "text", content: text.slice(lastIndex, index) });
    }

    // Capture the code block
    result.push({ type: "code", language: language || "", content: code });

    lastIndex = index + match.length;
  });

  // Capture any remaining text after the last code block
  if (lastIndex < text.length) {
    result.push({ type: "text", content: text.slice(lastIndex) });
  }

  return result;
};

export { detectCodeLike, supportedLanguages };
