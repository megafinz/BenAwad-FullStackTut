import { ValidationError } from '../graphql/_generated/graphql'

export function toErrorMap(errors: ValidationError[]): Record<string, string> {
  const result: Record<string, string> = {}
  for (const error of errors) {
    result[error.field] = error.message
  }
  return result
}
