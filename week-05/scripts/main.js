import * as request from './request.js';
import AlbumItem from './AlbumItem.js';
import Header from './Header.js';
import Footer from './Foot.js';
class App extends React.Component {
    constructor() {
        super(...arguments);
        this.state = {
            album: []
        };
    }
    async getData() {
        let album = await request.get('data/album.json');
        this.setState({
            album
        });
    }
    componentDidMount() {
        this.getData();
    }
    render() {
        return (React.createElement(React.Fragment, null,
            React.createElement(Header, null),
            React.createElement("main", null,
                React.createElement("div", { className: "cover-item" }, this.state.album.map((album, index) => React.createElement(AlbumItem, { key: index, album: album })))),
            React.createElement(Footer, null)));
    }
}
ReactDOM.render(React.createElement(App, null), document.getElementById('app'));
//# sourceMappingURL=main.js.map