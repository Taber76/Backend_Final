

process.on('message', ( numbers ) => {

  const counts = {}

  for (let i = 0; i < numbers.numbers; i++) {
    const randomNumber = Math.floor(Math.random() * 1000) + 1
    counts[randomNumber] = (counts[randomNumber] || 0) + 1
  }

  process.send( counts )

})
