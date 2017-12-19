

const isAdult = (age) => {
  if (age >= 18) {
    return true;
  } else {
    return false;
  }
}

const canDrink = (age) => {
  if (age >= 21) return true;
  else return false;
}

export { isAdult, canDrink }
