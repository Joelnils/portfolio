const { useState, useEffect, useCallback } = React;

// Game symbols with their values and properties - Updated for better balance
const SYMBOLS = {
    '🍒': { value: 5, name: 'Cherry', weight: 25 },
    '🍋': { value: 8, name: 'Lemon', weight: 20 },
    '🍊': { value: 12, name: 'Orange', weight: 18 },
    '🍇': { value: 15, name: 'Grapes', weight: 15 },
    '🔔': { value: 25, name: 'Bell', weight: 12 },
    '🍀': { value: 35, name: 'Clover', weight: 8 },
    '👑': { value: 50, name: 'Crown', weight: 5 },
    '💎': { value: 100, name: 'Diamond', weight: 3 },
    '💰': { value: 0, name: 'Scatter', isScatter: true, weight: 2 },
    '⭐': { value: 0, name: 'Wild', isWild: true, weight: 4 }
};

// Create weighted symbol pool for more realistic casino odds
const createWeightedSymbolPool = () => {
    const pool = [];
    Object.entries(SYMBOLS).forEach(([symbol, data]) => {
        for (let i = 0; i < data.weight; i++) {
            pool.push(symbol);
        }
    });
    return pool;
};

const WEIGHTED_SYMBOL_POOL = createWeightedSymbolPool();
const BET_AMOUNTS = [5, 10, 25, 50, 100];
const INITIAL_BALANCE = 1000;

