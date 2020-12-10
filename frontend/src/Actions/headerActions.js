import { HEADER_BG, HEADER_BG_ON } from "../Constants/headerConstants"

export const headerBg = () => async (dispatch) => {
    dispatch({type: HEADER_BG})
}

export const headerBgOn = () => async (dispatch) => {
    dispatch({type: HEADER_BG_ON})
}