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

    console.log("currentWorkout", currentWorkout.exercises);

    return (
        <div className="Current-Workout">
            <div className="Exercise-List">
                {currentWorkout.exercises.map((exercise, index) => {
                    return (
                        <div className="Exercise-Item" key={index}>
                            <select className="Exercise-Name" onChange={(event) => console.log("updateExerciseName", index, event.target.value)}>
                                {exercises.map((exercise, index) => { return <option key={index}>{exercise.name}</option> })}
                            </select>
                            <input type="number" className="Exercise-Value" onChange={(event) => console.log("updateExerciseValue", index, event.target.value)} />
                            <div className="Exercise-Delete" onClick={() => deleteExercise(index)}>X</div>
                        </div>
                    );
                })}
            </div>
            <div className="Add-Exercise-Button" onClick={addExercise}>Add Exercise</div>
        </div>
    );
}

export default CurrentWorkout;