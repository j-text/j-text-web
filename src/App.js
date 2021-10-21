import './App.css';
import React, {useEffect, useState} from 'react';
import Modal from 'react-modal'

function App() {

    let subtitle;
    const [textList, setTextList] = useState([]);
    const [content, setContent] = useState('');
    const [modalIsOpen, setIsOpen] = useState(false);

    const customStyles = {
        content : {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)'
        }
    }

    const handleSubmit = (evt) => {
        evt.preventDefault()
        const requestOptions = {
            method : 'POST',
            headers : { 'Content-Type' : 'application/json' },
            body : JSON.stringify({ content : content })
        }
        fetch('/api/text', requestOptions)
            .then(resp => resp.json())
            .then((result) => {
                console.log('등록완료')
                console.log(result)
                setContent('')
                refreshTextList()
            }, (error) => {
                console.log('error');
                console.log(error);
            })
    }

    const openModal = () => {
        setIsOpen(true);
    }

    const afterOpenModal = () => {
        subtitle.style.color = 'f#000';
    }

    const closeModal = () => {
        setIsOpen(false);
    }

    useEffect(() => {
        refreshTextList()
    }, [])

    const refreshTextList = () => {
        fetch("/api/text/all")
            .then(resp => resp.json())
            .then((result) => {
                console.log('success')
                console.log(result)
                setTextList(result)
            }, (error) => {
                console.log('error')
                console.log(error)
            })
    }

    return (
    <div className="App">
        <header className="App-header">힘이 되는 글</header>
        <section>
            <ul>
                {textList.map(text => (
                    <li key={text.id}>{text.content}</li>
                ))}
            </ul>
        </section>
        <section>
            <div>
                <button onClick={openModal}>open modal</button>
                <Modal
                    isOpen={modalIsOpen}
                    onAfterOpen={afterOpenModal}
                    onRequestClose={closeModal}
                    style={customStyles}
                    contentLabel="Example modal"
                >
                    <h2 ref={(_subtitle) => subtitle = _subtitle}>Hello</h2>
                    <button onClick={closeModal}>close</button>
                    <div>글 등록</div>
                    <form onSubmit={handleSubmit}>
                        <label>
                            내용:
                            <input
                                type="text"
                                value={content}
                                onChange={e => setContent(e.target.value)}
                            />
                        </label>
                        <input type="submit" value="등록"/>
                    </form>
                </Modal>
            </div>
        </section>
    </div>
  );
}

export default App;
