import MultiSelect from '../components/MultiSelect';
import Posts from '../components/Posts';

function Feed() {
    return (
        <div className="box-border flex justify-center w-full h-full p-6">
            <div className="w-full max-w-md">
                <MultiSelect />
                <Posts />
            </div>
        </div>
    );
}

export default Feed;
