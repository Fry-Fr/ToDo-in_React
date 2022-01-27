import { useState, useEffect } from 'react';
import { Modal, Button, Input } from 'antd';

import Main from './components/Main';

function App() {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isButtonVisible, setIsButtonVisible] = useState(false);
    const [username, setUsername] = useState('');
    const [changeUsername, setChangeUsername] = useState('');
    const [todoList, setToDoList] = useState([]);
    const [newToDo, setNewToDo] = useState('');

    const complete = (index) => {
        const newList = [...todoList]
        newList[index].completed = !newList[index].completed
        setToDoList(newList)
    }

    const handleClear = (e) => {
        const nodeList = document.querySelectorAll('.task-complete');
        nodeList.forEach(elem => elem.className = '')
        setToDoList(todoList.filter( item => !item.completed))
    }

    const handleAddToDo = (e) => {
        setToDoList([...todoList, {'toDo': newToDo, 'completed': false}]);
        setNewToDo('');
    }

    const handleNewToDo = (e) => {
        const task = e.target.value;
        setNewToDo(task);
    }

    const handleIsBtnVis = (e) => {
        setIsButtonVisible(!isButtonVisible);
    }

    const handleOnChange = (e) => {
        const name = e.target.value;
        setChangeUsername(name);
    }

    const showModal = () => {
        setIsModalVisible(true);
    };
    
    const handleOk = () => {
        setUsername(changeUsername);
        setIsButtonVisible(false);
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsButtonVisible(false);
        setIsModalVisible(false);
    };

    useEffect(() => {
        if (localStorage.length > 0 && todoList.length === 0) {
            const memList = []
            for (const key in localStorage) {
                if (key === 'key' || key === 'clear' || key === 'length' || key === 'getItem' || key === 'setItem' || key === 'removeItem') {
                    continue
                }else {
                    const value = localStorage.getItem(key)
                    memList.push({'toDo': key, 'completed': value === 'false' ? false : true})
                }
            }
            setToDoList(memList.slice(0).reverse())
        }
        if (todoList.length > 0) {
            todoList.forEach( item => {
                if (item.completed === true) {
                    localStorage.removeItem(`${item.toDo}`)
                }else {
                    localStorage.setItem(`${item.toDo}`, `${item.completed}`)
                }
            })
        }
        
    },[todoList])

    return (
        <div className='App'>
            <div className='head-container'>
                <Button type="primary" onClick={showModal} disabled={!isButtonVisible?true:false}>
                    User: {!username ? "Anonomous" : username}
                </Button>
                <div>
                    <h1 onClick={handleIsBtnVis} className='head-h1'><span className='hov-point'>{!username ? '' : username+"'s"}</span> To-Do List!</h1>
                </div>
            </div>
            <div style={{"width":"50%", "maxWidth":"600px", "textAlign":"center"}}>
                <Input placeholder="  ○ ... task" className='ant-input-add-todo' onPressEnter={handleAddToDo} onChange={handleNewToDo} value={newToDo} />
                <Button type='primary' className='add-todo-btn' onClick={handleAddToDo}>add</Button>
            </div>
            <Button style={{"margin":".5rem 0 0"}} onClick={handleClear}>clear</Button>
            <Main todoList={todoList} complete={complete} />
        <Modal title="Enter your name..." visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
            <Input placeholder="User?" onChange={handleOnChange} onPressEnter={handleOk} value={changeUsername} />
        </Modal>
        </div>
    )
};

export default App;
