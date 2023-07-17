/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
// eslint-disable-next-line react/prop-types
import { auth } from "../data/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { format } from 'date-fns';
import { FaTrash } from 'react-icons/fa'

const MessageClient = ({ messageText, userID, profileImage, userName, createdAt, color }) => {

    const currentUser = useAuthState(auth)[0];

    const isCurrentUserMessage = currentUser?.uid === userID;

    const formattedCreatedAt = createdAt ? format(createdAt.toDate(), 'dd/MM/yyyy HH:mm') : null;

    return (
        <div className={`w-full flex ${isCurrentUserMessage ? "justify-end" : null}`}>
            <div className={`flex p-1 animate-jump-in animate-once border-2 border-gray-600 animate-duration-200 animate-ease-linear flex-col gap-3 ${isCurrentUserMessage ? "bg-gray-900" : "bg-gray-700"} md:px-5 md:py-3 rounded-md w-fit`}>
                <header className="flex gap-2 md:gap-4 items-center">
                    <img className={`md:w-[42px] w-[32px] rounded-full border-[${color}] border-2`} src={profileImage}></img>
                    <h3 className="font-semibold text-base md:text-lg">{userName}</h3>
                </header>
                <main>
                    <p className="font-medium max-w-xs md:max-w-lg" style={{ wordWrap: 'break-word' }}>{messageText}</p>
                </main>
                <footer className="flex w-full justify-between">
                    <span className="text-[12px] md:text-[10px]">{formattedCreatedAt}</span>
                </footer>
            </div>
        </div>
    )
}

export default MessageClient