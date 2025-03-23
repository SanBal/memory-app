"use client";
import React, { Component, useRef, useState } from "react";
import { MemoryCard, MemoryCardImpl } from "./Card";
import Field from "./Field";
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

  const finish = () => {
    setTimeout(() => {
      window.alert("Congrats :) You solved it!");
      stopwatch.current?.reset()
    }, 100);
  }

  return (
    <div>
      <Stopwatch ref={stopwatch} onReset={(reset)}/>
      <Field field={field}
             onFirstCardClick={() => {stopwatch.current?.start()}}
             onFinish={finish}></Field>
    </div>
  )
};

export default Game;
