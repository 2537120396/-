import * as request from './request.js'
import { Album } from './types'
import AlbumItem from './AlbumItem.js'
import Header from './Header.js'
import Foot from './Foot.js'


interface State {
  album: Album[]
}


class App extends React.Component<any, State> {
  
  state: State = {
    album: []
  }

  async getData() {
    let album = await request.get<Album[]>('data/album.json')
    this.setState({
      album
    })
  }
  componentDidMount() {
    this.getData()
  }

  render() {
    return (
      <React.Fragment>
          <Header />
        <main>
          <div className="cover-item">
            {this.state.album.map((album, index) => <AlbumItem key={index}  album={album} />)}
          </div>
        </main>
        <Foot />
      </React.Fragment>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'))