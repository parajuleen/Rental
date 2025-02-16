import React from 'react'
const Pagination = ({totalItems,itemsPerpage,handlePage,currentPage}) => {

    const pages= []

    for(let i=1; i<=Math.ceil(totalItems/itemsPerpage);i++){
        pages.push(i)
    }

    



  return (
    <>
  <div className="flex flex-wrap justify-center gap-2 p-4">
 

  {pages.map((page) => (
    <button
      key={page}
      onClick={() => handlePage(page)}
      className={`px-4 py-2 rounded-lg border transition-all duration-200 
        ${page === currentPage ? "bg-blue-500 text-white border-blue-500" : "bg-white text-gray-700 border-gray-300 hover:bg-gray-200"}
      `}
     


    >
      {page}
    </button>
  ))}

</div>

    </>
  )
}

export default Pagination
