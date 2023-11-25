import React from 'react'
import Dropdown from '@/Components/Dropdown';
import InputLabel from '@/Components/InputLabel'; 
const SwitchRoleLogin = ({role}) => {

  return (
    <div className='flex justify-center items-center'>
    <InputLabel htmlFor="LoginAs" value="Log in as" className='flex'/>
    <Dropdown>
        <Dropdown.Trigger>
            <div className="cursor-pointer">
                <span className='mx-2 text-sm underline text-slate-200'>{ role || 'Select One'}</span>
            </div>
        </Dropdown.Trigger>
        <Dropdown.Content>
            <Dropdown.Link href={route('login')}>Student</Dropdown.Link>
            <Dropdown.Link href={route('teacher.login')}>Teacher</Dropdown.Link>
            <Dropdown.Link href={route('admin.login')}>Admin</Dropdown.Link>
        </Dropdown.Content>
    </Dropdown>

</div>                

  )
}

export default SwitchRoleLogin
