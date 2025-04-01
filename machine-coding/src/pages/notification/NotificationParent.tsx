import { useNotification } from "./useNotification";

export const NotificationParent = () => {
    const { NotificationComponent, triggerNotification } = useNotification("top-right");

    return <div style={{ margin: '4rem' }}>
        {NotificationComponent}
        <button onClick={() => triggerNotification({ type: 'success', message: 'success msg', duration: 5000, animation: 'pop' })}>success</button>
        <button onClick={() => triggerNotification({ type: 'error', message: 'error msg', duration: 5000, animation: 'fade' })}>error</button>
        <button onClick={() => triggerNotification({ type: 'info', message: 'info msg', duration: 5000 })}>info</button>
        <button onClick={() => triggerNotification({ type: 'warning', message: 'warning msg', duration: 3000 })}>warning</button>
    </div>
}