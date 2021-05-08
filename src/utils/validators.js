export function isEmpty(value) {
  return typeof value === 'string' && !value
}

export function isLengthLessThan(length, value) {
  return typeof value === 'string' && value.length < length
}

export function isEmail(value) {
  const regex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i

  return typeof value === 'string' && regex.test(value)
}

export const custom = {
  emptyAndLenght3(value) {
    if (isEmpty(value)) {
      return '*Este campo é obrigatório'
    }

    if (isLengthLessThan(3, value)) {
      return '*O campo deve ter pelo menos 3 caracteres'
    }

    return true
  },

  emptyAndLenght6(value) {
    if (isEmpty(value)) {
      return '*Este campo é obrigatório'
    }

    if (isLengthLessThan(6, value)) {
      return '*O campo deve ter pelo menos 6 caracteres'
    }

    return true
  },

  emptyAndEmail(value) {
    if (isEmpty(value)) {
      return '*Este campo é obrigatório'
    }

    if (!isEmail(value)) {
      return '*O campo precisa ser um e-mail'
    }

    return true
  }
}
