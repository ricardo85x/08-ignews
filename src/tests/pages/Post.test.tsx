import { screen, render } from "@testing-library/react"
import { mocked } from "ts-jest/utils"
import { getSession } from "next-auth/client"
import { getPrismicClient } from "../../services/prismic"

import Post, {getServerSideProps } from "../../pages/posts/[slug]"


jest.mock('next-auth/client')
jest.mock('../../services/prismic')

const post = {
    slug: "post_1",
    title: [{text:"Post1", type: "paragraph"}],
    content: [{text:"<p>Little post about...</p>", type: "article"}],
    updatedAt: new Date().toISOString(),
}


describe('Post tests', () => {

    it('should render correctly', () => {
        render(
            <Post post={
                {...post,
                    title: post.title[0].text, 
                    content: post.content[0].text
                }}
            />
        )
        expect(screen.getByText(post.title[0].text)).toBeInTheDocument()
    })

    it("it redirect user to preview if no subscription is found", async () => {

        const getSessionMocked = mocked(getSession)

        getSessionMocked.mockReturnValueOnce(undefined)

        const response = await getServerSideProps({
            params: { slug: post.slug }
        } as any)

        expect(response).toEqual(
            expect.objectContaining({
                redirect: expect.objectContaining({
                    destination: `/posts/preview/${post.slug}`
                }) 
            })
        )


    })

    it("it load initial data", async () => {

        const getSessionMocked = mocked(getSession)

        getSessionMocked.mockResolvedValueOnce({
            activeSubscription: true
        } as any)


        const getPrismicClientMocked = mocked(getPrismicClient)

        getPrismicClientMocked.mockReturnValueOnce({
            getByUID: jest.fn().mockResolvedValueOnce({
                data: {title: post.title, content: post.content},
                last_publication_date: post.updatedAt
            })
        } as any)

        const response = await getServerSideProps({
            params: { slug: post.slug }
        } as any)

        expect(response).toEqual(
            expect.objectContaining({
                props: {
                    post: expect.objectContaining({
                        slug: post.slug
                    })
                }
            })
        )


    })

})