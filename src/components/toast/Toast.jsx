import { useEffect, useRef } from "react"
import { Check } from "lucide-react";
import styles from "./Toast.module.css"

export default function Toast({ setIsVisible }) {
    const dialogRef = useRef(null);

    useEffect(()=> {
        if(dialogRef.current) dialogRef.current.showModal()

        const myTime = setTimeout(()=> {
            if(!dialogRef.current) return

            if(dialogRef.current.open) {
                setIsVisible(false)
            }
        }, 1000)

        return () => clearTimeout(myTime)

    }, [setIsVisible])


    return (
        <dialog ref={dialogRef} 
        style={{
            top: '50%', 
            left: '50%', 
            transform:'translateX(-50%)' , 
        }}>
            <div className={styles.content}>
                <div className={styles.doneIconContainer}>
                    <Check strokeWidth={3}/>
                </div>
                <p className={styles.message}>
                    item added to your cart
                </p>
            </div>
        </dialog>
    )
} 