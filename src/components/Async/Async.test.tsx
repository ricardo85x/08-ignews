import {screen, render, waitFor, waitForElementToBeRemoved } from "@testing-library/react"
import { Async } from "."

describe('Async Component', () => {

    it("should render correctly", () => {
        render(
            <Async />
        )
        expect(screen.queryByText("Hello world")).toBeInTheDocument()
    })

    it("should render correctly with button - findByText", async () => {
        render(
            <Async />
        )
        expect(await screen.findByText("Button", undefined, {timeout: 5000})).toBeInTheDocument()
    })

    it("should render correctly with button", async () => {
        render(
            <Async />
        )
        waitFor(() => {
            return  expect(screen.getByText("Button")).toBeInTheDocument()
        })
    })

    it("should render correctly loading disappear with not", async () => {
        render(
            <Async />
        )
        waitFor(() => {
            return  expect(screen.getByText("loading...")).not.toBeInTheDocument()
        })
    })

    it("should render correctly loading disappear with waitForElementToBeRemoved", async () => {
        render(
            <Async />
        )
        waitForElementToBeRemoved(screen.queryByText("loading..."))
    })

})