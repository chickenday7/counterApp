import React from "react";
import s from './CounterWrapper.module.scss'
import {Counter, ICounter} from "./Counter/Counter";
import {ISettingsCounter, SettingsCounter} from "./SettingsCounter/SettingsCounter";


export interface ICounterPresentation extends ICounter,ISettingsCounter{

}
export const CounterPresentation = (props:ICounterPresentation) => {

  return(
      <div className={s.wrapper}>
            <Counter value={props.value}
                     incValue={props.incValue}
                     resetValue={props.resetValue}
                     error={props.error}
                     minValue={props.minValue}
                     isChanges={props.isChanges}
            />
            <SettingsCounter minValue={props.minValue}
                             maxValue={props.maxValue}
                             changeMinMaxValue={props.changeMinMaxValue}
                             checkValue={props.checkValue}
                             validationInterval={props.validationInterval}
            />
      </div>
  )
}