import Data from "../types";
import UpdateStateData, { Game, Player, Team } from "../types/updateState";

export const PLAYER_NAMES = [
  "Armstrong",
  "Bandit",
  "Beast",
  "Boomer",
  "Buzz",
  "C-Block",
  "Casper",
  "Caveman",
  "Centice",
  "Chipper",
  "Cougar",
  "Dude",
  "Foamer",
  "Fury",
  "Gerwin",
  "Goose",
  "Heater",
  "Hollywood",
  "Hound",
  "Iceman",
  "Imp",
  "Jester",
  "Junker",
  "Khan",
  "Marley",
  "Maverick",
  "Merlin",
  "Middy",
  "Mountain",
  "Myrtle",
  "Outlaw",
  "Poncho",
  "Rainmaker",
  "Raja",
  "Rex",
  "Roundhouse",
  "Sabretooth",
  "Saltie",
  "Samara",
  "Scout",
  "Shepard",
  "Slider",
  "Squall",
  "Sticks",
  "Stinger",
  "Storm",
  "Sultan",
  "Sundow",
  "Swabbie",
  "Hog Tex",
  "Tusk",
  "Viper",
  "Wolfman",
  "Yuri",
];
export const TEAM_NAMES = [
  "Calm Pigs",
  "Angry Dogs",
  "Wild Mambas",
  "Powerful Deer",
  "Fast Sparrows",
  "Quick Dodgers",
  "Deadly Riddles",
  "True",
  "Rough Gnomes",
  "Infamous Swallows",
  "Crows",
  "Clever Leopards",
  "Robins",
  "Quiet Kings",
  "Fabulous Vultures",
  "Pure Bears",
  "Big Comets",
  "Clever Doves",
  "Brave Serpents",
  "Stark Chimpanzees",
  "Grand Raccoons",
  "Bitter Pandas",
  "Brave Dinos",
  "Iron Pythons",
  "Crusaders",
  "Major Lobsters",
  "Big Bad Camels",
  "Dapper Birds",
  "Extraordinary Enigmas",
  "Stark Prowlers",
  "Monstrous Boomers",
  "Crunchers",
  "Black Pelicans",
  "Cats",
  "Majestic Chimpanzees",
  "Seals",
  "Storm Wolves",
  "Careless Crusaders",
  "Infamous Mammoths",
  "Creative Camels",
];

export function generatePlayer(): Player {
  return {
    name: PLAYER_NAMES[Math.floor(Math.random() * PLAYER_NAMES.length)],
    id: Math.floor(Math.random() * 1000000000).toString(),
    primaryID: Math.floor(Math.random() * 1000000000).toString(),
    assists: 0,
    attacker: "",
    boost: 33,
    cartouches: 0,
    demos: 0,
    goals: 0,
    hasCar: false,
    isDead: false,
    isPowersliding: false,
    isSonic: false,
    location: {
      X: 0,
      Y: 0,
      Z: 0,
      pitch: 0,
      roll: 0,
      yaw: 0,
    },
    onGround: false,
    onWall: false,
    saves: 0,
    score: 0,
    shortcut: 0,
    shots: 0,
    speed: 0,
    team: 0,
    touches: 0,
  };
}

export function generateTeam(): Team {
  return {
    color_primary: "#000000",
    color_secondary: "#000000",
    name: TEAM_NAMES[Math.floor(Math.random() * TEAM_NAMES.length)],
    score: 0,
  };
}

export function generatePlayers(team: number, number: number): Player[] {
  const players: Player[] = [];
  for (let i = 0; i < number; i++) {
    const player = generatePlayer();
    player.team = team;
    players.push(player);
  }
  return players;
}

export function generateTeams(): Team[] {
  return [generateTeam(), generateTeam()];
}

export function generateGame(): Game {
  const teams = generateTeams();
  return {
    ball: {
      location: {
        X: 0,
        Y: 0,
        Z: 0,
      },
      speed: 0,
      team: 0,
    },
    teams,
    hasTarget: false,
    hasWinner: false,
    arena: "Beckwith Park",
    isOT: false,
    isReplay: false,
    target: "",
    time_milliseconds: 0,
    time_seconds: 0,
    winner: "",
  };
}

export function generateData(
  numberOfplayers: 1 | 2 | 3 | 4
): Data<UpdateStateData> {
  const game = generateGame();
  const players = generatePlayers(0, numberOfplayers).concat(
    generatePlayers(1, numberOfplayers)
  );

  game.hasTarget = true;
  game.target = players[0].id;

  return {
    data: {
      game,
      players: players.reduce((acc, player) => {
        acc[player.id] = player;
        return acc;
      }, {} as { [key: string]: Player }),
      event: "update_state",
      hasGame: true,
      match_guid: "test",
    },
    event: "update_state",
  };
}

export function simulateEvent(
  data: Data<UpdateStateData>,
  start: number
): Data<UpdateStateData> {
  const time = Date.now() - start;

  data.data.game.time_milliseconds = time;
  data.data.game.time_seconds = Math.round(time / 1000);

  if (Math.random() < 0.005) {
    data.data.game.target =
      data.data.players[
        Object.keys(data.data.players)[
          Math.floor(Math.random() * Object.keys(data.data.players).length)
        ]
      ].id;
  }

  Object.keys(data.data.players).forEach((id) => {
    const player = data.data.players[id];
    if (Math.random() < 0.05) {
      player.score += Math.floor(Math.random() * 10);
    }
    if (Math.random() < 0.00005) {
      player.goals++;
      data.data.game.teams[player.team].score++;
    }
    if (Math.random() < 0.0005) {
      player.shots++;
    }
    if (Math.random() < 0.0005) {
      player.assists++;
    }

    if (Math.random() < 0.005) {
      player.boost = Math.min(
        100,
        player.boost + Math.floor(Math.random() * 30)
      );
    }
    if (Math.random() < 0.005) {
      player.boost = Math.max(0, player.boost - Math.floor(Math.random() * 30));
    }
  });

  return data;
}
