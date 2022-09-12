import {createReducer, on} from '@ngrx/store';
import { IGameManager } from 'src/app/models/GameManager';
import { startGameActionCreator } from '../actions/game.actions';

export const initialState:Readonly<IGameManager> = {
    gameid: '',
    movelist: [],
    colSize: 0,
    rowSize: 0,
    winner: undefined as any,
};

export const gameReducer = createReducer(
    initialState,
    on(startGameActionCreator, (state, { gameid, colSize, rowSize, movelist, winner }) => {
        return { 
            ...state,
            gameid: gameid,
            colSize:  colSize ? colSize : state.colSize,
            rowSize:  rowSize ? rowSize : state.rowSize,
            movelist: movelist ? movelist : state.movelist,
            winner: winner ? winner : state.winner,
         }
    }),

);

