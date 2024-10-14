interface CardSummaryProps {
  index: number
  isCorrect: boolean
  question: string
  selectedOption: string
  correctOption: string
  timeTaken: string
}

const CardResult = ({
  index,
  question,
  isCorrect,
  selectedOption,
  correctOption,
  timeTaken,
}: CardSummaryProps) => {
  return (
    <article className="overflow-hidden text-gray-400 border border-gray-600 rounded-2xl">
      <div className="flex gap-5 p-5 font-semibold border-b bg-midnight-blue/40 text-pretty border-b-gray-600">
        <span>{index + 1}</span>
        <h3 className="flex-grow">{question}</h3>
        <span>
          {isCorrect ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-green-500 icon icon-tabler icons-tabler-outline icon-tabler-circle-check w-9 h-9"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
              <path d="M9 12l2 2l4 -4" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-red-500 icon icon-tabler icons-tabler-outline icon-tabler-circle-x h-9 w-9"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
              <path d="M10 10l4 4m0 -4l-4 4" />
            </svg>
          )}
        </span>
      </div>

      <div className="flex flex-wrap gap-5 p-5 text-gray-300 bg-midnight-blue">
        <p className="flex items-center w-full gap-3 text-blue-400">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="icon icon-tabler icons-tabler-outline icon-tabler-clock-hour-4"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
            <path d="M12 12l3 2" />
            <path d="M12 7v5" />
          </svg>
          <span>{timeTaken}</span>
        </p>
        <p className="flex flex-col flex-grow text-pretty">
          <span className="text-gray-500">Tu respuesta</span> {selectedOption}
        </p>
        <p className="flex flex-col flex-grow text-pretty">
          <span className="text-gray-500">Respuesta correcta</span>{' '}
          {correctOption}
        </p>
      </div>
    </article>
  )
}

export default CardResult
