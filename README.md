# ReDoS Vulnerability Demonstration

This project is a demonstration of Regular Expression Denial of Service (ReDoS) vulnerabilities and their mitigations. It provides interactive examples of vulnerable regex patterns and their safe alternatives.

## What is ReDoS?

Regular Expression Denial of Service (ReDoS) is a type of algorithmic complexity attack where a maliciously crafted input can cause a regular expression to take an excessive amount of time to process, potentially leading to a denial of service.

## Features

- Interactive demo interface for exploring ReDoS vulnerabilities
- Multiple real-world examples with vulnerable and safe regex patterns
- Performance comparison between vulnerable and optimized patterns
- REST API with intentional vulnerabilities for demonstration
- Works with both Bun and Node.js runtimes

## Test Cases Included

1. Nested Quantifiers - Username Validation
2. Unlimited Quantifiers - Credit Card Number Validation
3. Greedy vs Lazy Quantifiers - HTML Tag Parsing
4. Atomic Grouping with Lookahead - Password Validation
5. JSON-like Pattern Matching
6. Email Validation
7. Java Class Name Validation
8. HTML Parsing with Attributes

## Getting Started

### Prerequisites

- [Bun](https://bun.sh/) (recommended) and Node.js

### Installation

```bash
# Clone the repository
git clone https://github.com/NovaBG03/redos-demo
cd redos-demo

# Install dependencies
bun install
```

### Running the Demo

#### Run demo using Bun

```bash
# Start the development server
bun dev
```

#### Run demo using Node.js

```bash
# Start the development server with Node.js
bun dev:node
```

### Running Test Cases Directly

```bash
# Run test cases with Bun
bun test-cases:bun

# Run test cases with Node.js
bun test-cases:node
```

## Project Structure

- `src/`
  - `frontend/` - React frontend application
  - `lib/` - Shared library code with vulnerable patterns
  - `server-bun.tsx` - Bun-specific server implementation
  - `server-node.tsx` - Node.js server implementation
  - `test-cases.ts` - Collection of ReDoS test cases
  - `frontend-only-bun.tsx` - Bun-specific frontend dev server

## Mitigation Strategies

The demo showcases several regex mitigation strategies:

1. Limiting repetition quantifiers
2. Avoiding nested quantifiers
3. Using lazy quantifiers instead of greedy ones
4. Setting explicit character class limits
5. Using atomic groups and possessive quantifiers
6. Simplifying complex regex patterns

## Technologies Used

- Bun/Node.js - JavaScript runtime
- React - Frontend library
- Express - Node.js web framework (for Node.js server)
- TypeScript - Type safety
- Tailwind CSS - Styling

## License

This project is intended for educational purposes.

## References

[1] [Understanding Regular Expression Denial of Service (ReDoS): Insights from LLM-Generated Reviews and Developer Forums](https://s2e-lab.github.io/preprints/icpc24-preprint.pdf)

[2] [Safe: A Literature and Engineering Review of Regular Expression Denial of Service](https://arxiv.org/abs/2406.11618)

[3] [The Impact of Regular Expression Denial of Service (ReDoS) in Practice](https://www3.cs.stonybrook.edu/~dongyoon/papers/FSE-18-ReDoS.pdf)

[4] OWASP Community. [Regular expression Denial of Service - ReDoS](https://github.com/OWASP/www-community/blob/master/pages/attacks/Regular_expression_Denial_of_Service_-_ReDoS.md)

[5] [Regular Expression Denial of Service (ReDoS) and Catastrophic Backtracking](https://snyk.io/blog/redos-and-catastrophic-backtracking/)

[6] [What is Regular Expression Denial of Service Attacks? Security Learning Center](https://www.imperva.com/learn/ddos/regular-expression-denial-of-service-redos/)
