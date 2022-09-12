import { createSelector, createFeatureSelector, select } from '@ngrx/store';
import { IPlayer } from '../../models/Player';
import { IBoard } from '../../models/Board';
import { pipe, distinctUntilChanged } from 'rxjs';

export const selectBoard = createFeatureSelector<IBoard>('board');

export const boardDataSelector  = createSelector(
    selectBoard,
    (board) => {
        return board.board;
    }
);


export const legalMoveNotifier = pipe(
    select(selectBoard),
    distinctUntilChanged((prev, curr) => {
        console.log(prev);
        return true;
    })
);