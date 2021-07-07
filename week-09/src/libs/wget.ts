import * as fs from 'fs'
import * as path from 'path'
import { CommandArgs } from '../types'
import { request } from 'undici'
import ProgressBar = require('progress')

// 格式化字节显示
function bytes(value: number) {
  if (value < 1024) return value + 'B'
  if (value < (1 << 20)) return (value / (1 << 10)).toFixed(2) + 'KB'
  if (value < (1 << 30)) return (value / (1 << 20)).toFixed(2) + 'MB'
  return (value / (1 << 30)).toFixed(2) + 'GB'
}

// 下载文件
async function download(url: string, newName: string|boolean) {
  const { body, headers } = await request(url)
  let size = Number(headers['content-length'])
  let contentDisposition = (headers['content-disposition'])
  let position = contentDisposition.split(';')[0]
  if(typeof(newName)=='string'){
    let stream = fs.createWriteStream(path.join(__dirname, './', newName))
    body.pipe(stream)
    stream.on('finish', () => {
      console.log(`download ${newName} finished`)
    })
  }else if(newName == null && position == 'inline'){
    let name = url.split('?')[0]
    let hashname = path.basename(name)
    let stream = fs.createWriteStream(path.join(__dirname, './', hashname))
    body.pipe(stream)
    stream.on('finish', () => {
      console.log(`download ${hashname} finished`)
    })
  }else if(newName == null && position == 'attachment'){
    let fileName = contentDisposition.match(/filename=(.*)/)[1]
    let stream = fs.createWriteStream(path.join(__dirname, './', fileName))
    body.pipe(stream)
    stream.on('finish', () => {
      console.log(`download ${fileName} finished`)
    })
  }
  var bar = new ProgressBar('downloading [:bar] :loaded/' + bytes(size) + ' :percent :etas', { 
    total: size,
    width:50
  });
  body.on('data', (chunk: Buffer) => {
    bar.tick(chunk.byteLength, {
      loaded: bytes(bar.curr + chunk.byteLength)
    })
  })
}

export default function(args: CommandArgs) {
  var url = args.argv[0] 
  var newName = args.options['-o']
  function run() {
    download(url,newName)
  }
  run()
}
