import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import FormInsert from './FormInsert';

export default function ModalInsertUser({ modalUser,setModalUser,fetchDataUsers }) {
    const cerrarModal =()=>{
        setModalUser(false)
    }
  if ( modalUser){
    return (
        <div className="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
  
          <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
  
          <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-md sm:w-full relative">
          
            
                  <FormInsert setModalUser={setModalUser} fetchDataUsers={fetchDataUsers}></FormInsert>
            
          </div>
        </div>
      </div>
      );
  }
}