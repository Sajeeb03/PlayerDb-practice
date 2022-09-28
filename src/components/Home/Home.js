import React, { useEffect, useState } from 'react';
import Players from '../Players/Players';
import './Home.css';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2'
const Home = () => {
    const [search, setSearch] = useState('');
    const [players, setPlayers] = useState([]);
    const [cart, setCart] = useState([]);

    const handleDelete = id => {
        const rest = cart.filter(pd => pd.idPlayer !== id);
        setCart(rest);
        toast("Wow so easy!");

        Swal.fire(
            'Good job!',
            'You clicked the button!',
            'success'
        )
    }
    useEffect(() => {
        fetch(`https://www.thesportsdb.com/api/v1/json/2/searchplayers.php?p=${search}`)
            .then(res => res.json())
            .then(data => {
                setPlayers(data.player)
            })
    }, [search])
    // console.log(players);
    return (
        <div className='home-container' >
            <div className="player-container">
                <input onChange={(e) => setSearch(e.target.value)} type="text" name="" id="input-field" placeholder='search-player' />
                <button className='btn-search'>Search</button>
                <Players
                    players={players}
                    cart={cart}
                    setCart={setCart}
                ></Players>
            </div>
            <div className="cart-container">
                <div className='cart'>
                    <h3>Total Player: {cart.length}</h3>
                    {
                        cart.map(pd => <div className='cart-handle'>

                            <li>{pd.strPlayer}</li>
                            <button onClick={() => handleDelete(pd.idPlayer)} className='delete-btn'>X</button>
                        </div>)
                    }
                </div>
            </div>
        </div >
    );
};

export default Home;