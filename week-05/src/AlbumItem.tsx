import { Album } from './types'

interface Props {
  album: Album
}

export default class AlbumItem extends React.Component<Props> {
  render() {
    let { album } = this.props
    return (
          <div className ="list">
            <div className="photo">
                <img src={album.cover} className="cover-img"/>
            </div>
            <div className="title">                   
                <img src={album.avatar} className="avatar"/>                   
                <span className="name">{album.name}</span>                   
                <div className="badge"><div className="inside">{album.badge}</div> </div>                    
                <img src="imgs/icon-like.svg" className="icon"/>
                <span className="number">{album.likes}</span>                   
                <img src="imgs/icon-view.svg" className="icon"/>
                <span className="number">{album.views}</span>
            </div>
          </div>
    )
  }

}