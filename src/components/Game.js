import { useState, useEffect } from 'react';
import Deck from './Deck';
import NewPlayerForm from './NewPlayerForm';

const axios = require('axios');

const Game = (props) => {
    let [addNewPlayer, setAddNewPlayer] = useState(false);
    const [playerList, setPlayerList] = useState([]);
    const [winnerList, setWinnerList] = useState([]);
    const [selectedPlayerId, setSelectedPlayerId] = useState(0);

    const onPlayerSelect = (event) => {
        setSelectedPlayerId(parseInt(event.target.value))
    }

    const onWinSubmit = (event) => {
        axios
        .patch(`${process.env.REACT_APP_BACKEND_URL}/players/${selectedPlayerId}/win`)
        .then( response => {
            console.log(response.data)
        })
        .catch( error => console.log(error))
        .finally("finished axios attem")
    }

    const getPlayerList = () => {
        return axios
        .get(`${process.env.REACT_APP_BACKEND_URL}/players`)
        .then(response => {
            setPlayerList(response.data)
            setSelectedPlayerId(response.data[0]?.player_id)
        })
    }
    const getWinnerList = () => {
        getPlayerList();
        let temp = [].concat(playerList)
        .sort((a,b) => a.win_count > b.win_count? -1 : 1)
        setWinnerList(temp)

        setTimeout(() => setWinnerList(), 5000)
    }

    const onSubmitAddPlayer = (name) => {
        axios.post(`${process.env.REACT_APP_BACKEND_URL}/players`, name)
        .then(response => {
            getPlayerList();
            setAddNewPlayer(false);
        })
        .catch( error => console.log(error))
        .finally("finished axios post attempt")
    }
    const onDeleteAllPlayers = (event) => {
        axios.delete(`${process.env.REACT_APP_BACKEND_URL}/players`)
        .then (response => {
            setPlayerList(response.data)
        })
    }
    useEffect( () => {
        getPlayerList();
      }, []);

    return (
        <>
            <button onClick={() => setAddNewPlayer(true)} 
             className="addNewPlayer">Add New Player</button>
            {addNewPlayer && <NewPlayerForm onSubmitForm={onSubmitAddPlayer}/>}
            <button onClick={onDeleteAllPlayers}>Delete All Players</button>
            <button onClick={getWinnerList}>Scores</button>
            <div>
                <ol>
                    {winnerList && winnerList.map((item) =>
                    <li key={item.player_id}> {item.name} - wins: {item.win_count}</li>)}
                </ol>
            </div>

            {playerList.length > 0 &&(
                <>
                    <label>Pick Winner</label>
                    <select className="name-list" onChange={onPlayerSelect} value={selectedPlayerId}>
                        {playerList.map(player =>
                            <option key={player.player_id} 
                                value={player.player_id}>{player.name}
                            </option>
                        )}
                    </select>
                    <button onClick={onWinSubmit}>Submit</button>
                </>
            )}

            <Deck/>
        </>
    );
};

export default Game;