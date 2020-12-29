const formatMoney = money => typeof money !== 'number' ? '-' : money + ' Eur';

const totalIncome = list => list.reduce((total, item) => total += item.income ? item.income : 0, 0);
const totalExpense = list => list.reduce((total, item) => total += item.expense ? item.expense : 0, 0);

const sortDataByMonth = list => list.sort((a, b) => a.month - b.month);
const sortDataByIncome = list => [...list].sort((a, b) => (a.income ? a.income : 0) - (b.income ? b.income : 0));
const sortDataByExpense = list => [...list].sort((a, b) => (a.expense ? a.expense : 0) - (b.expense ? b.expense : 0));

const minIncome = list => sortDataByIncome(list).filter(a => a.income > 0)[0];
const maxIncome = list => sortDataByIncome(list)[list.length - 1];

const minExpense = list => sortDataByExpense(list).filter(a => a.expense > 0)[0];
const maxExpense = list => sortDataByExpense(list)[list.length - 1];

const getMonthName = (monthObject, monthNames) => monthNames[monthObject.month - 1];

function renderTable(monthNames, cashFlow) {
    let HTML = '',
        balance = 0,
        income = 0,
        expense = 0;

    cashFlow = sortDataByMonth(cashFlow);

    for (let i = 0; i < cashFlow.length; i++) {
        const item = cashFlow[i];

        income += item.income ? item.income : 0;
        expense += item.expense ? item.expense : 0;
        balance = income - expense;

        HTML += `<div class="table-row">
                    <div class="cell">${i + 1}</div>
                    <div class="cell">${monthNames[item.month - 1]}</div>
                    <div class="cell">${formatMoney(item.income)}</div>
                    <div class="cell">${formatMoney(item.expense)}</div>
                    <div class="cell">${formatMoney(balance)}</div>
                </div>`;
    }

    document.querySelector('.table-content').innerHTML = HTML;
}

const totalIncomeSum = totalIncome(account);
const totalExpenseSum = totalExpense(account);

document.querySelector('.table-footer > .cell:nth-of-type(3)').innerText = formatMoney(totalIncomeSum);
document.querySelector('.table-footer > .cell:nth-of-type(4)').innerText = formatMoney(totalExpenseSum);
document.querySelector('.table-footer > .cell:nth-of-type(5)').innerText = formatMoney(totalIncomeSum - totalExpenseSum);

document.querySelector('#minIncome').innerText = getMonthName(minIncome(account), months);
document.querySelector('#maxIncome').innerText = getMonthName(maxIncome(account), months);
document.querySelector('#minExpense').innerText = getMonthName(minExpense(account), months);
document.querySelector('#maxExpense').innerText = getMonthName(maxExpense(account), months);

renderTable(months, account);