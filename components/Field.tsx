"use client";
import React, { useImperativeHandle } from "react";
import Card, { MemoryCard } from "./Card";
import styles from "./Field.module.css";
import { useState } from "react";

export interface FieldRef {
  reset: () => void;
}

export interface FieldProps {
  field: MemoryCard[][];
  onFirstCardClick: () => void
}

const Field = React.forwardRef<FieldRef, FieldProps>((props, ref) => {
  const [fieldState, setField] = useState(props.field);
  const [firstCardClicked, setFirstCardClicked] = useState(false)
  const [prevCard, setPrevCard] = useState<MemoryCard | null>(null);
  const [isValidationInProgress, setValidationInProgress] = useState(false);

  const repaintField = () => setField([...props.field]);
  const reset = () => window.location.reload()

  const onCardClick = (row: number, col: number) => {
    if (!firstCardClicked) {
      props.onFirstCardClick()
      setFirstCardClicked(true)
    }

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
            reset()
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

  useImperativeHandle(ref, () => ({ reset }));

  return (
    <div className={styles.field}>
      {props.field.map((row, i) => (
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
});

Field.displayName = 'Field';

export default Field;
