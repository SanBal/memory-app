"use client";
import React, { Component, useRef, useState } from "react";
import { MemoryCard, MemoryCardImpl } from "./Card";
import Field, { FieldRef } from "./Field";
import Stopwatch, { StopwatchRef } from "./Stopwatch";

const icons = [
  "bicycle",
  "clock",
  "house",
  "phone",
  "star",
  "bell",
  "paperclip",
  "camera",
];

const [rows, cols] = [4, 4];
const createField = (): MemoryCard[][] => {
  const cards = [...icons, ...icons]
    .sort(() => Math.random() - 0.5)
    .map((icon) => new MemoryCardImpl(icon));

  return Array.from({ length: rows }, (_, i) =>
    cards.slice(i * cols, (i + 1) * cols)
  );
};

const Game = () => {
  const stopwatch = useRef<StopwatchRef|null>(null);
  const [field, setField] = useState(createField());

  const reset = () => {
    setField(createField())
  }

  return (
    <div>
      <Stopwatch ref={stopwatch} onReset={(reset)}/>
      <Field field={field}
             onFirstCardClick={() => {stopwatch.current?.start()}}></Field>
    </div>
  )
};

export default Game;
