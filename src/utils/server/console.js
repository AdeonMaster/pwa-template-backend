const COLOR = {
  INFO: '\x1b[36m', // Cyan
  WARN: '\x1b[93m', // Bright Yellow
  ERROR: '\x1b[31m', // Red
};

const wrapArgsWithColor = (args, color) =>
  args.map((arg) => (typeof arg === 'string' ? `${color}${arg}\x1b[0m` : arg));

const consoleInfo = console.info;
const consoleWarn = console.warn;
const consoleError = console.error;

console.info = (...args) => consoleInfo(...wrapArgsWithColor(args, COLOR.INFO));
console.warn = (...args) => consoleWarn(...wrapArgsWithColor(args, COLOR.WARN));
console.error = (...args) => consoleError(...wrapArgsWithColor(args, COLOR.ERROR));
