import React from 'react'
import Dropdown from '@/Components/Dropdown';
import InputLabel from '@/Components/InputLabel'; 
const SwitchRole = ({role}) => {
  return (
    <div className='flex justify-center items-center'>
    <InputLabel htmlFor="SignUpAs" value="Sign Up as" className='flex'/>

    <Dropdown>
        <Dropdown.Trigger>
            <div className="cursor-pointer">
                <span className='mx-2 text-sm underline text-slate-200'>{ role || 'Select One'}</span>
            </div>
        </Dropdown.Trigger>
        <Dropdown.Content>
            <Dropdown.Link href={route('register')}>Student</Dropdown.Link>
            <Dropdown.Link href={route('teacher_register_form')}>Teacher</Dropdown.Link>
            <Dropdown.Link href={route('teacher_register_form')}>Admin</Dropdown.Link>
        </Dropdown.Content>
    </Dropdown>

</div>                

  )
}

export default SwitchRole
