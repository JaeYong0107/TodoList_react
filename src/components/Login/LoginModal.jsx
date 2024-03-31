import { useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import './LoginModal.css';
import { loginActions, modalActions } from '../../store';

export default function LoginModal({ open, users }) {
    const login = useRef();
    const dispatch = useDispatch();

    useEffect(() => {
        if (open) {
            login.current.showModal();
        } else {
            login.current.close();
        }
    }, [open])

    function closeModal() {
        dispatch(modalActions.closeLoginModal())
    }

    function submitHandler(e) {
        e.preventDefault();

        const fd = new FormData(e.target);
        const data = Object.fromEntries(fd.entries()); //{id:id, password:password, name:name}

        console.log(users[0].id)
        console.log(data)
        const existing = users.find((user) => (user.id === data.id && user.password === data.password));

        if (existing) {
            dispatch(loginActions.login(existing));
            console.log('실행!')
        }


    }

    return (
        <dialog ref={login}>
            <div className='dialog'>
                <h1>Todo App</h1>
                <form onSubmit={submitHandler}>
                    <input type="texr" name='id' placeholder="ID를 입력하세요." />
                    <input type="texr" name='password' placeholder="PASSWORD를 입력하세요." />
                    <button onClick={closeModal}>Log In</button>
                </form>
            </div>
        </dialog>
    )
}