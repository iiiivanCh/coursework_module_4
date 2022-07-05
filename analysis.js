'use strict';

const marbles = (turn = 1, balls = [4, 6]) => {
  let gamer;
  let evenOdd;

  const user = max => {
    let ball;
    do {
      ball = prompt(`Сколько шариков выбераете? Не более ${max}`);
      if ((ball > 0 && ball <= max) || ball === null) {
        console.log(ball);
        return ball;
      }
    } while (true)
  };

  const comp = max => Math.floor(1 + Math.random() * max);

  gamer = turn ? user(balls[turn]) : comp(balls[turn]);
  console.log(gamer);

  if (gamer === null) return balls;

  evenOdd = turn ? comp(balls[turn]) % 2 : +confirm(`четное "Ок", нечетное "Отмена"`);

  if (+gamer % 2 === evenOdd) {
    balls[turn] += +gamer;
    balls[+!turn] -= +gamer;
    console.log(balls);
    if (balls[+!turn] <= 0) {
      alert(!turn ? "Компьютер выиграл!" : "Вы выиграли!")
      return balls;
    }
  } else {
    balls[+!turn] += +gamer;
    balls[turn] -= +gamer;
    console.log(balls);

    if (balls[turn] <= 0) {
      alert(turn ? "Компьютер выиграл!" : "Вы выиграли!")
      return balls;
    }
  }
  return marbles(+!turn, balls);

}

marbles();