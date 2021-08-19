import { render, screen } from "@testing-library/react"
import { useSession } from "next-auth/client"
import { mocked } from "ts-jest/utils"
import { SignInButton } from "."

jest.mock("next-auth/client")

describe('SignInButton Test', () => {

    it("render correctly when user is not authenticated", () => {
        const useSessionMocked = mocked(useSession);
        useSessionMocked.mockReturnValueOnce([null, false])

        render(
            <SignInButton />
        )
        expect(screen.getByText("Sign in with GitHub")).toBeInTheDocument()
    })

    it("render correctly when user is authenticated", () => {

        const useSessionMocked = mocked(useSession);

        useSessionMocked.mockReturnValueOnce ([
            {
                expires: 'never',
                user: {
                    name: "Bob Marley"
                } 
            }, false]
        )

        render(
            <SignInButton />
        )
        expect(screen.getByText("Bob Marley")).toBeInTheDocument()
    })

})