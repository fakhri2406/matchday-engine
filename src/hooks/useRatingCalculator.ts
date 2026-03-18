"use client";

import {useCallback, useMemo, useState} from "react";
import {PositionKey, POSITIONS} from "@/data/positions";
import {ALL_EVENTS, NEGATIVE_EVENTS, POSITIVE_EVENTS} from "@/data/events";
import {Preset} from "@/data/presets";
import {BASE_RATING, MAX_RATING, MIN_RATING} from "@/data/constants";
import {clamp, getRatingColor} from "@/utils/rating";

export interface BreakdownItem {
  id: string;
  label: string;
  count: number;
  contribution: number;
  isPositive: boolean;
}

export function useRatingCalculator() {
  const [position, setPosition] = useState<PositionKey>("ST");
  const [minutes, setMinutes] = useState<number>(90);
  const [values, setValues] = useState<Record<string, number>>(() => {
    const init: Record<string, number> = {};
    ALL_EVENTS.forEach(e => init[e.id] = 0);
    return init;
  });
  const [showBreakdown, setShowBreakdown] = useState<boolean>(true);
  const [tooltipId, setTooltipId] = useState<string | null>(null);

  const setValue = useCallback((id: string, v: string) => {
    setValues(prev => ({...prev, [id]: Math.max(0, parseInt(v) || 0)}));
  }, []);

  const loadPreset = useCallback((preset: Preset) => {
    setPosition(preset.position);
    setMinutes(preset.minutes);
    const init: Record<string, number> = {};
    ALL_EVENTS.forEach(e => init[e.id] = 0);
    setValues({...init, ...preset.values});
  }, []);

  const resetAll = useCallback(() => {
    const init: Record<string, number> = {};
    ALL_EVENTS.forEach(e => init[e.id] = 0);
    setValues(init);
    setMinutes(90);
  }, []);

  const {rating, breakdown} = useMemo<{ rating: number; breakdown: BreakdownItem[] }>(() => {
    const minuteScale = clamp((minutes / 90) * 1.8, 0, 1);
    const total = BASE_RATING * minuteScale;
    const bd: BreakdownItem[] = [];

    ALL_EVENTS.forEach(event => {
      const count = values[event.id] || 0;
      if (count === 0) return;
      const w = event.weights[position] || 0;
      const contribution = count * event.base * w;
      if (Math.abs(contribution) > 0.001) {
        bd.push({
          id: event.id,
          label: event.label,
          count,
          contribution: Math.round(contribution * 100) / 100,
          isPositive: event.base > 0,
        });
      }
    });

    bd.sort((a, b) => Math.abs(b.contribution) - Math.abs(a.contribution));
    const eventSum = bd.reduce((s, b) => s + b.contribution, 0);
    const raw = total + eventSum;
    const clamped = Math.round(clamp(raw, MIN_RATING, MAX_RATING) * 10) / 10;
    return {rating: clamped, breakdown: bd};
  }, [position, minutes, values]);

  const ratingColor = getRatingColor(rating);
  const posData = POSITIONS[position];

  return {
    position,
    setPosition,
    minutes,
    setMinutes,
    values,
    setValue,
    showBreakdown,
    setShowBreakdown,
    tooltipId,
    setTooltipId,
    rating,
    breakdown,
    ratingColor,
    posData,
    positiveFiltered: POSITIVE_EVENTS,
    negativeFiltered: NEGATIVE_EVENTS,
    loadPreset,
    resetAll,
  };
}
