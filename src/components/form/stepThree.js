import React from 'react';
import { useDispatch } from 'react-redux';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { object, bool } from 'yup';

import StepValid from '@/components/ui/stepValid'

import { setStepThreeComplete } from "@/store/actions"

export default () => {

    const dispatch = useDispatch();

    const { register, handleSubmit, reset, formState } = useForm({
        mode: "onChange",
        resolver: yupResolver(
            object().shape({
                rock: bool().oneOf([true], 'field required'),
            }))
    })
    const { errors } = formState;

    
    const onSubmit = (data) => {
        dispatch(setStepThreeComplete(data))
    }

    return (
        <div className="step-three">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-row">
                    <div className="form-group">
                        <label htmlFor="rock" className="form-check-label">Are you ready to rock?</label>
                        <input id="rock" name="rock" type="checkbox" {...register('rock')}  className={`form-check-input ${errors.rock ? 'is-invalid' : ''}`} />
                        <div className="invalid-feedback">{errors.rock?.message}</div>
                    </div>
                </div>
                <div className="form-row text-center my-3">
                    <button type="button" className="btn btn-sm btn-light mx-2" onClick={() => reset()}>reset</button>
                    <button type="submit" className="btn btn-sm btn-light mx-2" disabled={!formState.isValid}>next</button>
                </div>
            </form>
            {formState.isValid && <StepValid />}
        </div>
    )
}