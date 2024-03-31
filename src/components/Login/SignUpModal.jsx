import { useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import './LoginModal.css';
import { loginActions, modalActions } from '../../store';
import { sendUserInfo } from '../../util/http';

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

    function submitHandler(e) {
        e.preventDefault();

        const fd = new FormData(e.target);
        const data = Object.fromEntries(fd.entries()); //{id:id, password:password, name:name}

        dispatch(loginActions.signUp(data));
    }

    return (
        <dialog ref={signUp}>
            <div className='dialog'>
                <h1>Todo App</h1>
                <form onSubmit={submitHandler}>
                    <input type='text' name='name' placeholder='이름을 입력해주세요.' />
                    <input type="text" name='id' placeholder="ID를 입력하세요." />
                    <input type="text" name='password' placeholder="PASSWORD를 입력하세요." />
                    <button type='submit' onClick={closeModal}>Sign Up</button>
                </form>
            </div>
        </dialog>
    )
}