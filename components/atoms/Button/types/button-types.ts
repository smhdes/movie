import { JSXElementConstructor, MouseEventHandler } from "react"

export type buttonType="primary" | "secondary"
export type buttonSize='small' | 'medium'

export interface IButtonProps {
    text:string,
    size?:buttonSize,
    onClick?:MouseEventHandler<HTMLButtonElement>,
    type?:buttonType,
    icon?:JSX.Element
}