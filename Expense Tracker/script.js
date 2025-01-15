document.addEventListener('DOMContentLoaded', function() {
  const expense_form=document.getElementById("expense_form");
  const expense_name=document.getElementById("expense_name");
  const expense_amount=document.getElementById("expense_amount");
  const expense_list=document.getElementById("expense_list");
  const total_amount=document.getElementById("total_amount");

  let expenses=JSON.parse(localStorage.getItem("expenses")) || [];

  expenses.forEach((expense) => {
    renderExpenses(expense);
  });

  expense_form.addEventListener("submit", function(event) {
    event.preventDefault();

    const name=expense_name.value.trim();
    const amount=parseFloat(expense_amount.value.trim());

    if(name==="" || isNaN(amount) || amount<=0){
      alert("Please enter valid values");
      return;
    }

    const newExpense={
      id:Date.now(),
      name,
      amount
    }

    expenses.push(newExpense);
    saveExpense();
    renderExpenses(newExpense);

    expense_name.value="";
    expense_amount.value="";
  });

  function renderExpenses(expense){
    const expense_item=document.createElement("li");

    expense_item.className="bg-black/40 text-white p-3 rounded-lg mb-2 flex items-center justify-between";
    expense_item.textContent=`${expense.name}- $${expense.amount.toFixed(2)}`;

    const delete_btn=document.createElement("button");
    delete_btn.className="bg-gradient-to-r from-red-500 to-yellow-500 p-2 rounded-md hover:bg-gradient-to-l hover:from-red-500 hover:to-yellow-500";
    delete_btn.textContent="Delete item";

    delete_btn.addEventListener("click", function() {
      expenses=expenses.filter((e) => e.id!==expense.id);
      saveExpense();
      expense_item.remove();
      update_total();
    });

    expense_item.appendChild(delete_btn);
    expense_list.appendChild(expense_item);

    update_total();
  }

  function update_total(){
    let totalAmount=expenses.reduce((total_amount,expense) => total_amount + expense.amount, 0);
    total_amount.textContent=`${totalAmount.toFixed(2)}`;
  }

  function saveExpense(){
    localStorage.setItem("expenses",JSON.stringify(expenses));
  }
});