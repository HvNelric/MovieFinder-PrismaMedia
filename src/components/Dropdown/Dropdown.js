import React, { useRef, useState } from 'react'

const Dropdown = ({ title, array, fnSetter, classTag, all, stateObj, stateValue }) => {

    const dropdownMenu = useRef()
    const [open, setOpen] = useState(false)

    const openDropdown = () => {
        setOpen(!open)
    }

    const handleClick = e => {
        const newStateObj = { ...stateObj }
        newStateObj[stateValue] = e.target.getAttribute('data-id')
        fnSetter(newStateObj)
        setOpen(!open);
        dropdownMenu.current.innerHTML = e.target.innerText;
    }

    return (
        <div className={`dropdown__container ${classTag}`} tabIndex={0} onBlur={()=> setOpen(false)}>
            <div ref={dropdownMenu} className={`dropdown__menu ${open ? 'active' : ''}`} onClick={openDropdown}>
                {title}
            </div>
            {
                open && <ul className="dropdown__content">
                            {
                                all && <li data-id="" onClick={handleClick}>Tous</li>
                            }
                            {
                                array.map(({name, id}, index) => (
                                    <li key={index} data-id={id} onClick={handleClick}>{name}</li>
                                ))
                            }      
                        </ul>
            }
            
        </div>
    )
}

export default Dropdown