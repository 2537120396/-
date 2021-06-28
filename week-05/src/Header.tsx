export default class Header extends React.Component
{
  constructor(props) {
      super(props);
      this.state = {
          isClicked: false,
          imgSrc: 'imgs/icon-menu.svg'
      };

  }
  menuClick() {
    var btn = document.getElementById('mask')
    if (this.props.isClicked == false) {
        this.setState({
            isClicked: true,
            imgSrc: 'imgs/icon-close.svg'
        })
        btn.style.display = 'flex'
    }else{
        this.setState({
            isClicked: false,
            imgSrc: 'imgs/icon-menu.svg'
        })
        btn.style.display = 'none'
    }


}

render() {
    return (
        <div className="header">
            <div className="head">
                <div className="menu"><img src={this.state.imgSrc} id="imgmenu" onClick={this.menuClick.bind(this)} /></div>
                <div className="logo"><img src="imgs/logo-black.svg" className="logo" /></div>
                <div className="menu-items">
                    <a href="#" className="menu-item" >Inspiration</a>
                    <a href="#" className="menu-item">Find Work</a>
                    <a href="#" className="menu-item">Learn</a>
                    <a href="#" className="menu-item">Go Pro</a>
                    <a href="#" className="menu-item">Hire Designers</a>
                </div>
                <div className="sign-in">Sign in</div>
                <div className="sign-up">Sign up</div>
            </div>

            <div className="introduce">
                <div id="mask">
                    <a href="#" className="menu-item" id="menuitem">Inspiration</a>
                    <a href="#" className="menu-item" id="menuitem">Find Work</a>
                    <a href="#" className="menu-item" id="menuitem">Learn</a>
                    <a href="#" className="menu-item" id="menuitem">Go Pro</a>
                    <a href="#" className="menu-item" id="menuitem">Hire Designers</a>
                </div>

                <div className="introduce-inside">
                    <div className="banner">
                        <img src="imgs/banner.webp" className="picture" />
                    </div>

                    <div className="text">
                        <div className="top">
                            Discover the world's top designers & creatives
                        </div>
                        <div className="mid">
                            Dribble is the leading destination to find & showcase creative work and home to the world's best design professionals
                        </div>
                        <div className="bot">Sign up</div>
                    </div>
                </div>
            </div>
        </div>
        
    )
}
}
