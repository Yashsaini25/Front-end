document.addEventListener('DOMContentLoaded', function() {
  const input=document.getElementById('to_do_input');
  const taskbutton=document.getElementById('add_task');
  const list=document.getElementById('task_list');

  let tasks=JSON.parse(localStorage.getItem("tasks")) || [];

  tasks.forEach((task) => renderTasks(task));

  taskbutton.addEventListener('click', function() {
    const taskText=input.value.trim();
    if(taskText==="" || tasks.some((t) => t.text===taskText)){
      alert("Task cannot be empty or dupliacte");
      return;
    };

    const newTask={
      id:Date.now(),
      text:taskText,
      completed:false,
    };

    tasks.push(newTask);
    saveTasks();
    renderTasks(newTask);
    input.value="";
  });

  function renderTasks(task){
    const li=document.createElement('li');
    li.className="bg-blue-200 text-gray-600 p-3 rounded-md mb-2 flex items-center justify-between ";

    const taskText=document.createElement('span');
    taskText.textContent=task.text;
    taskText.className="cursor-pointer";

    if(task.completed){
      taskText.classList.toggle('line-through');
    }

    taskText.addEventListener('click', () => {
      taskText.classList.toggle('line-through');
      task.completed=!task.completed;
      saveTasks();
    });

    const deleteBtn=document.createElement('button');
    deleteBtn.className="bg-gradient-to-r from-red-500 to-orange-500 rounded-md text-white p-1 hover:bg-gradient-to-l hover:from-red-500 hover:to-orange-500 shadow-2xl";
    deleteBtn.textContent="Delete";

    li.appendChild(taskText);
    li.appendChild(deleteBtn);

    deleteBtn.addEventListener("click", function () {
        tasks=tasks.filter((t) => t.id!==task.id);
        li.remove();
        saveTasks();
      });

    list.appendChild(li);
  };

  function saveTasks(){
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }
});
