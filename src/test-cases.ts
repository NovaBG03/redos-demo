type RegexTestCase = {
  name: string;
  vulnerableRegex: RegExp;
  safeRegex?: RegExp;
  inputs: RegexTestCaseInput[];
};

type RegexTestCaseInput = {
  name: string;
  value: string;
};

type RegexPerformanceResult = {
  executionTime: number;
  match: boolean | 'TIMEOUT';
};

export const TEST_CASES: RegexTestCase[] = [
  {
    name: 'Avoid Nested Quantifiers - Username Validation',
    // Вложените "+" причиняват експоненциално време за изпълнение.
    // Решение: Ограничаване на дължината и избягване на вложените "+"
    vulnerableRegex: /^([a-zA-Z0-9]+)+$/,
    safeRegex: /^[a-zA-Z0-9]{3,20}$/,
    inputs: [
      { name: 'Valid short username', value: 'User123' },
      { name: 'Malicious input', value: 'a'.repeat(30) + '!' },
    ],
  },
  {
    name: 'Limit Quantifiers - Credit Card Number Validation',
    // Неограничен квантификатор може да доведе до неочаквано дълго изпълнение.
    // Решение: Използване на точни граници на повторенията.
    vulnerableRegex: /^(\d+[\s-]?)+$/,
    safeRegex: /^(\d{4}[\s-]?){3}\d{4}$/,
    inputs: [
      { name: 'Valid credit card number', value: '1234-5678-1234-5678' },
      { name: 'Malicious input', value: '1'.repeat(5000) },
    ],
  },
  {
    name: 'Greedy vs Lazy Quantifiers - HTML Tag Parsing',
    // Жадните квантификатори без ограничение причиняват бавно търсене при несъвпадение.
    // Решение: Използване на лениви (lazy) квантификатори.
    vulnerableRegex: /<div>.*<\/div>/,
    safeRegex: /<div>.*?<\/div>/,
    inputs: [
      { name: 'Valid HTML block', value: '<div>Some Content</div>' },
      { name: 'Malicious input', value: '<div>' + 'a'.repeat(10000) },
    ],
  },
  {
    name: 'Atomic Grouping with Lookahead - Password Validation',
    // Вложените lookahead и повтарящи се групи могат да създадат експоненциално обратно проследяване.
    // Решение: Използване на прости lookahead и ограничаване дължината.
    vulnerableRegex: /^(?=.*[A-Z]+)(?=.*\d+)([A-Za-z\d]+)+$/,
    safeRegex: /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,20}$/,
    inputs: [
      { name: 'Valid strong password', value: 'StrongPass123' },
      { name: 'Malicious input', value: 'A'.repeat(10000) },
    ],
  },
  {
    name: 'JSON-like Pattern Matching',
    // Прекомерно вложени шаблони могат да причинят експоненциално време за изпълнение.
    // Решение: Ограничаване на дълбочината на вложеност.
    vulnerableRegex: /\{(([^{}]|\{([^{}]|\{[^{}]*\})*\}))*\}/,
    safeRegex: /\{(?:[^{}]|(?:\{[^{}]*\})){0,100}\}/,
    inputs: [
      {
        name: 'Valid nested object',
        value: '{"user":{"name":"John","settings":{"theme":"dark"}}}',
      },
      { name: 'Malicious input', value: '{' + '{'.repeat(20) + '}'.repeat(20) + 'x' },
    ],
  },
  {
    name: 'Email Validation',
    // Комплексният regex е податлив на ReDoS, когато локалната част е прекалено дълга.
    // Решение: Ограничаване на локалната част и използване на опростена структура.
    vulnerableRegex:
      /^([a-zA-Z0-9])(([\-.]|[_]+)?([a-zA-Z0-9]+))*(@){1}[a-z0-9]+[.]{1}(([a-z]{2,3})|([a-z]{2,3}[.]{1}[a-z]{2,3}))$/,
    safeRegex: /^[a-zA-Z0-9][a-zA-Z0-9_.-]{0,50}@[a-z0-9]+\.[a-z]{2,3}(\.[a-z]{2,3})?$/,
    inputs: [
      { name: 'Valid email', value: 'user.name@example.com' },
      { name: 'Malicious input', value: 'a'.repeat(35) },
    ],
  },
  {
    name: 'Java Class Name Validation',
    // Този регулярен израз е уязвим на ReDoS заради вложени повторения.
    // Решение: Опростяване и премахване на вложените повторения.
    // https://wiki.owasp.org/index.php/OWASP_Validation_Regex_Repository
    vulnerableRegex: /^(([a-z])+.)+[A-Z]([a-z])+$/,
    safeRegex: /^(([a-z])+\.)+[A-Z]([a-zA-Z])+$/,
    inputs: [
      { name: 'Valid Java class name', value: 'MyClass' },
      { name: 'Malicious input', value: 'a'.repeat(40) + '!' },
    ],
  },
  {
    name: 'HTML Parsing with Attributes',
    // Използването на '([^<]+)*' причинява катастрофално обратно проследяване.
    // Решение: Премахване на вложения квантификатор и ограничаване на атрибутите.
    vulnerableRegex: /<([a-z]+)([^<]+)*(?:>(.*?)<\/\1>|\s+\/>)/,
    safeRegex: /<([a-z]+)(\s+[a-zA-Z]+="[^"]*")*\s*(?:>(.*?)<\/\1>|\s+\/>)/,
    inputs: [
      { name: 'Valid HTML', value: '<div class="test">Съдържание</div>' },
      { name: 'Malicious input', value: '<div ' + 'x="y" '.repeat(4) },
    ],
  },
];

