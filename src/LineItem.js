import { FaTrashAlt } from "react-icons/fa"; // Font Awesome Icons

const LineItem = ({ item, handleCheck, handleDelete }) => {
    return (
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
                aria-label={`Delete ${item.item}`}
            />
        </li>
    );
};

export default LineItem;
