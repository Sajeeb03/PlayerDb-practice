import React from 'react';
import "./SinglePlayer.css"

const SinglePlayer = ({ player, cart, setCart }) => {
    // console.log(player);
    const { strCutout, strPlayer, strNationality, strThumb, idPlayer } = player;
    const handleCart = () => {
        const info = {
            idPlayer,
            strPlayer,
            strNationality,
            price: 120
        };
        if (cart) {
            const newCart = [...cart, info]
            setCart(newCart);
        }
        else {
            setCart([info])
        }

    }
    const handleBookmark = () => {
        const info = {
            idPlayer,
            strPlayer,
            strNationality,
            price: 120,
            quantity: 1
        };
        const storedCart = JSON.parse(localStorage.getItem('bookmark'));
        if (storedCart) {
            const isExist = storedCart.find(p => p.idPlayer === idPlayer);
            if (isExist) {
                isExist.quantity = isExist.quantity + 1;
                localStorage.setItem('bookmark', JSON.stringify(storedCart))
            }
            isExist || localStorage.setItem('bookmark', JSON.stringify([...storedCart, info]))
        }
        else {
            localStorage.setItem('bookmark', JSON.stringify([info]))
        }
    }
    return (
        <div className='card'>
            <img src={strCutout ? strCutout : strThumb} alt="" />
            <h2>{strPlayer}</h2>
            <p>{strNationality}</p>
            <button className="card-btn">Details</button>
            <button onClick={handleCart} className="card-btn">Add to cart</button>
            <button onClick={handleBookmark} className="card-btn">Bookmark</button>
        </div>
    );
};

export default SinglePlayer;