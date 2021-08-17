import { render } from "@testing-library/react"
import { ActiveLink } from "."

jest.mock("next/router", () => {
    return {
        useRouter() {
            return {
                asPath: '/'
            }
        }
    }
})

describe("ActiveLink Component", () => {

    it('should render correctly', () => {
        const { getByText } = render(
            <ActiveLink href="/" activeClassName="active">
                <a>Home</a>
            </ActiveLink>
        )

        expect(getByText('Home')).toBeInTheDocument()
    })

    it('is receiving active class', () => {

        const { getByText, debug } = render(
            <ActiveLink href="/" activeClassName="active">
                <a>Home</a>
            </ActiveLink>
        )

        debug()

        expect(getByText('Home')).toHaveClass("active")

    })
})