/**
 * MOTOR DE AJEDREZ PROFESIONAL - VERSIÓN CORREGIDA (SIN BUCLES)
 */

const boardEl = document.getElementById('chess-board');
const statusEl = document.getElementById('status-box');
const historyEl = document.getElementById('move-history');

const PIECES_CHAR = {
    'r': '♜', 'n': '♞', 'b': '♝', 'q': '♛', 'k': '♚', 'p': '♟',
    'R': '♖', 'N': '♘', 'B': '♗', 'Q': '♕', 'K': '♔', 'P': '♙'
};

const VALUES = { p: 10, n: 30, b: 35, r: 50, q: 90, k: 9000 };

const POS_WEIGHTS = [
    [0, 0, 0, 0, 0, 0, 0, 0],
    [1, 1, 1, 1, 1, 1, 1, 1],
    [1, 2, 2, 2, 2, 2, 2, 1],
    [1, 2, 5, 5, 5, 5, 2, 1],
    [1, 2, 5, 5, 5, 5, 2, 1],
    [1, 2, 2, 2, 2, 2, 2, 1],
    [1, 1, 1, 1, 1, 1, 1, 1],
    [0, 0, 0, 0, 0, 0, 0, 0]
];

let board = [
    ['r','n','b','q','k','b','n','r'],
    ['p','p','p','p','p','p','p','p'],
    ['','','','','','','',''],
    ['','','','','','','',''],
    ['','','','','','','',''],
    ['','','','','','','',''],
    ['P','P','P','P','P','P','P','P'],
    ['R','N','B','Q','K','B','N','R']
];

let turn = 'W'; 
let gameActive = true;
let selected = null;
let enPassantTarget = null; 
let movedState = { W_K: false, W_R1: false, W_R8: false, B_K: false, B_R1: false, B_R8: false };

// --- LÓGICA DE MOVIMIENTOS ---

function getPseudoLegalMoves(r, c, b, ignoreCastling = false) {
    const moves = [];
    const piece = b[r][c];
    if (!piece) return moves;
    const isW = piece === piece.toUpperCase();
    const type = piece.toLowerCase();

    const addMove = (tr, tc) => {
        if (tr < 0 || tr > 7 || tc < 0 || tc > 7) return false;
        const target = b[tr][tc];
        if (!target) { moves.push({r: tr, c: tc}); return true; }
        if ((target === target.toUpperCase()) !== isW) { moves.push({r: tr, c: tc}); return false; }
        return false;
    };

    switch(type) {
        case 'p':
            const dir = isW ? -1 : 1;
            if (r + dir >= 0 && r + dir <= 7 && !b[r+dir][c]) {
                moves.push({r: r+dir, c: c});
                if ((isW ? r===6 : r===1) && !b[r+2*dir][c]) moves.push({r: r+2*dir, c: c});
            }
            [-1, 1].forEach(dc => {
                let tc = c + dc;
                if (tc >= 0 && tc <= 7 && r+dir >= 0 && r+dir <= 7) {
                    let target = b[r+dir][tc];
                    if (target && (target === target.toUpperCase()) !== isW) moves.push({r: r+dir, c: tc});
                    if (!target && enPassantTarget && enPassantTarget.r === r+dir && enPassantTarget.c === tc) {
                        moves.push({r: r+dir, c: tc, isEnPassant: true});
                    }
                }
            });
            break;
        case 'n':
            [[-2,-1],[-2,1],[-1,-2],[-1,2],[1,-2],[1,2],[2,-1],[2,1]].forEach(m => addMove(r+m[0], c+m[1]));
            break;
        case 'b':
            [[1,1],[1,-1],[-1,1],[-1,-1]].forEach(d => { for(let i=1; i<8; i++) if(!addMove(r+d[0]*i, c+d[1]*i)) break; });
            break;
        case 'r':
            [[1,0],[-1,0],[0,1],[0,-1]].forEach(d => { for(let i=1; i<8; i++) if(!addMove(r+d[0]*i, c+d[1]*i)) break; });
            break;
        case 'q':
            [[1,1],[1,-1],[-1,1],[-1,-1],[1,0],[-1,0],[0,1],[0,-1]].forEach(d => { for(let i=1; i<8; i++) if(!addMove(r+d[0]*i, c+d[1]*i)) break; });
            break;
        case 'k':
            [[1,1],[1,-1],[-1,1],[-1,-1],[1,0],[-1,0],[0,1],[0,-1]].forEach(m => addMove(r+m[0], c+m[1]));
            
            // EL CAMBIO: No llamamos a isKingInCheck aquí si ignoreCastling es true
            if (!ignoreCastling && !movedState[isW ? 'W_K':'B_K'] && !isKingInCheck(isW?'W':'B', b)) {
                if (!movedState[isW?'W_R8':'B_R8'] && !b[r][5] && !b[r][6]) moves.push({r: r, c: 6, isCastle: 'short'});
                if (!movedState[isW?'W_R1':'B_R1'] && !b[r][1] && !b[r][2] && !b[r][3]) moves.push({r: r, c: 2, isCastle: 'long'});
            }
            break;
    }
    return moves;
}

