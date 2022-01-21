function Main({ todoList }) {
    return (
        <div className="main-container">
            <div className='task-list-container'>
                <ul className="task-list">
                    {todoList.map( (task, i) => {
                        return (
                            <li key={i}>{task}</li>
                        )
                    })}
                </ul>
            </div>
        </div>
    )
}

export default Main;
