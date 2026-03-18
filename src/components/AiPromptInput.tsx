"use client";

import React, {useCallback, useEffect, useState} from "react";
import {Preset} from "@/data/presets";

interface AiPromptInputProps {
  onResult: (preset: Preset) => void;
}

export function AiPromptInput({onResult}: AiPromptInputProps) {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [errorType, setErrorType] = useState<"warning" | "error">("error");

  useEffect(() => {
    if (!error) return;
    const timer = setTimeout(() => setError(null), 5000);
    return () => clearTimeout(timer);
  }, [error]);

  const handleSubmit = useCallback(async () => {
    if (!input.trim() || loading) return;
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({description: input.trim()}),
      });

      const data = await res.json();

      if (data.error === "not_football") {
        setErrorType("warning");
        setError("That doesn't look like a football match description. Try describing a player's performance.");
        return;
      }

      if (data.error) {
        setErrorType("error");
        setError(data.message || "Something went wrong");
        return;
      }

      onResult({
        name: "AI Analysis",
        icon: "🤖",
        position: data.position,
        minutes: data.minutesPlayed,
        desc: input.trim().slice(0, 60),
        values: data.events,
      });
      setInput("");
    } catch {
      setErrorType("error");
      setError("Failed to connect to the analysis service");
    } finally {
      setLoading(false);
    }
  }, [input, loading, onResult]);

  return (
    <div style={{
      background: "rgba(30,41,59,0.5)",
      border: "1px solid rgba(148,163,184,0.08)",
      borderRadius: 12,
      padding: 16,
      marginBottom: 24,
    }}>
      <div style={{fontSize: 13, fontWeight: 600, color: "#94a3b8", marginBottom: 8}}>
        AI Match Analyzer
      </div>
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        readOnly={loading}
        placeholder={"Describe a player's performance, e.g. \"A right winger that played 90 minutes, scored twice, assisted once, caught offside 3 times...\""}
        style={{
          width: "100%",
          minHeight: 80,
          background: "rgba(15,23,42,0.6)",
          border: "1px solid rgba(148,163,184,0.12)",
          borderRadius: 8,
          color: "#e2e8f0",
          padding: "10px 12px",
          fontSize: 13,
          fontFamily: "inherit",
          resize: "vertical",
          outline: "none",
          boxSizing: "border-box",
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) handleSubmit();
        }}
      />
      <div style={{display: "flex", alignItems: "center", gap: 12, marginTop: 10}}>
        <button
          onClick={handleSubmit}
          disabled={loading || !input.trim()}
          style={{
            background: loading || !input.trim()
              ? "rgba(99,102,241,0.2)"
              : "rgba(99,102,241,0.3)",
            border: "1px solid rgba(99,102,241,0.3)",
            color: loading || !input.trim() ? "#818cf8aa" : "#a5b4fc",
            padding: "8px 20px",
            borderRadius: 8,
            cursor: loading || !input.trim() ? "not-allowed" : "pointer",
            fontSize: 13,
            fontWeight: 600,
            fontFamily: "inherit",
            transition: "all 0.2s",
          }}
          onMouseEnter={(e: React.MouseEvent<HTMLButtonElement>) => {
            if (!loading && input.trim()) (e.target as HTMLButtonElement).style.background = "rgba(99,102,241,0.4)";
          }}
          onMouseLeave={(e: React.MouseEvent<HTMLButtonElement>) => {
            if (!loading && input.trim()) (e.target as HTMLButtonElement).style.background = "rgba(99,102,241,0.3)";
          }}
        >
          {loading ? "Analyzing..." : "Analyze"}
        </button>
        <span style={{fontSize: 11, color: "#64748b"}}>
          {loading ? "" : "Cmd+Enter to submit"}
        </span>
      </div>
      {error && (
        <div style={{
          marginTop: 10,
          padding: "8px 12px",
          borderRadius: 8,
          fontSize: 12,
          background: errorType === "warning" ? "rgba(245,158,11,0.1)" : "rgba(239,68,68,0.1)",
          border: `1px solid ${errorType === "warning" ? "rgba(245,158,11,0.25)" : "rgba(239,68,68,0.25)"}`,
          color: errorType === "warning" ? "#fbbf24" : "#f87171",
        }}>
          {error}
        </div>
      )}
    </div>
  );
}
