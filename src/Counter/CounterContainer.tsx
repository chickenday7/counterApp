import React, {useEffect, useState} from "react";
import {CounterPresentation} from "./CounterPresentation/CounterPresentation";


export const CounterContainer = () => {
    let initialValue = localStorage.getItem('value') !== null ? JSON.parse(localStorage.getItem('value')!) : 0
    let initialMaxValue = localStorage.getItem('maxValue') !== null ? JSON.parse(localStorage.getItem('maxValue')!) : 5
    let initialMinValue = localStorage.getItem('minValue') !== null ? JSON.parse(localStorage.getItem('minValue')!) : 0
    let [error, setError] = useState<boolean>(false)
    let [value, setValue] = useState<number>(initialValue)
    let [maxValue, setMaxValue] = useState<number>(initialMaxValue)
    let [minValue, setMinValue] = useState<number>(initialMinValue)
    let [isChanges, setIsChanges] = useState<boolean>(false)


    const incValue = (value: number) => {
        if (value < maxValue) {
            setValue(value += 1)
        }
    }


    useEffect(() => {
        if (value >= maxValue) {
            setError(true)
        }
    }, [value])

    useEffect(()=>{
            localStorage.setItem('value', JSON.stringify(value))
            localStorage.setItem('minValue', JSON.stringify(minValue))
            localStorage.setItem('maxValue', JSON.stringify(maxValue))
    },[value,minValue,maxValue])





    const resetValue = () => {
        setValue(minValue)
        setError(false)
    }



    const changeMinMaxValue = (minValue: number, MaxValue: number) => {
        setValue(minValue)
        setMinValue(minValue)
        setMaxValue(MaxValue)
        setError(false)
        setIsChanges(false)
    }
    const isChange = (minValueLocal: number, maxValueLocal: number) => {
        if (minValueLocal !== minValue ||  maxValueLocal !== maxValue){
            setIsChanges(true)
        }
    }
    const validationInterval = (minValueLocal:number,maxValueLocal:number) => {
        if (minValueLocal >= maxValueLocal || minValueLocal < 0){
            setError(true)
        }else{
            setError(false)
        }
    }


    return <CounterPresentation value={value}
                                maxValue={maxValue}
                                minValue={minValue}
                                error={error}
                                isChanges={isChanges}
                                incValue={incValue}
                                resetValue={resetValue}
                                changeMinMaxValue={changeMinMaxValue}
                                checkValue={isChange}
                                validationInterval={validationInterval}


    />
}