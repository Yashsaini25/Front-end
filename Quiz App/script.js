document.addEventListener('DOMContentLoaded', function() {
  const question_container=document.getElementById("question_container");
  const question_text=document.getElementById("question_text");
  const choices=document.getElementById("choices");
  const next_qn=document.getElementById("next_qn");
  const result_container=document.getElementById("result_container");
  const score=document.getElementById("score");
  const restart_quiz=document.getElementById("restart_quiz");
  const start_quiz=document.getElementById("start_quiz");

  const questions =[
    {
      question:"What is the capital of France?",
      choices:["Paris","London","Berlin","Madrid"],
      answer:0
    },
    {
      question:"What is the capital of Spain?",
      choices:["Paris","London","Berlin","Madrid"],
      answer:3
    },
    {
      question:"What is the capital of Germany?",
      choices:["Paris","London","Berlin","Madrid"],
      answer:2
    },
    {
      question:"What is the capital of England?",
      choices:["Paris","London","Berlin","Madrid"],
      answer:1
    }
  ]

  let current_qn=0;
  let score_count=0;
  let selected_choice=null;

  start_quiz.addEventListener("click", function() {
    start_quiz.classList.add("hidden");
    result_container.classList.add("hidden");
    question_container.classList.remove("hidden");
    showQuestion();
  });

  function showQuestion(){
    question_text.textContent=`${current_qn+1}. ${questions[current_qn].question}`;
    choices.innerHTML="";

    questions[current_qn].choices.forEach((choice, index) => {
      const li=document.createElement("li");
      li.textContent=choice;
      li.className="bg-black/40 text-xl text-white p-3 mb-2 rounded-md cursor-pointer hover:bg-black/60";
      choices.appendChild(li);

      li.addEventListener("click", function(){
        Array.from(choices.children).forEach((child) => child.classList.remove("bg-sky-500/40"));
        li.classList.add("bg-sky-500/40");
        selected_choice=index;
      });
    });
  };

  next_qn.addEventListener("click", function(){
    if(selected_choice===null){
      alert("Please select an option");
      return;
    }

    if(selected_choice===questions[current_qn].answer)
    score_count++;

    current_qn++;
    selected_choice=null;

    if(current_qn<questions.length)
    showQuestion();
      
    else showResult();
  });

  function showResult(){
    question_container.classList.add("hidden");
    result_container.classList.remove("hidden");
    score.textContent=`Your score is ${score_count}/${questions.length}`;
  };

  restart_quiz.addEventListener("click", function(){
    current_qn=0;
    score_count=0;
    start_quiz.click();
  });
});