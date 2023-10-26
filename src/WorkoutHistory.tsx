import { Workout } from './App';

function WorkoutHistory({ workouts }: { workouts: Workout[] }) {
    return (
        <div className="WorkoutHistory">
            {
                workouts.filter((workout) => workout.exercises.length > 0).map((workout, index) => {
                    return (<SingleWorkout workout={workout} key={index} />);
                })
            }
        </div >
    );
}

function SingleWorkout({ workout }: { workout: Workout }) {
    return (<div className="SingleWorkout">
        <div className="Workout-Date">{workout.date}</div>
        <div className="Workout-Exercises">
            {workout.exercises.map((exercise, index) => {
                return (<span className="Workout-Exercise" key={index}>
                    {exercise.exercise.name}:&nbsp;
                    <span className="Workout-Exercise-Sets">
                        {exercise.values.map((set, index) => {
                            return (<span className="Workout-Exercise-Set" key={index}>
                                {set.map((measurement, index) => {
                                    return (<span className="Workout-Exercise-Measurement" key={index}>{measurement} {exercise.exercise.units[index]}</span>);
                                })},
                            </span>);
                        })}
                    </span>
                </span>);
            })}
        </div>
    </div>);
}

export default WorkoutHistory;