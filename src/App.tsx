import type { Team, Player } from "./types/updateState";
import type UpdateStateData from "./types/updateState";
import type GoalScoredData from "./types/goalScored";
import type Events from "./types/events";
import type BestOf from "./types/bestOf";
import type Data from "./types";

import EndScoreboard from "./components/EndScoreboard";
import Transition from "./components/Transition";
import Main from "./components/Main";

import { useState, useEffect, useRef } from "react";

import PlayerStatus, { StatusEvent } from "./types/playerStatus";
import GameEndedData from "./types/gameEnded";
import GameStatus from "./types/gameStatus";
import init from "./lib/websocket";

const usePrevious = <T extends unknown>(value: T): T | undefined => {
  const ref = useRef<T>();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
};

function App() {
  const [teams, setTeams] = useState<Team[]>([]);
  const [seconds, setSeconds] = useState<number>(0);
  const [isOT, setIsOT] = useState<boolean>(false)
  const [targetPlayer, setTargetPlayer] = useState<Player | null>();
  const [lastGoal, setLastGoal] = useState<GoalScoredData>();
  const [bestOf, setBestOf] = useState<BestOf>(null);

  const [players, setPlayers] = useState<Player[]>([]);
  const prevPlayers = usePrevious(players);

  const [gamesWon, setGamesWon] = useState<number[]>([0, 0]);
  const gamesWonRef = useRef<number[]>([0, 0]);
  gamesWonRef.current = gamesWon;

  const [gameStatus, setGameStatus] = useState<GameStatus>("ended");
  const gameStatusRef = useRef<GameStatus>("ended");
  gameStatusRef.current = gameStatus;

  const [playersStatus, setPlayersStatus] = useState<PlayerStatus[]>([]);

  const bestOfRef = useRef<BestOf>(null);
  bestOfRef.current = bestOf;

  const events: Events = {
    "game:update_state": updateState,
    "game:goal_scored": goalScored,
    "game:replay_start": replayStart,
    "game:replay_end": replayEnd,
    "game:match_ended": matchEnded,
    "game:initialized": initialized,
    "game:replay_will_end": replayWillEnd,
  };

  const keyEvents: { [key: string]: () => void } = {
    r: () => setGamesWon([0, 0]),
    a: () => handleWin(0),
    z: () => handleWin(1),
    "&": () => setBestOf(null),
    é: () => setBestOf(3),
    '"': () => setBestOf(5),
    "'": () => setBestOf(7),
  };

  function updateState(data: Data<UpdateStateData>) {
    if (data.data.game.hasWinner || !data.data.hasGame) return;

    setTeams(data.data.game.teams);
    setSeconds(data.data.game.time_seconds);
    // Object.values is used to convert an object to an array containing the values of the object
    setPlayers(Object.values(data.data.players));

    if (data.data.game.target === "" && !data.data.game.isReplay)
      setTargetPlayer(null);

    if (data.data.game.target !== "")
      setTargetPlayer(data.data.players[data.data.game.target]);

    setIsOT(data.data.game.isOT)

    if (data.data.game.isReplay) setGameStatus("replay");
    else setGameStatus("playing");
  }

  function goalScored(data: Data<GoalScoredData>) {
    setLastGoal(data.data);
    setTimeout(() => {
      toggleTransition();
    }, 3000);
  }

  function replayStart(data: Data) {
    setGameStatus("replay");
  }

  function replayWillEnd(data: Data) {
    setTimeout(() => {
      toggleTransition();
    }, 2000);
  }

  function replayEnd(data: Data) {
    setGameStatus("playing");
  }

  function matchEnded(data: Data<GameEndedData>) {
    if (bestOfRef.current !== null) handleWin(data.data.winner_team_num);

    setTimeout(() => {
      toggleTransition();
      setTimeout(() => {
        setGameStatus("ended");
      }, 1000);
    }, 7000);
  }

  function initialized(data: Data) {
    if (
      bestOfRef.current !== null &&
      gamesWonRef.current.some((g) => {
        if (bestOfRef.current === 3) return g >= 2;

        if (bestOfRef.current === 5) return g >= 3;

        if (bestOfRef.current === 7) return g >= 4;
      })
    ) {
      setGamesWon([0, 0]);
    }
    setGameStatus("playing");
  }

  function handleWin(team: 0 | 1) {
    setGamesWon((gamesWon) =>
      gamesWon.map((g, i) => {
        if (i === team) return g + 1;
        return g;
      })
    );
  }

  function handleKeyDown(event: KeyboardEvent) {
    const key = event.key.toLowerCase();

    if (Object.keys(keyEvents).includes(key)) keyEvents[key]();
  }

  useEffect(() => init(events), []);
  useEffect(() => {
    document.onkeydown = handleKeyDown;

    return () => {
      document.onkeydown = null;
    };
  }, []);

  const [transition, setTransition] = useState(false);

  function toggleTransition() {
    setTransition(true);
  }

  useEffect(() => {
    if (transition === true) setTransition(false);
  }, [transition]);

  function deleteLastEvent() {
    setTimeout(() => {
      setPlayersStatus((pS) => {
        pS.shift();

        return pS;
      });
    }, 5000);
  }

  function addEvent(player: Player, event: StatusEvent) {
    setPlayersStatus([
      ...playersStatus,
      {
        player_id: player.id,
        event: event,
      },
    ]);

    player.last_event = event

    deleteLastEvent();
  }

  useEffect(() => {
    if (gameStatus == "replay") return;

    if (!prevPlayers) return;


    for (const player of players) {
      const old_player = prevPlayers.find((p) => p.id === player.id);

      if (!old_player) continue;

      if (player.demos > old_player.demos) addEvent(player, "demo");

      if (player.shots > old_player.shots) addEvent(player, "shot");

      if (player.goals > old_player.goals) addEvent(player, "goal");

      if (player.assists > old_player.assists) addEvent(player, "assist");

      if (player.saves > old_player.saves) addEvent(player, "save");

      player.last_event = old_player.last_event;
    }
  }, [players]);

  return (
    <>
      <Transition play={transition} />
      {gameStatus === "ended" && (
        <EndScoreboard
          players={players}
          teams={teams}
          bestOf={bestOf}
          gamesWon={gamesWon}
        />
      )} 
      {gameStatus !== "ended" && (
        <Main
          players={players}
          targetPlayer={targetPlayer}
          lastGoal={lastGoal}
          teams={teams}
          seconds={seconds}
          gameStatus={gameStatus}
          bestOf={bestOf}
          gamesWon={gamesWon}
          playersStatus={playersStatus}
          isOT={isOT}
        />
      )}
    </>
  );
}

export default App;