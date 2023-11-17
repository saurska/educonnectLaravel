import { useEffect } from 'react';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import SwitchRole from '@/Components/SwitchRole';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Register({classes, semesters}) {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        class: '',
        enrollment_no: '',
        semester: '',
        signupAs:'Student',
    });

    useEffect(() => {
        return () => {
            reset('password', 'password_confirmation');
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();

        post(route('register'));
    };

    return (
        <GuestLayout>
            <Head title="Register" />

            <form onSubmit={submit}>
                <SwitchRole role= {data.signupAs}/>
                <div>
                    <InputLabel htmlFor="name" value="Name" />

                    <TextInput
                        id="name"
                        name="name"
                        value={data.name}
                        className="mt-1 block w-full"
                        autoComplete="name"
                        isFocused={true}
                        onChange={(e) => setData('name', e.target.value)}
                        required
                    />

                    <InputError message={errors.name} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="email" value="Email" />

                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full"
                        autoComplete="username"
                        onChange={(e) => setData('email', e.target.value)}
                        required
                    />

                    <InputError message={errors.email} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="password" value="Password" />

                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full"
                        autoComplete="new-password"
                        onChange={(e) => setData('password', e.target.value)}
                        required
                    />

                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="password_confirmation" value="Confirm Password" />

                    <TextInput
                        id="password_confirmation"
                        type="password"
                        name="password_confirmation"
                        value={data.password_confirmation}
                        className="mt-1 block w-full"
                        autoComplete="new-password"
                        onChange={(e) => setData('password_confirmation', e.target.value)}
                        required
                    />

                    <InputError message={errors.password_confirmation} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="enrollment_no" value="Enrollment No" />

                    <TextInput
                        id="enrollment_no"
                        name="enrollment_no"
                        value={data.enrollment_no}
                        className="mt-1 block w-full"
                        onChange={(e) => setData('enrollment_no', e.target.value)}
                        required
                    />

                    <InputError message={errors.enrollment_no} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="class" value="Class" />

                    <select
                        id="class"
                        name="class"
                        value={data.class}
                        className="mt-1 block w-full rounded-lg bg-transparent text-slate-200"
                        onChange={(e) => setData('class', e.target.value)}
                        required
                    > 
                <option value="" className="text-sm text-black">Select One</option>
                {classes.map((classItem) => (
                    <option key={classItem.id} value={classItem.name} className="text-sm text-black">
                        {classItem.name}
                    </option>
                ))}
                    
                    </select>

                    <InputError message={errors.class} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="semester" value="Semester" />

                    <select
                        id="semester"
                        name="semester"
                        value={data.semester}
                        className="mt-1 block w-full bg-transparent text-slate-200 rounded-lg"
                        onChange={(e) => setData('semester', e.target.value)}
                        required
                    >
                <option value="" className='text-sm text-black'>Select One</option>
                 {semesters.map((semester) => (
                    <option key={semester.id} value={semester.name} className='text-sm text-black'>
                        {semester.name}
                    </option>
                ))}
                    </select>

                    <InputError message={errors.class} className="mt-2" />
                </div>

                <div className="flex items-center justify-end mt-4">
                    <Link
                        href={route('login')}
                        className="underline text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800"
                    >
                        Already registered?
                    </Link>

                    <PrimaryButton className="ml-4" disabled={processing}>
                        Register
                    </PrimaryButton>
                </div>
            </form>

        </GuestLayout>
    );
}
