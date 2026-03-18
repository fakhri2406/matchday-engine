"use client";

import { useRatingCalculator } from "@/hooks/useRatingCalculator";
import { PRESETS } from "@/data/presets";
import { Header } from "@/components/Header";
import { RatingDisplay } from "@/components/RatingDisplay";
import { PositionSelector } from "@/components/PositionSelector";
import { MinutesInput } from "@/components/MinutesInput";
import { AiPromptInput } from "@/components/AiPromptInput";
import { EventSection } from "@/components/EventSection";
import { RatingBreakdown } from "@/components/RatingBreakdown";
import { ColorLegend } from "@/components/ColorLegend";

export default function FootballRatingCalculator() {
  const {
    position, setPosition,
    minutes, setMinutes,
    values, setValue,
    showBreakdown, setShowBreakdown,
    tooltipId, setTooltipId,
    rating, breakdown,
    ratingColor, posData,
    positiveFiltered, negativeFiltered,
    loadPreset, resetAll,
  } = useRatingCalculator();

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(180deg, #0a0e1a 0%, #111827 40%, #0f172a 100%)",
      color: "#e2e8f0",
      fontFamily: "'DM Sans', 'Segoe UI', system-ui, sans-serif",
      padding: "0",
    }}>
      <Header onReset={resetAll} presets={PRESETS} onLoadPreset={loadPreset} />

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "20px 16px 60px" }}>
        <RatingDisplay
          rating={rating}
          ratingColor={ratingColor}
          posLabel={posData.label}
          minutes={minutes}
        />

        <div style={{
          display: "grid", gridTemplateColumns: "1fr auto", gap: 12, marginBottom: 20,
        }}>
          <PositionSelector position={position} onPositionChange={setPosition} />
          <MinutesInput minutes={minutes} onMinutesChange={setMinutes} />
        </div>

        <AiPromptInput onResult={loadPreset} />

        <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 16 }}>
          <EventSection
            title="Positive Events"
            titleColor="#22c55e"
            events={positiveFiltered}
            values={values}
            position={position}
            setValue={setValue}
            tooltipId={tooltipId}
            setTooltipId={setTooltipId}
          />
          <EventSection
            title="Negative Events"
            titleColor="#ef4444"
            events={negativeFiltered}
            values={values}
            position={position}
            setValue={setValue}
            tooltipId={tooltipId}
            setTooltipId={setTooltipId}
          />
        </div>

        <RatingBreakdown
          showBreakdown={showBreakdown}
          onToggle={() => setShowBreakdown(!showBreakdown)}
          breakdown={breakdown}
          ratingColor={ratingColor}
          rating={rating}
          minutes={minutes}
        />

        <ColorLegend />
      </div>
    </div>
  );
}
