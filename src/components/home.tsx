import { Resource } from '@/types/resource'

import { Container } from '@/components/container'
import { Hero } from '@/components/hero'
import { ListResource } from '@/components/list-resource'
import { ListSuggestion } from '@/components/list-suggestion'
import { LoadMore } from '@/components/load-more'

type HomeProps = {
  data: Resource[]
}

export function Home({ data }: HomeProps) {
  return (
    <>
      <Container>
        <Hero
          title='Resources'
          description='Discover an awesome list of resources for developers with cutting-edge AI features'
        />
        <ListResource data={data} />
        <ListSuggestion />
        <LoadMore />
      </Container>
    </>
  )
}
