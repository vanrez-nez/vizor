const Console = console;
const Colors = {
  crimson: 'color:firebrick;',
  default: 'color:default;',
  gray: 'color:gray',
};

export function printShaderError(error, source) {
  const errStr = error.match(/ERROR:.+\:(\d+)/);
  if (errStr[1]) {
    let i = 1;
    const eLine = Number(errStr[1]) - 1;
    const formatFn = () => `${i++}:\t`.padStart(6, ' ');
    const lines = source.replace(/^/gm, formatFn).split('\n');
    const from = Math.max(eLine - 10, 0);
    const to = Math.min(eLine + 10, lines.length);
    Console.group(`%c${error}`, Colors.crimson);
    Console.log('%c%s%c%s%c%s',
      Colors.gray, lines.slice(from, eLine).join('\n'),
      Colors.default, `\n${lines[eLine]}\n`,
      Colors.gray, lines.slice(eLine + 1, to).join('\n'),
    );
    Console.groupEnd();
  }
}

export function warn() {
  console.warn.apply(null, arguments);
}
