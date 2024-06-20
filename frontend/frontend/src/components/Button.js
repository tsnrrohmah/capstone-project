import React from "react";
import classes from './Button.module.css';
import { FaShoppingCart } from "react-icons/fa";


export function PrimaryButton (props){
    const {children} = props;

    return (
        <button className={`${classes.primary}`}>{children}</button>
    );
};

export function SecondaryButton (props){
    const {children} = props;

    return (
        <button className={`${classes.secondary}`}>{children}</button>
    );
}

export function PurchaseButton (props){
    const{label} = props;

    return(
        <button className={`${classes.iconButton}`} >
        <FaShoppingCart />
        <span className="label">{label}</span>
      </button>
    )
}
// const IconButton = ({ icon, label, onClick }) => {
//     return (
//       <button className="icon-button" onClick={onClick}>
//         {icon}
//         <span className="label">{label}</span>
//       </button>
//     );
//   };
