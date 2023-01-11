import React from 'react';
import './Entry.css'

function Entry({ pokemon }) {
    return (
        <div className="Entry">
            <div className="Entry_sprite">
                <img src={pokemon.sprites.front_default} alt=""/>
            </div>
            <div className="Entry_name">
                {pokemon.name}
            </div>
            <div className="Entry_typing">
                {pokemon.types.map(type => {
                    return (
                        <div className="Entry_type">
                            {type.type.name}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Entry;