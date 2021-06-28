export interface IArticle {
  id: string
  title: string//文章名
  time: string//文章时间
  avatar: string//wenzhangtouxiang
  author: string//zuozzhe
  banner: string//tu
  likes: number
  comments: number
  content?: string
}