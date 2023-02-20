export function uuidv4() {
    const uuidArray = new Uint8Array(16);
    crypto.getRandomValues(uuidArray);
    uuidArray[6] = (uuidArray[6] & 0x0f) | 0x40;
    uuidArray[8] = (uuidArray[8] & 0x3f) | 0x80;
    const hexValues = [];
    for (let i = 0; i < uuidArray.length; i++) {
      hexValues.push(uuidArray[i].toString(16).padStart(2, '0'));
    }
    return (
      hexValues.slice(0, 4).join('') + '-' +
      hexValues.slice(4, 6).join('') + '-' +
      hexValues.slice(6, 8).join('') + '-' +
      hexValues.slice(8, 10).join('') + '-' +
      hexValues.slice(10).join('')
    );
}