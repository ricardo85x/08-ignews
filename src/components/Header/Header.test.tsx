import { render, screen } from "@testing-library/react"
import { Header } from "."

jest.mock("next/router", () => {
    return {
        useRouter() {
            return {
                asPath: '/'
            }
        }
    }
})
// import { signIn, signOut, useSession } from 'next-auth/client'

jest.mock("next-auth/client", () => {
    return {
        useSession() {
            return [
                null, false
            ]
        }

    }
})


describe("Header", () => {

    it("should render Home and Posts Links", () => {
        render(
            <Header />
        )

        expect( screen.getByText("Home")).toBeInTheDocument()
        expect( screen.getByText("Posts")).toBeInTheDocument()
        
    })
})