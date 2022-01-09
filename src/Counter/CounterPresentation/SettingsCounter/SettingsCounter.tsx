import React, {ChangeEvent, useEffect, useState} from "react";
import s from './SettingsCounterStyle.module.scss'
import SuperButton from "../../../SuperComponents/c2-SuperButton/SuperButton";
import SuperInputText from "../../../SuperComponents/c1-SuperInputText/SuperInputText";

export interface ISettingsCounter {
    maxValue: number
    minValue: number
    changeMinMaxValue: (minValue: number, maxValue: number) => void
    checkValue:(localMinValue:number, localMaxValue:number)=>void
    validationInterval:(localMinValue:number,localMaxValue:number)=>void
}

export const SettingsCounter = (props: ISettingsCounter) => {
    const [maxValueLocal, setMaxValueLocal] = useState<number>(props.maxValue)
    const [minValueLocal, setMinValueLocal] = useState<number>(props.minValue)
    const onSetMinMaxValue = () => {
        props.changeMinMaxValue(minValueLocal,maxValueLocal)
    }
    useEffect(()=>{
        props.checkValue(minValueLocal,maxValueLocal)
        props.validationInterval(minValueLocal,maxValueLocal)
    },[maxValueLocal,minValueLocal])

    const onChangeLocalMaxValue = (e:ChangeEvent<HTMLInputElement>) => {
        setMaxValueLocal(+e.currentTarget.value)
        props.checkValue(minValueLocal,maxValueLocal)
    }
    const onChangeLocalMinValue = (e:ChangeEvent<HTMLInputElement>) => {
        setMinValueLocal(+e.currentTarget.value)
        props.checkValue(minValueLocal,maxValueLocal)
    }
    const checkErrorMaxValue = minValueLocal < 0 || minValueLocal >= maxValueLocal ? 'error': ''
    const checkErrorMinValue = maxValueLocal < 0 || minValueLocal >= maxValueLocal ? 'error' : ''




    return (
        <div className={s.wrapper}>
            <div className={s.window}>
                <div className={s.inputArea}>
                    <span className={s.textValue}>max value</span>
                    <SuperInputText onChange={onChangeLocalMaxValue}
                                    value={maxValueLocal}
                                    className={s.input}
                                    type={'number'}
                                    defaultValue={props.maxValue}
                                    error={checkErrorMinValue}
                    />
                </div>
                <div className={s.inputArea}>
                    <span className={s.textValue}>min value</span>
                    <SuperInputText onChange={onChangeLocalMinValue}
                                    value={minValueLocal}
                                    className={s.input}
                                    type={'number'}
                                    defaultValue={props.minValue}
                                    error={checkErrorMaxValue}
                    />
                </div>
            </div>
            <div className={s.buttonArea}>
                <SuperButton disabled={props.maxValue === maxValueLocal && props.minValue === minValueLocal}
                             onClick={onSetMinMaxValue} className={s.button}
                             textButton={s.textButton}>SET</SuperButton>
            </div>
        </div>
    )
}