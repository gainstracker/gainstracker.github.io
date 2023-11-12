//import React from 'react';
import { useState, useEffect } from 'react';
import Exercises from './Exercises';
import CurrentWorkout from './CurrentWorkout';
import WorkoutHistory from './WorkoutHistory';
import './App.css';

const weekday = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function today() {
  let date = new Date();
  return weekday[date.getDay()] + ' ' + date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
}

type Workout = { date: string, exercises: Sets[] };
type Sets = { exercise: Exercise, values: number[][] };
type Exercise = { name: string, units: string[] };

function App() {
  const [selectedContent, setSelectedContent] = useState('Current Workout');
  const [exercises, setExercises_] = useState([{ name: "New Exercise", units: [] }]);
  const [workouts, setWorkouts_] = useState<Workout[]>([{ date: today(), exercises: [] }]);

  useEffect(() => {
    // Load exercises and workouts from local storage
    let exercisesString = localStorage.getItem('exercises');
    let savedExercises: any[];
    if (exercisesString === null) {
      savedExercises = [];
    } else {
      savedExercises = JSON.parse(exercisesString);
    }
    setExercises(savedExercises);

    let workoutsString = localStorage.getItem('workouts');
    let savedWorkouts: Workout[];
    if (workoutsString === null) {
      savedWorkouts = [{ date: today(), exercises: [] }];
    } else {
      savedWorkouts = JSON.parse(workoutsString);
      if (savedWorkouts.length === 0) {
        savedWorkouts = [{ date: today(), exercises: [] }];
      } else if (savedWorkouts.slice(-1)[0].date !== today()) {
        savedWorkouts.push({ date: today(), exercises: [] });
      }
    }
    setWorkouts(savedWorkouts);
  }, []); // Only run this effect once, on mount

  // Define setExercises function that also saves to local storage
  function setExercises(newExercises: any[]) {
    setExercises_(newExercises);
    localStorage.setItem('exercises', JSON.stringify(newExercises));
  }

  // Define setWorkouts function that also saves to local storage
  function setWorkouts(newWorkouts: Workout[]) {
    setWorkouts_(newWorkouts);
    localStorage.setItem('workouts', JSON.stringify(newWorkouts));
  }

  function setTodaysWorkout(todaysSets: Sets[]) {
    //console.log("setTodaysWorkout", todaysSets);
    //console.log("workouts", workouts);
    if (today() === workouts.slice(-1)[0].date) {
      const newWorkouts = [...workouts];
      newWorkouts[newWorkouts.length - 1] = { date: today(), exercises: todaysSets };
      setWorkouts(newWorkouts);
    }
    else {
      const newWorkouts = [...workouts, { date: today(), exercises: todaysSets }];
      setWorkouts(newWorkouts);
    }
  }

  return (
    <div className="App">
      <MainSection selectedContent={selectedContent} exercises={exercises} setExercises={setExercises} workouts={workouts} setTodaysWorkout={setTodaysWorkout} />
      <BottomBar selectedContent={selectedContent} setSelectedContent={setSelectedContent} />
    </div>
  );
}

function MainSection({ selectedContent, exercises, setExercises, workouts, setTodaysWorkout }: { selectedContent: string, exercises: Exercise[], setExercises: any, workouts: Workout[], setTodaysWorkout: any }) {
  if (selectedContent === 'Current Workout') {
    // TODO: make sure the date is correct
    return <CurrentWorkout exercises={exercises} currentWorkout={workouts.slice(-1)[0]} setTodaysWorkout={setTodaysWorkout} />;
  }
  else if (selectedContent === 'Workout History') {
    return <WorkoutHistory workouts={workouts} />;
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

function Error() {
  return (
    <div className="Error">Error</div>
  );
}

export default App;
export { today };
export type { Exercise, Workout, Sets };
