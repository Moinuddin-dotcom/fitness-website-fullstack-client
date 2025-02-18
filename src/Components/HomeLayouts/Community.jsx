import React from 'react'
import useBlog from '../../Hooks/useBlog'
import Loading from '../Pages/Loading'
import CommunityRoutes from './CommunityRoutes/CommunityRoutes'
import BlogSection from './CommunityRoutes/BlogSection'
import { Helmet } from 'react-helmet'
import SectionTitles from '../SharedMarque/SectionTitles'
import Footer from '../NavAndFoot/Footer'

const Community = () => {
    const [blogData, blogLoading] = useBlog()
    if (blogLoading) return <Loading />
    return (
        <div className='pt-0'>
            {/* <SectionTitles subHeading={'Why Choose Us?'} heading={'Features'} /> */}
            <Helmet>
                <title>Community | Aura Fusion Gym</title>
            </Helmet>
            <section>
                {(blogData && blogData.length > 0) ? <CommunityRoutes /> : ""}
            </section>
            <section className='max-w-[90vw] mx-auto grid grid-cols-1 md:grid-cols-3 gap-5'>
                {(blogData && blogData.length > 0) ? <>
                    {
                        blogData.map(blogs => <BlogSection blogData={blogs} />)
                    }
                </> : <h1 className='text-5xl font-bold py-20 text-center h-screen'>No Blogs found</h1>}

            </section>
            <footer>
                <Footer />
            </footer>
        </div>
    )
}

export default Community
