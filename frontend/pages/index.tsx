import { NextPage } from 'next'
import { useQuery } from 'urql'
import Layout from '~/components/Layout'
import Loader from '~/components/Loader'
import NavBar from '~/components/NavBar'
import { PostsDoc } from '~/graphql/queries'
import { withUrqlClient } from '~/lib/urql'

const Home: NextPage = () => {
  const [{ data, fetching }] = useQuery({ query: PostsDoc })
  return (
    <Layout>
      <NavBar />
      <main>
        {fetching && <Loader />}
        {!fetching && !data?.allPosts && <p>Can&apos;t load posts</p>}
        {!fetching &&
          data?.allPosts &&
          data.allPosts.map(x => <div key={x.id}>{x.title}</div>)}
      </main>
    </Layout>
  )
}

export default withUrqlClient({ ssr: true })(Home)
