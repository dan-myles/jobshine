## Dependencies

- Node v22.x
- pnpm V10.x
- AWS CLI (with [credentials](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html))
- SST Tunnel

## Structure

```
├── apps
│   ├── argus - Main TRPC API
│   └── vanguard - Authentication API / Handles oAuth callbacks
├── packages
│   ├── api - TRPC type definitions
│   └── auth - Better Auth configuration
├── tooling
│   ├── eslint - Shared ESLint configurations
│   ├── prettier - Shared Prettier configurations
│   └── typescript - Shared TypeScript configurations
│
├── sst.config.ts - SST configuration (here is all of our infrastructure)
```
