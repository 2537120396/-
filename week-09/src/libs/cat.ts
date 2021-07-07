import { CommandArgs } from '../types'
import * as fs from "fs";
import * as path from 'path'
import { isBinaryFile } from 'isbinaryfile'
/**
 * 读取文本文件
 * @param args 
 */
 async function show(stat:fs.Stats,data:Buffer) {
  if(stat.size > 10240){
     console.log("这个文件大于10kb，无法读取")
  }else{
     await console.log(data.toString('utf-8'))
  }
}

export default function(args: CommandArgs) {
  var src=path.resolve(args.argv[0])  //文件路径
  var stat = fs.statSync(src)         //文件信息
  const data = fs.readFileSync(src);  //文件内容

  isBinaryFile(data, stat.size).then((result) => {
    if (result) {
      console.log("这是一个二进制文件")
    }
    else {
      show(stat,data)
    }
  });

}