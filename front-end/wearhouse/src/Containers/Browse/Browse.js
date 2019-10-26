import React from "react";

import Outfit from "../../Components/Outfit/Outfit";

import "./Browse.scss";

class Browse extends React.Component {
    state = {
        outfits: [
            { id: 1, imageUrl: "", satisfactionValue: 3 },
            { id: 2, imageUrl: "", satisfactionValue: 4 },
            { id: 3, imageUrl: "", satisfactionValue: 2 }
        ]
    };
    render() {
        const outfits = this.state.outfits.map(outfit => {
            return (
                <Outfit
                    key={outfit.id}
                    image={outfit.imageUrl}
                    satisfactionValue={outfit.satisfactionValue}
                    clicked={console.log("clicked")}
                />
            );
        });
        return (
            <div id="browse">
                <div id="outfit-list">{outfits}</div>
            </div>
        );
    }
}

export default Browse;
