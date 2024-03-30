import { useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import './LoginModal.css';
import { modalActions } from '../../store';

export default function SignUpModal({ open }) {
    const signUp = useRef();
    const dispatch = useDispatch();

    useEffect(() => {
        if (open) {
            signUp.current.showModal();
        } else {
            signUp.current.close();
        }
    }, [open])

    function closeModal() {
        dispatch(modalActions.closeSignUpModal())
    }

    return (
        <dialog ref={signUp}>
            <div className='dialog'>
                <h1>Todo App</h1>
                <form>
                    <input type="texr" placeholder="ID를 입력하세요." />
                    <input type="texr" placeholder="PASSWORD를 입력하세요." />
                    <button onClick={closeModal}>Sign Up</button>
                </form>
            </div>
        </dialog>
    )
}