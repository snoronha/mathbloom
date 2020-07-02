const MathUtil = {
  // getOperands "53+25=78" => {op1: [5, 3], op2: [2, 5], result: [7, 8]}
  getAdditionOperands: (numDigits) => {
    const min = Math.pow(10, numDigits - 1); // e.g. min = 100
    const max = Math.pow(10, numDigits) - min; // e.g. max = 900
    const op1 = Math.floor(Math.random() * max) + min;
    const op2 = Math.floor(Math.random() * max) + min;
    const res = op1 + op2;
    const op1Arr = op1
      .toString()
      .split("")
      .map((s) => parseInt(s));
    const op2Arr = op2
      .toString()
      .split("")
      .map((s) => parseInt(s));
    const resArr = res
      .toString()
      .split("")
      .map((s) => parseInt(s));
    op1Arr.unshift("");
    op2Arr.unshift("+");
    if (resArr.length < op1Arr.length || resArr.length < op2Arr.length) {
      resArr.unshift("");
    }
    return {
      id: MathUtil.uuidv4(),
      specs: [
        { type: "static", data: op1Arr },
        { type: "static", data: op2Arr },
        { type: "hr" },
        { type: "editable", data: resArr },
      ],
    };
  },
  getSubtractionOperands: (numDigits) => {
    const min = Math.pow(10, numDigits - 1); // e.g. min = 100
    const max = Math.pow(10, numDigits) - min; // e.g. max = 900
    let op1 = Math.floor(Math.random() * max) + min;
    let op2 = Math.floor(Math.random() * max) + min;
    if (op2 > op1) {
      const tmp = op2;
      op2 = op1;
      op1 = tmp;
    }
    const res = op1 - op2;
    const op1Arr = op1
      .toString()
      .split("")
      .map((s) => parseInt(s));
    const op2Arr = op2
      .toString()
      .split("")
      .map((s) => parseInt(s));
    const resArr = res
      .toString()
      .split("")
      .map((s) => parseInt(s));
    op1Arr.unshift("");
    op2Arr.unshift("-");
    if (resArr.length < op1Arr.length || resArr.length < op2Arr.length) {
      const diff = Math.max(op1Arr.length, op2Arr.length) - resArr.length;
      for (let i = 0; i < diff; i++) {
        resArr.unshift("");
      }
    }
    return {
      id: MathUtil.uuidv4(),
      specs: [
        { type: "static", data: op1Arr },
        { type: "static", data: op2Arr },
        { type: "hr" },
        { type: "editable", data: resArr },
      ],
    };
  },
  getMultiplicationOperands: (digits1, digits2) => {
    const min1 = Math.pow(10, digits1 - 1); // e.g. min1 = 100
    const max1 = Math.pow(10, digits1) - min1; // e.g. max1 = 900
    const min2 = Math.pow(10, digits2 - 1); // e.g. min2 = 100
    const max2 = Math.pow(10, digits2) - min2; // e.g. max2 = 900
    const op1 = Math.floor(Math.random() * max1) + min1;
    const op2 = Math.floor(Math.random() * max2) + min2;
    let intermediate = [];
    let tmp2 = op2;
    while (tmp2 !== 0) {
      const digit = tmp2 % 10;
      intermediate.push(op1 * digit);
      tmp2 = Math.floor(tmp2 / 10);
    }
    const res = op1 * op2;
    const op1Arr = op1
      .toString()
      .split("")
      .map((s) => parseInt(s));
    const op2Arr = op2
      .toString()
      .split("")
      .map((s) => parseInt(s));
    const resArr = res
      .toString()
      .split("")
      .map((s) => parseInt(s));
    if (op1Arr.length < resArr.length) {
      const diff = resArr.length - op1Arr.length;
      for (let i = 0; i < diff; i++) {
        op1Arr.unshift("");
      }
    }
    if (op2Arr.length < resArr.length) {
      const diff = resArr.length - op2Arr.length;
      for (let i = 0; i < diff - 1; i++) {
        op2Arr.unshift("");
      }
    }
    op2Arr.unshift("\\times");
    let specs = [];
    specs.push({ type: "static", data: op1Arr });
    specs.push({ type: "static", data: op2Arr });
    specs.push({ type: "hr" });
    if (intermediate.length > 1) {
      for (let i = 0; i < intermediate.length; i++) {
        let opArr = intermediate[i]
          .toString()
          .split("")
          .map((s) => parseInt(s));
        for (let k = 0; k < i; k++) {
          opArr.push("");
        }
        if (opArr.length < resArr.length) {
          const diff = resArr.length - opArr.length;
          for (let k = 0; k < diff; k++) {
            opArr.unshift("");
          }
        }
        specs.push({ type: "editable", data: opArr });
      }
      specs.push({ type: "hr" });
    }

    specs.push({ type: "editable", data: resArr });
    return { id: MathUtil.uuidv4(), specs: specs };
  },
  getAlgebraFactorizationProblem: () => {
    const m = Math.floor(Math.random() * 10) + 1;
    const n = Math.floor(Math.random() * 10) + 1;
    const p = m + n;
    const q = m * n;
    let specs = [];
    specs.push({
      type: "html",
      data: "Please solve the <b>following</b> <i>equation</i>:",
    });
    specs.push({
      style: { flex: 1, textAlign: "center" },
      type: "staticString",
      data: `x^2 + ${p}x + ${q} = 0`,
    });
    specs.push({
      style: { flex: 1, textAlign: "center" },
      type: "mixed",
      data: [
        { type: "html", data: "x = " },
        { type: "editable", data: [-m, -n] },
        { type: "html", data: ", and x = " },
        { type: "editable", data: [-m, -n] },
      ],
    });
    return { id: MathUtil.uuidv4(), specs: specs };
  },
  getPythagoreanTriples: (min, max) => {
    let m = Math.floor(Math.random() * max);
    let n = Math.floor(Math.random() * max);
    if (m < min) m += min;
    if (n < min) n += min;
    if (m < n) {
      const tmp = n;
      n = m;
      m = tmp;
    }
    if (m === n) m++;
    const a = m * m - n * n;
    const b = 2 * m * n;
    const c = m * m + n * n;
    return { a: a, b: b, c: c };
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
