import React from 'react'

const PlayerHeader = () => {
  return (
    <header className='header_player'>
            <form>
            <div className="group_form">
            <input type="text" className='player_search_input' placeholder='Search among 100.000+ music tracks'/>
            <button className='player_btn_buscar'>
            <i className="fas fa-search" />
            </button>
            </div>
            </form>
        </header>
  )
}

export default PlayerHeader