import {createReducer, on} from '@ngrx/store';


// export const initialState: ReadonlyArray<IPlayer> = [
//     {
//         name: 'arunava',
//         symbol: 'O',
//     },
//     {
//         name: 'chakraborty',
//         symbol: '$',
//     },
// ];

// export const playerReducer = createReducer(
//     initialState,
//     on(getAllPlayersActionCreator, (state) => state),
//     on(addPlayerActionCreator, (state, {player}) => { return [...state, player] }),
// );