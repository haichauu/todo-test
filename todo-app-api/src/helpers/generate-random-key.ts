export const generateRandomKey = () => {
  const random_key = Array.from({ length: 16 }, () => {
    let b = Math.floor(Math.random() * 127);
    b =
      (b & 0xfe) |
      (((b >> 1) ^
        (b >> 2) ^
        (b >> 3) ^
        (b >> 4) ^
        (b >> 5) ^
        (b >> 6) ^
        (b >> 7) ^
        0x01) &
        0x01);
    return ('0' + (b & 0xff).toString(16)).slice(-2);
  }).join('');
  return random_key;
};
