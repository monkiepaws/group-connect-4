// 'players' collection
player: {
    // id: firebase handles
    name: string,
    color: string, // hex color code ie. #ffffff
    icon: icon // Font awesome class ie. 'fas fa-circle'
}

// 'games' collection
game: {
    // id: firebase handles
    player1: player.id, // more specifically, the ID of the player firebase designates
    player2: player.id, //  ^^
    status: string, // 'in progress', 'finished'
    result: string, // player ID of winner or 'draw'
    turns: [], // an array of turns *** maybe an object with objects?????
    chatId: string // the ID of the Chat collection ??? optional
}

