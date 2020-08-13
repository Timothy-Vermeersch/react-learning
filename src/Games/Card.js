import React from 'react';

function Card(props) {
    var valueMap = { 1: "A", 11: "J", 12: "Q", 13: "K" };
    var id = "Red-Card";
    var value = props.value;

    if (!props.faceUp) {
        return (
            <div className="Card" id="Face-Down-Card">
            </div>
        )
    }

    if (props.suit == "Clubs" || props.suit == "Spades") {
        id = "Black-Card"
    }

    if (Object.keys(valueMap).includes(String(props.value))) {
        value = valueMap[props.value]
    }

    return (
        <div className="Card" id={id}>
            <h3>{props.suit} <br />  {value}</h3>
        </div>
    );
}

export default Card;