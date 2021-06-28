type ButtonType = 'default' | 'primary'

interface Props {
  type?: ButtonType
  onClick?: () => void
}

export default class Button extends React.Component<Props> {
  
  render() {
    let type = this.props.type
    return (
      <button className = {type} onClick={this.props.onClick}>{this.props.children}</button>
    )
  }
}