function getLegalMoves(color, b) {
    const legal = [];
    for(let r=0; r<8; r++) {
        for(let c=0; c<8; c++) {
            const p = b[r][c];
            if (p && (color === 'W' ? p === p.toUpperCase() : p === p.toLowerCase())) {
                getPseudoLegalMoves(r, c, b).forEach(m => {
                    if (isMoveSafe(r, c, m.r, m.c, color, b)) legal.push({fR: r, fC: c, tR: m.r, tC: m.c, special: m});
                });
            }
        }
    }
    return legal;
}

function isMoveSafe(fR, fC, tR, tC, color, b) {
    const temp = b.map(row => [...row]);
    temp[tR][tC] = temp[fR][fC];
    temp[fR][fC] = '';
    return !isKingInCheck(color, temp);
}

function isKingInCheck(color, b) {
    let kr, kc;
    const targetKing = color === 'W' ? 'K' : 'k';
    for(let r=0; r<8; r++) for(let c=0; c<8; c++) if(b[r][c] === targetKing) { kr=r; kc=c; }
    if (kr === undefined) return false;

    for(let r=0; r<8; r++) {
        for(let c=0; c<8; c++) {
            const p = b[r][c];
            if (p && (color === 'W' ? p === p.toLowerCase() : p === p.toUpperCase())) {
                // Pasamos "true" para ignorar el enroque y romper el bucle infinito
                const moves = getPseudoLegalMoves(r, c, b, true);
                if (moves.some(m => m.r === kr && m.c === kc)) return true;
            }
        }
    }
    return false;
}

// --- IA ---

function evaluateBoard(b) {
    let score = 0;
    for(let r=0; r<8; r++) {
        for(let c=0; c<8; c++) {
            const p = b[r][c];
            if (p) {
                const isIA = p === p.toLowerCase();
                const val = VALUES[p.toLowerCase()] + POS_WEIGHTS[r][c];
                score += isIA ? val : -val;
            }
        }
    }
    return score;
}

function minimax(b, depth, alpha, beta, isMaximizing) {
    if (depth === 0) return evaluateBoard(b);
    const moves = getLegalMoves(isMaximizing ? 'B' : 'W', b);
    if (moves.length === 0) return isKingInCheck(isMaximizing?'B':'W', b) ? (isMaximizing ? -10000 : 10000) : 0;

    if (isMaximizing) {
        let best = -Infinity;
        for (let m of moves) {
            best = Math.max(best, minimax(simulateMove(b, m), depth - 1, alpha, beta, false));
            alpha = Math.max(alpha, best);
            if (beta <= alpha) break;
        }
        return best;
    } else {
        let best = Infinity;
        for (let m of moves) {
            best = Math.min(best, minimax(simulateMove(b, m), depth - 1, alpha, beta, true));
            beta = Math.min(beta, best);
            if (beta <= alpha) break;
        }
        return best;
    }
}

