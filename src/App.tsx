import React from 'react';
import { useState, useEffect } from 'react';
import Exercises from './Exercises';
import './App.css';


function App() {
  const [selectedContent, setSelectedContent] = useState('Current Workout');
  const [exercises, setExercises_] = useState([{ name: "New Exercise", unit: "reps" }]);

  useEffect(() => {
    // Load exercises from local storage
    let exercisesString = localStorage.getItem('exercises');
    let savedExercises: any[];
    if (exercisesString === null) {
      savedExercises = [];
    }
    else {
      savedExercises = JSON.parse(exercisesString);
    }
    setExercises(savedExercises);
  }, []); // Only run this effect once, on mount

  // Define setExercises function that also saves to local storage
  function setExercises(newExercises: any[]) {
    setExercises_(newExercises);
    localStorage.setItem('exercises', JSON.stringify(newExercises));
  }

  return (
    <div className="App">
      <MainSection selectedContent={selectedContent} exercises={exercises} setExercises={setExercises} />
      <BottomBar selectedContent={selectedContent} setSelectedContent={setSelectedContent} />
    </div>
  );
}

function MainSection({ selectedContent, exercises, setExercises }: { selectedContent: string, exercises: any[], setExercises: any }) {
  if (selectedContent === 'Current Workout') {
    return <CurrentWorkout />;
  }
  else if (selectedContent === 'Workout History') {
    return <WorkoutHistory />;
  }
  else if (selectedContent === 'Exercises') {
    return <Exercises exercises={exercises} setExercises={setExercises} />;
  }
  else {
    return <Error />;
  }
}


function BottomBar({ selectedContent, setSelectedContent }: { selectedContent: string, setSelectedContent: (selectedContent: string) => void }) {
  return (
    <div className="BottomBar">
      <BottomBarButton selectedContent={selectedContent} setSelectedContent={setSelectedContent} content='Current Workout' />
      <BottomBarButton selectedContent={selectedContent} setSelectedContent={setSelectedContent} content='Workout History' />
      <BottomBarButton selectedContent={selectedContent} setSelectedContent={setSelectedContent} content='Exercises' />
    </div>
  );
}

function BottomBarButton({ selectedContent, setSelectedContent, content }: { selectedContent: string, setSelectedContent: (selectedContent: string) => void, content: string }) {
  if (selectedContent === content) {
    return (
      <div className="BottomBar-Button BottomBar-Button-Selected" onClick={() => setSelectedContent(content)}>{content}</div>
    );
  }
  else {
    return (
      <div className="BottomBar-Button" onClick={() => setSelectedContent(content)}>{content}</div>
    );
  }
}

function CurrentWorkout() {
  return (
    <div className="CurrentWorkout">Current Workout</div>
  );
}

function WorkoutHistory() {
  return (
    <div className="WorkoutHistory">Workout History</div>
  );
}

function Error() {
  return (
    <div className="Error">Error</div>
  );
}

export default App;
