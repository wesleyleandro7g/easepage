const loadingMessages: string[] = [
  'O sucesso é ir de fracasso em fracasso sem perder o entusiasmo. - Winston Churchill',
  'Oportunidades não surgem. É você que as cria. - Chris Grosser',
  'Não é o mais forte que sobrevive, nem o mais inteligente, mas o que melhor se adapta às mudanças. - Charles Darwin',
  'O único lugar onde o sucesso vem antes do trabalho é no dicionário. - Vidal Sassoon',
  'A melhor maneira de prever o futuro é inventá-lo. - Alan Kay',
  'A persistência é o caminho do êxito. - Charles Chaplin',
  'Acredite em milagres, mas não dependa deles. - Immanuel Kant',
  'A sorte favorece a mente bem preparada. - Louis Pasteur',
  'O insucesso é apenas uma oportunidade para recomeçar com mais inteligência. - Henry Ford',
  'A coragem é a resistência ao medo, domínio do medo, e não a ausência do medo. - Mark Twain',
]

let currentIndex = 0

function getLoadingMessage() {
  const message = loadingMessages[currentIndex]
  currentIndex = (currentIndex + 1) % loadingMessages.length
  return message
}

export { getLoadingMessage }
