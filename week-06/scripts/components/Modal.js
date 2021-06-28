export default class Modal extends React.Component {
    render() {
        // 关闭按钮SVG
        let closeBtn = (React.createElement("svg", { viewBox: "64 64 896 896", focusable: "false", "data-icon": "close", width: "1em", height: "1em", fill: "currentColor", "aria-hidden": "true", className: "modal-close" },
            React.createElement("path", { d: "M563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9A7.95 7.95 0 00203 838h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z" })));
        return (React.createElement(React.Fragment, null,
            React.createElement("div", { className: this.props.visible ? 'mask' : 'hidemask', onClick: this.props.onClose.bind(this) }),
            React.createElement("div", { className: this.props.visible ? 'modal' : 'hidemodal' },
                React.createElement("div", { className: 'top' },
                    React.createElement("span", { className: 'title' }, this.props.title),
                    React.createElement("span", { className: 'closeBtn', onClick: this.props.onClose.bind(this) }, closeBtn)),
                React.createElement("div", { className: 'mid' }, this.props.children),
                React.createElement("div", { className: 'bot' },
                    React.createElement("span", { className: 'botBtn' }, this.props.footer)))));
    }
}
//# sourceMappingURL=Modal.js.map