import {createAction, props} from '@ngrx/store';
import { IGameManager } from '../../models/GameManager';
// import {  IBoard, IMove } from '../../models/Board';
// import { IPlayer } from '../../models/Player';

export const startGameActionCreator = createAction(
    '[Game] Start Game',
    props<IGameManager>(),
);

// export const checkBoardActionCreator = createAction(
//     '[Game] Check board',
// );

// export const setWinnerActionCreator = createAction(
//     '[Game] Set winner',
//     props<IPlayer>(),
// )

