import { screen, render } from "@testing-library/react"
import { mocked } from "ts-jest/utils"
import { useRouter } from "next/router"

import { getSession, useSession } from "next-auth/client"
import { getPrismicClient } from "../../services/prismic"

import PostPreview, { getStaticProps } from "../../pages/posts/preview/[slug]"


jest.mock('next-auth/client')
jest.mock('next/router')
jest.mock('../../services/prismic')


const post = {
    slug: "post_1",
    title: [{ text: "Post1", type: "paragraph" }],
    content: [{ text: "<p>Little post about...</p>", type: "article" }],
    updatedAt: new Date().toISOString(),
}


describe('PostPreview tests', () => {


    const useSessionMocked = mocked(useSession)

    useSessionMocked.mockReturnValueOnce([null, false])


    it('should render correctly', () => {
        render(
            <PostPreview post={
                {
                    ...post,
                    title: post.title[0].text,
                    content: post.content[0].text
                }}
            />
        )
        expect(screen.getByText(post.title[0].text)).toBeInTheDocument()
    })

    it("redirect user to full post when user has active subscription", async () => {

        const useSessionMocked = mocked(useSession)

        useSessionMocked.mockReturnValueOnce([{
            activeSubscription: 'active'
        } as any, false])

        const getPrismicClientMocked = mocked(getPrismicClient)

        getPrismicClientMocked.mockReturnValueOnce({
            getByUID: jest.fn().mockResolvedValueOnce({
                data: { title: post.title, content: post.content },
                last_publication_date: post.updatedAt
            })
        } as any)

        const mockedPush = jest.fn()
        const useRouterMocked = mocked(useRouter)

        useRouterMocked.mockReturnValueOnce({
            push: mockedPush
        } as any)
        

        render(
            <PostPreview post={
                {
                    ...post,
                    title: post.title[0].text,
                    content: post.content[0].text
                }}
            />
        )

    
        await getStaticProps({ params: { slug: post.slug } })

        expect(mockedPush).toBeCalledWith(`/posts/${post.slug}`)
        




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

        const response = await getStaticProps({
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