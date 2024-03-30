import { useState } from "react";

const Content = () => {
    const [name, setName] = useState("Guest");
    const [count, setCount] = useState(0);

    const handleNameChange = () => {
        const names = ["Clark", "Bruce", "Diana"];
        const int = Math.floor(Math.random() * 3);
        setName(names[int]);
    };

    const handleClick = () => {
        setCount(count + 1);
        console.log(count);
    };

    const handleClick2 = (param) => {
        console.log(count);
    };

    return (
        <main>
            <p on onDoubleClick={handleClick}>
                Hello {name}
            </p>
            <button onClick={handleNameChange}>Change Name</button>
            <button onClick={handleClick}>Click Me 2</button>
            <button onClick={handleClick2}>Click Me 3</button>
        </main>
    );
};

export default Content;
