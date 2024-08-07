const fs = require("fs");
const data = fs.readFileSync("./data2.txt", "utf-8");
const array = data.split("\n");

function calculateGames(array) {
  const nestedArray = [];
  const greensArray = [];
  const bluesArray = [];
  const redsArray = [];

  for (let i = 0; i < array.length; i++) {
    nestedArray.push(array[i].split(";"));
  }
  for (let j = 0; j < nestedArray.length; j++) {
    const currentBlues = [];
    const currentGreens = [];
    const currentReds = [];
    for (let k = 0; k < nestedArray[j].length; k++) {
      const greenNumber = nestedArray[j][k].indexOf("g") - 2;
      const greenNumberDouble = nestedArray[j][k].indexOf("g") - 3;
      const findFirstNumber = nestedArray[j][k].charAt(greenNumberDouble);
      const findSecondNumber = nestedArray[j][k].charAt(greenNumber);
      const joinNumbers = findFirstNumber + findSecondNumber;
      const strToNum = parseInt(joinNumbers);
      if (strToNum) {
        currentGreens.push(strToNum);
      }
      const blueNumber = nestedArray[j][k].indexOf("b") - 2;
      const blueNumberDouble = nestedArray[j][k].indexOf("b") - 3;
      const findFirstBlueNumber = nestedArray[j][k].charAt(blueNumberDouble);
      const findSecondBlueNumber = nestedArray[j][k].charAt(blueNumber);
      const joinBlueNumbers = findFirstBlueNumber + findSecondBlueNumber;
      const blueStrToNum = parseInt(joinBlueNumbers);
      if (blueStrToNum) {
        currentBlues.push(blueStrToNum);
      }
      const redNumber = nestedArray[j][k].indexOf("d") - 4;
      const redNumberDouble = nestedArray[j][k].indexOf("d") - 5;
      const findFirstRedNumber = nestedArray[j][k].charAt(redNumberDouble);
      const findSecondRedNumber = nestedArray[j][k].charAt(redNumber);
      const joinRedNumbers = findFirstRedNumber + findSecondRedNumber;
      const redStrToNum = parseInt(joinRedNumbers);
      if (redStrToNum) {
        currentReds.push(redStrToNum);
      }
    }
    greensArray.push(currentGreens);
    bluesArray.push(currentBlues);
    redsArray.push(currentReds);
  }
  const copyGreensArray = greensArray.map((ele) => {
    return ele.sort((a, b) => a - b);
  });
  const copyRedsArray = redsArray.map((ele) => {
    return ele.sort((a, b) => a - b);
  });
  const copyBluesArray = bluesArray.map((ele) => {
    return ele.sort((a, b) => a - b);
  });
  const biggestGreen = [];
  const biggestRed = [];
  const biggestBlue = [];
  // part 2

  copyGreensArray.forEach((ele) => {
    const lastOne = ele.pop();
    biggestGreen.push(lastOne);
  });

  copyRedsArray.forEach((ele) => {
    const lastOne = ele.pop();
    biggestRed.push(lastOne);
  });

  copyBluesArray.forEach((ele) => {
    const lastOne = ele.pop();
    biggestBlue.push(lastOne);
  });
  const totalMultiples = [];
  for (
    let i = 0;
    i < biggestGreen.length && i < biggestBlue.length && i < biggestRed.length;
    i++
  ) {
    totalMultiples.push(biggestGreen[i] * biggestBlue[i] * biggestRed[i]);
  }
  const totalPowers = totalMultiples.reduce((acc, curr) => {
    return (acc += curr);
  });
  console.log(totalPowers);
  ///^^^^^^^^^^^^^^^^^^^^ answer for part 2
  const legitReds = [];
  const legitGreens = [];
  const legitBlues = [];

  for (let i = 0; i < redsArray.length; i++) {
    const allEqualorBelowTwelve = (currentValue) => currentValue < 13;
    const games = redsArray[i].every(allEqualorBelowTwelve);
    legitReds.push(games);
  }
  for (let i = 0; i < greensArray.length; i++) {
    const allEqualorBelowThirteen = (currentValue) => currentValue < 14;
    const games = greensArray[i].every(allEqualorBelowThirteen);
    legitGreens.push(games);
  }
  for (let i = 0; i < bluesArray.length; i++) {
    const allEqualorBelowFifteen = (currentValue) => currentValue < 15;
    const games = bluesArray[i].every(allEqualorBelowFifteen);
    legitBlues.push(games);
  }
  const redIndexArray = [];
  const greenIndexArray = [];
  const blueIndexArray = [];
  legitReds.forEach((ele, i) => {
    if (ele === true) {
      redIndexArray.push(i + 1);
    }
  });
  legitGreens.forEach((ele, i) => {
    if (ele === true) {
      greenIndexArray.push(i + 1);
    }
  });
  legitBlues.forEach((ele, i) => {
    if (ele === true) {
      blueIndexArray.push(i + 1);
    }
  });
  const results = [];
  for (let i = 0; i < redIndexArray.length; i++) {
    if (
      blueIndexArray.includes(redIndexArray[i]) &&
      greenIndexArray.includes(redIndexArray[i])
    ) {
      results.push(redIndexArray[i]);
    }
  }
  const total = results.reduce((acc, curr) => {
    return (acc += curr);
  });
  console.log(total);
}

calculateGames(array);
