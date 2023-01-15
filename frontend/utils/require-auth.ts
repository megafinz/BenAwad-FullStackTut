import { useQuery } from '@apollo/client'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { ME_QUERY } from '~/graphql/queries'

export function useRequireAuth() {
  const router = useRouter()
  const { data, loading } = useQuery(ME_QUERY)
  useEffect(() => {
    if (!loading && !data?.me) {
      router.replace(`/login?next=${router.route}`)
    }
  }, [data, loading, router])
}
