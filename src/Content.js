import { useState } from "react";
import { FaTrashAlt } from "react-icons/fa"; // Font Awesome Icons

const Content = () => {
    const [items, setItems] = useState([
        {
            id: 1,
            checked: true,
            item: "Item 1",
        },
        {
            id: 2,
            checked: false,
            item: "Item 2",
        },
        {
            id: 3,
            checked: false,
            item: "Item 3",
        },
    ]);

    const handleCheck = (id) => {
        // console.log(`key: ${id}`);
        const listItems = items.map((item) => (item.id === id ? { ...item, checked: !item.checked } : item));
        setItems(listItems);
        localStorage.setItem("shoppinglist", JSON.stringify(listItems));
    };

    const handleDelete = (id) => {
        // console.log(id);
        const listItems = items.filter((item) => item.id !== id);
        setItems(listItems);
        localStorage.setItem("shoppinglist", JSON.stringify(listItems));
    };

    return (
        <main>
            {items.length ? (
                <ul>
                    {items.map((item) => (
                        <li
                            className="item"
                            key={item.id}
                        >
                            <input
                                type="checkbox"
                                onChange={(id) => handleCheck(item.id)}
                                checked={item.checked}
                            />
                            <label
                                onDoubleClick={(id) => handleCheck(item.id)}
                                style={item.checked ? { textDecoration: "line-through" } : null}
                            >
                                {item.item}
                            </label>
                            <FaTrashAlt
                                onClick={() => handleDelete(item.id)}
                                role="button"
                                tabIndex="0"
                            />
                        </li>
                    ))}
                </ul>
            ) : (
                <p style={{ marginTop: "2rem" }}>Your list is empty</p>
            )}
        </main>
    );
};

export default Content;
