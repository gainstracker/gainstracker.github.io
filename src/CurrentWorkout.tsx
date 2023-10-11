//import { today } from './App'
import type { Exercise, Workout, Sets } from './App'

function CurrentWorkout({ exercises, currentWorkout, setTodaysWorkout }: { exercises: Exercise[], currentWorkout: Workout, setTodaysWorkout: any }) {
    function addExercise() {
        //console.log("addExercise");
        //TODO check
        const newExercises = [...currentWorkout.exercises, { exercise: exercises[0], values: [0] }];
        setTodaysWorkout(newExercises);
    }

    function deleteExercise(index: number) {
        const newExercises = [...currentWorkout.exercises];
        newExercises.splice(index, 1);
        setTodaysWorkout(newExercises);
    }

    function updateSet(setsIndex: number, setIndex: number, value: number) {
        console.log("updateSet", setsIndex, setIndex, value);
        const newExercises = [...currentWorkout.exercises];
        if (newExercises[setsIndex].values.length - 1 === setIndex && value !== 0) {
            newExercises[setsIndex].values.push(0);
        }
        newExercises[setsIndex].values[setIndex] = value;
        setTodaysWorkout(newExercises);
    }

    console.log("currentWorkout", currentWorkout.exercises);

    return (
        <div className="Current-Workout">
            <div className="Exercise-List">
                {currentWorkout.exercises.map((exercise, index) => {
                    return (
                        <div className="Exercise-Item" key={index}>
                            <select className="Workout-Exercise-Name" onChange={(event) => console.log("updateExerciseName", index, event.target.value)}>
                                {exercises.map((exercise, index) => { return <option key={index}>{exercise.name}</option> })}
                            </select>
                            <div className="Workout-Exercise-Unit">{exercise.exercise.unit}</div>
                            {
                                exercise.values.map((value, setIndex) => {
                                    return (
                                        <div key={setIndex}>
                                            <input type="number" value={value} className="Exercise-Value" onChange={(event) => { updateSet(index, setIndex, +event.target.value) }} />
                                        </div>
                                    );
                                })
                            }
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