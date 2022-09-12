import {createReducer, on} from '@ngrx/store';
import { IBoard } from 'src/app/models/board';
import { colorSchemes } from 'src/app/models/colors';
import { Tile } from 'src/app/models/tiles';
import { startGameActionCreator } from '../actions/game.actions';

export const initialState:Readonly<IBoard> = {
    board: [],
};

export const boardReducer = createReducer(
    initialState,
    on(startGameActionCreator, (state, gamestate) => {
        return {
            ...state,
            board: createBoard(gamestate.rowSize, gamestate.colSize),
        }
    }),
);



function createBoard(row: number, col: number) {
    let t = [];
    for(let i=0; i<row; i++) {
        t.push(new Array<Tile>(col).fill({
            color: Object.values(colorSchemes)[col],
            uuid: '',
        }));
    }
    return t;
}