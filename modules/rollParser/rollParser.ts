import peg from 'pegjs'
import fullGrammar from './fullGrammar'
import rollGrammar from './rollGrammar'

const fullParser = peg.generate(fullGrammar)
const rollParser = peg.generate(rollGrammar)

const rollTokensRegex = /\d+d\d+/gm
const allTokensRegex = /\d+d\d+|d\d+|\d+|\+|\-|\*|\/|\(|\)/gm

export type RollResult = {
  equation: string
  result: string
  tokens:
    | {
        token: string
        isRoll: boolean
        rollResults: number[] | null
      }[]
    | null
}

export default {
  parse: (equation: string, options: { verbose: boolean } = { verbose: false }): RollResult => {
    if (options.verbose) {
      const tokens = equation.match(allTokensRegex)
      const tempTokens = [] as string[]
      const result: RollResult = {
        equation,
        result: '',
        tokens: [],
      }

      if (tokens) {
        for (const token of tokens) {
          const isRoll = token.match(rollTokensRegex) ? true : false
          const rollResults = isRoll ? ([] as number[]) : null

          if (isRoll) {
            const splitToken = token.split('d')

            if (splitToken[0]) {
              const numberOfRolls = Number(splitToken[0])
              const rolledDie = splitToken[1]

              for (let i = 0; i < numberOfRolls; i++) {
                rollResults?.push(Number(rollParser.parse(`1d${rolledDie}`)))
              }
            }
          }

          result.tokens?.push({
            token,
            isRoll,
            rollResults: isRoll ? rollResults : null,
          })

          if (rollResults) {
            tempTokens.push(String(rollResults.reduce((a, b) => a + b, 0)))
          } else {
            tempTokens.push(token)
          }
        }
        result.result = fullParser.parse(tempTokens.join(''))
      } else {
        result.result = fullParser.parse(equation)
      }
      return result
    } else {
      return {
        equation,
        result: fullParser.parse(equation),
        tokens: null,
      } as RollResult
    }
  },
}