const measureRegexPerformance = (regex: RegExp, text: string): RegexPerformanceResult => {
  const start = performance.now();

  const match = regex.test(text);
  const executionTime = performance.now() - start;

  return { match, executionTime };
};

const runTestForInput = (testCase: RegexTestCase, input: RegexTestCaseInput) => {
  const truncatedInput =
    input.value.length > 30 ? `${input.value.substring(0, 30)}...` : input.value;
  console.log(`\n- ${input.name}: "${truncatedInput}" (${input.value.length} chars)`);

  const result = measureRegexPerformance(testCase.vulnerableRegex, input.value);
  const resultExecutionTime = result.executionTime.toFixed(3).toString();
  console.log(
    `  • Vulnerable: ${
      result.match === 'TIMEOUT' ? '⏰ Timed out' : result.match ? '✓ match   ' : '✗ no match'
    } [${resultExecutionTime} ms]`
  );

  if (testCase.safeRegex) {
    const safeResult = measureRegexPerformance(testCase.safeRegex, input.value);
    const safeResultExecutionTime = safeResult.executionTime.toFixed(3).toString();
    const safeResultExecutionTimePadding =
      resultExecutionTime.length - safeResultExecutionTime.length;
    console.log(
      `  • Safe      : ${
        safeResult.match === 'TIMEOUT'
          ? '⏰ Timed out'
          : safeResult.match
          ? '✓ match   '
          : '✗ no match'
      } [${
        safeResultExecutionTimePadding > 0 ? ' '.repeat(safeResultExecutionTimePadding) : ''
      }${safeResultExecutionTime} ms]`
    );

    if (result.match !== 'TIMEOUT' && safeResult.match !== 'TIMEOUT') {
      const factor = result.executionTime / safeResult.executionTime;
      if (factor > 1.5) {
        console.log(`  • Safe regex is ${factor.toFixed(1)}x faster`);
      } else if (factor < 0.5) {
        console.log(`  • Safe regex is ${(1 / factor).toFixed(1)}x slower`);
      } else {
        console.log(`  • Performance is roughly the same`);
      }
    }
  }
};

const runTestCase = (testCase: RegexTestCase) => {
  console.log(`\n### ${testCase.name}`);
  if (testCase.safeRegex) {
    console.log(`Vulnerable: ${testCase.vulnerableRegex}`);
    console.log(`Safe      : ${testCase.safeRegex}`);
  } else {
    console.log(`Regex: ${testCase.vulnerableRegex}`);
  }

  for (const input of testCase.inputs) {
    runTestForInput(testCase, input);
  }
};

const isMainModule = import.meta.url.endsWith(process.argv[1]);
if (isMainModule) {
  console.log('ReDoS Vulnerability Demonstration');
  console.log(
    `Runtime: ${typeof Bun !== 'undefined' ? 'Bun' : 'Node.js'} ${
      typeof Bun !== 'undefined' ? Bun.version : process.version
    }`
  );

  for (const testCase of TEST_CASES) {
    runTestCase(testCase);
  }
}
