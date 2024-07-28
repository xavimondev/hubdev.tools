import { Alternative } from '@/types/alternative'
import { Resource } from '@/types/resource'

import { Container } from '@/components/container'
import { Hero } from '@/components/hero'
import { ListAlternative } from '@/components/list-alternative'
import { ListResource } from '@/components/list-resource'
import { LoadMore } from '@/components/load-more'

type HomeProps = {
  data: Resource[]
}

export function Home({ data }: HomeProps) {
  // const [alternatives, setListAlternatives] = useState<Alternative[]>([
  //   {
  //     name: "What's the best place or website to learn react.js? : r/reactjs - Reddit",
  //     url: 'https://www.reddit.com/r/reactjs/comments/10xo017/whats_the_best_place_or_website_to_learn_reactjs/',
  //     snippet:
  //       'Apple, Inc. engages in the design, manufacture, and sale of smartphones, personal computers, tablets, wearables and accessories, and other varieties of ...'
  //   },
  //   {
  //     name: 'How To Learn React As A Beginner In 2024 - DreamHost',
  //     url: 'https://www.dreamhost.com/blog/learn-react/',
  //     snippet:
  //       'Get the latest Apple Inc (AAPL) real-time quote, historical performance, charts, and other financial information to help you make more informed trading and ...'
  //   },
  //   {
  //     name: 'What is the easiest way to learn React.js? - Quora',
  //     url: 'https://www.quora.com/What-is-the-easiest-way-to-learn-React-js',
  //     snippet:
  //       'Get the latest Apple Inc (AAPL) real-time quote, historical performance, charts, and other financial information to help you make more informed trading and ...'
  //   },
  //   {
  //     name: 'Courses - React',
  //     url: 'https://legacy.reactjs.org/community/courses.html',
  //     snippet:
  //       'Get the latest Apple Inc (AAPL) real-time quote, historical performance, charts, and other financial information to help you make more informed trading and ...'
  //   }
  // ])
  // const [isLoadingAlternatives, setIsLoadingAlternatives] = useState(false)
  return (
    <>
      <Container>
        <Hero
          title='Resources'
          description='Discover an awesome list of resources for developers with cutting-edge AI features'
        />
        <ListResource data={data} />
        <LoadMore />
        {/* <ListAlternative alternatives={alternatives} isLoading={isLoadingAlternatives} /> */}
      </Container>
    </>
  )
}
