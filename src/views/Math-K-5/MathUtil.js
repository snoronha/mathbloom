const MathUtil = {
  // getOperands "53+25=78" => {op1: [5, 3], op2: [2, 5], result: [7, 8]}
  generateAdditionProblemString: (numDigits) => {
    const min = Math.pow(10, numDigits - 1); // e.g. min = 100
    const max = Math.pow(10, numDigits) - min; // e.g. max = 900
    const op1 = Math.floor(Math.random() * max) + min;
    const op2 = Math.floor(Math.random() * max) + min;
    const res = op1 + op2;
    return `${op1.toString()} + ${op2.toString()} = ${res.toString()}`;
  },
  getAdditionOperands: (str) => {
    const equationParts = str.split("=");
    const L = equationParts[0].trim();
    const R = equationParts[1].trim();
    const operands = L.split("+");
    const op1Arr = operands[0]
      .trim()
      .split("")
      .map((s) => parseInt(s));
    const op2Arr = operands[1]
      .trim()
      .split("")
      .map((s) => parseInt(s));
    const resArr = R.split("").map((s) => parseInt(s));
    op1Arr.unshift("");
    op2Arr.unshift("+");
    if (resArr.length < op1Arr.length || resArr.length < op2Arr.length) {
      resArr.unshift("");
    }
    return { id: MathUtil.uuidv4(), op1: op1Arr, op2: op2Arr, result: resArr };
  },
  generateSubtractionProblemString: (numDigits) => {
    const min = Math.pow(10, numDigits - 1); // e.g. min = 100
    const max = Math.pow(10, numDigits) - min; // e.g. max = 900
    const op1 = Math.floor(Math.random() * max) + min;
    const op2 = Math.floor(Math.random() * max) + min;
    if (op1 >= op2) {
      const res = op1 - op2;
      return `${op1.toString()} - ${op2.toString()} = ${res.toString()}`;
    } else {
      const res = op2 - op1;
      return `${op2.toString()} - ${op1.toString()} = ${res.toString()}`;
    }
  },
  getSubtractionOperands: (str) => {
    const equationParts = str.split("=");
    const L = equationParts[0].trim();
    const R = equationParts[1].trim();
    const operands = L.split("-");
    const op1Arr = operands[0]
      .trim()
      .split("")
      .map((s) => parseInt(s));
    const op2Arr = operands[1]
      .trim()
      .split("")
      .map((s) => parseInt(s));
    const resArr = R.split("").map((s) => parseInt(s));
    op1Arr.unshift("");
    op2Arr.unshift("-");
    if (resArr.length < op1Arr.length || resArr.length < op2Arr.length) {
      for (
        let i = 0;
        i < Math.max(op1Arr.length, op2Arr.length) - resArr.length;
        i++
      ) {
        resArr.unshift("");
      }
    }
    return { id: MathUtil.uuidv4(), op1: op1Arr, op2: op2Arr, result: resArr };
  },
  uuidv4: () => {
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
      (
        c ^
        (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
      ).toString(16)
    );
  },
};

export default MathUtil;
