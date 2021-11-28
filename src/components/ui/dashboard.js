import React from 'react';
import { useSelector , useDispatch} from "react-redux";

import Card from '@/components/card/card'

import { setNewRegistration } from "@/store/actions"

export default () => {

    const { step1, step2, step3, registrationCompleted } = useSelector(state => state.app)
    const dispatch = useDispatch();

    const renderContent = () => {
        if (!registrationCompleted)
            return (
                [...Array(3)].map((_, index) => {
                    return (
                        <div key={index} className="col">
                            <Card step={index + 1} />
                        </div>
                    )
                })
            )

        return <div className="col-12 col-md-6">
            <div className="card">
            <div className="card-body">
                <ul className="list-group list-group-flush">
                    <li className="list-group-item">
                        <strong>STEP 1:</strong> {JSON.stringify(step1.data)}
                    </li>
                    <li className="list-group-item">
                        <strong>STEP 2:</strong> {JSON.stringify(step2.data)}
                    </li>
                    <li className="list-group-item">
                        <strong>STEP 3:</strong> {JSON.stringify(step3.data)}
                    </li>
                </ul>
                </div>

                <div className="card-footer text-center">
                    <button className="btn btn-sm btn-dark" onClick={() => dispatch(setNewRegistration())}>complete registration</button>
                </div>
            </div>
        </div>
    }

    return (
        <main role="main">
            <div className="row justify-content-center">
                {renderContent()}
            </div>
        </main>
    )
}