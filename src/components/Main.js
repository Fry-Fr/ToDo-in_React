function Main({ todoList, complete }) {
    const toggleChecked = (e) => {
        const task = e.target;
        complete(task.id)
        if (task.className === "task-complete") {
            return task.className = '';
        }
        task.className = 'task-complete';

    }

    return (
        <div className="main-container">
            <div className='task-list-container'>
                <ul className="task-list">
                    {todoList.map( (task, i) => {
                        return (
                            <li id={i} onClick={toggleChecked} key={i}>{task.toDo}</li>
                        )
                    })}
                </ul>
            </div>
        </div>
    )
}

export default Main;
