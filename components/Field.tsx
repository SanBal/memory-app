"use client";
import React, { useEffect, useImperativeHandle } from "react";
import Card, { MemoryCard } from "./Card";
import styles from "./Field.module.css";
import { useState } from "react";

export interface FieldProps {
  field: MemoryCard[][];
  onFirstCardClick: () => void
}

const Field: React.FC<FieldProps> = ({field, onFirstCardClick}) => {
  const [fieldState, setField] = useState(field);
  const [firstCardClicked, setFirstCardClicked] = useState(false)
  const [prevCard, setPrevCard] = useState<MemoryCard | null>(null);
  const [isValidationInProgress, setValidationInProgress] = useState(false);

  const reset = () => window.location.reload()

  const onCardClick = (row: number, col: number) => {
    if (!firstCardClicked) {
      onFirstCardClick()
      setFirstCardClicked(true)
    }

    if (isValidationInProgress) {
      return;
    }

    const currCard = fieldState[row][col];
    currCard.show();

    if (prevCard) {
      if (prevCard.icon === currCard.icon) {
        prevCard.setMatched(true);
        currCard.setMatched(true);
        setPrevCard(null);
        if (fieldState.flat().every((card) => card.isMatched())) {
          setTimeout(() => {
            window.alert("Congrats :) You solved it!");
            reset()
          }, 100);
        }
      } else {
        setValidationInProgress(true);
        setTimeout(() => {
          prevCard.hide();
          currCard.hide();
          setPrevCard(null);
          setValidationInProgress(false);
        }, 750);
      }
    } else {
      setPrevCard(currCard);
    }
  };

  useEffect(() => {
    setField(field)
    setFirstCardClicked(false)
    setPrevCard(null)
    setValidationInProgress(false)
  }, [field])

  return (
    <div className={styles.field}>
      {fieldState.map((row, i) => (
        <div key={i.toString()} className="inline-flex flex-row justify-space-between gap-4">
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

Field.displayName = 'Field';

export default Field;
