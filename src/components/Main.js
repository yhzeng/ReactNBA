import React from 'react';
import ShotChart from './ShotChart';
import DataViewContainer from './DataViewContainer';
import Profile from './Profile';
import nba from 'nba';
import TopNavBar from "./TopNavBar";

class Main extends React.Component {
    state = {
        playerInfo: {
            playerId: nba.findPlayer('Stephen Curry').playerId,
            teamAbbreviation: 'GSW',
        }
    }
    componentDidMount() {
        nba.stats.playerInfo({ PlayerID: nba.findPlayer('Stephen Curry').playerId })
            .then((info) => {
                console.log(info);
                const playerInfo = Object.assign(info.commonPlayerInfo[0], info.playerHeadlineStats[0]);
                console.log("final player info", playerInfo);
                this.setState({ playerInfo });
            })
            .catch((e) => {
                console.log(e);
            });
    }

    render() {
        return (
            <div className="main">
                <Profile playerInfo={this.state.playerInfo}/>
                {/*<ShotChart playerId={this.state.playerId}/>*/}
                <DataViewContainer playerId={this.state.playerInfo.playerId}/>
            </div>
        );
    }
}

export default Main;