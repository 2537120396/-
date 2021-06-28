import * as request from './request.js'
import { IArea, IAlbum, Area, Album } from './types.js'

// 当前选中area的id
let currentArea: number
let areas: Area[] = []
let albums: Album[] = []

let taglist = document.getElementById('tag-list')
let playlist = document.getElementById('play-list')

// 请求json数据
async function load() {
  let [_areas, _albums] = await Promise.all([
    request.get<IArea[]>('data/areas.json'),
    request.get<IAlbum[]>('data/albums.json')
  ])
  areas = _areas.map(obj => new Area(obj))
  albums = _albums.map(obj => new Album(obj))
  // 设置当前选中第一个tab
  currentArea = areas[0].id
}

//创建Area节点对应的DOM对象 参数为Area类对象
function createArea(item:Area){
  //创建tag-item标签
  let tagitem = document.createElement('a')
  tagitem.href = '#'
  //tag-item标签绑定click事件
  tagitem.addEventListener('click', () => clickArea(item))
  tagitem.className = 'tag-item'
  if(item.id===1){
    tagitem.className += ' tag-active'
  }
  tagitem.innerText = item.name
  item.el=tagitem
  return tagitem;
}
//初始化Area列表
function initArea(){
  areas.map(item => {
    let el = createArea(item)
    taglist.appendChild(el)
  })
}
//创建Album节点对应的DOM对象 参数为Album类对象
function createAlbum(item:Album){
    let list = document.createElement('div')
    list.className = 'album'
    let coverwrap = document.createElement('a')
    coverwrap.className='cover-wrap'
    coverwrap.href = '#'
    list.appendChild(coverwrap)
    let img1 = document.createElement('img')
    img1.src =item.cover
    img1.className = 'cover-img'
    let div1 = document.createElement('div')
    div1.className = 'cover-mask'
    let img2 = document.createElement('img')
    //绑定事件 点击删除条目
    img2.addEventListener('click', () => deleteAlbumItem(item))
    img2.src ='imgs/delete.png'
    img2.className = 'cover-play'
    coverwrap.appendChild(img1)
    coverwrap.appendChild(div1)
    coverwrap.appendChild(img2)
    let div2 = document.createElement('div')
    let a2 = document.createElement('a')
    a2.className='nowrap album-title'
    a2.href = '#'
    a2.innerText = item.name
    div2.appendChild(a2)
    list.appendChild(div2)
    let div3 = document.createElement('div')
    let a3 = document.createElement('a')
    a3.className='nowrap album-author'
    a3.href = '#'
    a3.innerText = item.singer
    div3.appendChild(a3)
    list.appendChild(div3)
    let div4 = document.createElement('div')
    div4.className='nowrap album-time'
    div4.innerText = item.release_time
    list.appendChild(div4)
    item.el=list
    return list
}

function initAlbums(){
  playlist.innerHTML=''
  let rows = albums.filter(item => item.area === currentArea)
  for (let row of rows){
    if(row.el===null){
      createAlbum(row)
    }
    playlist.appendChild(row.el)
  }
}

//删除选中项
function deleteAlbumItem(item:Album){
  playlist.removeChild(item.el)
  let index = albums.indexOf(item)
  albums.splice(index, 1)
}

//点击标签切换歌曲列表内容
function clickArea(item:Area){
  if(item.id===currentArea) return
  currentArea=item.id
  for (let area of areas) {
    if (area.id === item.id) {
      area.el.className += ' tag-active'
    } else {
      area.el.className = 'tag-item'
    }
  }
  initAlbums()
}

async function run() {
    await load()
    initArea()
    initAlbums()

  }
  
  run()