import { iterator } from "./1_ITERATOR_INTERFACE.mjs"

const iterable = {
  [Symbol.iterator]: () => {
    return { iterator }
  }
}