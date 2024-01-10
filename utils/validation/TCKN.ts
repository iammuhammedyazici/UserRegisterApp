export async function ValidateTckn(value: any) {
  if (!value) return false;
  var regex = /^[1-9]{1}[0-9]{9}[02468]{1}$/;
  if (!regex.test(value)) {
    return false;
  }

  var digitTotal13579 = 0;
  var digitTotal2468 = 0;
  for (let index = 0; index < 9; index++) {
    if (index % 2 === 0) {
      digitTotal13579 += parseInt(value[index]);
    } else {
      digitTotal2468 += parseInt(value[index]);
    }
  }

  var digit10 = (digitTotal13579 * 7 - digitTotal2468) % 10;
  if (digit10 !== parseInt(value[9])) {
    return false;
  }

  var digit11 = (digitTotal13579 + digitTotal2468 + digit10) % 10;

  return digit11 === parseInt(value[10]);
}
