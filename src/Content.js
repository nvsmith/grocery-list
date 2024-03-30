const Content = () => {
    const handleNameChange = () => {
        const names = ["Clark", "Bruce", "Diana"];
        const int = Math.floor(Math.random() * 3);
        return names[int];
    };

    const handleClick = () => {
        console.log("Simple Click");
    };

    const handleClick2 = (param) => {
        console.log(`An ${param} was passed`);
    };

    const handleClick3 = (e) => {
        console.log(e.target.innerText);
    };

    return (
        <main>
            <p on onDoubleClick={handleClick}>
                {" "}
                Hello {handleNameChange()}{" "}
            </p>
            <button onClick={handleClick}>Click Me</button>
            <button onClick={() => handleClick2("argument")}>Click Me 2</button>
            <button onClick={(e) => handleClick3(e)}>Click Me 3</button>
        </main>
    );
};

export default Content;
