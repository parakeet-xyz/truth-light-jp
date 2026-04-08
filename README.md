## Data update flow
1. Update CSV or substance JSON
2. Run legal_csv_to_json.mjs or enrich_pubchem.mjs if needed
3. Run gen.mjs (auto on dev/build)

## Package manager policy (npm migration)
- Runtime scripts use `npm run` (not `pnpm run`) in `package.json`.
- Until `package-lock.json` is generated in an environment with registry access, keep `pnpm-lock.yaml` in the repo as a rollback path.

### Recommended local setup
1. Remove old install artifacts: `rm -rf node_modules`
2. Install with npm: `npm install`
3. Run app: `npm run dev`

### If dependency resolution fails when adding `openai`
1. Confirm npm is being used: `npm config get user-agent`
2. Verify registry/auth: `npm config get registry`
3. Retry with clean install: `rm -rf node_modules package-lock.json && npm install`
4. If your org blocks specific packages (for example `citty`), ask your registry admin to allow upstream Nuxt dependencies.
