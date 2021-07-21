import { useState, useEffect } from 'react';
import Card from './Card';

const axios = require('axios');

const Deck = (props) => {
    const [currentCardIndex, setCurrentCardIndex] = useState(0);
    const [deck, setDeck] = useState([]);
    const currentCard = deck[currentCardIndex];
    
    const getDeck = () => {
        return axios
        .get(`${process.env.REACT_APP_BACKEND_URL}/decks/1/cards`)
        .then(response => {
            setDeck(response.data);
            setCurrentCardIndex(0);
        })
        .catch(error => console.log(error))
        .finally (() => console.log('getting all cards to populate deck'))
    }
    useEffect( () => {
        getDeck();
      }, []);

    const shuffle = (event) => {
        let list = [...deck.keys()]
        list = list.sort(() => Math.random() - 0.5)

        const newDeck = []
        list.forEach(index => {
            newDeck.push(deck[index])
        });
        setDeck(newDeck);
        setCurrentCardIndex(0);
    };
    
    if (deck.length === 0){return null;}

    return (
        <>
            <Card onCardClick={() => setCurrentCardIndex(currentCardIndex + 1)} {...currentCard}/>
            <button className="shuffle" onClick={() => shuffle()}>Shuffle them Deck</button>
        </>
    );
};

export default Deck;