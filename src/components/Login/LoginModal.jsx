import { useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import './LoginModal.css';
import { modalActions } from '../../store';

export default function LoginModal({ open }) {
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

    return (
        <dialog ref={login}>
            <div className='dialog'>
                <h1>Todo App</h1>
                <form>
                    <input type="texr" placeholder="ID를 입력하세요." />
                    <input type="texr" placeholder="PASSWORD를 입력하세요." />
                    <button onClick={closeModal}>Log In</button>
                </form>
            </div>
        </dialog>
    )
}