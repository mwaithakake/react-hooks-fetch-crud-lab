
import React from "react";

function QuestionItem({ question, handleRemoveQuestionFromList }) {
  const { id, prompt, answers, correctIndex } = question;

  const options = answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ));

  function handleDelete() {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "DELETE"
    })
    .then(res => res.json())
    .then(() => handleRemoveQuestionFromList(question))
  }

  function handleUpdate(index) {    
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        correctIndex: index
      })
    })
    .then(res => res.json())
    .then(updatedQuestion => console.log("Updated Question:", updatedQuestion))
  }

  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select defaultValue={correctIndex} onChange={e => handleUpdate(e.target.value)}>{options}</select>
      </label>
      <button onClick={handleDelete}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;
