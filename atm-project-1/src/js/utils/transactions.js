function deposit(balance, amount) {
    if (amount <= 0) {
        throw new Error('Amount must be greater than zero');
    }
    balance += amount;
    return balance;
}

function withdraw(balance, amount) {
    if (amount <= 0) {
        throw new Error('Amount must be greater than zero');
    }
    if (amount > balance) {
        throw new Error('Insufficient funds');
    }
    balance -= amount;
    return balance;
}

function getBalance(balance) {
    return balance;
}

export { deposit, withdraw, getBalance };