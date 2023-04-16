import { useState } from 'react';

import MultiSelect from '../components/MultiSelect';
import Posts from '../components/Posts';

function Feed() {
    const [selectedItems, setSelectedItems] = useState({});

    return (
        <div className="box-border flex justify-center w-full h-full p-6">
            <div className="w-full max-w-md">
                <MultiSelect
                    selectedItems={selectedItems}
                    setSelectedItems={setSelectedItems}
                />
                <Posts tagList={selectedItems} />
            </div>
        </div>
    );
}

export default Feed;
