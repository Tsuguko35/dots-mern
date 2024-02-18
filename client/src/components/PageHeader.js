import React from 'react'
import '../styles/page_header.css'

function PageHeader({page}) {
  return (
    <header className='Header'>
        <h1 className='Header_SysTitle'>Dean's Office Transaction</h1>
        <span className='Header_PageTitle'>{page}</span>
    </header>
  )
}

export default PageHeader