import './Notification.scss' 
import { FaInfoCircle } from "react-icons/fa";
import { CiWarning } from "react-icons/ci";
import { VscError } from "react-icons/vsc";
import { FaRegCircleCheck } from "react-icons/fa6";
import { AiOutlineClose } from "react-icons/ai";
import {useRef,useEffect} from 'react';

interface NotificationProps {
    type: "error" | "info" | "success" | "warning",
    message: string,
    animation:"slide"|"pop"|"fade",
    onClose: () => void,
}

const icons={
    error:<VscError/>,
    info:<FaInfoCircle/>,
    success:<FaRegCircleCheck />,
    warning:<CiWarning/>,
}
const Notification: React.FC<NotificationProps> = ({ type, message, onClose,animation="slide" }) => {
      const notifRef = useRef<HTMLDivElement>(null);
 
     // Use different roles for different notification types
    const ariaRole = type === "error" || type === "warning" ? "alert" : "status";
    const ariaLive = type === "error" || type === "warning" ? "assertive" : "polite";


        useEffect(() => {
        // Focus the notification when it appears
        if (notifRef.current) {
            notifRef.current.focus();
        }
 
    }, []);
 
    return <div
        className={`notification
         ${type} ${animation}`}
         tabIndex={-1}
         ref={notifRef}
            role={ariaRole} 
            aria-live={ariaLive}
        >
        <span className="icon">
            {
                icons[type]
            }
        </span>
        <span className='message'>{message}</span>
        <button className='close-btn' onClick={onClose}><AiOutlineClose/></button>
    </div>
}

export default Notification;

/*
✅ Critical messages (error/warning) use aria-live="assertive" → Announced immediately
✅ Non-urgent messages (success/info) use aria-live="polite" → Announced without interruption
✅ role="alert" only for error and warning → Ensures immediate user awareness
✅ role="status" for success and info → Prevents unnecessary interruptions

Now it's fully optimized for accessibility!
*/