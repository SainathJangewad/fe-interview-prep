import { useRef, useState } from "react"
import Notification from "./Notification"
import './Notification.scss'


interface NotificationConfig {
    type: "error" | "info" | "success" | "warning"
    message: string,
    duration: number,
    animation: "slide" | "pop" | "fade",

}


export const useNotification = (position: string) => {
    const [notificationConfig, setNotificationConfig] = useState<NotificationConfig[]>([]);

    const triggerNotification = (config: NotificationConfig) => {
        const toastId = Date.now();

        setNotificationConfig((prev) => [...prev, { id: toastId, ...config }])
        setTimeout(() => {
            setNotificationConfig((prev) => {
                return prev.filter((notification) => notification.id !== toastId);
            })
        }, config?.duration);
    }


    const handleCose = (index: number) => {
        // we used spilce() here cuz it is faster in TC .
        // we could also use filter() but it is SLOW in TC.
        setNotificationConfig((prev) => {
            const updatedNotifications = [...prev]
            updatedNotifications.splice(index, 1);
            return updatedNotifications;
        })
    }

    const NotificationComponent =
        <div className={`${position} notification-container  ${position.split("-")[0]}  `}>
            {
                notificationConfig.map((notification, index) => {
                    return <Notification
                        key={notification.id}
                        type={notification.type}
                        message={notification.message}
                        animation={notification?.animation}
                        onClose={() => handleCose(index)}
                    />
                })
            }
        </div>


    return { triggerNotification, NotificationComponent };
}