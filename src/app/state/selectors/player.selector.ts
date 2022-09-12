import { createSelector, createFeatureSelector } from '@ngrx/store';
import { IPlayer } from '../../models/Player';

export const selectPlayers = createFeatureSelector<ReadonlyArray<IPlayer>>('players');

export const selectAllPlayers  = createSelector(
    selectPlayers,
    (players) => {
        return players;
    }
);
