import js from '@eslint/js';
import tseslint from '@typescript-eslint/eslint-plugin';
import tsparser from '@typescript-eslint/parser';
import astroPlugin from 'eslint-plugin-astro';
import globals from 'globals';

export default [
  js.configs.recommended,
  ...astroPlugin.configs['flat/recommended'],
  {
    files: ['**/*.ts', '**/*.astro/*.ts'],
    languageOptions: {
      parser: tsparser,
      parserOptions: {
        sourceType: 'module',
      },
      globals: {
        ...globals.node,
        ...globals.browser,
      },
    },
    plugins: { '@typescript-eslint': tseslint },
    rules: {
      ...tseslint.configs.recommended.rules,
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
    },
  },
  {
    files: ['**/*.astro'],
    languageOptions: {
      globals: {
        ...globals.browser,
      },
    },
  },
  {
    // Scripts d'outillage exécutés par Node (ex. scripts/export-seed-content.mjs).
    files: ['scripts/**/*.mjs', '**/*.config.mjs'],
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
  },
  {
    // backend/ est un projet Next.js/Payload séparé (lot L3), avec son propre outillage — voir
    // backend/package.json (son propre `npm run lint` y est à prévoir si besoin).
    // `.claude/` : copies de travail (git worktrees) des sessions parallèles, chacune lintée chez elle.
    ignores: ['dist/', '.astro/', 'node_modules/', 'playwright-report/', 'test-results/', 'backend/', '.claude/',
      // boutique/ : restes locaux non versionnés de l'ancienne boutique séparée (désormais dans
      // backend/src/boutique et src/pages/boutique).
      'boutique/'],
  },
];
