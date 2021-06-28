export default class AlbumItem extends React.Component {
    render() {
        let { album } = this.props;
        return (React.createElement("div", { className: "list" },
            React.createElement("div", { className: "photo" },
                React.createElement("img", { src: album.cover, className: "cover-img" })),
            React.createElement("div", { className: "title" },
                React.createElement("img", { src: album.avatar, className: "avatar" }),
                React.createElement("span", { className: "name" }, album.name),
                React.createElement("div", { className: "badge" },
                    React.createElement("div", { className: "inside" }, album.badge),
                    " "),
                React.createElement("img", { src: "imgs/icon-like.svg", className: "icon" }),
                React.createElement("span", { className: "number" }, album.likes),
                React.createElement("img", { src: "imgs/icon-view.svg", className: "icon" }),
                React.createElement("span", { className: "number" }, album.views))));
    }
}
//# sourceMappingURL=AlbumItem.js.map