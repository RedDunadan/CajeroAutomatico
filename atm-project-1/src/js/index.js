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
    const loginContainer = document.getElementById('login-container');
    const atmContainer = document.getElementById('atm-container');
    const loginForm = document.getElementById('login-form');

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
            loginContainer.style.display = 'none';
            atmContainer.style.display = 'block';
            // Show the controls when logged in
            document.querySelector('.atm-controls').style.display = 'block';
            updateBalanceDisplay();
            showMessage(`¡Bienvenido ${username}!`);
            return true;
        }
        showMessage('Usuario o contraseña inválidos', true);
        return false;
    }

    // Event Listeners
    loginForm.addEventListener('submit', (e) => {
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
            loginContainer.style.display = 'flex';
            atmContainer.style.display = 'none';
            document.querySelector('.atm-controls').style.display = 'none'; // Hide controls on logout
            balanceDisplay.style.display = 'none'; // Hide balance display
            document.getElementById('username').value = '';
            document.getElementById('password').value = '';
            showMessage('Sesión finalizada. ¡Gracias por usar nuestro cajero!');
        }
    });
});