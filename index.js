input = [
  { x: 17, y: 5, z: 1, velX: 0, velY: 0, velZ: 0 },
  { x: -2, y: -8, z: 8, velX: 0, velY: 0, velZ: 0 },
  { x: 7, y: -6, z: 14, velX: 0, velY: 0, velZ: 0 },
  { x: 1, y: -10, z: 4, velX: 0, velY: 0, velZ: 0 }
];

testinput = [
  { x: -1, y: 0, z: 2, velX: 0, velY: 0, velZ: 0 },
  { x: 2, y: -10, z: -7, velX: 0, velY: 0, velZ: 0 },
  { x: 4, y: -8, z: 8, velX: 0, velY: 0, velZ: 0 },
  { x: 3, y: 5, z: -1, velX: 0, velY: 0, velZ: 0 }
];

const applyGravityVelocity = listMoons => {
  for (const moon of listMoons) {
    for (let index = 0; index < listMoons.length; index++) {
      if (
        moon.x !== listMoons[index].x ||
        moon.y !== listMoons[index].y ||
        moon.z !== listMoons[index].z
      ) {
        //x position
        if (moon.x > listMoons[index].x) {
          moon.velX--;
        } else if (moon.x < listMoons[index].x) {
          moon.velX++;
        }

        //y position
        if (moon.y > listMoons[index].y) {
          moon.velY--;
        } else if (moon.y < listMoons[index].y) {
          moon.velY++;
        }

        //z position
        if (moon.z > listMoons[index].z) {
          moon.velZ--;
        } else if (moon.z < listMoons[index].z) {
          moon.velZ++;
        }
      }
    }
  }

  //apply velocity
  for (const moon of listMoons) {
    moon.x += moon.velX;
    moon.y += moon.velY;
    moon.z += moon.velZ;
  }

  return listMoons;
};

const simulateMotionMoons = (input, steps) => {
  let result = [];

  for (let i = 0; i < steps; i++) {
    result = applyGravityVelocity(input);
  }
  return result;
};

const part1 = () => {
  let total = 0;
  let listMoons = simulateMotionMoons(input, 1000);

  for (const moon of listMoons) {
    let kineticEnergy = 0;
    let potencialEnergy = 0;
    potencialEnergy = Math.abs(moon.x) + Math.abs(moon.y) + Math.abs(moon.z);
    kineticEnergy =
      Math.abs(moon.velX) + Math.abs(moon.velY) + Math.abs(moon.velZ);
    total += kineticEnergy * potencialEnergy;
  }

  return total;
};

/* const part2_bruteforce = () => {
  let listMoons = JSON.parse(JSON.stringify(input));
  let steps = 0;

  while (true) {
    listMoons = simulateMotionMoons(listMoons, 1);
    steps++;

    if (JSON.stringify(listMoons) === JSON.stringify(input)) {
      break;
    }
  }

  return steps;
}; */

/////////////

const isMatchListMoonsCoordinateXYZ = (strCoordinate, _list1, _list2) => {
  let list1 = _list1.map(i => {
    return {
      pos: { x: i.x, y: i.y, z: i.z },
      vel: { x: i.velX, y: i.velY, z: i.velZ }
    };
  });

  let list2 = _list2.map(i => {
    return {
      pos: { x: i.x, y: i.y, z: i.z },
      vel: { x: i.velX, y: i.velY, z: i.velZ }
    };
  });

  let indexKey = 0;

  for (let i = 0; i < Object.keys(list1[0].pos).length; i++) {
    if (Object.keys(list1[0].pos)[i] === strCoordinate) {
      indexKey = i;
      break;
    }
  }

  let indexKeyVel = 0;

  for (let i = 0; i < Object.keys(list1[0].vel).length; i++) {
    if (Object.keys(list1[0].vel)[i] === strCoordinate) {
      indexKeyVel = i;
      break;
    }
  }

  for (let i = 0; i < list1.length; i++) {
    const valList1 = Object.values(list1[i].pos)[indexKey];
    const valList2 = Object.values(list2[i].pos)[indexKey];
    const valListVel1 = Object.values(list1[i].vel)[indexKeyVel];
    const valListVel2 = Object.values(list2[i].vel)[indexKeyVel];

    if (valList1 !== valList2 || valListVel1 !== valListVel2) {
      return false;
    }
  }

  return true;
};

const stepsToRepeat = (input, strCoordinate) => {
  let listMoons = JSON.parse(JSON.stringify(input));
  let count = 0;
  const initialListMoons = input;

  while (true) {
    listMoons = applyGravityVelocity(listMoons);
    count++;

    if (
      isMatchListMoonsCoordinateXYZ(strCoordinate, listMoons, initialListMoons)
    ) {
      break;
    }
  }

  return count;
};

const gcd_two_numbers = (x, y) => {
  if (typeof x !== 'number' || typeof y !== 'number') return false;
  x = Math.abs(x);
  y = Math.abs(y);
  while (y) {
    var t = y;
    y = x % y;
    x = t;
  }
  return x;
};

const part2 = () => {
  const x = stepsToRepeat(input, 'x');
  const y = stepsToRepeat(input, 'y');
  const z = stepsToRepeat(input, 'z');
  const xy = Math.round((x * y) / gcd_two_numbers(x, y));
  const xyz = Math.round((xy * z) / gcd_two_numbers(xy, z));

  return xyz;
};

console.time('part1');
console.log(part1());
console.timeEnd('part1');
console.log(' ');
console.time('part2');
console.log(part2());
console.timeEnd('part2');
