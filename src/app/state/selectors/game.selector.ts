import { createSelector, createFeatureSelector } from '@ngrx/store';
import { IGameManager, WinDirection, WinPosition } from '../../models/GameManager';
import { selectAllPlayers } from './player.selector';
import { selectBoard } from './board.selector';
import { initialCellValue } from '../reducers/board.reducer';

export const selectGame = createFeatureSelector<IGameManager>('game');

export const nextPlayerSelector  = createSelector(
    selectGame,
    selectAllPlayers,
    (game, players) => {
        return players[game.movelist.length % players.length];
    }
);

export const currentPlayerSelector  = createSelector(
    selectGame,
    selectAllPlayers,
    (game, players) => {
        return players[(game.movelist.length-1) % players.length];
    }
);

export const winnerNotifier  = createSelector(
    selectGame,
    selectAllPlayers,
    selectBoard,
    currentPlayerSelector,
    (game, players, board, currentPlayer) => {
        return checkboard(game.movelist[game.movelist.length-1]?.row, 
            game.movelist[game.movelist.length-1]?.column, 
            game.movelist[game.movelist.length-1]?.symbol,
            board.board, game.adjacentElementsToWin).length > 0 ? currentPlayer : undefined;
    }
);

export const winningPositionsSelector  = createSelector(
    selectGame,
    selectAllPlayers,
    selectBoard,
    currentPlayerSelector,
    (game, players, board, currentPlayer) => {
        let winningPositions = checkboard(game.movelist[game.movelist.length-1]?.row, 
            game.movelist[game.movelist.length-1]?.column, 
            game.movelist[game.movelist.length-1]?.symbol,
            board.board, game.adjacentElementsToWin); 
            return winningPositions.length > 0 ? winningPositions : [];
    }
);


function checkboard(row: number, col: number, symbol: string, board: string[][], match: number) {

    console.log("checkboard invoked. should be called twice per move");
    let rowarr = checkRow(symbol, row, match, board);
    let colarr = checkCol(symbol, col, match, board);
    let majorDiagonal = checkMajorDiagonal(symbol, row, col, match, board);
    let minorDiagonal = checkMinorDiagonal(symbol, row, col, match, board);

    if(rowarr.length === match) {
        return rowarr;
    } else if(colarr.length === match) {
        return colarr;
    } else if(majorDiagonal.length === match) {
        return majorDiagonal;
    } else if(minorDiagonal.length === match) {
        return minorDiagonal;
    } else {
        return [];
    }
}

function checkRow(symbol: string, row: number, match: number, board: string[][]) {
    let cindex = [];
    let rindex = new Array<number>(board[row]?.length).fill(row);

    for(let i=1; i<=board[row]?.length; i++) {
        cindex.push(i-1);
    }
    let mindex = getMaxUptoKAdjacent(board[row], symbol, match);
    return createWinPositionsUtil(rindex, cindex, mindex, WinDirection.row);
}

function checkCol(symbol: string, col: number, match: number, board: string[][]) {
    let rindex = [];
    let cindex = new Array<number>(board.length).fill(col);

    for(let i=1; i<=board.length; i++) {
        rindex.push(i-1);
    }

    let b = board.map((val) => {
        return val[col]
    });//.filter((value) => { return value !== undefined});
    let mindex = getMaxUptoKAdjacent(b, symbol, match);
    return createWinPositionsUtil(rindex, cindex, mindex, WinDirection.col);
}

function checkMajorDiagonal(symbol: string, row: number, col: number, match: number, board: string[][]) {
    let res = [];
    let r=row, c=col;
    let rindex: number[] = [];
    let cindex: number[] = [];

    while(r>0 && c>0) {
        r--;
        c--;
    }

    while(r<board.length && c<board[0].length){
        rindex.push(r);
        cindex.push(c);
        res.push(board[r][c]);
        r++;
        c++;
    }

    let mindex = getMaxUptoKAdjacent(res, symbol, match);
    return createWinPositionsUtil(rindex, cindex, mindex, WinDirection.major);
}

function checkMinorDiagonal(symbol: string, row: number, col: number, match: number, board: string[][]) {
    let res = [];
    let rindex: number[] = [];
    let cindex: number[] = [];

    let r=row, c=col;

    while(r>0 && c<board[0].length) {
        r--;
        c++;
    }

    while(r<board.length && c>=0){
        rindex.push(r);
        cindex.push(c);
        res.push(board[r][c]);
        r++;
        c--;
    }

    let mindex = getMaxUptoKAdjacent(res, symbol, match);
    return createWinPositionsUtil(rindex, cindex, mindex, WinDirection.minor);
}

function createWinPositionsUtil(rindex: number[], cindex: number[], maxKadjArr: number[], windDirection: WinDirection): WinPosition[] {
    let winpositions: WinPosition[] = [];
    maxKadjArr.forEach((val) => {
        winpositions.push({
            row: rindex[val],
            col: cindex[val],
            windDirection: windDirection,
        });
    });
    return winpositions;
}

/**
 * 
 * @param arr Array to be checked for max K adjacent elements
 * @param symbol element whose adjacency is to be checked with
 * @param K Maximum limit of adjacency
 * @returns An array of length 0 - K containing the positions of the input array whose adjacent symbols match
 */
function getMaxUptoKAdjacent(arr: string[]=[], symbol: string, K: number): number[] {
    let res: number[]=[];
    let temp: number[]=[];

    for(let i=0; i<arr.length; i++) {
        if(temp.length === K) {
            res=temp;
            break;
        } else if(arr[i] === symbol) {
            temp.push(i);
        } else {
            res=temp;
            temp=[];
        }
    }

    return res;
}

// TODO - below function
function getMaxUptoKAdjacentFunctional(arr: string[]=[], symbol: string, K: number) {
    arr.join().split(initialCellValue)
}