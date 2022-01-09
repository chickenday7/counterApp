import React from "react";
import SuperButton from "../../../SuperComponents/c2-SuperButton/SuperButton";
import s from './CounterStyle.module.scss'

export interface ICounter {
    value: number
    error: boolean
    minValue: number
    isChanges: boolean
    incValue: (value: number) => void
    resetValue: (value: number) => void
}

export const Counter = (props: ICounter) => {

    const onIncValue = () => {
        props.incValue(props.value)
    }
    const onResetValue = () => {
        props.resetValue(props.value)
    }
    const settingDisabledReset = props.value === props.minValue || props.isChanges
    const settingDisabledInc = props.error || props.isChanges

    const messageWindow = props.isChanges
                            ? props.error
                                    ? <span className={`${s.textWindow} ${props.error ? s.red : ''} `}>incorrect value</span>
                                    : <span className={s.textWindow}>write value and enter set</span>
                            : <span className={`${props.error ? s.red : ''} ${s.number}`}>{props.value}</span>


    return (
        <div className={s.wrapper}>
            <div className={s.window}>
                {messageWindow}
            </div>
            <div className={s.buttonArea}>
                <SuperButton  disabled={settingDisabledReset} onClick={onResetValue} className={s.button}
                             textButton={s.textButton}>RESET</SuperButton>
                <SuperButton disabled={settingDisabledInc} onClick={onIncValue} className={s.button}
                             textButton={s.textButton}>INC</SuperButton>
            </div>
        </div>
    )
}