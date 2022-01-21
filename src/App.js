import { useState, useEffect } from 'react';
import { Modal, Button, Input } from 'antd';

function App() {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isButtonVisible, setIsButtonVisible] = useState(false);
    const [username, setUsername] = useState('');
    const [changeUsername, setChangeUsername] = useState('');

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
        window.addEventListener("load", (e) => {
            showModal();
        })
    },[])

    return (
        <div className='App'>
            <div className='head-container'>
                <Button type="primary" onClick={showModal} disabled={!isButtonVisible?true:false}>
                    User: {!username ? "Anonomous" : username}
                </Button>
                <h1 onClick={handleIsBtnVis}><span className='hov-point'>{!username ? '' : username+"'s"}</span> To-Do List!</h1>
            </div>
        <Modal title="Enter your name..." visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
            <Input placeholder="User?" onChange={handleOnChange} onPressEnter={handleOk} value={changeUsername} />
        </Modal>
        </div>
    )
};

export default App;
