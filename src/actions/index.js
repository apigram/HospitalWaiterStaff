import axios from 'axios';

export const FETCH_PATIENTS = 'FETCH_PATIENTS';
export const FETCH_REQUIREMENTS = 'FETCH_REQUIREMENTS';
export const FETCH_MEALS = 'FETCH_MEALS';

export const FETCH_PATIENT = 'FETCH_PATIENT';
export const FETCH_REQUIREMENT = 'FETCH_REQUIREMENT';
export const FETCH_MEAL = 'FETCH_MEAL';

export const FETCH_REQUIREMENT_TYPES = 'FETCH_REQUIREMENT_TYPES';
export const FETCH_MEAL_TIMES = 'FETCH_MEAL_TIMES';

const MEAL_SERVICE_HOST = 'http://localhost:5000';
export function fetchPatients(criteria = null) {
    let url = `${MEAL_SERVICE_HOST}/mealservice/patient`;
    if (criteria !== null) {
        url = `${url}?name=${criteria}`
    }
    const request = axios.get(url);

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
    const request = axios.get(url);

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
    const request = axios.get(url);

    return {
        type: FETCH_REQUIREMENTS,
        payload: request
    }
}

export function selectPatient(patient_uri) {
    const url = `${MEAL_SERVICE_HOST}${patient_uri}`;
    const request = axios.get(url);

    return {
        type: FETCH_PATIENT,
        payload: request
    }
}

export function selectRequirement(requirement_uri) {
    const url = `${MEAL_SERVICE_HOST}${requirement_uri}`;
    const request = axios.get(url);

    return {
        type: FETCH_REQUIREMENT,
        payload: request
    }
}

export function selectMeal(meal_uri) {
    const url = `${MEAL_SERVICE_HOST}${meal_uri}`;
    const request = axios.get(url);

    return {
        type: FETCH_MEAL,
        payload: request
    }
}

export function fetchRequirementTypes() {
    const url = `${MEAL_SERVICE_HOST}/mealservice/ref/requirement_type`;
    const request = axios.get(url);

    return {
        type: FETCH_REQUIREMENT_TYPES,
        payload: request
    }
}

export function fetchMealTimes() {
    const url = `${MEAL_SERVICE_HOST}/mealservice/ref/meal_time`;
    const request = axios.get(url);

    return {
        type: FETCH_MEAL_TIMES,
        payload: request
    }
}