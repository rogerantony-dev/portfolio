// Minimal ESLint flat config — Sprint 1.
// TODO (Sprint 5 polish): Add @next/eslint-plugin-next + typescript-eslint
// rules. eslint-config-next 16.x has known FlatCompat circular-ref issues
// in ESLint 9, so we're deferring proper rules until there's enough code
// to lint meaningfully. TypeScript strict mode is the primary quality gate.
const eslintConfig = [
  {
    ignores: [".next/**", "node_modules/**", "next-env.d.ts"],
  },
]

export default eslintConfig
