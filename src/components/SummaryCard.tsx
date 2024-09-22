type Type = 'success' | 'error' | 'warning' | 'info' | 'default'

interface SummaryCardProps {
  title: string
  content: Array<string | number>
  type?: Type
}

const SummaryCard = (props: SummaryCardProps) => {
  const { title, content, type = 'default' } = props

  const statusColors = {
    success: 'text-green-400',
    error: 'text-red-400',
    warning: 'text-yellow-400',
    info: 'text-blue-400',
    default: 'text-gray-400',
  }

  return (
    <article
      className={`${statusColors[type]} flex flex-col gap-5 border border-current items-center rounded-2xl p-5 font-semibold w-fit`}
    >
      <h4>{title}</h4>
      <p className="text-4xl flex gap-5">
        {content.map((item, index) => (
          <span key={index}>{item}</span>
        ))}
      </p>
    </article>
  )
}

export default SummaryCard
