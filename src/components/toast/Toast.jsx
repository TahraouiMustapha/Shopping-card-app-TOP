import { useEffect, useRef } from "react"

export default function Toast({ setIsVisible }) {
    const dialogRef = useRef(null);
    const timeOutRef = useRef(null)

    useEffect(()=> {
        if(dialogRef.current) dialogRef.current.showModal()

        timeOutRef.current = setTimeout(()=> {
            if(!dialogRef.current) return

            if(dialogRef.current.open) {
                setIsVisible(false)
            }
        }, 1000)

        return () => clearTimeout(timeOutRef.current)

    }, [setIsVisible])


    return (
        <dialog ref={dialogRef} 
        style={{
            top: '50%', 
            left: '50%', 
            transform:'translateX(-50%)' 
        }}>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit
        </dialog>
    )
} 