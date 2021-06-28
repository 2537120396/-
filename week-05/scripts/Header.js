export default class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isClicked: false,
            imgSrc: 'imgs/icon-menu.svg'
        };
    }
    menuClick() {
        var btn = document.getElementById('mask');
        if (this.props.isClicked == false) {
            this.setState({
                isClicked: true,
                imgSrc: 'imgs/icon-close.svg'
            });
            btn.style.display = 'flex';
        }
        else {
            this.setState({
                isClicked: false,
                imgSrc: 'imgs/icon-menu.svg'
            });
            btn.style.display = 'none';
        }
    }
    render() {
        return (React.createElement("div", { className: "header" },
            React.createElement("div", { className: "head" },
                React.createElement("div", { className: "menu" },
                    React.createElement("img", { src: this.state.imgSrc, id: "imgmenu", onClick: this.menuClick.bind(this) })),
                React.createElement("div", { className: "logo" },
                    React.createElement("img", { src: "imgs/logo-black.svg", className: "logo" })),
                React.createElement("div", { className: "menu-items" },
                    React.createElement("a", { href: "#", className: "menu-item" }, "Inspiration"),
                    React.createElement("a", { href: "#", className: "menu-item" }, "Find Work"),
                    React.createElement("a", { href: "#", className: "menu-item" }, "Learn"),
                    React.createElement("a", { href: "#", className: "menu-item" }, "Go Pro"),
                    React.createElement("a", { href: "#", className: "menu-item" }, "Hire Designers")),
                React.createElement("div", { className: "sign-in" }, "Sign in"),
                React.createElement("div", { className: "sign-up" }, "Sign up")),
            React.createElement("div", { className: "introduce" },
                React.createElement("div", { id: "mask" },
                    React.createElement("a", { href: "#", className: "menu-item", id: "menuitem" }, "Inspiration"),
                    React.createElement("a", { href: "#", className: "menu-item", id: "menuitem" }, "Find Work"),
                    React.createElement("a", { href: "#", className: "menu-item", id: "menuitem" }, "Learn"),
                    React.createElement("a", { href: "#", className: "menu-item", id: "menuitem" }, "Go Pro"),
                    React.createElement("a", { href: "#", className: "menu-item", id: "menuitem" }, "Hire Designers")),
                React.createElement("div", { className: "introduce-inside" },
                    React.createElement("div", { className: "banner" },
                        React.createElement("img", { src: "imgs/banner.webp", className: "picture" })),
                    React.createElement("div", { className: "text" },
                        React.createElement("div", { className: "top" }, "Discover the world's top designers & creatives"),
                        React.createElement("div", { className: "mid" }, "Dribble is the leading destination to find & showcase creative work and home to the world's best design professionals"),
                        React.createElement("div", { className: "bot" }, "Sign up"))))));
    }
}
//# sourceMappingURL=Header.js.map