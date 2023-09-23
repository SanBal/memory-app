"use client";
import React, { Component } from "react";
import { MemoryCard, MemoryCardImpl } from "./Card";
import Field from "./Field";

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
  return <Field field={createField()}></Field>;
};

export default Game;
