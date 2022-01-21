function Main({ todoList }) {
    const toggleChecked = (e) => {
        const task = e.target;
        if (task.className === "task-complete") {
            return task.className = ''
        }
        task.className = 'task-complete';
    }

    return (
        <div className="main-container">
            <div className='task-list-container'>
                <ul className="task-list">
                    {todoList.map( (task, i) => {
                        return (
                            <li onClick={toggleChecked} key={i}>{task}</li>
                        )
                    })}
                </ul>
            </div>
        </div>
    )
}

export default Main;