function SlotMachine() {
    // Core game state
    const [balance, setBalance] = useState(() => {
        const saved = localStorage.getItem('slotMachineBalance');
        return saved ? parseInt(saved) : INITIAL_BALANCE;
    });
    const [reels, setReels] = useState(Array(5).fill().map(() => Array(3).fill('🍒')));
    const [spinning, setSpinning] = useState(false);
    const [winnings, setWinnings] = useState(0);
    const [winningLines, setWinningLines] = useState([]);
    const [message, setMessage] = useState('');
    const [showPaytable, setShowPaytable] = useState(false);
    const [betAmount, setBetAmount] = useState(BET_AMOUNTS[1]); // Default to $10
    const [highlightedPayline, setHighlightedPayline] = useState(null);
    
    // Track spinning state per reel
    const [reelSpinning, setReelSpinning] = useState([false, false, false, false, false]);
    const [finalResults, setFinalResults] = useState(null);
    
    // Bonus game state
    const [bonusActive, setBonusActive] = useState(false);
    const [freeSpinsLeft, setFreeSpinsLeft] = useState(0);
    const [stickyWilds, setStickyWilds] = useState([]);
    const [bonusWinnings, setBonusWinnings] = useState(0);
    
    // Save balance to localStorage
    useEffect(() => {
        localStorage.setItem('slotMachineBalance', balance.toString());
    }, [balance]);
    
    // Generate random symbol using weighted probabilities
    const getRandomSymbol = useCallback(() => {
        return WEIGHTED_SYMBOL_POOL[Math.floor(Math.random() * WEIGHTED_SYMBOL_POOL.length)];
    }, []);
    
    // Generate initial reels
    const generateReels = useCallback(() => {
        const newReels = Array(5).fill().map(() => 
            Array(3).fill().map(() => getRandomSymbol())
        );
        
        // Apply sticky wilds during bonus
        if (bonusActive && stickyWilds.length > 0) {
            stickyWilds.forEach(({ reel, row }) => {
                if (newReels[reel] && newReels[reel][row] !== undefined) {
                    newReels[reel][row] = '⭐';
                }
            });
        }
        
        return newReels;
    }, [getRandomSymbol, bonusActive, stickyWilds]);
    
    // Check for scatter bonus
    const checkScatterBonus = useCallback((reels) => {
        let scatterCount = 0;
        reels.forEach(reel => {
            reel.forEach(symbol => {
                if (SYMBOLS[symbol]?.isScatter) {
                    scatterCount++;
                }
            });
        });
        return scatterCount >= 3;
    }, []);
    
    // Detect winning paylines - Enhanced with more lines (FIXED)
    const detectWins = useCallback((reels) => {
        const wins = [];
        
        // Horizontal paylines (rows)
        for (let row = 0; row < 3; row++) {
            const line = reels.map(reel => reel[row]);
            const result = checkPayline(line, `horizontal-${row}`, `Row ${row + 1}`);
            if (result.isWin) {
                wins.push(result);
            }
        }
        
        // Diagonal paylines
        // Top-left to bottom-right
        const diagonal1 = [reels[0][0], reels[1][1], reels[2][2], reels[3][1], reels[4][0]];
        const diag1Result = checkPayline(diagonal1, 'diagonal-1', 'Diagonal ↘');
        if (diag1Result.isWin) {
            wins.push(diag1Result);
        }
        
        // Bottom-left to top-right
        const diagonal2 = [reels[0][2], reels[1][1], reels[2][0], reels[3][1], reels[4][2]];
        const diag2Result = checkPayline(diagonal2, 'diagonal-2', 'Diagonal ↗');
        if (diag2Result.isWin) {
            wins.push(diag2Result);
        }
        
        // V-shaped paylines (using same patterns as diagonals but different names)
        const vTop = [reels[0][0], reels[1][1], reels[2][2], reels[3][1], reels[4][0]];
        const vTopResult = checkPayline(vTop, 'v-top', 'V-Top ∨');
        if (vTopResult.isWin && !wins.some(w => w.lineId === 'diagonal-1')) {
            wins.push(vTopResult);
        }
        
        const vBottom = [reels[0][2], reels[1][1], reels[2][0], reels[3][1], reels[4][2]];
        const vBottomResult = checkPayline(vBottom, 'v-bottom', 'V-Bottom ∧');
        if (vBottomResult.isWin && !wins.some(w => w.lineId === 'diagonal-2')) {
            wins.push(vBottomResult);
        }
        
        return wins;
    }, []);
    
    // Check individual payline for wins
    const checkPayline = (line, lineId, lineName) => {
        let consecutiveCount = 1;
        let currentSymbol = line[0];
        let winPositions = [0];
        
        // Handle wild substitution for first symbol
        if (SYMBOLS[currentSymbol]?.isWild) {
            // Find first non-wild symbol to use as base
            for (let i = 1; i < line.length; i++) {
                if (!SYMBOLS[line[i]]?.isWild && !SYMBOLS[line[i]]?.isScatter) {
                    currentSymbol = line[i];
                    break;
                }
            }
        }
        
        // Skip if first symbol is scatter
        if (SYMBOLS[currentSymbol]?.isScatter) {
            return { isWin: false };
        }
        
        // Check consecutive matching symbols
        for (let i = 1; i < line.length; i++) {
            const symbol = line[i];
            const isWild = SYMBOLS[symbol]?.isWild;
            const isScatter = SYMBOLS[symbol]?.isScatter;
            
            if (symbol === currentSymbol || isWild) {
                if (!isScatter) {
                    consecutiveCount++;
                    winPositions.push(i);
                }
            } else {
                break;
            }
        }
        
        if (consecutiveCount >= 3) {
            const baseValue = SYMBOLS[currentSymbol]?.value || 0;
            const multiplier = consecutiveCount === 3 ? 1 : consecutiveCount === 4 ? 2.5 : 5;
            const payout = Math.round(baseValue * multiplier);
            return {
                isWin: true,
                symbol: currentSymbol,
                count: consecutiveCount,
                payout: payout,
                lineId: lineId,
                lineName: lineName,
                positions: winPositions
            };
        }
        
        return { isWin: false };
    };
    
    // Handle new sticky wilds during bonus
    const handleStickyWilds = useCallback((newReels) => {
        if (!bonusActive) return;
        
        const newStickyWilds = [];
        newReels.forEach((reel, reelIndex) => {
            reel.forEach((symbol, rowIndex) => {
                if (SYMBOLS[symbol]?.isWild) {
                    // Check if this position is already sticky
                    const alreadySticky = stickyWilds.some(
                        wild => wild.reel === reelIndex && wild.row === rowIndex
                    );
                    if (!alreadySticky) {
                        newStickyWilds.push({ reel: reelIndex, row: rowIndex });
                    }
                }
            });
        });
        
        if (newStickyWilds.length > 0) {
            setStickyWilds(prev => [...prev, ...newStickyWilds]);
        }
    }, [bonusActive, stickyWilds]);
    
    // Add credits function
    const addCredits = (amount) => {
        setBalance(prev => prev + amount);
        setMessage(`Added $${amount} to your balance!`);
    };
    
    // Auto-refill when broke
    const handleBankruptcy = () => {
        if (balance < Math.min(...BET_AMOUNTS) && !bonusActive) {
            addCredits(500);
            setMessage('Bankruptcy protection activated! Added $500 to your balance.');
        }
    };
    
    // Check for bankruptcy when balance changes
    useEffect(() => {
        handleBankruptcy();
    }, [balance, bonusActive]);
    
    // Main spin function with enhanced animations
    const spin = async () => {
        if (spinning) return;
        
        // Check if player has enough balance (unless in bonus mode)
        if (!bonusActive && balance < betAmount) {
            handleBankruptcy();
            if (balance < betAmount) {
                setMessage('Insufficient balance! Try adding more credits.');
                return;
            }
        }
        
        setSpinning(true);
        setWinnings(0);
        setWinningLines([]);
        setMessage('');
        
        // Deduct bet if not in bonus mode
        if (!bonusActive) {
            setBalance(prev => prev - betAmount);
        }
        
        // Generate final result immediately and store it
        const finalReels = generateReels();
        setFinalResults(finalReels);
        
        // Set all reels to spinning state
        setReelSpinning([true, true, true, true, true]);
        
        // Start spinning with random symbols during animation
        const spinDuration = 1800;
        const symbolUpdateInterval = setInterval(() => {
            setReels(currentReels => 
                currentReels.map((reel, reelIndex) => 
                    reelSpinning[reelIndex] 
                        ? Array(3).fill().map(() => getRandomSymbol())
                        : reel // Keep final result if this reel has stopped
                )
            );
        }, 80);
        
        // Wait for spin duration
        await new Promise(resolve => setTimeout(resolve, spinDuration));
        clearInterval(symbolUpdateInterval);
        
        // Stop reels one by one with eased timing from left to right
        for (let reelIndex = 0; reelIndex < 5; reelIndex++) {
            // Eased timing - starts slow, speeds up in middle, slows down at end
            const baseDelay = reelIndex * 150;
            const easedDelay = baseDelay + (Math.sin(reelIndex / 4 * Math.PI) * 100);
            
            setTimeout(() => {
                // Stop this specific reel and show its final result
                setReelSpinning(prev => {
                    const newSpinning = [...prev];
                    newSpinning[reelIndex] = false;
                    return newSpinning;
                });
                
                // Set the final result for this reel with settling animation
                setReels(currentReels => {
                    const newReels = [...currentReels];
                    newReels[reelIndex] = [...finalReels[reelIndex]];
                    return newReels;
                });
                
            }, easedDelay);
        }
        
        // Process game logic after all reels have stopped (wait for longest eased delay)
        setTimeout(() => {
            // Handle sticky wilds during bonus
            handleStickyWilds(finalReels);
            
            // Check for wins
            const wins = detectWins(finalReels);
            let totalWin = 0;
            
            if (wins.length > 0) {
                totalWin = wins.reduce((sum, win) => sum + win.payout, 0);
                setWinnings(totalWin);
                setWinningLines(wins);
                setBalance(prev => prev + totalWin);
                
                if (bonusActive) {
                    setBonusWinnings(prev => prev + totalWin);
                }
                
                const winMessage = bonusActive 
                    ? `Bonus Win! +${totalWin}` 
                    : `You won ${totalWin}!`;
                setMessage(winMessage);
            } else if (bonusActive) {
                setMessage('No win this spin - keep going!');
            }
            
            // Check for scatter bonus (only if not already in bonus)
            if (!bonusActive && checkScatterBonus(finalReels)) {
                setMessage('🎉 BONUS TRIGGERED! 3+ Scatters found!');
                setTimeout(() => {
                    setBonusActive(true);
                    setFreeSpinsLeft(10);
                    setBonusWinnings(0);
                    setStickyWilds([]);
                }, 2000);
            }
            
            // Handle bonus mode
            if (bonusActive) {
                setFreeSpinsLeft(prev => {
                    const newCount = prev - 1;
                    if (newCount <= 0) {
                        // Bonus round ending
                        setTimeout(() => {
                            setBonusActive(false);
                            setStickyWilds([]);
                            setMessage(`Bonus Complete! Total bonus winnings: ${bonusWinnings + totalWin}`);
                        }, 1500);
                    }
                    return newCount;
                });
            }
            
            setSpinning(false);
            setFinalResults(null);
        }, 1600); // Increased wait time for eased animations
    };
    
    // Check if position is winning - Updated for new payline system
    const isWinningPosition = (reelIndex, rowIndex) => {
        return winningLines.some(win => {
            if (!win.lineId || !win.positions) return false;
            
            // Check horizontal lines
            if (win.lineId.startsWith('horizontal')) {
                const lineRow = parseInt(win.lineId.split('-')[1]);
                return lineRow === rowIndex && win.positions.includes(reelIndex);
            }
            
            // Check diagonal and other complex paylines
            return win.positions.includes(reelIndex) && 
                   getPositionForPayline(win.lineId, reelIndex) === rowIndex;
        });
    };
    
    // Helper function to get row position for complex paylines
    const getPositionForPayline = (lineId, reelIndex) => {
        switch (lineId) {
            case 'diagonal-1':
            case 'v-top':
                return reelIndex === 0 || reelIndex === 4 ? 0 : reelIndex === 2 ? 2 : 1;
            case 'diagonal-2':
            case 'v-bottom':
                return reelIndex === 0 || reelIndex === 4 ? 2 : reelIndex === 2 ? 0 : 1;
            case 'zigzag-1':
                return reelIndex === 0 || reelIndex === 4 ? 0 : reelIndex === 1 || reelIndex === 3 ? 2 : 1;
            case 'zigzag-2':
                return reelIndex === 0 || reelIndex === 4 ? 2 : reelIndex === 1 || reelIndex === 3 ? 0 : 1;
            default:
                return -1;
        }
    };
    
    // Payline highlighting functions
    const highlightPayline = (lineId) => {
        setHighlightedPayline(lineId);
    };
    
    const isHighlightedPosition = (col, row) => {
        if (!highlightedPayline) return false;
        
        switch (highlightedPayline) {
            case 'horizontal-0':
                return row === 0;
            case 'horizontal-1':
                return row === 1;
            case 'horizontal-2':
                return row === 2;
            case 'diagonal-1':
                return (col === 0 && row === 0) || (col === 1 && row === 1) || 
                       (col === 2 && row === 2) || (col === 3 && row === 1) || (col === 4 && row === 0);
            case 'diagonal-2':
                return (col === 0 && row === 2) || (col === 1 && row === 1) || 
                       (col === 2 && row === 0) || (col === 3 && row === 1) || (col === 4 && row === 2);
            case 'v-top':
                return (col === 0 && row === 0) || (col === 1 && row === 1) || 
                       (col === 2 && row === 2) || (col === 3 && row === 1) || (col === 4 && row === 0);
            case 'v-bottom':
                return (col === 0 && row === 2) || (col === 1 && row === 1) || 
                       (col === 2 && row === 0) || (col === 3 && row === 1) || (col === 4 && row === 2);
            default:
                return false;
        }
    };
    
    // Check if position has sticky wild
    const isStickyWild = (reelIndex, rowIndex) => {
        return stickyWilds.some(wild => 
            wild.reel === reelIndex && wild.row === rowIndex
        );
    };
    
    return (
        <div className="slot-machine">
            <div className="header">
                <h1 className="title">🎰 Lucky Reels</h1>
                <p className="subtitle">Portfolio Slot Machine Demo</p>
            </div>
            
            <div className="game-stats">
                <div className="stat">
                    <div className="stat-label">Balance</div>
                    <div className="stat-value">${balance}</div>
                </div>
                <div className="stat">
                    <div className="stat-label">Bet</div>
                    <div className="stat-value">${betAmount}</div>
                </div>
                <div className="stat">
                    <div className="stat-label">Last Win</div>
                    <div className="stat-value">${winnings}</div>
                </div>
            </div>
            
            {bonusActive && (
                <div className="message bonus">
                    🎉 BONUS ROUND ACTIVE 🎉
                    <div className="free-spins-counter">
                        Free Spins Left: {freeSpinsLeft}
                    </div>
                    <div className="sticky-wilds-display">
                        Sticky Wilds: {stickyWilds.length}
                    </div>
                    <div>Bonus Winnings: ${bonusWinnings}</div>
                </div>
            )}
            
            {message && !bonusActive && (
                <div className={`message ${winnings > 0 ? 'win' : ''}`}>
                    {message}
                </div>
            )}
            
            <div className="reels-container">
                <div className="reels">
                    {reels.map((reel, reelIndex) => (
                        <div 
                            key={reelIndex} 
                            className={`reel ${reelSpinning[reelIndex] ? 'spinning' : ''}`}
                        >
                            {reel.map((symbol, rowIndex) => (
                                <div 
                                    key={rowIndex} 
                                    className={`symbol ${
                                        !reelSpinning[reelIndex] && isWinningPosition(reelIndex, rowIndex) ? 'winning' : ''
                                    } ${
                                        !reelSpinning[reelIndex] && isStickyWild(reelIndex, rowIndex) ? 'sticky-wild' : ''
                                    }`}
                                >
                                    {symbol}
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
                
                {winningLines.length > 0 && (
                    <div className="paylines">
                        {winningLines.map((win, index) => (
                            <div key={index} className="payline">
                                {win.lineName}: {win.count}x {SYMBOLS[win.symbol].name} = ${win.payout}
                            </div>
                        ))}
                    </div>
                )}
            </div>
            
            <div className="controls">
                <div className="bet-controls">
                    <label className="bet-label">Bet Size:</label>
                    <select 
                        className="bet-selector" 
                        value={betAmount} 
                        onChange={(e) => setBetAmount(parseInt(e.target.value))}
                        disabled={spinning}
                    >
                        {BET_AMOUNTS.map(amount => (
                            <option key={amount} value={amount}>${amount}</option>
                        ))}
                    </select>
                </div>
                
                <button 
                    className="spin-btn" 
                    onClick={spin}
                    disabled={spinning || (!bonusActive && balance < betAmount)}
                >
                    {spinning ? '🎰 SPINNING...' : bonusActive ? '🎁 FREE SPIN' : '🎰 SPIN'}
                </button>
                
                <button 
                    className="info-btn"
                    onClick={() => setShowPaytable(!showPaytable)}
                >
                    ℹ️ PAYTABLE
                </button>
                
                <div className="credit-buttons">
                    <button 
                        className="credit-btn small"
                        onClick={() => addCredits(500)}
                        disabled={spinning}
                    >
                        +$500
                    </button>
                    <button 
                        className="credit-btn large"
                        onClick={() => addCredits(1000)}
                        disabled={spinning}
                    >
                        +$1000
                    </button>
                </div>
            </div>
            
            {showPaytable && (
                <div className="paytable-modal">
                    <div className="paytable-content">
                        <div className="paytable-header">
                            <h3>💰 PAYTABLE & RULES</h3>
                            <button 
                                className="close-btn"
                                onClick={() => setShowPaytable(false)}
                            >
                                ✕
                            </button>
                        </div>
                        
                        <div className="paytable-grid">
                            <div className="paytable-section">
                                <h4>Regular Symbols</h4>
                                {Object.entries(SYMBOLS)
                                    .filter(([_, data]) => !data.isWild && !data.isScatter)
                                    .sort((a, b) => b[1].value - a[1].value)
                                    .map(([symbol, data]) => (
                                    <div key={symbol} className="paytable-row">
                                        <span className="paytable-symbol">{symbol}</span>
                                        <span className="paytable-name">{data.name}</span>
                                        <div className="paytable-values">
                                            <span>3x = ${data.value}</span>
                                            <span>4x = ${Math.round(data.value * 2.5)}</span>
                                            <span>5x = ${data.value * 5}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            
                            <div className="paytable-section">
                                <h4>Special Symbols</h4>
                                <div className="paytable-row special">
                                    <span className="paytable-symbol">⭐</span>
                                    <span className="paytable-name">Wild</span>
                                    <span className="paytable-desc">Substitutes for all symbols except Scatter</span>
                                </div>
                                <div className="paytable-row special">
                                    <span className="paytable-symbol">💰</span>
                                    <span className="paytable-name">Scatter</span>
                                    <span className="paytable-desc">3+ anywhere triggers 10 FREE SPINS</span>
                                </div>
                            </div>
                            
                            <div className="paytable-section">
                                <h4>Paylines (7 Ways to Win)</h4>
                                <div className="paylines-visual">
                                    <div className="payline-item" onClick={() => highlightPayline('horizontal-0')}>
                                        <span className="payline-pattern">● ● ● ● ●</span>
                                        <span className="payline-desc">Row 1 (Top)</span>
                                    </div>
                                    <div className="payline-item" onClick={() => highlightPayline('horizontal-1')}>
                                        <span className="payline-pattern">● ● ● ● ●</span>
                                        <span className="payline-desc">Row 2 (Middle)</span>
                                    </div>
                                    <div className="payline-item" onClick={() => highlightPayline('horizontal-2')}>
                                        <span className="payline-pattern">● ● ● ● ●</span>
                                        <span className="payline-desc">Row 3 (Bottom)</span>
                                    </div>
                                    <div className="payline-item" onClick={() => highlightPayline('diagonal-1')}>
                                        <span className="payline-pattern">● &nbsp;&nbsp;● &nbsp;&nbsp;&nbsp;&nbsp;● &nbsp;&nbsp;● &nbsp;&nbsp;●</span>
                                        <span className="payline-desc">Diagonal ↘</span>
                                    </div>
                                    <div className="payline-item" onClick={() => highlightPayline('diagonal-2')}>
                                        <span className="payline-pattern">● &nbsp;&nbsp;● &nbsp;&nbsp;&nbsp;&nbsp;● &nbsp;&nbsp;● &nbsp;&nbsp;●</span>
                                        <span className="payline-desc">Diagonal ↗</span>
                                    </div>
                                    <div className="payline-item" onClick={() => highlightPayline('v-top')}>
                                        <span className="payline-pattern">● &nbsp;&nbsp;● &nbsp;&nbsp;&nbsp;&nbsp;● &nbsp;&nbsp;● &nbsp;&nbsp;●</span>
                                        <span className="payline-desc">V-Shape ∨</span>
                                    </div>
                                    <div className="payline-item" onClick={() => highlightPayline('v-bottom')}>
                                        <span className="payline-pattern">● &nbsp;&nbsp;● &nbsp;&nbsp;&nbsp;&nbsp;● &nbsp;&nbsp;● &nbsp;&nbsp;●</span>
                                        <span className="payline-desc">V-Shape ∧</span>
                                    </div>
                                </div>
                                <div className="payline-preview">
                                    <h5>Click a payline above to see the pattern</h5>
                                    <div className="mini-grid">
                                        {Array(3).fill().map((_, row) => (
                                            <div key={row} className="mini-row">
                                                {Array(5).fill().map((_, col) => (
                                                    <div 
                                                        key={col} 
                                                        className={`mini-cell ${highlightedPayline && isHighlightedPosition(col, row) ? 'highlighted' : ''}`}
                                                    >
                                                        ●
                                                    </div>
                                                ))}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className="bonus-rule">
                                    <strong>🎁 Free Spins:</strong> 3+ Scatter symbols trigger 10 free spins
                                </div>
                                <div className="bonus-rule">
                                    <strong>🔒 Sticky Wilds:</strong> During free spins, Wilds become sticky and remain for all spins
                                </div>
                                <div className="bonus-rule">
                                    <strong>💵 Paylines:</strong> Win with 3+ consecutive symbols from left to right
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            
            <div className="portfolio-footer">
                <p>🚀 Built with React | Portfolio Demo | Responsive Design</p>
                <p>Features: Bonus Rounds • Sticky Wilds • Local Storage • Modern UI</p>
            </div>
        </div>
    );
}

ReactDOM.render(<SlotMachine />, document.getElementById('root'));