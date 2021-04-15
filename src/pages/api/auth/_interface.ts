
import { Session as SessionInterface } from "next-auth"

export interface SessionProps extends SessionInterface {
    activeSubscription: any
}