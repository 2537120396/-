import { CommandArgs } from '../types'
import * as fs from "fs";
import * as path from 'path'
/**
 * 拷贝文件或目录
 * @param args 
 */
//读取目录
var stat = fs.stat
function copy(src:string ,dst:string){
  fs.readdir(src,function(err,paths){
      //console.log(paths)
      if(err){
        console.log(err);
      }else{
        paths.forEach(function(path){
          var srcpath=src+'/'+path;
          var dstpath=dst+'/'+path
          var readable;
          var writable;
          stat(srcpath,function(err,cp){
              if(err){
                console.log(err);
              }
              if(cp.isFile()){
                  readable=fs.createReadStream(srcpath);//创建读取流
                  writable=fs.createWriteStream(dstpath);//创建写入流
                  readable.pipe(writable);
                  writable.on('finish', () => {
                    console.log('文件复制完毕')
                  })
              }else if(cp.isDirectory()){
                  exists(srcpath,dstpath,copy);
              }
          });
        });
      }
  });
}


//复制文件夹
function exists(src:string,dst:string,callback){
  fs.access(dst,function(exists){
      if(exists){//不存在
        fs.mkdir(dst,function(){//创建目录
          callback(src,dst)
        })
      }else{//存在
          callback(src,dst)
      }
  })
}

export default function(args: CommandArgs) {
  var src=path.resolve(args.argv[0])
  var dst=path.resolve(args.argv[1])
  console.log(src)
  exists(src,dst,copy)
}