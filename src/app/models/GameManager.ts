import { IMove } from "./moves";
import { IPlayer } from "./Player";

export interface IGameManager {
    gameid: string;
    movelist: IMove[];
    rowSize: number;
    colSize: number;
    winner: IPlayer | undefined;
}

export interface WinPosition {
    row: number;
    col: number;
    windDirection: WinDirection;
}

export enum WinDirection {
    'major', 'minor', 'row', 'col'
}