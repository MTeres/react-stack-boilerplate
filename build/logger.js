/* ------------------------------------------
   Logger util
--------------------------------------------- */
const os = require('os');
const chalk = require('chalk');
const Table = require('cli-table2');
const emojiRegex = require('emoji-regex/es2015');

const log = (shape, ...args) => console.log(...[...shape ? [] : ['  '], ...args]);

const regular = (...args) => console.log(...args);
const cyan = shape => (...args) => log(shape, chalk.cyan(...args));
const yellow = shape => (...args) => log(shape, chalk.yellow(...args));
const red = shape => (...args) => log(shape, chalk.red(...args));
const magenta = shape => (...args) => log(shape, chalk.magenta(...args));
const green = shape => (...args) => log(shape, chalk.green(...args));

const precisionRound = (number, precision) => {
  const factor = Math.pow(10, precision);
  return Math.round(number * factor) / factor;
};

const webpackStats = (stats, { paths }) => {
  regular(chalk.cyan('Output in:'), chalk.green(`/${paths.dist}`));
  regular(chalk.cyan('Hash:'), chalk.green(stats.hash));
  regular(chalk.cyan('Assets:'));
  const table = new Table({
    head: [chalk.cyan('Filename'), chalk.cyan('size')],
    // chars: { 'top': '═' , 'top-mid': '╤' , 'top-left': '╔' , 'top-right': '╗'
    //   , 'bottom': '═' , 'bottom-mid': '╧' , 'bottom-left': '╚' , 'bottom-right': '╝'
    //   , 'left': '║' , 'left-mid': '╟' , 'mid': '─' , 'mid-mid': '┼'
    //   , 'right': '║' , 'right-mid': '╢' , 'middle': '│' },
  });
  stats
    .assets
    .forEach(a => {
      table.push([a.name, `${precisionRound(a.size/1000, 2)} kb`]);
  });
  regular(table.toString());
  // regular(stats);
};

const OSEmojiSpaceResolver = () => {
  switch (os.type()) {
    case 'Darwin': {
      return 1;
    }
    case 'Linux': {
      return 2;
    }
    case 'Windows_NT': {
      return 1;
    }
    default: {
      return 1;
    }
  }
};
const lengthSolver = s => {
  const reg = emojiRegex();
  let m;
  const ls = [];
  while(m = reg.exec(s)) {
    ls.push(m[0].length);
  }
  return ls.reduce((acc,c) => acc - c + OSEmojiSpaceResolver(), s.length);
};
const compileChars = (p,s, char) => {
  const l = 50 - lengthSolver(p) - lengthSolver(s);
  const it = Array.apply(null, new Array(l));
  return `${p}${it.map(() => char).join('')}${s}`;
};

const shapesColor = {
  cyan,
  yellow,
  red,
  magenta,
  green,
};
const line = (color, p = '', s = '') =>
    shapesColor[color]('=')(compileChars(p, s, '='));
const dots = (color, p = '', s = '') =>
    shapesColor[color]('•')(compileChars(p, s, '•'));
const nl = () => regular('\n');

module.exports = {
  cyan: cyan(),
  yellow: yellow(),
  red: red(),
  magenta: magenta(),
  green: green(),
  webpackStats,
  regular,
  line,
  dots,
  nl,
};
