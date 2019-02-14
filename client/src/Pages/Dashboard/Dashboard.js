import React, { Component } from 'react';
import userAPI from '../../utils/userAPI';
import gamesAPI from '../../utils/gamesAPI';
import SidePanel from '../../Components/SidePanel/SidePanel';
import Searchbar from '../../Components/Searchbar/Searchbar';
import './Dashboard.css';
import RightPanel from '../../Components/RightPanel/RightPanel';
class Dashboard extends Component {

  state = {
    theme: this.props.theme,
    searchedGames: [],
    rightPanelOpen: false
  }

	componentDidMount = () => {
    this.switchState();
  };

	getGame = () => {

		gamesAPI.gameID("19560").then((data) => {

				console.log(data);

			})

	};

  logout = () => {
    userAPI.logout().then(()=> {
      //reload the window on sucessful logout
      window.location.reload();
    });
  };

  //check the state of the theme toggle on the dashboard
  switchState = () => {
    if (this.props.theme === 1) {
      document.getElementById("switch").checked = false;
    } else if (this.props.theme === 2) {
      document.getElementById("switch").checked = true;
    } 
  }

  toggleTheme = () => {
    if (this.state.theme === 1) {
      let data = {
        theme: 2
      };
      userAPI.update(data).then(() => {
        this.setState({
          theme: 2
        });

        document.getElementById("theme-div").classList.remove("light-theme");
        document.getElementById("theme-div").classList.add("dark-theme")
      })
    } else {

      let data = {
        theme: 1
      };
      userAPI.update(data).then(() => {
        this.setState({
          theme: 1
        })
      })
      document.getElementById("theme-div").classList.remove("dark-theme")
      document.getElementById("theme-div").classList.add("light-theme")
    }
  }

  openRightPanel = () => {
    document.getElementById("mySidenav").style.width = "900px";
    this.setState({
      rightPanelOpen: true,
      searchedGames: []
    })
  }

  closeRightPanel = () => {
    document.getElementById("mySidenav").style.width = "0";
    this.setState({
      rightPanelOpen: false,
      searchedGames: []
    })
  }

  gameSearch = (event) => {
    event.preventDefault();
    if(this.state.rightPanelOpen === true){

      let query = document.getElementById("gameSearch").value;
      gamesAPI.gameSearch(query).then(data => {
        // this.setState({
          //   searchedGames: data
          // })
          console.log(data.data)
          //data.data[0].game.cover
          //get cover
          if(this.state.rightPanelOpen === true){

            data.data.forEach(element => {
              
              this.coverSearch(element)
              
            });
          }
        })
      }
  }

  coverSearch = (query) => {
    //need to send game name and id to put in state
    console.log(query) ;
    if(query.game !== undefined){

        gamesAPI.gameCover(query.game.cover).then(data => {
          let tempArray = this.state.searchedGames;
          if(data.data[0] !== undefined){

            data.data[0].url = data.data[0].url.replace('t_thumb', 't_cover_big')
            tempArray.push(
              {
                id: query.game.id,
                imgUrl:  data.data[0].url,
                name: query.game.name
              });
              this.setState({
                searchedGames: tempArray
              })
            }
          })
      }
      }
  render() {
    return (
      <div>
        {/* right panel */}
        <RightPanel closeRightPanel={this.closeRightPanel} searchedGames={this.state.searchedGames} gameSearch={this.gameSearch} />
        {/* nav panel */}
        <SidePanel username={this.props.username} buttonClick={this.logout} buttonText={"Logout"} profileImg={this.props.profileImg} active={this.props.active} />

        <div className="content container-fluid">
          <Searchbar themeChecked={this.props.themeChecked} toggleTheme={this.toggleTheme} openRightPanel={this.openRightPanel} closeRightPanel={this.closeRightPanel}/>
          {this.props.children}
        </div>

      </div>

    )

  }
}


export default Dashboard;