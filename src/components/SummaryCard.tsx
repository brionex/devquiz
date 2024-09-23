type Type = 'success' | 'error' | 'warning' | 'info' | 'default'

interface SummaryCardProps {
  title: string
  content: string | number
  type?: Type
}

const SummaryCard = ({
  title,
  content,
  type = 'default',
}: SummaryCardProps) => {
  const statusColors = {
    success: 'text-green-400',
    error: 'text-red-400',
    warning: 'text-yellow-400',
    info: 'text-blue-400',
    default: 'text-gray-400',
  }

  return (
    <article
      className={`${statusColors[type]} flex flex-col gap-5 border border-current items-center rounded-2xl p-5 font-semibold w-fit text-lg`}
    >
      <h4>{title}</h4>
      <p className="flex gap-5 text-4xl text-nowrap">{content}</p>
    </article>
  )
}

export default SummaryCard
