import { delay } from './delay'

interface RetryOptions {
  maxAttempts: number
  delayMs: number
}

export function retry<TResult>(
  fn: () => TResult | Promise<TResult>,
  options: RetryOptions = { maxAttempts: 5, delayMs: 1000 }
) {
  return new Promise<TResult>((resolve, reject) => {
    const retryAttempt = async (currentAttempt: number) => {
      try {
        const result = fn()
        if (result instanceof Promise) {
          resolve(await result)
        } else {
          resolve(result)
        }
      } catch (error) {
        if (currentAttempt === options.maxAttempts) {
          console.log(
            `[RETRY] Attempt #${currentAttempt}/${options.maxAttempts} failed`
          )
          reject(error)
        } else {
          console.log(
            `[RETRY] Attempt #${currentAttempt}/${options.maxAttempts} failed, waiting ${options.delayMs}ms until next attempt...`
          )
          await delay(options.delayMs)
          await retryAttempt(currentAttempt + 1)
        }
      }
    }
    return retryAttempt(1)
  })
}
