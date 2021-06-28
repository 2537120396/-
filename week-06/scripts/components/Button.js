export default class Button extends React.Component {
    render() {
        let type = this.props.type;
        return (React.createElement("button", { className: type, onClick: this.props.onClick }, this.props.children));
    }
}
//# sourceMappingURL=Button.js.map