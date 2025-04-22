// import React from "react";
// import { useForm } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
// import * as Yup from "yup";

// const schema = Yup.object().shape({
//     fullName: Yup.string().required("Full name is required"),
//     email: Yup.string().email().required("Email is required"),
//     password: Yup.string().min(6).required("Password is required"),
//     age: Yup.number().min(1).max(100).required("Age is required"),
//     birthDate: Yup.date().required("Birth date is required"),
//     time: Yup.string().required("Time is required"),
//     gender: Yup.string().required("Gender is required"),
//     hobbies: Yup.array().min(1, "Select at least one hobby"),
//     country: Yup.string().required("Country is required"),
//     bio: Yup.string().required("Bio is required"),
//     acceptTerms: Yup.bool().oneOf([true], "You must accept terms"),
//     file: Yup.mixed().required("File is required"),
// });

// export default function FullForm() {
//     const {
//         register,
//         handleSubmit,
//         formState: { errors },
//     } = useForm({
//         resolver: yupResolver(schema),
//     });

//     const onSubmit = (data: any) => {
//         console.log("Form data:", data);
//     };

//     return (
//         <form onSubmit={handleSubmit(onSubmit)} style={{ display: "grid", gap: "1rem", maxWidth: 400 }}>
//             <div>
//                 <label>Full Name:</label>
//                 <input type="text" {...register("fullName")} />
//                 <p>{errors.fullName?.message}</p>
//             </div>

//             <div>
//                 <label>Email:</label>
//                 <input type="email" {...register("email")} />
//                 <p>{errors.email?.message}</p>
//             </div>

//             <div>
//                 <label>Password:</label>
//                 <input type="password" {...register("password")} />
//                 <p>{errors.password?.message}</p>
//             </div>

//             <div>
//                 <label>Age:</label>
//                 <input type="number" {...register("age")} />
//                 <p>{errors.age?.message}</p>
//             </div>

//             <div>
//                 <label>Birth Date:</label>
//                 <input type="date" {...register("birthDate")} />
//                 <p>{errors.birthDate?.message}</p>
//             </div>

//             <div>
//                 <label>Time:</label>
//                 <input type="time" {...register("time")} />
//                 <p>{errors.time?.message}</p>
//             </div>

//             <div>
//                 <label>Gender:</label>
//                 <label>
//                     <input type="radio" value="male" {...register("gender")} /> Male
//                 </label>
//                 <label>
//                     <input type="radio" value="female" {...register("gender")} /> Female
//                 </label>
//                 <p>{errors.gender?.message}</p>
//             </div>

//             <div>
//                 <label>Hobbies:</label>
//                 <label>
//                     <input type="checkbox" value="reading" {...register("hobbies")} /> Reading
//                 </label>
//                 <label>
//                     <input type="checkbox" value="sports" {...register("hobbies")} /> Sports
//                 </label>
//                 <label>
//                     <input type="checkbox" value="music" {...register("hobbies")} /> Music
//                 </label>
//                 <p>{errors.hobbies?.message}</p>
//             </div>

//             <div>
//                 <label>Country:</label>
//                 <select {...register("country")}>
//                     <option value="">Select...</option>
//                     <option value="india">India</option>
//                     <option value="usa">USA</option>
//                     <option value="japan">Japan</option>
//                 </select>
//                 <p>{errors.country?.message}</p>
//             </div>

//             <div>
//                 <label>Bio:</label>
//                 <textarea {...register("bio")} />
//                 <p>{errors.bio?.message}</p>
//             </div>

//             <div>
//                 <label>
//                     <input type="checkbox" {...register("acceptTerms")} /> I accept terms
//                 </label>
//                 <p>{errors.acceptTerms?.message}</p>
//             </div>

//             <div>
//                 <label>Upload File:</label>
//                 <input type="file" {...register("file")} />
//                 <p>{errors.file?.message}</p>
//             </div>

//             <button type="submit">Submit</button>
//         </form>
//     );
// }
// ------------------------------------------------

// steps :
// 1. define yup schema
// 2.connect yup to hookform via resolver 
// 3.connect useform functions to the form 

