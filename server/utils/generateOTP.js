const generateOTP = () => {
    var otp = []

  for (let i = 0; i < 6; i++) {
    let rand = Math.floor(Math.random() * (9 - 1 + 1)) + 1
    otp.push(rand)
  }

  otp = parseInt(otp.join(''))
  return otp
}

export default generateOTP