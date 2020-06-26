import Transaction from '../models/Transaction';
interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

interface ListTransactionDTO {
  transactions: Transaction[],
  balance: Balance
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): ListTransactionDTO {
    const balance = this.getBalance();

    const transactions: ListTransactionDTO = {
      transactions: this.transactions,
      balance
    }
    return transactions;
  }

  public getBalance(): Balance {
    const totalIncome = this.transactions.reduce((totalIncome, transaction) => {
      return transaction.type === "income" ? totalIncome + transaction.value : totalIncome
    }, 0);

    const totalOutcome = this.transactions.reduce((totalOutcome, transaction) => {
      return transaction.type === "outcome" ? totalOutcome + transaction.value : totalOutcome
    }, 0);

    const balance = {
      income: totalIncome,
      outcome: totalOutcome,
      total: totalIncome - totalOutcome
    };
    return balance;
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });
    this.transactions.push(transaction);
    return transaction;
  }
}

export default TransactionsRepository;
