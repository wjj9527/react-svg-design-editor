const createUUID =()=>{
  let uuid = '';
  const chars = 'abcdefghjklmnpqrstuvwxyz0123456789';
  for (let i = 0; i < 36; i++) {
    if (i === 8 || i === 13 || i === 18 || i === 23) {
      uuid += '-';
    } else if (i === 14) {
      uuid += '4';
    } else {
      uuid += chars[Math.floor(Math.random() * chars.length)];
    }
  }
  return uuid;
}

export default createUUID
