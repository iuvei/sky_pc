// import decode from './App/Utils/decode';
const Zlib = require('./inflate.min.js')

const decodeEvent = (str, key = '0') => {
  const valArr = str.split(''),
    keyArr = key.split('') // 固定‘0’
  if (valArr.length % 2 !== 0) {
    return ''
  }
  const tempArr = valArr.map(item => parseInt(item, 16))
  const resArr = []
  for (let i = 0; i < tempArr.length; i += 2) {
    resArr.push((tempArr[i] << 4) | tempArr[i + 1])
  }
  for (let i = 0; i < resArr.length; i++) {
    for (let j = keyArr.length - 1; j >= 0; j--) {
      // console.log(resArr[i])
      resArr[i] = resArr[i] ^ keyArr[j].charCodeAt()
    }
  }
  const final = resArr.map(item => String.fromCharCode(item))
  return final.join('')
}

const stringToByteArray = str => {
  const array = new (window.Uint8Array !== undefined ? Uint8Array : Array)(
      str.length
    ),
    il = str.length
  for (let i = 0; i < il; ++i) {
    array[i] = str.charCodeAt(i) & 0xff
  }
  return array
}
const decompress = str => {
  const res = decodeEvent(str)
  const compressed = stringToByteArray(res)
  const inflate = new Zlib.Zlib.Inflate(compressed)
  const plain = inflate.decompress()
  const tempArr = Array.from(plain)
  let string = '',
    i,
    chunk = 8 * 1024
  for (i = 0; i < tempArr.length / chunk; i++) {
    string += String.fromCharCode.apply(
      null,
      tempArr.slice(i * chunk, (i + 1) * chunk)
    )
  }
  string += String.fromCharCode.apply(null, tempArr.slice(i * chunk))
  return string
  // return tempArr.map(i => String.fromCharCode(i)).join('')
}
export default decompress
