// GAV Calculator JavaScript
class GAVCalculator {
    constructor() {
        this.holdings = JSON.parse(localStorage.getItem('gavHoldings')) || {};
        this.initializeApp();
        this.bindEvents();
        this.renderHoldings();
        this.updateOverview();
    }

    initializeApp() {
        // Set today's date as default
        const today = new Date().toISOString().split('T')[0];
        document.getElementById('date').value = today;
    }

    bindEvents() {
        // Form submission
        document.getElementById('stockForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.addPurchase();
        });

        // Modal events
        document.getElementById('infoBtn').addEventListener('click', () => {
            document.getElementById('infoModal').style.display = 'block';
        });

        document.querySelector('.close').addEventListener('click', () => {
            document.getElementById('infoModal').style.display = 'none';
        });

        // Close modal on outside click
        window.addEventListener('click', (e) => {
            const modal = document.getElementById('infoModal');
            if (e.target === modal) {
                modal.style.display = 'none';
            }
        });
    }

    addPurchase() {
        const stockName = document.getElementById('stockName').value.trim();
        const shares = parseInt(document.getElementById('shares').value);
        const price = parseFloat(document.getElementById('price').value);
        const courtage = parseFloat(document.getElementById('courtage').value) || 0;
        const date = document.getElementById('date').value;

        if (!stockName || !shares || !price || !date) {
            alert('Vänligen fyll i alla obligatoriska fält');
            return;
        }

        // Initialize stock if it doesn't exist
        if (!this.holdings[stockName]) {
            this.holdings[stockName] = {
                purchases: [],
                totalShares: 0,
                totalCost: 0,
                totalCourtage: 0
            };
        }

        // Add purchase (including courtage in total cost)
        const stockCost = shares * price;
        const totalCost = stockCost + courtage;
        
        const purchase = {
            id: Date.now(),
            shares,
            price,
            courtage,
            date,
            stockCost,
            totalCost
        };

        this.holdings[stockName].purchases.push(purchase);
        this.holdings[stockName].totalShares += shares;
        this.holdings[stockName].totalCost += totalCost;
        this.holdings[stockName].totalCourtage += courtage;

        // Save to localStorage
        this.saveData();

        // Update UI
        this.renderHoldings();
        this.updateOverview();
        
        // Reset form
        document.getElementById('stockForm').reset();
        document.getElementById('date').value = new Date().toISOString().split('T')[0];

        // Success feedback
        this.showSuccessMessage(`Köp av ${shares} ${stockName} aktier tillagt!`);
        
        // Track GAV calculation
        if (typeof gtag !== 'undefined') {
            gtag('event', 'gav_calculation', {
                event_category: 'gav_tool_usage',
                event_label: 'stock_purchase_added'
            });
        }
    }

    removePurchase(stockName, purchaseId) {
        const stock = this.holdings[stockName];
        const purchaseIndex = stock.purchases.findIndex(p => p.id === purchaseId);
        
        if (purchaseIndex === -1) return;

        const purchase = stock.purchases[purchaseIndex];
        
        // Update totals
        stock.totalShares -= purchase.shares;
        stock.totalCost -= purchase.totalCost;
        stock.totalCourtage -= (purchase.courtage || 0);
        
        // Remove purchase
        stock.purchases.splice(purchaseIndex, 1);
        
        // Remove stock if no purchases left
        if (stock.purchases.length === 0) {
            delete this.holdings[stockName];
        }

        this.saveData();
        this.renderHoldings();
        this.updateOverview();
    }

    calculateGAV(stock) {
        if (stock.totalShares === 0) return 0;
        return stock.totalCost / stock.totalShares;
    }

    formatCurrency(amount) {
        return new Intl.NumberFormat('sv-SE', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }).format(amount) + ' kr';
    }

    formatNumber(number) {
        return new Intl.NumberFormat('sv-SE').format(number);
    }

    formatDate(dateString) {
        return new Date(dateString).toLocaleDateString('sv-SE');
    }

    renderHoldings() {
        const holdingsList = document.getElementById('holdingsList');
        const stockNames = Object.keys(this.holdings);

        if (stockNames.length === 0) {
            holdingsList.innerHTML = `
                <div class="empty-state">
                    <p>Inga aktieköp tillagda ännu.</p>
                    <p class="empty-subtitle">Lägg till ditt första köp för att börja beräkna GAV.</p>
                </div>
            `;
            return;
        }

        holdingsList.innerHTML = stockNames.map(stockName => {
            const stock = this.holdings[stockName];
            const gav = this.calculateGAV(stock);

            return `
                <div class="holding-item">
                    <div class="holding-header">
                        <h4 class="stock-name">${stockName}</h4>
                    </div>
                    
                    <div class="holding-stats">
                        <div class="holding-stat">
                            <span class="holding-stat-label">GAV per aktie</span>
                            <span class="holding-stat-value positive">${this.formatCurrency(gav)}</span>
                        </div>
                        <div class="holding-stat">
                            <span class="holding-stat-label">Totala aktier</span>
                            <span class="holding-stat-value">${this.formatNumber(stock.totalShares)} st</span>
                        </div>
                        <div class="holding-stat">
                            <span class="holding-stat-label">Total kostnad</span>
                            <span class="holding-stat-value">${this.formatCurrency(stock.totalCost)}</span>
                        </div>
                        <div class="holding-stat">
                            <span class="holding-stat-label">Totalt courtage</span>
                            <span class="holding-stat-value">${this.formatCurrency(stock.totalCourtage || 0)}</span>
                        </div>
                    </div>

                    <div class="purchases-list">
                        <h5>Köphistorik:</h5>
                        ${stock.purchases.map(purchase => `
                            <div class="purchase-item">
                                <span class="purchase-date">${this.formatDate(purchase.date)}</span>
                                <span class="purchase-details">${this.formatNumber(purchase.shares)} st à ${this.formatCurrency(purchase.price)}</span>
                                <span class="purchase-details">Courtage: ${this.formatCurrency(purchase.courtage || 0)}</span>
                                <span class="purchase-details">Totalt: ${this.formatCurrency(purchase.totalCost)}</span>
                                <button class="btn-remove" onclick="gavCalculator.removePurchase('${stockName}', ${purchase.id})">Ta bort</button>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `;
        }).join('');
    }

    updateOverview() {
        const stockNames = Object.keys(this.holdings);
        
        let totalInvested = 0;
        let totalShares = 0;
        let gavSum = 0;
        let stockCount = 0;

        stockNames.forEach(stockName => {
            const stock = this.holdings[stockName];
            totalInvested += stock.totalCost;
            totalShares += stock.totalShares;
            
            if (stock.totalShares > 0) {
                gavSum += this.calculateGAV(stock);
                stockCount++;
            }
        });

        const averageGAV = stockCount > 0 ? gavSum / stockCount : 0;

        document.getElementById('totalInvested').textContent = this.formatCurrency(totalInvested);
        document.getElementById('totalShares').textContent = this.formatNumber(totalShares) + ' st';
        document.getElementById('averageGAV').textContent = this.formatCurrency(averageGAV);
    }

    saveData() {
        localStorage.setItem('gavHoldings', JSON.stringify(this.holdings));
    }

    showSuccessMessage(message) {
        // Create a simple success notification
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #00c896;
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
            z-index: 1000;
            font-weight: 500;
        `;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }

    // Export data functionality
    exportData() {
        const data = {
            exportDate: new Date().toISOString(),
            holdings: this.holdings
        };
        
        const dataStr = JSON.stringify(data, null, 2);
        const dataBlob = new Blob([dataStr], {type: 'application/json'});
        const url = URL.createObjectURL(dataBlob);
        
        const link = document.createElement('a');
        link.href = url;
        link.download = 'gav-portfolio-export.json';
        link.click();
        
        URL.revokeObjectURL(url);
    }

    // Clear all data
    clearAllData() {
        if (confirm('Är du säker på att du vill ta bort alla dina aktieköp? Detta går inte att ångra.')) {
            this.holdings = {};
            this.saveData();
            this.renderHoldings();
            this.updateOverview();
        }
    }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.gavCalculator = new GAVCalculator();
});

// Add keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // Escape to close modal
    if (e.key === 'Escape') {
        document.getElementById('infoModal').style.display = 'none';
    }
    
    // Ctrl+Enter to submit form
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        const form = document.getElementById('stockForm');
        if (document.activeElement && form.contains(document.activeElement)) {
            form.dispatchEvent(new Event('submit'));
        }
    }
});