import { useFieldArray, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

type FormData = {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
    hobbies: (string | undefined)[]; // match Yup inference
    gender: string;
    acceptTerms: boolean;
    country: string;
    dob: Date;
    phone: string;
    alternatePhones: string[];
};




const schema = yup.object().shape({
    name: yup.string().required('name is required'),
    email: yup.string().email('must be valid email').required('email required'),
    password: yup.string().required('password is required').min(6),
    confirmPassword: yup.string().required('confirm password').oneOf([yup.ref('password')], 'Passwords must match'),
    hobbies: yup.array().of(yup.string()).min(1, 'select alteas 1 hobby'),
    gender: yup.string().required('gender is required'),
    acceptTerms: yup.bool().oneOf([true], 'accept terms'),
    country: yup.string().required('country required'),
    dob: yup
        .date()
        .transform((value, originalValue) => originalValue == "" ? undefined : value)
        .required('dob required')
        .max(new Date(), 'dob cant be future value'),
    phone: yup.string().required('phone required').matches(/^\d{10}$/, 'Phone number must be exactly 10 digits'),
    alternatePhones: yup.array().of(yup.string().matches(/^\d{10}$/, 'Phone number must be exactly 10 digits')),

})

const FullForm = () => {

    const form = useForm<FormData>({
        resolver: yupResolver(schema),
        defaultValues: {
            // If no checkbox is selected, then react- hook - form sends the value false(not []) to Yup.
            // Yup expects an array, but it gets a boolean — hence:
            //"hobbies must be an array type, but the final value was: false"
            // So to make Yup always receive an array(even if empty), the fix is to manually initialize hobbies
            hobbies: [],
            alternatePhones: [''],
        }
    });
    const { register, handleSubmit, control, formState } = form;
    const { errors } = formState;

    const { fields, append, remove } = useFieldArray({
        control,
        name: 'alternatePhones',
    })


    const submit = (data: any) => {
        console.log(data);
    }

    return <form onSubmit={handleSubmit(submit)} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>

        <label>
            <input type="text" {...register('name')} placeholder='name' />
        </label>
        {errors.name && <span>{errors.name.message}</span>}

        <label>
            <input type="text" {...register('email')} placeholder='email' />
        </label>
        {errors.email && <span>{errors.email.message}</span>}

        <label>
            <input type="password" {...register('password')} placeholder='password' />
        </label>
        {errors.password && <span>{errors.password.message}</span>}

        <label>
            <input type="password" {...register('confirmPassword')} placeholder='confirmPassword' />
        </label>
        {errors.confirmPassword && <span>{errors.confirmPassword.message}</span>}

        <div>
            <label>Hobbies:</label>
            <label>
                <input type="checkbox" value="reading" {...register("hobbies")} /> Reading
            </label>
            <label>
                <input type="checkbox" value="sports" {...register("hobbies")} /> Sports
            </label>
            <label>
                <input type="checkbox" value="music" {...register("hobbies")} /> Music
            </label>
            <p>{errors?.hobbies?.message}</p>
        </div>

        <div>
            <label>Gender</label>
            <label htmlFor='male'>
                <input type='radio' id='male' value='male' {...register('gender')} />
                Male
            </label>
            <label htmlFor='female'>
                <input type='radio' id='female' value='female' {...register('gender')} />
                Female
            </label>
        </div>
        {errors.gender && <span>{errors.gender.message}</span>}

        <label>
            <input type="checkbox" {...register('acceptTerms')} /> Accept terms
        </label>
        {errors.acceptTerms && <span>{errors.acceptTerms.message}</span>}

        <div>
            <label>Select country</label>
            <select {...register('country')}>
                <option value="">Select...</option>
                <option value="India">India</option>
                <option value="usa">usa</option>
            </select>
            {<span>{errors.country?.message}</span>}
        </div>


        <div>
            <label>
                <input type='date' {...register('dob')} />
                {<span>{errors.dob?.message}</span>}
            </label>
        </div>

        <div>
            <label>
                Phone number :
                <input type='phone' {...register('phone')} />
                {<span>{errors.phone?.message}</span>}
            </label>
        </div>

        {/* dyanmic fields  */}
        <div>
            <label>Alternate Phone Numbers (Optional):</label>
            {fields.map((field, index) => (
                <div key={field.id} style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                    <input
                        type="tel"
                        placeholder={`Alternate Phone ${index + 1}`}
                        {...register(`alternatePhones.${index}`)}
                    />
                    <button type="button" onClick={() => remove(index)}>Remove</button>
                    {errors.alternatePhones?.[index] && (
                        <span>{errors.alternatePhones[index]?.message}</span>
                    )}
                </div>
            ))}

            <button type="button" onClick={() => append('')}>
                Add Alternate Phone
            </button>
        </div>



        <button type='submit'>submit</button>
    </form>

}

export default FullForm;



























