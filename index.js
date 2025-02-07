// Initial account balance
let balance = 1000;

// Get button elements
const messageDisplay = document.getElementById('message-display');
const balanceDisplay = document.getElementById('balance-display');
const checkBalanceBtn = document.getElementById('check-balance');
const withdrawMoneyBtn = document.getElementById('withdraw-money');
const depositMoneyBtn = document.getElementById('deposit-money');
const exitBtn = document.getElementById('exit');

// Display Messages
function showMessage(message, isError = false) {
    messageDisplay.textContent = message;
    messageDisplay.className = `message ${isError ? 'error' : 'success'}`;
    messageDisplay.style.display = 'block';
    setTimeout(() => {
        messageDisplay.style.display = 'none';
    }, 3000);
}

// Function to update balance display
function updateBalanceDisplay() {
    balanceDisplay.textContent = `Saldo actual: $${balance}`;
}

// Initialize balance display
updateBalanceDisplay();

// Add event listeners
checkBalanceBtn.addEventListener('click', () => {
    showMessage(`Su saldo actual es: $${balance}`);
    updateBalanceDisplay();
});

withdrawMoneyBtn.addEventListener('click', () => {
    const amount = parseFloat(prompt('Ingrese la cantidad a retirar:'));
    if (isNaN(amount) || amount <= 0) {
        showMessage('Por favor ingrese una cantidad válida', true);
        return;
    }
    if (amount > balance) {
        showMessage('Saldo insuficiente', true);
        return;
    }
    balance -= amount;
    updateBalanceDisplay();
    showMessage(`Retiro exitoso de $${amount}. Nuevo saldo: $${balance}`);
});

depositMoneyBtn.addEventListener('click', () => {
    const amount = parseFloat(prompt('Ingrese la cantidad a depositar:'));
    if (isNaN(amount) || amount <= 0) {
        showMessage('Por favor ingrese una cantidad válida', true);
        return;
    }
    balance += amount;
    updateBalanceDisplay();
    showMessage(`Depósito exitoso de $${amount}. Nuevo saldo: $${balance}`);
});

exitBtn.addEventListener('click', () => {
    if (confirm('¿Está seguro que desea salir?')) {
        showMessage('Gracias por usar nuestro cajero automático');
        setTimeout(() => {
            window.close();
        }, 3000);
    }
});