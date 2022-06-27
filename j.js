"use strict";

const value = ['камень', 'ножницы', 'бумага'];

function doRSP() {
  let mark;
  const rsp = prompt('langRu.userRSP');
  if (rsp === 'null' || rsp === null) {
    const rsp_ = confirm('langRu.userRSPExit');
    if (rsp_ === false) {
      return doRSP();
    } else {
      alert('langRu.userRSPGoodbye');
      let exit = 555;
      return exit;
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
    alert("Неправильно");
    return doRSP();
  }
  const machine = Math.floor(Math.random() * 3);
  console.log(user);
  console.log(machine);
  if (user === machine) {
    alert("Пока ничья, надо еще");
    return doRSP();
  }
  if ((machine - user) === 1 || user === 2 && machine === 0) {
    mark = 1;
    alert("Вы начинаете");
  } else {
    mark = 0;
    alert("Начинает компьютер");
  }
  console.log(mark);
  return mark;
};