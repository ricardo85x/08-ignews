import { render, screen, fireEvent} from "@testing-library/react"
import { signIn, useSession } from "next-auth/client"
import { NextRouter, useRouter } from "next/router"
import { mocked } from "ts-jest/utils"
import { SubscribeButton } from "."



jest.mock("next-auth/client")

jest.mock("next/router")

const TEST_NAME = 'Subscribe Button'
describe(TEST_NAME, () => {

    beforeEach(() => {

        const current_test = expect.getState().currentTestName

        if(current_test != `${TEST_NAME} redirect to posts when user already has subscription`) {
            const useSessionMocked = mocked(useSession)
            useSessionMocked.mockReturnValueOnce([null, false])
        } 

    })

    it("render correctly", () => {
        

        render(
            <SubscribeButton />
        )
        expect(screen.getByText('Subscribe now')).toBeInTheDocument()
    })

    it("redirect to signIn when not authenticated", () => {

     
        render(
            <SubscribeButton />
        )
        const domButton = screen.getByText('Subscribe now')
        fireEvent.click(domButton)

        const signInMocked = mocked(signIn)
        expect(signInMocked).toBeCalledWith("github")

    })

    it("redirect to posts when user already has subscription", () => {

        const useSessionMocked = mocked(useSession)
        useSessionMocked.mockReturnValueOnce([{
            activeSubscription: "active"
        } as any, false])
         

        const useRouterPushMocked = mocked(useRouter)
        const pushMock = jest.fn();

        useRouterPushMocked.mockReturnValueOnce({
            push: pushMock
        } as any)


        render(
            <SubscribeButton />
        )

        const domButton = screen.getByText('Subscribe now')

        fireEvent.click(domButton)

        expect( pushMock).toHaveBeenCalled()

    })
})