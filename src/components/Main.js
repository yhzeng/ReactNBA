import React from 'react';
import ShotChart from './ShotChart';
import DataViewContainer from './DataViewContainer';
import Profile from './Profile';
import nba from 'nba';
import SearchBar from './SearchBar';
import TopNavBar from "./TopNavBar";
import { DEFAULT_PLAYER_INFO } from '../constants';

class Main extends React.Component {
    state = {
            playerInfo: DEFAULT_PLAYER_INFO,
    }
    componentDidMount() {

        this.loadPlayerInfo(this.state.playerInfo.fullName);
    }

    loadPlayerInfo = (playerName) => {
        nba.stats.playerInfo({ PlayerID: nba.findPlayer(playerName).playerId }).then((info) => {
            console.log(info);
            const playerInfo = Object.assign(info.commonPlayerInfo[0], info.playerHeadlineStats[0]);
            this.setState({ playerInfo });
        });
    }

    handleSelectPlayer = (playerName) => {
        this.loadPlayerInfo(playerName);
    }

    render() {
        return (
            <div className="main">
                <SearchBar handleSelectPlayer={this.handleSelectPlayer}/>
                <div className="player">
                <Profile playerInfo={this.state.playerInfo}/>
                {/*<ShotChart playerId={this.state.playerId}/>*/}
                <DataViewContainer playerId={this.state.playerInfo.playerId}/>
                </div>
            </div>
        );
    }
}

export default Main;