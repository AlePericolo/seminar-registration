import * as actions from './types';

const initial = {
	app: {
		step1: {
			isActive: true,
			data: null
		},
		step2: {
			isActive: false,
			data: null
		},
		step3: {
			isActive: false,
			data: null
		},
		registrationCompleted: false
	}
};

const app = (state = initial.app, action) => {
	switch (action.type) {
		case actions.STEP_1_COMPLETED: {
			return {
				...state,
				step1: {...state.step1, data: action.payload},
				step2: {isActive: true}
			};
		}
		case actions.STEP_2_COMPLETED: {
			return {
				...state,
				step2: {...state.step2, data: action.payload},
				step3: {isActive: true}
			};
		}
		case actions.STEP_3_COMPLETED: {
			return {
				...state,
				step3: {...state.step3, data: action.payload},
				registrationCompleted: true
			};
		}
		case actions.NEW_REGISTRATION: {
			return initial.app
		}
		default:
			return state;
	}
};

export default { app };
