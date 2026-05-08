module.exports = function check(str, bracketsConfig) {
  const stack = [];

  const openMap = {};
  const closeMap = {};
  const sameSet = {};

  bracketsConfig.forEach(([open, close]) => {
    if (open === close) {
      sameSet[open] = true;
    } else {
      openMap[open] = close;
      closeMap[close] = open;
    }
  });

  const isValid = str.split('').every((char) => {
    if (sameSet[char]) {
      if (stack.length === 0 || stack[stack.length - 1] !== char) {
        stack.push(char);
      } else {
        stack.pop();
      }
      return true;
    }
    if (openMap[char]) {
      stack.push(char);
      return true;
    }
    if (closeMap[char]) {
      const expected = closeMap[char];
      const last = stack.pop();
      return last === expected;
    }
    return true; // игнорируем другие символы
  });

  return isValid && stack.length === 0;
};
