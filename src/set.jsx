import React from 'react'

const set = () => {
  return (
   
    {isSidebarOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-90 z-50 flex flex-col">
          {/* Top bar with close button */}
          <div className="flex justify-between items-center p-4 bg-gray-900 text-white shadow-md">
           
            <button
              onClick={closeSidebar}
              className="text-[1.5rem] font-semibold"
            >
              ✖
            </button>
          </div>

          {/* Sidebar content */}
          <div className="flex flex-col items-start p-6 text-white">
            {user ? <h1>user h </h1>
            
            : 
            
            <h1>user nhi h</h1>}
           
              
            
          </div>
        </div>
      )}

  )
}

export default set