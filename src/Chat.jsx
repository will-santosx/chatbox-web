/* eslint-disable no-unused-vars */
import { FcSms } from 'react-icons/fc';
import { RiSendPlane2Fill } from 'react-icons/ri';
import FakeGroups from './components/FakeGroups';
import MessageClient from './components/MessageClient';
import { useState, useEffect, useRef } from 'react';
import { databaseApp, auth } from './data/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { addDoc, deleteDoc, doc, collection, limit, orderBy, query, serverTimestamp } from 'firebase/firestore';
import { Navigate } from 'react-router-dom';
import { ScaleLoader } from 'react-spinners'

function Chat() {

  const [user, loading] = useAuthState(auth);

  const [inputMessage, setInputMessage] = useState("");
  const messageRef = collection(databaseApp, "messages");
  const queryMessages = query(messageRef, orderBy("createdAt"), limit(32));
  const [messages] = useCollectionData(queryMessages, { idField: "messageId" });
  const [sendingMessage, setSendingMessage] = useState(false)

  const chatContainerRef = useRef(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  async function sendMessage(e) {
    const { photoURL, uid, displayName } = auth.currentUser;
    e.preventDefault();
    setSendingMessage(true)

    await addDoc(messageRef, {
      userName: displayName,
      messageText: inputMessage,
      userID: uid,
      profileImage: photoURL,
      createdAt: serverTimestamp()
    })

    setSendingMessage(false)
    setInputMessage("");
  }

  function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  if (loading) {
    return (
      <div className="bg-gradient-to-tl from-blue-500 to-blue-600 w-screen h-screen flex items-center justify-center">
        <main className="w-[85%] h-[85%] bg-gray-800 rounded-md shadow-md border-2 flex-col gap-3 flex items-center justify-center border-gray-700 overflow-hidden text-gray-400">
          <ScaleLoader height={27} width={16} color='#34d399' />
          <span>Carregando...</span>
        </main>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/" />;
  }


  return (
    <>
      <div className="bg-gradient-to-tl from-blue-500 to-blue-600 w-screen h-screen flex items-center justify-center">
        <main className="md:w-[85%] w-[95%] h-[85%] bg-gray-800 rounded-md shadow-md border-2 border-gray-700 overflow-hidden text-gray-400">
          <header className='w-full bg-gray-900 h-6 pt-1 px-2 flex content-between'>
            <span className="font-extrabold text-xs">GroupChat <span className="max-sm:hidden">| Account Name: {auth.currentUser?.displayName}</span></span>
          </header>
          <div className='h-[calc(100%-24px)] flex'>
            <aside className="max-sm:hidden w-[7%] h-full bg-gray-900">
              <div className="w-full flex-col px-1 py-2 flex items-center gap-5 justify-center">
                <div title='Grupo Principal' className="bg-gray-800 rounded-xl w-[3rem] h-[3rem] flex items-center justify-center cursor-pointer">
                  <FcSms className='text-2xl' />
                </div>
                <FakeGroups />
                <FakeGroups />
                <FakeGroups />
                <FakeGroups />
              </div>
            </aside>
            <main className='flex-1 flex flex-col justify-between py-5 px-5'>
              <div ref={chatContainerRef} className='w-full h-full overflow-auto mb-6 flex flex-col gap-5 md:p-3'>
                <span className='text-center bg-gray-700 p-1 rounded-sm shadow-sm'>Seja bem-vindo(a) ao GroupChat.</span>
                {messages &&
                  messages.map((msg, index) => (
                    <MessageClient
                      userName={msg.userName}
                      createdAt={msg.createdAt}
                      messageText={msg.messageText}
                      userID={msg.userID}
                      color={getRandomColor()}
                      profileImage={msg.profileImage}
                      key={index}
                    />
                  ))}
              </div>
              <form onSubmit={sendingMessage ? null : (e) => sendMessage(e)} className='w-full flex items-center gap-2'>
                <input
                  className='bg-gray-700 rounded-md p-3 md:w-[100%] h-[42px] focus:outline-none focus:shadow-md w-[100%]'
                  placeholder='Send a message...'
                  disabled={sendingMessage ? true : false}
                  onChange={(e) => setInputMessage(e.target.value)}
                  value={inputMessage}
                />
                <button disabled={sendingMessage ? true : false} type='submit'
                  className="bg-emerald-400 disabled:bg-emerald-600 disabled:hover:cursor-not-allowed transition-colors hover:bg-emerald-500 text-white 
                  p-2 h-[42px] w-[52px] md:w-[62px] flex items-center justify-center rounded-md text-xl"
                >
                  <RiSendPlane2Fill />
                </button>
              </form>
            </main>
          </div>
        </main>
      </div>
    </>
  )
}

export default Chat
