import { HEADER_BG, HEADER_BG_ON } from "../Constants/headerConstants";

export const headerReducer = (state = {}, action) => {
    switch(action.type) {
        case HEADER_BG:
            return {
                ...state,
                headerBg: false
            }
        case HEADER_BG_ON:
            return {
                ...state,
                headerBg: true
            }
        default:
            return state
    }
}