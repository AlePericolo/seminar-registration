import * as actions from './types';

export const setStepOneComplete = (data) => {
	return async (dispatch) => {
		dispatch({
			type: actions.STEP_1_COMPLETED,
			payload: data
		});
	};
};

export const setStepTwoComplete = (data) => {
	return async (dispatch) => {
		dispatch({
			type: actions.STEP_2_COMPLETED,
			payload: data
		});
	};
};

export const setStepThreeComplete = (data) => {
	return async (dispatch) => {
		dispatch({
			type: actions.STEP_3_COMPLETED,
			payload: data
		});
	};
};

export const setNewRegistration = () => {
	return async (dispatch) => {
		dispatch({
			type: actions.NEW_REGISTRATION
		});
	};
};

