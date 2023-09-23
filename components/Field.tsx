"use client";
import React from "react";
import Card, { MemoryCard } from "./Card";
import styles from "./Field.module.css";
import { useState } from "react";

interface FieldProps {
  field: MemoryCard[][];
}

const Field: React.FC<FieldProps> = ({ field }) => {
  const [fieldState, setField] = useState(field);
  const [prevCard, setPrevCard] = useState<MemoryCard | null>(null);
  const [isValidationInProgress, setValidationInProgress] = useState(false);

  const repaintField = () => setField([...field]);

  const onCardClick = (row: number, col: number) => {
    if (isValidationInProgress) {
      return;
    }

    const currCard = fieldState[row][col];
    currCard.show();
    repaintField();

    if (prevCard) {
      if (prevCard.icon === currCard.icon) {
        prevCard.setMatched(true);
        currCard.setMatched(true);
        setPrevCard(null);
        repaintField();
        if (fieldState.flat().every((card) => card.isMatched())) {
          setTimeout(() => {
            window.alert("Congrats :) You solved it!");
            window.location.reload();
          }, 100);
        }
      } else {
        setValidationInProgress(true);
        setTimeout(() => {
          prevCard.hide();
          currCard.hide();
          setPrevCard(null);
          repaintField();
          setValidationInProgress(false);
        }, 750);
      }
    } else {
      setPrevCard(currCard);
    }
  };

  return (
    <div className={styles.field}>
      {field.map((row, i) => (
        <div key={i.toString()} className={styles.row}>
          {row.map((card, j) => (
            <Card
              key={`${i},${j}`}
              icon={card.icon}
              onClick={() => !card.isMatched() && onCardClick(i, j)}
              showIcon={card.canShow()}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default Field;
