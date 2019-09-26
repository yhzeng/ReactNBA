import React, {Component} from 'react';
import { AutoComplete, Button, Input, Icon } from 'antd';
import nba from 'nba';
import { PROFILE_PIC_URL_PREFIX } from '../constants';

const { Option } = AutoComplete;
class SearchBar extends Component {
    state = {
        dataSource: [],
    };

    handleSearch = (value) => {
        console.log(value);

        this.setState({
            dataSource: !value ?
                [] : nba.searchPlayers(value).map(player => ({
                    fullName: player.fullName,
                    playerId: player.playerId,
                }))
        });
    }

    onSelect = (playerName) => {
        console.log(playerName);
        this.props.handleSelectPlayer(playerName);
    }

        render() {
        const { dataSource } = this.state;
        const optList = dataSource.map((player) => (
                <Option key={player.fullName} value={player.fullName}          className="player-option">
                    <img className="player-option-image" src={`${PROFILE_PIC_URL_PREFIX}/${player.playerId}.png`}/>
                    <span className="player-option-label">{player.fullName}</span>
                </Option>
        ));


            return (
                <AutoComplete
                    className="search-bar"
                    size="large"
                    dataSource={optList}
                    onSelect={this.onSelect}
                    onSearch={this.handleSearch}
                    placeholder="search NBA Player"
                    optionLabelProp="value"
                >
                    <Input suffix={<Icon type="search" className="certain-category-icon" />} />
                </AutoComplete>
        );
    }
}

export default SearchBar;