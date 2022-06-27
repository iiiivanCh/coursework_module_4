"use strict";

(() => {
  const game = () => {
    const result = {
      player: 0,
      computer: 0,
    };
    const langRu = {
      userRSP: 'Для определения очередности ходов, сыграйте в "камень", "ножницы", "бумага"!',
      userRSPExit: 'Желаете покинуть игру?',
      userRSPGoodbye: 'До новых встреч!',
      userRSPError: 'Необходимо набрать: или "камень", или "ножницы", или "бумага"',
      userRSPDraw: "Пока ничья, надо еще сыграть",
      userRSP01: "Вы начинаете",
      userRSP02: "Начинает компьютер",
      userQuestion: "Сколько шариков выбераете? Необходимо выбрать не более:",
      userError: "Вы ввели неправильные данные, необходимо выбрать не более:",
      userGoodbye01: "До следующих встреч!!!\nВы выиграли:",
      userGoodbyeRout02: "\nКомпьютер выиграл:",
      interimEven: "четное",
      interimOdd: "нечетное",
      interim: "Не угадал:",
      interim00: "Угадал:",
      interim01: "\nИтого шариков:\nУ компьютера:",
      interim02: "\nУ Вас:",
      userRout01: "Вы проиграли :(\nВы набрали:",
      userRout03: "\nЖелаете продолжить игру?",
      userVictory01: "Вы выиграли! :)\nВы набрали:",
      userEvenOdd: 'Компьютер отложил шарики.\nОтгадайте четное (нажмите кнопку "Да")\nили нечетное (нажмите кнопку "Нет")',
    };
    const value = ['камень', 'ножницы', 'бумага'];
    let mark;

    return function start() {

      const balloons = {
        player: 5,
        computer: 5,
      };

      function doRSP() {
        let mark;
        const rsp = prompt(langRu.userRSP);
        if (rsp === 'null' || rsp === null) {
          const rsp_ = confirm(langRu.userRSPExit);
          if (rsp_ === false) {
            return doRSP();
          } else {
            alert(langRu.userRSPGoodbye);
            mark = 555;
            console.log(mark);
            return mark;
          }
        }
        let user = rsp.trim().toLowerCase();
        if (user[0] === value[0][0]) {
          user = 0;
        } else if (user[0] === value[1][0]) {
          user = 1;
        } else if (user[0] === value[2][0]) {
          user = 2
        } else {
          alert(langRu.userRSPError);
          return doRSP();
        }
        const machine = Math.floor(Math.random() * 3);
        console.log(user);
        console.log(machine);
        if (user === machine) {
          alert(langRu.userRSPDraw);
          return doRSP();
        }
        if ((machine - user) === 1 || user === 2 && machine === 0) {
          mark = 1;
          alert(langRu.userRSP01);
        } else {
          mark = 0;
          alert(langRu.userRSP02);
        }
        console.log(mark);
        return mark;
      };

      function doUserStep() {
        const words = `${langRu.userQuestion} ${balloons.player}`;
        let step = +prompt(words);
        if (step === 0 || step === null) {
          const words = `${langRu.userGoodbye01} ${result.player} ${langRu.userGoodbyeRout02} ${result.computer}`;
          alert(words);
          return 555;
        }
        if (Number.isInteger(step) && step > 0 && step <= balloons.player) {
          console.log("userStep", step)
          return step;
        } else {
          const words = `${langRu.userError} ${balloons.player}`;
          alert(words);
          return doUserStep();
        }
      }

      function doUserEvenOdd() {
        let evenOdd;
        const x = confirm(langRu.userEvenOdd);
        x ? (evenOdd = 2) : (evenOdd = 1);
        console.log("userEvenOdd", evenOdd);
        return evenOdd;
      }

      function doMachineStep(min = 1, max = balloons.computer) {
        console.log("maxComputer", balloons.computer);
        min = Math.ceil(min);
        max = Math.floor(max);
        const step = Math.floor(Math.random() * (max - min + 1) + min);
        console.log("stepComputer", step);
        return step;
      }

      function doMachineEvenOdd(min = 1, max = 2) {
        let evenOdd;
        min = Math.ceil(min);
        max = Math.floor(max);
        const machine = Math.floor(Math.random() * (max - min + 1) + min);
        console.log("computerEvenOdd", machine)
        return machine === 1 ? (evenOdd = 1) : (evenOdd = 2);
      }

      function doRequest(message) {
        if (message) {
          console.log(message);
          return start();
        } else {
          const words = `${langRu.userGoodbye01} ${result.player} ${langRu.userGoodbyeRout02} ${result.computer}`;
          alert(words);
          return 555;
        }
      }

      function doUserAnalysis(ball, evenOdd) {
        let interim;
        console.log(ball, evenOdd);
        evenOdd === 2 ? (interim = langRu.interimEven) : (interim = langRu.interimOdd);
        if ((ball % 2 === 0 && evenOdd === 2) || (ball % 2 !== 0 && evenOdd === 1)) {
          balloons.player += ball;
          balloons.computer -= ball;
          const words = `${langRu.interim00} ${interim} ${langRu.interim01} ${balloons.computer} ${langRu.interim02} ${balloons.player}`;
          alert(words);
        } else if ((ball % 2 !== 0 && evenOdd === 2) || (ball % 2 === 0 && evenOdd === 1)) {
          balloons.player -= ball;
          balloons.computer += ball;
          const words = `${langRu.interim} ${interim} ${langRu.interim01} ${balloons.computer} ${langRu.interim02} ${balloons.player}`;
          alert(words);
        }
        if (balloons.player <= 0) {
          result.computer += 1;
          const words = `${langRu.userRout01} ${result.player} ${langRu.userGoodbyeRout02} ${result.computer} ${langRu.userRout03}`;
          const message = confirm(words);
          console.log(words);
          let end = doRequest(message);
          return end;
        }
        if (balloons.computer <= 0) {
          result.player += 1;
          const words = `${langRu.userVictory01} ${result.player} ${langRu.userGoodbyeRout02} ${result.computer} ${langRu.userRout03}`;
          const message = confirm(words);
          console.log(words);
          let end = doRequest(message);
          return end;
        }
      }

      function doComputerAnalysis(ball, evenOdd) {
        let interim;
        console.log(ball, evenOdd);
        evenOdd === 2 ? (interim = langRu.interimEven) : (interim = langRu.interimOdd);
        if ((ball % 2 === 0 && evenOdd === 2) || (ball % 2 !== 0 && evenOdd === 1)) {
          balloons.player -= ball;
          balloons.computer += ball;
          const words = `${langRu.interim00} ${interim} ${langRu.interim01} ${balloons.computer} ${langRu.interim02} ${balloons.player}`;
          alert(words);
        } else if ((ball % 2 !== 0 && evenOdd === 2) || (ball % 2 === 0 && evenOdd === 1)) {
          balloons.player += ball;
          balloons.computer -= ball;
          const words = `${langRu.interim} ${interim} ${langRu.interim01} ${balloons.computer} ${langRu.interim02} ${balloons.player}`;
          alert(words);
        }
        if (balloons.player <= 0) {
          result.computer += 1;
          const words = `${langRu.userRout01} ${result.player} ${langRu.userGoodbyeRout02} ${result.computer} ${langRu.userRout03}`;
          const message = confirm(words);
          console.log(words);
          let end = doRequest(message);
          return end;
        }
        if (balloons.computer <= 0) {
          result.player += 1;
          const words = `${langRu.userVictory01} ${result.player} ${langRu.userGoodbyeRout02} ${result.computer} ${langRu.userRout03}`;
          const message = confirm(words);
          console.log(words);
          let end = doRequest(message);
          return end;
        }
      }

      mark = doRSP();
      if (mark === 555) {
        return;
      }
      if (mark === 1) {
        while (balloons.player >= 0 || balloons.computer >= 0) {
          let a = doUserStep();
          console.log(a);
          if (a === 555) {
            break;
          }
          let b = doMachineEvenOdd();
          let exit = doComputerAnalysis(a, b);
          console.log(exit);
          if (exit === 555) {
            break;
          }
          let c = doMachineStep();
          let d = doUserEvenOdd();
          exit = doUserAnalysis(c, d);
          console.log(exit);
          if (exit === 555) {
            break;
          }
        };
      } else {
        while (balloons.player >= 0 || balloons.computer >= 0) {
          let c = doMachineStep();
          let d = doUserEvenOdd();
          let exit = doUserAnalysis(c, d);
          console.log(exit);
          if (exit === 555) {
            break;
          }
          let a = doUserStep();
          console.log(a);
          if (a === 555) {
            break;
          }
          let b = doMachineEvenOdd();
          exit = doComputerAnalysis(a, b);
          console.log(exit);
          if (exit === 555) {
            break;
          }
        }
      }
    };
  };

  window.file = game;
})();