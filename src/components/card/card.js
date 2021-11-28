import React from "react";
import { useSelector } from "react-redux";

import StepOne from '@/components/form/stepOne'
import StepTwo from '@/components/form/stepTwo'
import StepThree from '@/components/form/stepThree'

const classNames = require('classnames');

export default (props) => {

    const { step } = props
    const { app } = useSelector(state => state)
    const { isActive } = app[`step${step}`]

    const renderForm = () => {
        switch (step) {
            case 1: return <StepOne />
            case 2: return <StepTwo />
            case 3: return <StepThree />
        }
    }

    return (
        <div className={classNames(
            'card',
            `step_${step}`,
            { 'disabled': !isActive }
        )}>
            <span className="step-badge">Step {step}</span>
            <div className="step">
                {renderForm()}
            </div>
        </div>
    )
}