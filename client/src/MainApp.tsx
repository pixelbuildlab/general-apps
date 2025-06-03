import { getClockifyProject } from './hooks/clockify/getClockifyProject'

function MainApp() {
  return (
    <div>
      MainApp <br />
      <button
        onClick={async () => {
          console.log('Button clicked!')
          const va = await getClockifyProject()
          console.log(va)
        }}
      >
        hi
      </button>
    </div>
  )
}

export default MainApp
