import axios from 'axios';

export const FETCH_PATIENTS = 'FETCH_PATIENTS';
export const FETCH_REQUIREMENTS = 'FETCH_REQUIREMENTS';
export const FETCH_MEALS = 'FETCH_MEALS';

export const FETCH_PATIENT = 'FETCH_PATIENT';
export const FETCH_REQUIREMENT = 'FETCH_REQUIREMENT';
export const FETCH_MEAL = 'FETCH_MEAL';

export const FETCH_REQUIREMENT_TYPES = 'FETCH_REQUIREMENT_TYPES';
export const FETCH_MEAL_TIMES = 'FETCH_MEAL_TIMES';

export const ADD_PATIENT = 'ADD_PATIENT';
export const ADD_REQUIREMENT = 'ADD_REQUIREMENT';
export const ADD_MEAL = 'ADD_MEAL';

export const SAVE_PATIENT = 'SAVE_PATIENT';
export const SAVE_REQUIREMENT = 'SAVE_REQUIREMENT';
export const SAVE_MEAL = 'SAVE_MEAL';

export const DELETE_PATIENT = 'DELETE_PATIENT';
export const DELETE_REQUIREMENT = 'DELETE_REQUIREMENT';
export const DELETE_MEAL = 'DELETE_MEAL';

export const LOGIN = 'LOGIN';

const MEAL_SERVICE_HOST = 'http://localhost:5000';

export let AUTH_HEADER = {
    auth: {
        username: null
    }
};

export function fetchPatients(criteria = null) {
    let url = `${MEAL_SERVICE_HOST}/mealservice/patient`;
    if (criteria !== null) {
        url = `${url}?name=${criteria}`
    }
    const request = axios.get(url, AUTH_HEADER);

    return {
        type: FETCH_PATIENTS,
        payload: request
    }
}

export function fetchMeals(criteria = null) {
    let url = `${MEAL_SERVICE_HOST}/mealservice/meal`;
    if (criteria !== null) {
        url = `${url}?label=${criteria}`
    }
    const request = axios.get(url, AUTH_HEADER);

    return {
        type: FETCH_MEALS,
        payload: request
    }
}

export function fetchRequirements(criteria = null) {
    let url = `${MEAL_SERVICE_HOST}/mealservice/requirement`;
    if (criteria !== null) {
        url = `${url}?label=${criteria}`
    }
    const request = axios.get(url, AUTH_HEADER);

    return {
        type: FETCH_REQUIREMENTS,
        payload: request
    }
}

export function selectPatient(patient_uri) {
    const url = `${MEAL_SERVICE_HOST}${patient_uri}`;
    const request = axios.get(url, AUTH_HEADER);

    return {
        type: FETCH_PATIENT,
        payload: request
    }
}

export function selectRequirement(requirement_uri) {
    const url = `${MEAL_SERVICE_HOST}${requirement_uri}`;
    const request = axios.get(url, AUTH_HEADER);

    return {
        type: FETCH_REQUIREMENT,
        payload: request
    }
}

export function selectMeal(meal_uri) {
    const url = `${MEAL_SERVICE_HOST}${meal_uri}`;
    const request = axios.get(url, AUTH_HEADER);

    return {
        type: FETCH_MEAL,
        payload: request
    }
}

export function fetchRequirementTypes() {
    const url = `${MEAL_SERVICE_HOST}/mealservice/ref/requirement_type`;
    const request = axios.get(url, AUTH_HEADER);

    return {
        type: FETCH_REQUIREMENT_TYPES,
        payload: request
    }
}

export function fetchMealTimes() {
    const url = `${MEAL_SERVICE_HOST}/mealservice/ref/meal_time`;
    const request = axios.get(url, AUTH_HEADER);

    return {
        type: FETCH_MEAL_TIMES,
        payload: request
    }
}

export function addPatient(patient) {
    const url = `${MEAL_SERVICE_HOST}/mealservice/patient`;
    const request = axios.post(url, patient, AUTH_HEADER);

    return {
        type: ADD_PATIENT,
        payload: request
    }
}

export function addRequirement(requirement) {
    const url = `${MEAL_SERVICE_HOST}/mealservice/requirement`;
    const request = axios.post(url, requirement, AUTH_HEADER);

    return {
        type: ADD_REQUIREMENT,
        payload: request
    }
}

export function addMeal(meal) {
    const url = `${MEAL_SERVICE_HOST}/mealservice/meal`;
    const request = axios.post(url, meal, AUTH_HEADER);

    return {
        type: ADD_MEAL,
        payload: request
    }
}

export function savePatient(patient_uri, patient_data) {
    const url = `${MEAL_SERVICE_HOST}${patient_uri}`;
    const request = axios.put(url, patient_data, AUTH_HEADER);

    return {
        type: SAVE_PATIENT,
        payload: request
    };
}

export function saveRequirement(requirement_uri, requirement_data) {
    const url = `${MEAL_SERVICE_HOST}${requirement_uri}`;
    const request = axios.put(url, requirement_data, AUTH_HEADER);

    return {
        type: SAVE_REQUIREMENT,
        payload: request
    };
}

export function saveMeal(meal_uri, meal_data) {
    const url = `${MEAL_SERVICE_HOST}${meal_uri}`;
    const request = axios.put(url, meal_data, AUTH_HEADER);

    return {
        type: SAVE_MEAL,
        payload: request
    };
}

export function deletePatient(patient_uri) {
    const url = `${MEAL_SERVICE_HOST}${patient_uri}`;
    const request = axios.delete(url, AUTH_HEADER);

    return {
        type: DELETE_PATIENT,
        payload: request
    };
}

export function deleteRequirement(requirement_uri) {
    const url = `${MEAL_SERVICE_HOST}${requirement_uri}`;
    const request = axios.delete(url, AUTH_HEADER);

    return {
        type: DELETE_REQUIREMENT,
        payload: request
    };
}

export function deleteMeal(meal_uri) {
    console.log('Deleting');
    const url = `${MEAL_SERVICE_HOST}${meal_uri}`;
    const request = axios.delete(url, AUTH_HEADER);

    return {
        type: DELETE_MEAL,
        payload: request
    };
}

export function login(user, password) {
    const url = `${MEAL_SERVICE_HOST}/auth/token`;

    const request = axios.get(url, {
            auth: {
                username: user,
                password
            }
        }
    );

    return {
        type: LOGIN,
        payload: request
    }
}