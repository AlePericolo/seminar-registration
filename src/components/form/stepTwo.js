import React from 'react';
import { useDispatch } from 'react-redux';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { object, string, bool } from 'yup';

import StepValid from '@/components/ui/stepValid'

import { setStepTwoComplete } from "@/store/actions"

import {isNil} from 'lodash'

export default () => {

    const dispatch = useDispatch();

    const { register, handleSubmit, reset, formState, watch } = useForm({
        mode: "onChange",
        resolver: yupResolver(
            object().shape({
                companyName: bool().required('field required'),
                name: string().when("companyName", (val) => {
                    if (val) return string().required('field required');
                    return string().notRequired()
                }),
                specialAccomodation: bool().required('field required'),
                accomodation: string().when("specialAccomodation", (val) => {
                    if (val) return string().required('field required');
                    return string().notRequired();
                })
            }))
    })
    const { errors } = formState;

    const companyName = watch('companyName');
    const specialAccomodation = watch('specialAccomodation');

    const renderCompanyNameInputField = () => {
        if (isNil(companyName) || companyName === 'false') return null

        return (
            <div className="form-row">
                <div className="form-group d-flex">
                    <label htmlFor="name" className="small-label">Company name</label>
                    <input id="name" name="name" {...register('name')} type="text" className={`form-control ${errors.name ? 'is-invalid' : ''}`} />
                </div>
                <small className="text-danger">{errors.name?.message}</small>
            </div>
        )
    }

    const renderSpecialAccomodationInputField = () => {
        if (isNil(specialAccomodation) || specialAccomodation === 'false') return null

        return (
            <div className="form-row">
                <div className="form-group d-flex">
                    <label htmlFor="accomodation" className="small-label">Special accomodation</label>
                    <input id="accomodation" name="accomodation" {...register('accomodation')} type="text" className={`form-control ${errors.accomodation ? 'is-invalid' : ''}`} />
                </div>
                <small className="text-danger">{errors.accomodation?.message}</small>
            </div>
        )
    }

    const onSubmit = (data) => {
        dispatch(setStepTwoComplete(data))
    }

    return (
        <div className="step-two">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-row">
                    <div className="form-group">
                        <label>Would you like your company name on your badges?</label>
                        <input
                            id="companyNameTrue"
                            name="companyName"
                            {...register('companyName')}
                            type="radio"
                            value={true}
                        />
                        <label htmlFor="companyNameTrue">&nbsp;Yes&nbsp;</label>
                        <input
                            id="companyNameFalse"
                            name="companyName"
                            {...register('companyName')}
                            type="radio"
                            value={false}
                        />
                        <label htmlFor="companyNameFalse">&nbsp;No&nbsp;</label>
                        <div className="invalid-feedback">{errors.companyName?.message}</div>
                    </div>
                </div>
                {renderCompanyNameInputField()}
                <div className="form-row">
                    <div className="form-group">
                        <label>Will anyone in your group require special accomodations?</label>
                        <input
                            id="specialAccomodationTrue"
                            name="specialAccomodation"
                            {...register('specialAccomodation')}
                            type="radio"
                            value={true}
                        />
                        <label htmlFor="specialAccomodationTrue">&nbsp;Yes&nbsp;</label>
                        <input
                            id="specialAccomodationFalse"
                            name="specialAccomodation"
                            {...register('specialAccomodation')}
                            type="radio"
                            value={false}
                        />
                        <label htmlFor="specialAccomodationFalse">&nbsp;No&nbsp;</label>
                        <div className="invalid-feedback">{errors.specialAccomodation?.message}</div>
                    </div>
                </div>
                {renderSpecialAccomodationInputField()}
                <div className="form-row text-center my-3">
                    <button type="button" className="btn btn-sm btn-light mx-2" onClick={() => reset()}>reset</button>
                    <button type="submit" className="btn btn-sm btn-light mx-2" disabled={!formState.isValid}>next</button>
                </div>
            </form>
            {formState.isValid && <StepValid />}
        </div>
    )
}