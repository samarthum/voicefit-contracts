# @voicefit/contracts

Shared types and Zod schemas for the Voicefit web and mobile apps.

## Usage

Install from GitHub Packages (once published):

```bash
bun add @voicefit/contracts
```

Import types or schemas:

```ts
import type { DashboardData } from "@voicefit/contracts/types";
import { createMealSchema } from "@voicefit/contracts/validations";
```

## Development

```bash
bun install
bun run build
```

## Publishing (GitHub Packages)

1. Ensure `package.json` has `publishConfig.registry` set to `https://npm.pkg.github.com`.
2. Authenticate `npm`/`bun` with a GitHub token.
3. Run `npm publish` or `bun publish`.

## Notes

- This package is intended to be the single source of truth for API contracts.
- Keep web and mobile in sync by updating this package first.
