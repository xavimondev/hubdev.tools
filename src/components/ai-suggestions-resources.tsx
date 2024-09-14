import { getDashboardAISuggestions } from '@/services/get-dashboard-aisuggestions'
import { ErrorState } from '@/components/error-state'
import { ListResource } from '@/components/list-resource'

export async function AISuggestionsResources() {
  const aiSuggestions = await getDashboardAISuggestions()

  const { data, error } = aiSuggestions

  if (error || !data) {
    return <ErrorState error='Something went wrong' />
  }

  if (data.length === 0) {
    return null
  }

  return (
    <section className='mb-4 md:mb-14'>
      <div className='flex flex-col gap-2'>
        <h2 className='text-2xl md:text-4xl text-balance mb-2 text-yellow-50'>AI Suggestions</h2>
        <p className='text-base md:text-xl text-transparent bg-clip-text bg-gradient-to-t from-cyan-100 to-cyan-400'>
          Tailored recommendations powered by AI.
        </p>
      </div>
      <ListResource data={data} />
    </section>
  )
}
