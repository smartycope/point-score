import './App.css';
import {useState} from 'react';

function PlayerCol({player, data, setData, remove}){
    const [score, setScore] = useState()

    return <div className='player'>
        <span className='player-container'>
            <h3>{player}</h3>
            <button onClick={remove} className='remove'>❌</button>
        </span>
        {data.map(val => <p className='history'>{val}</p>)}
        <span>
            <input type='number' className='new-score' value={score} onChange={e => setScore(Number(e.target.value))}></input>
            <button onClick={() => {setData(score, -1); setScore(0)}} className='accept'>✅</button>
        </span>
        {/* <div className='expander'/> */}
        <p className='sum'>Total: {data.reduce((partial_sum, a) => partial_sum + a, 0)}</p>
    </div>
}

function App() {
    const [data, setData] = useState({})

    // console.log(data);

    function editPlayerVal(player, val, idx){
        let copy = JSON.parse(JSON.stringify(data))
        if (idx == -1){
            copy[player].push(val)
        }else{
            copy[player][idx] = val
        }
        setData(copy)
    }

    function addPlayer(){
        let copy = JSON.parse(JSON.stringify(data))
        copy[prompt('Enter Player Name:')] = []
        setData(copy)
    }

    function removePlayer(player){
        if (window.confirm(`Remove ${player}?`)){
            let copy = JSON.parse(JSON.stringify(data))
            delete copy[player]
            setData(copy)
        }
    }

    return <div className="App">
        {Object.entries(data).map(([player, data]) =>
            <PlayerCol
                player={player}
                data={data}
                setData={(val, idx) => editPlayerVal(player, val, idx)}
                remove={() => removePlayer(player)}
                key={player}
            />
        )}
        <button onClick={addPlayer} id='add-player'>➕ Player</button>
    </div>
}

export default App;
