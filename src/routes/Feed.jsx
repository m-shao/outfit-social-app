import MultiSelect from "../components/MultiSelect"
import Posts from "../components/Posts"

function Feed() {
  return (
    <div className="p-6 flex w-full h-full justify-center box-border">
        <div className="max-w-md w-full">
            <MultiSelect />
            <Posts />
        </div>
    </div>
  )
}

export default Feed