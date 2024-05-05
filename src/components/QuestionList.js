import React, { useEffect, useState } from "react";
import QuestionItem from "./QuestionItem";

function QuestionList() {  

  const [questions, setQuestions] = useState([])

  useEffect(() => {
    fetch("http://localhost:4000/questions")
      .then(res => res.json())
      .then(data => setQuestions(data))
  }, [])  

  function handleRemoveQuestionFromList(deletedQuestion) {
    const updatedQuestions = questions.filter(question => question.id !== deletedQuestion.id)
    setQuestions(updatedQuestions)
  }

  let renderQuestions = questions.map(question => {
    return <QuestionItem key= {question.id} question={question} handleRemoveQuestionFromList={handleRemoveQuestionFromList}/>
  })

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>
        {renderQuestions}
      </ul>
    </section>
  );
}

export default QuestionList;