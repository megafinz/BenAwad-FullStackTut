import { NextPage } from 'next'
import { useQuery } from 'urql'
import Layout from '~/components/Layout'
import Loader from '~/components/Loader'
import { PostsDoc } from '~/graphql/queries'
import { withUrqlClient } from '~/lib/urql'

const Home: NextPage = () => {
  const [{ data, fetching }] = useQuery({ query: PostsDoc })
  return (
    <Layout>
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
