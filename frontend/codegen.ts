import type { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  overwrite: true,
  ignoreNoDocuments: true,
  schema: 'http://localhost:4000/graphql',
  documents: 'graphql/**/*.tsx',
  generates: {
    'graphql/_generated/': {
      preset: 'client',
      plugins: [],
      presetConfig: {
        fragmentMasking: false
      }
    }
  }
}

export default config
