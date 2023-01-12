import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useQuery } from 'urql'
import { MeDoc } from '~/graphql/queries'

export function useRequireAuth() {
  const router = useRouter()
  const [{ data, fetching }] = useQuery({ query: MeDoc })
  useEffect(() => {
    if (!fetching && !data?.me) {
      router.replace(`/login?next=${router.route}`)
    }
  }, [data, fetching, router])
}
