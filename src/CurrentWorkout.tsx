//import { today } from './App'
import type { Exercise, Workout } from './App'

function CurrentWorkout({ exercises, currentWorkout, setTodaysWorkout }: { exercises: Exercise[], currentWorkout: Workout, setTodaysWorkout: any }) {
    function addExercise() {
        //console.log("addExercise");
        //TODO check
        if (exercises !== undefined && exercises.length > 0) {
            const newExercises = [...currentWorkout.exercises, { exercise: exercises[0], values: [[0]] }];
            setTodaysWorkout(newExercises);
        }
    }

    function updateExercise(index: number, exercise: Exercise | undefined) {
        if (exercise === undefined) { return; }
        const newExercises = [...currentWorkout.exercises];
        newExercises[index].exercise = exercise;
        setTodaysWorkout(newExercises);
    }

    function switchExercises(index1: number, index2: number) {
        const newExercises = [...currentWorkout.exercises];
        const temp = newExercises[index1];
        newExercises[index1] = newExercises[index2];
        newExercises[index2] = temp;
        setTodaysWorkout(newExercises);
    }

    function deleteExercise(index: number) {
        const newExercises = [...currentWorkout.exercises];
        newExercises.splice(index, 1);
        setTodaysWorkout(newExercises);
    }

    function updateSet(setsIndex: number, setIndex: number, mesurementIndex: number, value: number) {
        //console.log("updateSet", setsIndex, setIndex, value);
        const newExercises = [...currentWorkout.exercises];
        if (newExercises[setsIndex].values.length - 1 === setIndex && value !== 0) {
            var measurements = [];
            for (var i = 0; i < newExercises[setsIndex].exercise.units.length; i++) {
                measurements.push(0);
            }
            newExercises[setsIndex].values.push(measurements);
        }
        newExercises[setsIndex].values[setIndex][mesurementIndex] = value;
        setTodaysWorkout(newExercises);
    }

    //if (currentWorkout.exercises.length > 0) { console.log("currentWorkout", currentWorkout.exercises[0].values) }

    return (
        <div className="Current-Workout">
            <div className="Exercise-List">
                {currentWorkout.exercises.map((exercise, index) => {
                    return (
                        <div className="Exercise-Item" key={index}>

                            <select className="Workout-Exercise-Name" value={exercise.exercise.name} onChange={(event) => updateExercise(index, exercises.find((exercise) => exercise.name === event.target.value))}>
                                {exercises.map((exercise, index) => { return <option value={exercise.name}>{exercise.name}</option> })}
                            </select>
                            {
                                exercise.values.map((set, setIndex) => {
                                    return exercise.exercise.units.map((unit, unitIndex) => {
                                        return [<div className="Workout-Exercise-Unit">{unit}</div>,
                                        <input type="number" value={exercise.values[setIndex][unitIndex]} className="Exercise-Value" onChange={(event) => { updateSet(index, setIndex, unitIndex, +event.target.value) }} />
                                        ]
                                    })
                                })
                            }
                            {(index !== 0) ? <div className="Exercise-Move" onClick={() => switchExercises(index - 1, index)}>Up</div> : null}
                            {(index !== currentWorkout.exercises.length - 1) ? <div className="Exercise-Move" onClick={() => switchExercises(index, index + 1)}>Down</div> : null}
                            <div className="Exercise-Delete" onClick={() => deleteExercise(index)}>X</div>
                        </div>
                    );
                })}
            </div>
            <div className="AddExercise-Button" onClick={addExercise}>Add Exercise</div>
        </div>
    );
}

export default CurrentWorkout;