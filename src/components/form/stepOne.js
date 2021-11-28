import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useForm, useFieldArray } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { object, array, string } from 'yup';

import StepValid from '@/components/ui/stepValid'

import { setStepOneComplete } from "@/store/actions"

export default () => {

    const dispatch = useDispatch();

    const { register, control, handleSubmit, reset, formState, watch } = useForm({
        mode: "onChange",
        resolver: yupResolver(
            object().shape({
                peopleAttending: string().required('field required'),
                attendee: array().of(
                    object().shape({
                        name: string().required('field required')
                    })
                )
            }))
    });
    const { errors } = formState;
    const { fields, append, remove } = useFieldArray({ name: 'attendee', control });

    const peopleAttending = watch('peopleAttending');

    useEffect(() => {
        const newVal = parseInt(peopleAttending || 0);
        const oldVal = fields.length;
        if (newVal > oldVal)
            for (let i = oldVal; i < newVal; i++) {
                append({ name: '' });
            }
        else
            for (let i = oldVal; i > newVal; i--) {
                remove(i - 1);
            }
    }, [peopleAttending]);

    const onSubmit = (data) => {
        dispatch(setStepOneComplete(data))
    }

    return (
        <div className="step-one">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-row">
                    <div className="form-group">
                        <label htmlFor="peopleAttending">How many people will be attending?</label>
                        <select name="peopleAttending" id="peopleAttending" {...register('peopleAttending')} className={`form-control ${errors.peopleAttending ? 'is-invalid' : ''}`}>
                            {[null, 1, 2, 3, 4, 5].map(i =>
                                <option key={i} value={i}>{i}</option>
                            )}
                        </select>
                        <div className="invalid-feedback">{errors.peopleAttending?.message}</div>
                    </div>
                </div>
                {peopleAttending > 0 && <p>Please provide full names:</p>}
                {fields.map((_, i) => (
                    <div key={i} className="form-row fade-in">
                        <div className="form-group d-flex">
                            <label htmlFor={`attendee[${i}]name`} className="small-label">{`Attendee ${i + 1} Name`}</label>
                            <input id={`attendee[${i}]name`} name={`attendee[${i}]name`} {...register(`attendee.${i}.name`)} type="text" className={`form-control ${errors.attendee?.[i]?.name ? 'is-invalid' : ''}`} />
                        </div>
                        <small className="text-danger">{errors.attendee?.[i]?.name?.message}</small>
                    </div>
                ))}
                <div className="form-row text-center my-3">
                    <button type="button" className="btn btn-sm btn-light mx-2" onClick={() => reset()}>reset</button>
                    <button type="submit" className="btn btn-sm btn-light mx-2" disabled={!formState.isValid}>next</button>
                </div>
            </form>
            {formState.isValid && <StepValid />}
        </div>
    )
}