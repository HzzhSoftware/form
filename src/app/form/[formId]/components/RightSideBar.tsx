import React from 'react'

const RightSideBar = () => {
  return (
    <aside className="w-80 bg-white border-l p-4">
    <h2 className="text-lg font-bold mb-4">Card Options</h2>
    <div className="space-y-4">
      <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">Edit</button>
      <button className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700">Delete</button>
      <button className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700">View Submissions</button>
    </div>
  </aside>
  )
}

export default RightSideBar