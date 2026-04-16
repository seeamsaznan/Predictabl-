// components/predict/ScorePicker.tsx
// This is the score picker component used on the predict page.
// It displays two score inputs -- one for each team -- with
// plus and minus buttons to adjust the predicted score.
// It receives the current scores and callback functions as props
// so the parent page controls the actual score values.
// This pattern is called "controlled component" -- the component
// displays values it receives and reports changes upward rather
// than managing the values itself.

type ScorePickerProps = {
  // The name of the home team
  homeTeam: string;
  // The name of the away team
  awayTeam: string;
  // The current predicted score for each team
  homeScore: number;
  awayScore: number;
  // Callback functions called when the user clicks + or -
  // The parent page updates its state when these are called
  onHomeScoreChange: (score: number) => void;
  onAwayScoreChange: (score: number) => void;
};

// A single score row showing team name, minus button, score, plus button
function ScoreRow({
  teamName,
  score,
  color,
  onIncrement,
  onDecrement,
}: {
  teamName: string;
  score: number;
  color: string;
  onIncrement: () => void;
  onDecrement: () => void;
}) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "#1A1A1A",
        borderRadius: "8px",
        padding: "16px 20px",
        marginBottom: "12px",
      }}
    >
      {/* Team name with colored dot indicator */}
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <div
          style={{
            width: "8px",
            height: "8px",
            borderRadius: "50%",
            backgroundColor: color,
            flexShrink: 0,
          }}
        />
        <span
          style={{
            color: "#AAAAAA",
            fontSize: "13px",
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            fontWeight: "600",
          }}
        >
          {teamName}
        </span>
      </div>

      {/* Score controls -- minus, score value, plus */}
      <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
        {/* Minus button -- prevents score going below 0 */}
        <button
          onClick={onDecrement}
          disabled={score <= 0}
          style={{
            width: "32px",
            height: "32px",
            borderRadius: "50%",
            backgroundColor: "#222222",
            border: "1px solid #333333",
            color: score <= 0 ? "#444444" : "#AAAAAA",
            fontSize: "18px",
            cursor: score <= 0 ? "not-allowed" : "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: "300",
            lineHeight: 1,
          }}
        >
          −
        </button>

        {/* The actual score value */}
        <span
          style={{
            color: color,
            fontSize: "32px",
            fontWeight: "700",
            fontFamily: "Barlow Condensed, sans-serif",
            minWidth: "48px",
            textAlign: "center",
            lineHeight: 1,
          }}
        >
          {score}
        </span>

        {/* Plus button */}
        <button
          onClick={onIncrement}
          style={{
            width: "32px",
            height: "32px",
            borderRadius: "50%",
            backgroundColor: "#222222",
            border: "1px solid #333333",
            color: "#AAAAAA",
            fontSize: "18px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: "300",
            lineHeight: 1,
          }}
        >
          +
        </button>
      </div>
    </div>
  );
}

export default function ScorePicker({
  homeTeam,
  awayTeam,
  homeScore,
  awayScore,
  onHomeScoreChange,
  onAwayScoreChange,
}: ScorePickerProps) {
  return (
    <div>
      {/* Home team score row -- white dot */}
      <ScoreRow
        teamName={homeTeam}
        score={homeScore}
        color="#FFFFFF"
        onIncrement={() => onHomeScoreChange(homeScore + 1)}
        onDecrement={() => onHomeScoreChange(Math.max(0, homeScore - 1))}
      />

      {/* Away team score row -- green dot */}
      <ScoreRow
        teamName={awayTeam}
        score={awayScore}
        color="#00FF87"
        onIncrement={() => onAwayScoreChange(awayScore + 1)}
        onDecrement={() => onAwayScoreChange(Math.max(0, awayScore - 1))}
      />
    </div>
  );
}