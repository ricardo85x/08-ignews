import { useEffect, useState } from "react"

export const Async = () => {

    const [isButtonVisible, setIsButtonVisible] = useState(false)

    useEffect(() => {
        const timeout = setTimeout(() => {
            setIsButtonVisible(true)
        }, 2000)
        return () => clearTimeout(timeout)
    }, [])

    return (
        <div>
            Hello world

            { isButtonVisible ? 
                <button>Button</button> :
                <p>loading...</p>
            }
        </div>
    )
}