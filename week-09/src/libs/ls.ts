import { CommandArgs } from "../types";
import * as fs from "fs";
import * as chalk from "chalk";
/**
 * 枚举文件
 * @param args
 */
//排序
function sort(arr:string[], time:number) {
  for (let i = 0; i < arr.length - 1; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      if(time == 0) {//按文件名排序
        arr[i].localeCompare(arr[j])
        }else if(time ==1){ //按修改时间升序排序
          if (fs.statSync(arr[i]).mtimeMs > fs.statSync(arr[j]).mtimeMs) {
            let s = arr[i];
            arr[i] = arr[j];
            arr[j] = s;
          }
        }
        else if(time == 2){//按修改时间降序排序
          if (fs.statSync(arr[i]).mtimeMs < fs.statSync(arr[j]).mtimeMs) {
            let s = arr[j];
            arr[j] = arr[i];
            arr[i] = s;
          }
        } 
      }
   }
  return arr;
}

//打印
function display(arr:string[]) {
  for (let i = 0; i < arr.length; i++) {
    let stat = fs.statSync(arr[i]);
    console.log(
      (
        stat.mtime.getFullYear() +
        "-" +
        (stat.mtime.getMonth() + 1).toString().padStart(2, "0") +
        "-" +
        (stat.mtime.getDate() < 10
          ? "0" + (stat.mtime.getDate() + 1)
          : stat.mtime.getDate() + 1) +
        " " +
        (stat.mtime.getHours() + 1) +
        ":" +
        (stat.mtime.getMinutes() < 10
          ? "0" + (stat.mtime.getMinutes() + 1)
          : stat.mtime.getMinutes() + 1)
      ).padEnd(17, " ") +
        (stat.size > 0 ? stat.size : "").toString().padStart(14, " ") +
        " " +
        (stat.isDirectory() ? chalk.green(arr[i]) : chalk.yellow(arr[i]))
    );
  }
}

//输出排序结果
export default function (args: CommandArgs) {
  var Directory = []; //文件夹数组
  var Files = []; //文件数组
  var input = true

  //判断是否输入正确
  //判断sort命令是否是mtime，是否输入
  if (!(args.options['-sort'] == 'mtime' ||
    args.options['-sort'] == true ||
    args.options['-sort'] == undefined)) {
    input = false;
    //判断order命令是否是desc和asc，是否输入
  } else if (!(args.options['-order'] === 'desc' ||
    args.options['-order'] == 'asc' ||
    args.options['-order'] == true ||
    args.options['-order'] == undefined)) {
    input = false;
  }
  //输入的不是sort 或 order命令
  if (args.options['-sort'] == undefined && args.options['-order'] == undefined) {
    if (args.argv.length != 0 || Object.keys(args.options).length != 0) {
      input = false;
    }
  }
  if(input == false){  //调用函数
    console.log("输入格式错误，请按照正确的模式输入")
  }else
  fs.readdir(process.cwd(), (err, dirs) => {
    if (err) {
      console.log(err);
    } else {
      let head =
      "\n" +
      "LastWriteTime".padEnd(17, " ") +
      "Length".padStart(14, " ") +
      " Name";
      console.log(head);
      console.log("-----------------  ------------- -----");
      if(args.options['-sort'] == 'mtime'){  //排序
        if(args.options['-order'] == 'asc' || args.options['-order'] == undefined){
          sort(dirs,1)
          display(dirs);
        }else if(args.options['-order'] == 'desc'){
          sort(dirs,2)
          display(dirs);
        }
      }else{
        //分离数组
        dirs.forEach(file => {
          let stat = fs.statSync(file)
          if (stat.isDirectory()) {
            Directory.push(file);
          } else {
            Files.push(file);
          }
        }) 
        //调用两次打印函数，分别打印文件夹和文件
        sort(Directory,0)
        sort(Files,0)
        display(Directory)
        display(Files)
      }
    }
  });
}