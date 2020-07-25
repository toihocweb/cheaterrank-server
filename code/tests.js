function get_cases() {
  return require("./cases").inputs;
}

function get_expected() {
  return require("./cases").outputs;
}

function test_code() {
  const cases = get_cases();
  const expected = get_expected();
  const cases_len = cases.length;
  let passed = 0;
  const failed_cases = [];
  const result = {
    passed: 0,
    cases_len: 0,
    failed_cases: [],
    code_result: [],
  };
  for (c in cases) {
    let code_result = require("./input_code")(cases[c]);
    if (code_result === expected[c]) {
      passed += 1;
    } else {
      failed_cases.push(Number(c) + 1);
    }
    result.code_result.push(code_result);
  }

  if (failed_cases.length) {
    result.failed_cases = failed_cases;
  }
  result.passed = passed;
  result.cases_len = cases_len;
  console.log(result);
}

test_code();
