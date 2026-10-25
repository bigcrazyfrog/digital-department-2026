import * as readline from 'node:readline/promises'

function ticketPrice(category) { 
  switch (category) {
    case 1:
      return 300
    case 2:
      return 500
    case 3:
      return 900
    default:
      return 0
  }
}

function maxTickets(budget, price) {
  let counter = 0
  let balance = budget
  while (balance >= price) {
    counter++
    balance -= price
  }
  return counter
}

function printTicketResult(category, budget) {
  let price = ticketPrice(category)
  
  if (price == 0){
    console.log('неизвестная категория')
	return
  }
  
  let number_tickets = maxTickets(budget, price)
	  
  console.log(`Категория ${category}, билет ${price} руб., бюджет ${budget} руб.: можно купить ${number_tickets} шт.`)
}

function deliveryPrice(distance, total) {
  if (total >= 3000)
    return 0

  if (distance <= 3)
    return 0
  if (distance <= 10)
    return 200

  return 200 + (distance - 10) * 25
}

function printDelivery(distance, total) {
  let price = deliveryPrice(distance, total)
  console.log(`Расстояние ${distance} км, заказ ${total} руб.: доставка ${price} руб.`)
}

function printSteps(height) {
  let i = 1
  for (; i < height; i++) {
    if (i == 4)
      continue
    if (i == 10){
      console.log('Дальше лестница не построена')
      break
    }
    console.log(`Ступень ${i}`)
  }
  if (i >= 4)
    i--
  console.log(`Всего построено: ${i}`)
}

async function main() {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout })

  console.log('Выберите задачу:')
  console.log('1 — билетная касса')
  console.log('2 — доставка заказа')
  console.log('3 — лестница')

  const action = Number(await rl.question('Ваш выбор: '))
  
  switch (action) {
    case 1: {
      const category = Number(await rl.question('Категория билета: '))
      const budget = Number(await rl.question('Бюджет: '))
      printTicketResult(category, budget)
      break
    }
    case 2: {
      const distance = Number(await rl.question('Расстояние: '))
      const total = Number(await rl.question('Сумма заказа: '))
      printDelivery(distance, total)
      break
    }
    case 3: {
      const height = Number(await rl.question('Высота лестницы: '))
      printSteps(height)
      break
    }
    default:
      console.log('Такой задачи нет')
  }

  rl.close()
}

main()
