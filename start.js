'use strict';

(() => {
  const game = () => {
    const result = {
      computer: 0,
      player: 0,
    };

    const langRu = {
      userRSP: 'Для определения очередности ходов, сыграйте в "камень", "ножницы", "бумага"!',
      userRSPExit: 'Желаете покинуть игру?',
      userRSPGoodbye: 'До новых встреч!',
      userRSPError: 'Необходимо набрать: или "камень", или "ножницы", или "бумага"',
      userRSPDraw: 'Пока ничья, надо еще сыграть',
      userRSP01: 'Вы начинаете',
      userRSP02: 'Начинает компьютер',
      marblesUserBalls: 'Сколько шариков выбераете? Не более ',
      marblesEvenOdd: 'четное "Ок", нечетное "Отмена"',
      marblesCompVictory: `Компьютер выиграл!`,
      marblesUserVictory: `Вы выиграли!`,
      marblesScore01: 'Общий счет побед: у компьютера ',
      marblesScore02: 'у Вас ',
      marblesStill: 'Хотите сыграть еще?',
    };

    return function start() {
      const turn = (value = ['камень', 'ножницы', 'бумага']) => {
        let mark;
        const rsp = prompt(langRu.userRSP);
        if (rsp === 'null' || rsp === null) {
          const rsp_ = confirm(langRu.userRSPExit);
          if (rsp_ === false) {
            return turn();
          } else {
            alert(langRu.userRSPGoodbye);
            mark = 777;
            return mark;
          }
        }

        const user = rsp.trim().toLowerCase();

        const machine = Math.floor(Math.random() * 3);

        if (value.indexOf(user) === -1) {
          alert(langRu.userRSPError);
          return turn();
        }
        if (value.indexOf(user) === machine) {
          alert(langRu.userRSPDraw);
          return turn();
        }
        if ((machine - value.indexOf(user)) === 1 || value.indexOf(user) === 2 && machine === 0) {
          mark = 1;
          alert(langRu.userRSP01);
        } else {
          mark = 0;
          alert(langRu.userRSP02);
        }
        return mark;
      };

      const marbles = (turn, balls = [5, 5]) => {
        // let gamer;
        // let evenOdd;

        console.log(turn);
        if (turn === 777) {
          return;
        }

        const user = max => {
          let ball;
          do {
            const words = `${langRu.marblesUserBalls} ${max}`;
            ball = prompt(words);
            if ((ball > 0 && ball <= max) || ball === null) {
              console.log(ball);
              return ball;
            }
          } while (true);
        };

        const comp = max => Math.floor(1 + Math.random() * max);

        const gamer = turn ? user(balls[turn]) : comp(balls[turn]);
        console.log(gamer);

        if (gamer === null) return balls;

        const evenOdd = turn ? comp(balls[turn]) % 2 : +confirm(langRu.marblesEvenOdd);

        if (+gamer % 2 === evenOdd) {
          balls[turn] += +gamer;
          balls[+!turn] -= +gamer;
          console.log(balls);
          if (balls[+!turn] <= 0) {
            !turn ? result.computer += 1 : result.player += 1;
            alert(!turn ? langRu.marblesCompVictory : langRu.marblesUserVictory);
            console.log(result);
            const words = `${langRu.marblesScore01} ${result.computer} ${langRu.marblesScore02} ${result.player}\n${langRu.marblesStill}`;
            turn = confirm(words);
            if (turn) {
              return start();
            } else {
              return balls;
            }
          }
        } else {
          balls[+!turn] += +gamer;
          balls[turn] -= +gamer;
          console.log(balls);

          if (balls[turn] <= 0) {
            turn ? result.computer += 1 : result.player += 1;
            alert(turn ? langRu.marblesCompVictory : langRu.marblesUserVictory);
            console.log(result);
            const words = `${langRu.marblesScore01} ${result.computer} ${langRu.marblesScore02} ${result.player}\n${langRu.marblesStill}`;
            turn = confirm(words);
            if (turn) {
              return start();
            } else {
              return balls;
            }
          }
        }
        return marbles(+!turn, balls);
      };

      marbles(turn());
    };
  };

  window.file = game;
})();