function simulateMove(b, m) {
    const next = b.map(row => [...row]);
    next[m.tR][m.tC] = next[m.fR][m.fC];
    next[m.fR][m.fC] = '';
    return next;
}

function aiBrain() {
    if (!gameActive) return;
    const moves = getLegalMoves('B', board);
    if (moves.length === 0) return;

    let bestMove = moves[0];
    let bestScore = -Infinity;

    moves.forEach(m => {
        const score = minimax(simulateMove(board, m), 2, -Infinity, Infinity, false);
        if (score > bestScore) { bestScore = score; bestMove = m; }
    });

    executeMove(bestMove.fR, bestMove.fC, bestMove.tR, bestMove.tC, bestMove.special);
    updateUI();
}

// --- RENDERIZADO ---

function executeMove(fR, fC, tR, tC, special = {}) {
    const piece = board[fR][fC];
    
    const log = document.createElement('div');
    log.className = 'move-entry';
    log.textContent = `${turn}: ${piece} ${String.fromCharCode(97+fC)}${8-fR} → ${String.fromCharCode(97+tC)}${8-tR}`;
    historyEl.prepend(log);

    if (special.isEnPassant) board[fR][tC] = '';
    if (special.isCastle === 'short') { board[fR][5] = board[fR][7]; board[fR][7] = ''; }
    if (special.isCastle === 'long') { board[fR][3] = board[fR][0]; board[fR][0] = ''; }

    if (piece === 'K') movedState.W_K = true;
    if (piece === 'k') movedState.B_K = true;
    if (fR === 7 && fC === 0) movedState.W_R1 = true;
    if (fR === 7 && fC === 7) movedState.W_R8 = true;

    board[tR][tC] = piece;
    board[fR][fC] = '';

    if (piece === 'P' && tR === 0) board[tR][tC] = 'Q';
    if (piece === 'p' && tR === 7) board[tR][tC] = 'q';

    enPassantTarget = (piece.toLowerCase() === 'p' && Math.abs(tR - fR) === 2) ? {r: (fR + tR) / 2, c: fC} : null;
    turn = turn === 'W' ? 'B' : 'W';
    
    if (getLegalMoves(turn, board).length === 0) {
        gameActive = false;
        alert(isKingInCheck(turn, board) ? "¡JAQUE MATE!" : "TABLAS");
    }
}

function updateUI() {
    boardEl.innerHTML = '';
    const isCheck = isKingInCheck(turn, board);
    const checkPos = isCheck ? findKing(turn, board) : null;

    for (let r = 0; r < 8; r++) {
        for (let c = 0; c < 8; c++) {
            const sq = document.createElement('div');
            sq.className = `square ${(r+c)%2===0 ? 'white-sq' : 'black-sq'}`;
            const piece = board[r][c];
            
            if (selected && selected.r === r && selected.c === c) sq.classList.add('selected');
            if (checkPos && checkPos.r === r && checkPos.c === c) sq.classList.add('check-warning');

            if (piece) {
                sq.textContent = PIECES_CHAR[piece];
                sq.classList.add(piece === piece.toUpperCase() ? 'p-white' : 'p-black');
            }

            sq.onclick = () => {
                if (!gameActive || turn !== 'W') return;
                if (selected) {
                    const move = getLegalMoves('W', board).find(m => m.fR === selected.r && m.fC === selected.c && m.tR === r && m.tC === c);
                    if (move) {
                        executeMove(move.fR, move.fC, move.tR, move.tC, move.special);
                        updateUI();
                        setTimeout(aiBrain, 500);
                    }
                    selected = null;
                } else if (piece && piece === piece.toUpperCase()) {
                    selected = {r, c};
                }
                updateUI();
            };
            boardEl.appendChild(sq);
        }
    }
    statusEl.textContent = turn === 'W' ? "TU TURNO" : "IA PENSANDO...";
}

function findKing(color, b) {
    const k = color === 'W' ? 'K' : 'k';
    for(let r=0; r<8; r++) for(let c=0; c<8; c++) if(b[r][c] === k) return {r, c};
    return null;
}

updateUI();