import { Exercise } from "./App";

function Exercises({ exercises, setExercises }: { exercises: Exercise[], setExercises: any }) {

  function addExercise() {
    const newExercises = [...exercises, { name: "New Exercise", unit: "reps" }];
    setExercises(newExercises);
  }

  function deleteExercise(index: number) {
    const newExercises = [...exercises];
    newExercises.splice(index, 1);
    setExercises(newExercises);
  }

  function updateExerciseName(index: number, name: string) {
    const newExercises = [...exercises];
    newExercises[index].name = name;
    setExercises(newExercises);
  }

  function updateExerciseUnit(index: number, unit: string) {
    const newExercises = [...exercises];
    newExercises[index].unit = unit;
    setExercises(newExercises);
  }


  return (
    <div className="Exercises">
      <div className="Exercise-List">{
        exercises.map((exercise, index) => {
          return (
            <div className="Exercise-Item" key={index}>
              <input type="text" className="Exercise-Name" value={exercise.name} onChange={(event) => updateExerciseName(index, event.target.value)} />
              <select className="Exercise-Unit" onChange={(event) => updateExerciseUnit(index, event.target.value)}>
                <option value="reps">reps</option>
                <option value="mins">mins</option>
              </select>
              <div className="Exercise-Delete" onClick={() => deleteExercise(index)}>X</div>
            </div>
          );
        })}
      </div>
      <div className="AddExercise-Button" onClick={addExercise}> Add Exercise </div>
    </div>
  );
}

export default Exercises;