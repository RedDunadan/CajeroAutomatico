// Main JavaScript file for the ATM application

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Verify DOM elements exist
    const requiredElements = [
        'message-display',
        'balance-display',
        'check-balance',
        'withdraw-money',
        'deposit-money',
        'exit',
        'transaction-modal',
        'transaction-form',
        'modal-title'
    ];

    const missingElements = requiredElements.filter(id => !document.getElementById(id));
    if (missingElements.length > 0) {
        console.error('Missing required elements:', missingElements);
        return;
    }

    // Users database
    const users = {
        user1: {
            username: 'user1',
            password: '1234',
            balance: 1000
        },
        user2: {
            username: 'user2',
            password: '5678',
            balance: 2000
        },
        none: {
            username: 'none',
            password: 'none',
            balance: 0  // Dummy user to avoid null reference errors
        }
    };

    let currentUser = null;

    // Get DOM elements
    const messageDisplay = document.getElementById('message-display');
    const balanceDisplay = document.getElementById('balance-display');
    const checkBalanceBtn = document.getElementById('check-balance');
    const withdrawMoneyBtn = document.getElementById('withdraw-money');
    const depositMoneyBtn = document.getElementById('deposit-money');
    const exitBtn = document.getElementById('exit');
    const modal = document.getElementById('transaction-modal');
    const transactionForm = document.getElementById('transaction-form');
    const modalTitle = document.getElementById('modal-title');

    // Create and add login form
    const loginSection = document.createElement('div');
    loginSection.innerHTML = `
        <div id="login-form" class="login-section">
            <h2>ATM Login</h2>
            <form>
                <input type="text" id="username" placeholder="Username" required>
                <input type="password" id="password" placeholder="Password" required>
                <button type="submit" id="login-btn">Login</button>
            </form>
        </div>
    `;
    document.body.insertBefore(loginSection, document.body.firstChild);

    // Initial setup
    document.querySelector('.atm-controls').style.display = 'none';
    balanceDisplay.style.display = 'none';

    // Helper functions
    function showMessage(message, isError = false) {
        messageDisplay.textContent = message;
        messageDisplay.className = `message ${isError ? 'error' : 'success'}`;
        messageDisplay.style.display = 'block';
        setTimeout(() => {
            messageDisplay.style.display = 'none';
        }, 3000);
    }

    function updateBalanceDisplay() {
        if (currentUser) {
            balanceDisplay.style.display = 'block';
            balanceDisplay.textContent = `Saldo actual: $${currentUser.balance}`;
        }
    }

    function login(username, password) {
        if (!username || !password) {
            showMessage('Por favor ingrese usuario y contraseña', true);
            return false;
        }

        const user = Object.values(users).find(u => u.username === username && u.password === password);
        
        if (user) {
            currentUser = user;
            document.getElementById('login-form').style.display = 'none';
            document.querySelector('.atm-controls').style.display = 'block';
            updateBalanceDisplay();
            showMessage(`¡Bienvenido ${username}!`);
            return true;
        }
        showMessage('Usuario o contraseña inválidos', true);
        return false;
    }

    // Event Listeners
    loginSection.querySelector('form').addEventListener('submit', (e) => {
        e.preventDefault();
        const username = document.getElementById('username').value.trim();
        const password = document.getElementById('password').value.trim();
        login(username, password);
    });

    // Transaction handling
    async function showTransactionModal(type) {
        modal.style.display = 'block';
        modalTitle.textContent = type === 'withdraw' ? 'Retirar Dinero' : 'Depositar Dinero';
        
        return new Promise((resolve) => {
            const handleSubmit = (e) => {
                e.preventDefault();
                const amount = parseFloat(document.getElementById('amount-input').value);
                modal.style.display = 'none';
                transactionForm.reset();
                resolve(amount);
                transactionForm.removeEventListener('submit', handleSubmit);
            };

            transactionForm.addEventListener('submit', handleSubmit);
            
            document.getElementById('cancel-transaction').onclick = () => {
                modal.style.display = 'none';
                transactionForm.reset();
                resolve(null);
            };
        });
    }

    function validateAmount(amount) {
        if (isNaN(amount) || amount <= 0) {
            showMessage('Por favor ingrese una cantidad válida', true);
            return false;
        }
        if (amount > 10000) {
            showMessage('La cantidad excede el límite permitido', true);
            return false;
        }
        return true;
    }

    // ATM Operation Listeners
    checkBalanceBtn.addEventListener('click', () => {
        if (!currentUser) return;
        showMessage(`Su saldo actual es: $${currentUser.balance}`);
    });

    withdrawMoneyBtn.addEventListener('click', async () => {
        if (!currentUser) return;
        const amount = await showTransactionModal('withdraw');
        if (!amount || !validateAmount(amount)) return;
        
        if (amount > currentUser.balance) {
            showMessage('Saldo insuficiente', true);
            return;
        }
        
        currentUser.balance -= amount;
        updateBalanceDisplay();
        showMessage(`Retiro exitoso de $${amount}. Nuevo saldo: $${currentUser.balance}`);
    });

    depositMoneyBtn.addEventListener('click', async () => {
        if (!currentUser) return;
        const amount = await showTransactionModal('deposit');
        if (!amount || !validateAmount(amount)) return;
        
        currentUser.balance += amount;
        updateBalanceDisplay();
        showMessage(`Depósito exitoso de $${amount}. Nuevo saldo: $${currentUser.balance}`);
    });

    exitBtn.addEventListener('click', () => {
        if (confirm('¿Está seguro que desea salir?')) {
            currentUser = null;
            document.getElementById('login-form').style.display = 'block';
            document.querySelector('.atm-controls').style.display = 'none';
            balanceDisplay.style.display = 'none';
            document.getElementById('username').value = '';
            document.getElementById('password').value = '';
            showMessage('Sesión finalizada. ¡Gracias por usar nuestro cajero!');
        }
    });
});