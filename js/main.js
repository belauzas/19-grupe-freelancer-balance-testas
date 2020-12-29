const formatMoney = money => typeof money !== 'number' ? '-' : money + ' Eur';
const getMonthName = (monthObject, monthNames) => monthNames[monthObject.month - 1];
const number = n => n ? n : 0;

const totalByKey = (list, key) => list.reduce((total, item) => total += number(item[key]), 0);

const sortData = (list, key) => [...list].sort((a, b) => number(a[key]) - number(b[key]));
const minMonthByKey = (list, key) => sortData(list, key).filter(a => a[key] > 0)[0];
const maxMonthByKey = (list, key) => sortData(list, key)[list.length - 1];

const renderTable = (monthNames, cashFlow) => {
    sortedCashFlow = sortData(cashFlow, 'month');
    let HTML = '',
        balance = 0;

    for (const { month, income = 0, expense = 0 } of sortedCashFlow) {
        balance += income - expense;
        HTML += `<div class="table-row">
                    <div class="cell">${month}</div>
                    <div class="cell">${monthNames[month - 1]}</div>
                    <div class="cell">${formatMoney(income)}</div>
                    <div class="cell">${formatMoney(expense)}</div>
                    <div class="cell">${formatMoney(balance)}</div>
                </div>`;
    }

    document.querySelector('.table-content').innerHTML = HTML;
}

const totalsSums = [totalByKey(account, 'income'), totalByKey(account, 'expense'), totalByKey(account, 'income') - totalByKey(account, 'expense')];
const footerSelector = '.table-footer > .cell:nth-of-type';
totalsSums.forEach((sum, index) => document.querySelector(`${footerSelector}(${index + 3})`).innerText = formatMoney(sum));

const findMonths = [
    { id: 'minIncome', func: minMonthByKey, type: 'income' },
    { id: 'maxIncome', func: maxMonthByKey, type: 'income' },
    { id: 'minExpense', func: minMonthByKey, type: 'expense' },
    { id: 'maxExpense', func: maxMonthByKey, type: 'expense' },
];
findMonths.forEach(set => document.querySelector('#' + set.id).innerText = getMonthName(set.func(account, set.type), months));

renderTable(months, account);