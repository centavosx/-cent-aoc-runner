export function getCallerFilePath() {
  const stack = new Error().stack?.split("\n") || [];
  return stack[2].slice(
    stack[2].lastIndexOf("(") + 1,
    stack[2].lastIndexOf(".js") + 3
  );
}
