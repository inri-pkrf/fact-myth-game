import React, { useState } from "react";
import { NatureBackground, WelcomeScreen, InstructionsScreen, GameplayScreen, LeaderboardScreen, addToLeaderboard } from "@/components/game";
import FullscreenToggle from "@/components/game/FullscreenToggle";

const STAGES = { welcome: "welcome", instructions: "instructions", play: "play", results: "results" };

export default function Game() {
  const [stage, setStage] = useState(STAGES.welcome);
  const [playerName, setPlayerName] = useState("");
  const [score, setScore] = useState(0);

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      <NatureBackground />
      <FullscreenToggle />

      {stage === STAGES.welcome && (
        <WelcomeScreen
          onStart={(name) => {
            setPlayerName(name);
            setStage(STAGES.instructions);
          }}
        />
      )}

      {stage === STAGES.instructions && (
        <InstructionsScreen onStart={() => setStage(STAGES.play)} />
      )}

      {stage === STAGES.play && (
        <GameplayScreen
          onFinish={({ score: s }) => {
            setScore(s);
            addToLeaderboard(playerName, s);
            setStage(STAGES.results);
          }}
        />
      )}

      {stage === STAGES.results && (
        <LeaderboardScreen
          playerName={playerName}
          score={score}
          onPlayAgain={() => {
            setScore(0);
            setStage(STAGES.welcome);
          }}
        />
      )}
    </div>
  );
}