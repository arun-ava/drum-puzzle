export interface IMove {
    moveType: MoveType;
    row: number;
    col: number;
}

export enum MoveType {
    turnHorizontalLeft,
    turnHorizontalRight,
    slideVerticalUp,
    slideVerticalDown,
}

