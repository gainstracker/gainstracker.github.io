import React from 'react';
import { useState } from 'react';
import './App.css';


function App() {
  const [selectedContent, setSelectedContent] = useState("current");
  return (
    <div className="App">
      <MainSection selectedContent={selectedContent} />
      <BottomBar selectedContent={selectedContent} setSelectedContent={setSelectedContent} />
    </div>
  );
}

function MainSection({ selectedContent }: { selectedContent: string }) {
  if (selectedContent === 'Current Workout') {
    return <CurrentWorkout />;
  }
  else if (selectedContent === 'Workout History') {
    return <WorkoutHistory />;
  }
  else if (selectedContent === 'Prepare Workouts') {
    return <PrepareWorkouts />;
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
      <BottomBarButton selectedContent={selectedContent} setSelectedContent={setSelectedContent} content='Prepare Workouts' />
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

function PrepareWorkouts() {
  return (
    <div className="PrepareWorkouts">Prepare Workouts</div>
  );
}

function Error() {
  return (
    <div className="Error">Error</div>
  );
}

export default App;
