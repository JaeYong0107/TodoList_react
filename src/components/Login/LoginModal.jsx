
import './LoginModal.css';

export default function LoginModal() {
    return (
        <dialog>
            <h1>Todo App</h1>
            <form>
                <input type="texr" placeholder="ID를 입력하세요." />
                <input type="texr" placeholder="PASSWORD를 입력하세요." />
                <button >Log In</button>
            </form>
        </dialog>
    )
}