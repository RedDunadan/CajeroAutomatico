const { deposit, withdraw } = require('../src/js/utils/transactions');

describe('Transaction Functions', () => {
    let balance;

    beforeEach(() => {
        balance = 1000; // Initial balance for each test
    });

    test('should deposit money correctly', () => {
        const amount = 200;
        const newBalance = deposit(balance, amount);
        expect(newBalance).toBe(1200);
    });

    test('should withdraw money correctly', () => {
        const amount = 300;
        const newBalance = withdraw(balance, amount);
        expect(newBalance).toBe(700);
    });

    test('should not withdraw more than the balance', () => {
        const amount = 1200;
        const newBalance = withdraw(balance, amount);
        expect(newBalance).toBe(balance); // Balance should remain the same
    });

    test('should not deposit negative amounts', () => {
        const amount = -100;
        const newBalance = deposit(balance, amount);
        expect(newBalance).toBe(balance); // Balance should remain the same
    });
});