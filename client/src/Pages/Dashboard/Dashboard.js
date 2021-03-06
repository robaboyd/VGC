import React, { Component } from "react";
import userAPI from "../../utils/userAPI";
import SidePanel from "../../Components/SidePanel/SidePanel";
import Searchbar from "../../Components/Searchbar/Searchbar";
import "./Dashboard.css";
import RightPanel from "../RightPanel/RightPanel";
import collectionAPI from "../../utils/collectionAPI";
import wishlistAPI from "../../utils/wishlistAPI";
import GamePanel from "../../Components/GamePanel/GamePanel";

class Dashboard extends Component {
  state = {
    username: this.props.username,
    theme: this.props.theme,
    rightPanelOpen: false,
    chatboxExpanded: false,
    publicSellGames: [],
    overlayShow: "",
    socket: this.props.socket
  };

  componentDidMount = async () => {
    await this.initSocket();
    this.switchState();
  };

  initSocket = () => {
    const { socket, username } = this.state;

    const promise = new Promise((resolve, reject) => {
      resolve(socket.emit("USER_CONNECTED", username));
    });

    socket.on("on connection", msg => {
      console.log(msg);
    });
    return promise;
  };

  logout = () => {
    userAPI.logout().then(() => {
      // reload the window on sucessful logout
      window.location.reload();
    });
  };

  // check the state of the theme toggle on the dashboard
  switchState = () => {
    if (this.props.theme === 1) {
      document.getElementById("switch").checked = false;
    } else if (this.props.theme === 2) {
      document.getElementById("switch").checked = true;
    }
  };

  toggleTheme = () => {
    if (this.state.theme === 1) {
      const data = {
        theme: 2
      };
      userAPI.update(data).then(() => {
        this.setState({
          theme: 2
        });

        document.getElementById("theme-div").classList.remove("light-theme");
        document.getElementById("theme-div").classList.add("dark-theme");
      });
    } else {
      const data = {
        theme: 1
      };
      userAPI.update(data).then(() => {
        this.setState({
          theme: 1
        });
      });
      document.getElementById("theme-div").classList.remove("dark-theme");
      document.getElementById("theme-div").classList.add("light-theme");
    }
  };

  // chat stuffs

  addToCollection = event => {
    const id = event.target.attributes.getNamedItem("data-id").value;
    const name = event.target.attributes.getNamedItem("data-name").value;
    const url = event.target.attributes.getNamedItem("data-url").value;
    const data = {
      id,
      name,
      url,
      index: ""
    };
    collectionAPI.add(data).then(done => {
      // live update with reloading page
      const { socket } = this.state;
      socket.emit("added to collection", done);
    });
  };

  addToWishlist = event => {
    console.log("add to wishlist");
    const id = event.target.attributes.getNamedItem("data-id").value;
    const name = event.target.attributes.getNamedItem("data-name").value;
    const url = event.target.attributes.getNamedItem("data-url").value;
    const data = {
      id,
      name,
      url,
      index: ""
    };
    wishlistAPI.add(data).then(done => {
      // live update with reloading page
      const { socket } = this.state;
      socket.emit("added to wishlist", done);
    });
  };

  render() {
    return (
          <div>
    <div
          className={`overlay ${this.props.overlayShow}`}
                  onClick={this.props.closeRightPanel}
        />

    {/* Game Panel */}
          <GamePanel game={this.props.game} />

          {/* right panel */}
    <RightPanel
                  closeRightPanel={this.props.closeRightPanel}
          searchedGames={this.state.searchedGames}
          addToCollection={this.addToCollection}
          addToWishlist={this.addToWishlist}
          socket={this.props.socket}
          username={this.props.username}
          chatIds={this.props.chatIds}
                  sUserChats={this.props.sUserChats}
        />
    {/* nav panel */}
    <SidePanel
                  username={this.props.username}
                  buttonClick={this.logout}
          buttonText="Logout"
          profileImg={this.props.profileImg}
          active={this.props.active}
        />

    <div className="content container-fluid">
          <Searchbar
            themeChecked={this.props.themeChecked}
            toggleTheme={this.toggleTheme}
            openRightPanel={this.props.openRightPanel}
            closeRightPanel={this.props.closeRightPanel}
          />
          {this.props.children}
        </div>
  </div>
    );
  }
}

export default Dashboard;
