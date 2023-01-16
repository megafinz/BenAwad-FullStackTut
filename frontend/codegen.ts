import type { CodegenConfig } from '@graphql-codegen/cli'
import config from './lib/config'

const codegenConfig: CodegenConfig = {
  overwrite: true,
  ignoreNoDocuments: true,
  schema: config.backend.gqlUrl,
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

export default codegenConfig
