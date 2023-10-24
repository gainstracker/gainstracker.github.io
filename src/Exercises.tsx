import { Exercise } from "./App";

function Exercises({ exercises, setExercises }: { exercises: Exercise[], setExercises: any }) {

  function addExercise() {
    const newExercises = [...exercises, { name: "New Exercise", units: [] }];
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

  function updateExerciseUnit(index: number, unitIndex: number, unit: string) {
    const newUnits = [...exercises[index].units];
    const newExercises = [...exercises];
    newUnits[unitIndex] = unit;
    newExercises[index].units = newUnits;
    setExercises(newExercises);
  }

  function addExerciseUnit(index: number, unit: string) {
    console.log("addExerciseUnit", index, unit);
    if (unit !== "None") {
      const newUnits = [...exercises[index].units, unit];
      const newExercises = [...exercises];
      newExercises[index].units = newUnits;
      setExercises(newExercises);
    }
  }

  return (
    <div className="Exercises">
      <div className="Exercise-List">{
        exercises.map((exercise, index) => {
          return (
            <div className="Exercise-Item" key={index}>
              <input type="text" className="Exercise-Name" value={exercise.name} onChange={(event) => updateExerciseName(index, event.target.value)} />
              {exercise.units.map((unit, unitIndex) => {
                return <select key={unitIndex} value={unit} className="Exercise-Unit" onChange={(event) => updateExerciseUnit(index, unitIndex, event.target.value)}>
                  <option value="Reps">Reps</option>
                  <option value="kg">kg</option>
                  <option value="Mins">Mins</option>
                  <option value="Steps">Steps</option>
                </select>
              })}
              <select key="end" value="None" className="Exercise-Unit" onChange={(event) => addExerciseUnit(index, event.target.value)}>
                <option value="None">None</option>
                <option value="Reps">Reps</option>
                <option value="kg">kg</option>
                <option value="Mins">Mins</option>
                <option value="Steps">Steps</option>
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