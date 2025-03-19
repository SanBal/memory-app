import React from "react";
import styles from "./Card.module.css";
import "../styles/fontawesome.css";

export interface MemoryCard {
  icon: string;
  isMatched(): boolean;
  setMatched(matched: boolean): void;
  show(): void;
  hide(): void;
  canShow(): boolean;
}

export class MemoryCardImpl implements MemoryCard {
  private _show = false;
  private matched = false;
  public constructor(public readonly icon: string) {}

  public show(): void {
    this._show = true;
  }

  public hide(): void {
    this._show = false;
  }

  public canShow(): boolean {
    return this.isMatched() || this._show;
  }

  public isMatched(): boolean {
    return this.matched;
  }

  public setMatched(matched: boolean): void {
    this.matched = matched;
  }
}

interface CardProps {
  icon: string;
  onClick: () => void;
  showIcon: boolean;
}

const Card: React.FC<CardProps> = ({ icon, onClick, showIcon }) => {
  let iconElement: JSX.Element | null = null

  if (showIcon) {
    iconElement = <i className={`fa-solid fa-${icon} fa-2xl`}></i>
  }

  return (
    <div
      className={`${styles.card} ${showIcon ? styles.show : ""}`}
      onClick={onClick}>
      {iconElement}
    </div>
  );
};

export default Card;
