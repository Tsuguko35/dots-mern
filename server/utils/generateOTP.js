const generateOTP = () => {
  const otp = [];

  for (let i = 0; i < 6; i++) {
    let rand = Math.floor(Math.random() * (9 - 1 + 1)) + 1;
    otp.push(rand);
  }
  
  const otpCode = parseInt(otp.join(''));
  const expirationTime = new Date().getTime() + 5 * 60 * 1000; // expiration to 5 minutes from now

  return { otpCode, expirationTime };
}

export default generateOTP