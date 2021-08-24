import { screen, render } from "@testing-library/react"
import { mocked } from "ts-jest/utils"

import Posts, { getStaticProps } from "../../pages/posts"

import { getPrismicClient } from '../../services/prismic'

jest.mock('../../services/prismic')




describe('Post Page Component', () => {

    const posts = [
        {
            slug: "post_1",
            title: "Post1",
            excerpt: "Little post about...",
            updatedAt: new Date().toISOString(),
        }
    ]

    it("should render correctly", () => {
        render(
            <Posts posts={posts} />
        )
        expect(screen.getByText(posts[0].title)).toBeInTheDocument()
    })

    it("load initial data", async () => {

        const getPrismicClientMocked = mocked(getPrismicClient)

        const results = [{
            uid: "post_1",
            data: {
                content: [{ type: "paragraph", text: "Post Excerpt" }],
                title: [{ type: "heading", text: "le title" }]

            },
            last_publication_date: "2021-08-24T21:00:00"
        }]

        getPrismicClientMocked.mockReturnValueOnce({
            query: jest.fn().mockResolvedValueOnce({
                results
            })
        } as any)

        const response = await getStaticProps({})


        expect(response).toEqual(
            expect.objectContaining({
                props: {
                    posts: [{
                        slug: results[0].uid,
                        title: results[0].data.title[0].text,
                        excerpt: results[0].data.content[0].text,
                        updatedAt: '24 de agosto de 2021'
                    }]
                }
            })
        )


    })


})