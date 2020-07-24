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
  for (c in cases) {
    let code_result = require("./input_code")(cases[c]);
    if (code_result === expected[c]) {
      passed += 1;
    } else {
      c += 1;
      failed_cases.push(`case ${c}`);
    }
  }
  console.log("passed: ", passed, "out of ", cases_len);
  if (failed_cases.length) {
    console.log("test cases not passed", failed_cases.join(","));
  }
}

test_code();
